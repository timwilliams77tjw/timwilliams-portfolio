// certifications-v3.js

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

function buildCertifications() {
  const data = getCertData();
  const container = document.getElementById('certificationsContainer');
  if (!container) return;

  container.innerHTML = '';

  Object.keys(data).forEach(category => {
    const section = document.createElement('section');
    section.className = 'category-section';
    section.dataset.category = category;

    // Header with plus/minus
    const header = document.createElement('div');
    header.className = 'category-header';

    const title = document.createElement('div');
    title.className = 'category-title';
    title.textContent = category;

    const toggle = document.createElement('div');
    toggle.className = 'category-toggle';
    toggle.textContent = '−'; // start expanded

    header.appendChild(title);
    header.appendChild(toggle);
    section.appendChild(header);

    // Card list
    const list = document.createElement('div');
    list.className = 'card-list';

    data[category].forEach(item => {
      const row = document.createElement('div');
      row.className = 'cert-card';

      const icon = document.createElement('div');
      icon.className = 'cert-icon';
      icon.textContent = item.icon || '📜';

      const titleEl = document.createElement('div');
      titleEl.className = 'cert-title';
      titleEl.textContent = item.title;

      const issuer = document.createElement('div');
      issuer.className = 'cert-issuer';
      issuer.textContent = item.issuer;

      const year = document.createElement('div');
      year.className = 'cert-year';
      year.textContent = item.year || '—';

      row.appendChild(icon);
      row.appendChild(titleEl);
      row.appendChild(issuer);
      row.appendChild(year);

      list.appendChild(row);
    });

    section.appendChild(list);
    container.appendChild(section);

    // Expand/collapse behaviour
    header.addEventListener('click', () => {
      const isHidden = list.style.display === 'none';
      list.style.display = isHidden ? '' : 'none';
      toggle.textContent = isHidden ? '−' : '+';
    });
  });
}

function wireFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const sections = document.querySelectorAll('.category-section');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.target;
      if (target === 'all') {
        sections.forEach(sec => sec.style.display = '');
      } else {
        sections.forEach(sec => {
          sec.style.display = (sec.dataset.category === target) ? '' : 'none';
        });
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function wireFloatingButtons() {
  const floating = document.getElementById('floatingToggle');
  const backToTop = document.getElementById('backToTop');

  if (floating) {
    floating.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Dummy stubs so your existing onclicks don’t break
function openCVMenu(event) {
  event.preventDefault();
  const menu = document.getElementById('cvMenu');
  if (!menu) return;
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function openPortfolioMenu(event) {
  event.preventDefault();
  const menu = document.getElementById('portfolioMenu');
  if (!menu) return;
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  buildCertifications();
  wireFilters();
  wireFloatingButtons();
});
