function getCertData() {
    const script = document.getElementById('cert-data');
    if (!script) return {};
    try {
        return JSON.parse(script.textContent.trim());
    } catch (e) {
        console.error('Error parsing cert JSON', e);
        return {};
    }
}

function normalise(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function buildCertifications() {
    const data = getCertData();
    const container = document.getElementById('certificationsContainer');
    if (!container) return;

    container.innerHTML = '';

    Object.keys(data).forEach(category => {
        const section = document.createElement('section');
        section.className = 'category-section';
        section.dataset.category = category;

        const header = document.createElement('div');
        header.className = 'category-header';

        const title = document.createElement('div');
        title.className = 'category-title';
        title.textContent = category;

        const toggle = document.createElement('div');
        toggle.className = 'category-toggle';
        toggle.textContent = '+';

        header.appendChild(title);
        header.appendChild(toggle);
        section.appendChild(header);

        const list = document.createElement('div');
        list.className = 'card-list';
        list.style.display = 'none';

        data[category].forEach(item => {
            const row = document.createElement('div');
            row.className = 'cert-card';

            row.innerHTML = `
                <div class="cert-icon">${item.icon || '📜'}</div>
                <div class="cert-title">${item.title}</div>
                <div class="cert-issuer">${item.issuer}</div>
                ${item.url ? `<a class="cert-link" href="${item.url}" target="_blank">View</a>` : ''}
            `;

            list.appendChild(row);
        });

        section.appendChild(list);
        container.appendChild(section);

        header.addEventListener('click', () => {
            const isOpening = list.style.display === 'none';

            document.querySelectorAll('.category-section .card-list').forEach(otherList => {
                if (otherList !== list) {
                    otherList.style.display = 'none';
                    const otherToggle = otherList.parentElement.querySelector('.category-toggle');
                    if (otherToggle) otherToggle.textContent = '+';
                }
            });

            list.style.display = isOpening ? 'block' : 'none';
            toggle.textContent = isOpening ? '−' : '+';
        });
    });
}

function wireFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');

    function clearActive() {
        buttons.forEach(b => b.classList.remove('active-filter'));
    }

    expandAllBtn.addEventListener('click', () => {
        clearActive();
        expandAllBtn.classList.add('active-filter');

        document.querySelectorAll('.category-section').forEach(sec => {
            sec.style.display = '';
            const list = sec.querySelector('.card-list');
            const toggle = sec.querySelector('.category-toggle');
            list.style.display = 'block';
            toggle.textContent = '−';
        });
    });

    collapseAllBtn.addEventListener('click', () => {
        clearActive();
        collapseAllBtn.classList.add('active-filter');

        document.querySelectorAll('.category-section').forEach(sec => {
            sec.style.display = '';
            const list = sec.querySelector('.card-list');
            const toggle = sec.querySelector('.category-toggle');
            list.style.display = 'none';
            toggle.textContent = '+';
        });
    });

    buttons.forEach(btn => {
        if (btn.classList.contains('special-btn')) return;

        btn.addEventListener('click', () => {
            clearActive();
            btn.classList.add('active-filter');

            const filter = normalise(btn.dataset.filter);

            document.querySelectorAll('.category-section').forEach(sec => {
                const cat = normalise(sec.dataset.category);
                const match = (filter === cat);

                sec.style.display = match ? '' : 'none';

                if (match) {
                    const list = sec.querySelector('.card-list');
                    const toggle = sec.querySelector('.category-toggle');
                    list.style.display = 'block';
                    toggle.textContent = '−';
                }
            });
        });
    });
}

function wireFloatingButtons() {
    const fab = document.getElementById('fab');
    if (fab) {
        fab.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function wireTooltips() {
    document.querySelectorAll('.tooltip-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.stopPropagation();
            const tooltip = this.closest('.tooltip');
            document.querySelectorAll('.tooltip').forEach(t => {
                if (t !== tooltip) t.classList.remove('tap-active');
            });
            tooltip.classList.toggle('tap-active');
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.tooltip').forEach(t => t.classList.remove('tap-active'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildCertifications();
    wireFilters();
    wireFloatingButtons();
    wireTooltips();
});
