function logDebug(msg) {
  const box = document.getElementById('debug');
  if (box) {
    box.innerHTML += msg + "<br>";
    box.scrollTop = box.scrollHeight;
  }
}

alert("JS loaded");

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

  // Open first category by default
  const firstSection = container.querySelector('.category-section .card-list');
  const firstToggle = container.querySelector('.category-section .category-toggle');
  if (firstSection && firstToggle) {
    firstSection.style.display = 'block';
    firstToggle.textContent = '−';
  }
}

// -----------------------------
// Filter buttons
// -----------------------------
function wireFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  logDebug("Found filter buttons: " + buttons.length);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      logDebug("Clicked filter button: " + btn.textContent);

      const raw = btn.dataset.filter;
      const filter = normalise(raw);

      logDebug("Raw filter: " + raw);
      logDebug("Normalised filter: " + filter);

      document.querySelectorAll('.category-section').forEach(sec => {
        const catRaw = sec.dataset.category;
        const cat = normalise(catRaw);

        logDebug("Comparing filter '" + filter + "' with category '" + cat + "'");

        sec.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
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
// DEBUG PANEL (temporary)
// -----------------------------
function debug(msg) {
  let box = document.getElementById('debugBox');
  if (!box) {
    box = document.createElement('div');
    box.id = 'debugBox';
    box.style.position = 'fixed';
    box.style.bottom = '0';
    box.style.left = '0';
    box.style.width = '100%';
    box.style.maxHeight = '40vh';
    box.style.overflowY = 'auto';
    box.style.background = 'rgba(0,0,0,0.85)';
    box.style.color = 'lime';
    box.style.fontSize = '14px';
    box.style.padding = '10px';
    box.style.zIndex = '999999';
    document.body.appendChild(box);
  }
  box.innerHTML += msg + '<br>';
}

// -----------------------------
// INIT
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  buildCertifications();
  wireFilters();
  wireFloatingButtons();
  document.querySelector('.sticky-bar').addEventListener('click', e => {
  e.stopPropagation();
});
}
  wireTooltips();
});
