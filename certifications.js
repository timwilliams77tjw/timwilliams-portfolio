// -----------------------------
// Load JSON from <script id="cert-data">
// -----------------------------
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

// -----------------------------
// Normalise strings for filtering
// -----------------------------
function normalise(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// -----------------------------
// Build all certification sections
// -----------------------------
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

    // List container
    const list = document.createElement('div');
    list.className = 'card-list';
    list.style.display = 'none';

    // Build cards
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

    // Accordion behaviour
    header.addEventListener('click', () => {
      const isOpening = list.style.display === 'none';

      // Close all other sections
      document.querySelectorAll('.category-section .card-list').forEach(otherList => {
        if (otherList !== list) {
          otherList.style.display = 'none';
          const otherToggle = otherList.parentElement.querySelector('.category-toggle');
          if (otherToggle) otherToggle.textContent = '+';
        }
      });

      // Toggle this one
      list.style.display = isOpening ? 'block' : 'none';
      toggle.textContent = isOpening ? '−' : '+';
    });
  });
}

// -----------------------------
// Filter buttons
// -----------------------------
function wireFilters() {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const raw = btn.dataset.filter;
      const filter = normalise(raw);

      document.querySelectorAll('.category-section').forEach(sec => {
        const catRaw = sec.dataset.category;
        const cat = normalise(catRaw);

        const match = (filter === 'all' || filter === cat);
        sec.style.display = match ? '' : 'none';

        // Auto-expand matching category
        if (filter !== 'all' && filter === cat) {
          const list = sec.querySelector('.card-list');
          const toggle = sec.querySelector('.category-toggle');
          list.style.display = 'block';
          toggle.textContent = '−';
        }
      });
    });
  });
}

// -----------------------------
// Floating button
// -----------------------------
function wireFloatingButtons() {
  const fab = document.getElementById('fab');
  if (fab) {
    fab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// -----------------------------
// Tooltip behaviour
// -----------------------------
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

// -----------------------------
// CV & Portfolio Menus
// -----------------------------
function openCVMenu(event) {
  event.preventDefault();
  const menu = document.getElementById('cvMenu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  menu.style.top = (event.clientY + 10) + 'px';
  menu.style.left = (event.clientX - 100) + 'px';
}

function openPortfolioMenu(event) {
  event.preventDefault();
  const menu = document.getElementById('portfolioMenu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  menu.style.top = (event.clientY + 10) + 'px';
  menu.style.left = (event.clientX - 100) + 'px';
}

// -----------------------------
// INIT
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  buildCertifications();
  wireFilters();
  wireFloatingButtons();
  wireTooltips();
});
