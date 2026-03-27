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
        <div class="cert-icon">${item.icon || '📜'}</div>
        <div class="cert-title">${item.title}</div>
        <div class="cert-issuer">${item.issuer}</div>
        <div class="cert-year">${item.year || '—'}</div>
      `;

      list.appendChild(row);
    });

    section.appendChild(list);
    container.appendChild(section);

    // Toggle behaviour
    header.addEventListener('click', () => {
      const isHidden = list.style.display === 'none';
      list.style.display = isHidden ? 'block' : 'none';
      toggle.textContent = isHidden ? '−' : '+';
    });
  });

  // Open first category by default
  const firstList = container.querySelector('.card-list');
  const firstToggle = container.querySelector('.category-toggle');
  if (firstList && firstToggle) {
    firstList.style.display = 'block';
    firstToggle.textContent = '−';
  }
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
        document.querySelectorAll('.category-section').forEach(sec => {
          sec.style.display = '';
        });
      } else {
        document.querySelectorAll('.category-section').forEach(sec => {
          sec.style.display = sec.dataset.category === target ? '' : 'none';
        });
      }

      // No auto scroll to header – stay near cards
    });
  });
}

// Floating buttons
function wireFloatingButtons() {
  const fab = document.getElementById('fab');

  if (fab) {
    fab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  // bookingFab is just a link to the booking section
}

// Tooltip tap behaviour (for touch devices)
function wireTooltips() {
  const icons = document.querySelectorAll('.tooltip-icon');

  icons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = icon.nextElementSibling;
      if (!text) return;

      const isVisible = text.classList.contains('visible');
      document.querySelectorAll('.tooltip-text').forEach(t => t.classList.remove('visible'));
      if (!isVisible) {
        text.classList.add('visible');
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.tooltip-text').forEach(t => t.classList.remove('visible'));
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
  if (!menu) return;

  const rect = anchor.getBoundingClientRect();
  menu.style.top = rect.bottom + window.scrollY + 'px';
  menu.style.left = rect.left + 'px';

  const visible = menu.style.display === 'flex';
  document.querySelectorAll('.popup-menu').forEach(m => {
    m.style.display = 'none';
  });
  menu.style.display = visible ? 'none' : 'flex';
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  buildCertifications();
  wireFilters();
  wireFloatingButtons();
  wireTooltips();
});
