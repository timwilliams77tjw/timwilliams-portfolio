// Load JSON
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

// Build sections
function buildCertifications() {
  const data = getCertData();
  const container = document.getElementById('certificationsContainer');
  if (!container) return;

  container.innerHTML = '';

  Object.keys(data).forEach(category => {
    const section = document.createElement('section');
    section.className = 'category-section';
    section.dataset.category = category;

    // Header
    const header = document.createElement('div');
    header.className = 'category-header';

    const title = document.createElement('div');
    title.className = 'category-title';
    title.textContent = category;

    const toggle = document.createElement('div');
    toggle.className = 'category-toggle';
    toggle.textContent = '+'; // collapsed by default

    header.appendChild(title);
    header.appendChild(toggle);
    section.appendChild(header);

    // List
    const list = document.createElement('div');
    list.className = 'card-list';

    data[category].forEach(item => {
      const row = document.createElement('div');
      row.className = 'cert-card';

      row.innerHTML = `
        <div class="cert-icon">${item.icon}</div>
        <div class="cert-title">${item.title}</div>
        <div class="cert-issuer">${item.issuer}</div>
        <div class="cert-year">${item.year}</div>
      `;

      list.appendChild(row);
    });

    section.appendChild(list);
    container.appendChild(section);

    // Toggle behaviour
    header.addEventListener('click', () => {
      const isHidden = list.style.display === 'none' || list.style.display === '';
      list.style.display = isHidden ? 'block' : 'none';
      toggle.textContent = isHidden ? '−' : '+';
    });
  });
}

// Filters
function wireFilters() {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.target;

      if (target === 'all') {
        document.querySelectorAll('.category-section').forEach(sec => sec.style.display = '');
      } else {
        document.querySelectorAll('.category-section').forEach(sec => {
          sec.style.display = sec.dataset.category === target ? '' : 'none';
        });
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Floating button
function wireFloatingButton() {
  const fab = document.getElementById('fab');
  if (!fab) return;

  fab.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Popup menus
function openCVMenu(event) {
  event.preventDefault();
  togglePopup('cvMenu', event.target);
}

function openPortfolioMenu(event) {
  event.preventDefault();
  togglePopup('portfolioMenu', event.target);
}

function togglePopup(id, anchor) {
  const menu = document.getElementById(id);
  const rect = anchor.getBoundingClientRect();

  menu.style.top = rect.bottom + window.scrollY + 'px';
  menu.style.left = rect.left + 'px';

  const visible = menu.style.display === 'flex';
  document.querySelectorAll('.popup-menu').forEach(m => m.style.display = 'none');
  menu.style.display = visible ? 'none' : 'flex';
}

//
