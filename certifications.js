/* ============================================================
   LOAD JSON DATA
============================================================ */
function loadCertData() {
    const json = document.getElementById("cert-data").textContent;
    return JSON.parse(json);
}

/* ============================================================
   RENDER SECTIONS + CERTIFICATIONS
============================================================ */
function renderSections() {
    const data = loadCertData();
    const container = document.getElementById("certificationsContainer");
    container.innerHTML = "";

    Object.keys(data).forEach((sectionName, index) => {
        const section = document.createElement("div");
        section.className = "section";

        section.innerHTML = `
            <h3>${sectionName}</h3>
            <div class="accent"></div>
            <div class="card" id="section-${index}"></div>
        `;

        container.appendChild(section);

        const card = section.querySelector(".card");

        data[sectionName].forEach((cert, certIndex) => {
            const item = document.createElement("div");
            item.className = "cert-item";
            item.dataset.category = cert.category;

            item.innerHTML = `
                <div class="cert-title">
                    <span>${cert.title}</span>
                    <span class="cert-meta">${cert.issuer} • ${cert.year}</span>
                </div>

                <div class="cert-details">
                    <p>${cert.details}</p>
                    ${cert.url ? `<a href="${cert.url}" target="_blank">View certification</a>` : ""}
                </div>
            `;

            item.addEventListener("click", () => {
                item.classList.toggle("open");
            });

            card.appendChild(item);
        });
    });
}

/* ============================================================
   FILTER BY CATEGORY
============================================================ */
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.dataset.category;

            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            filterByCategory(category);
        });
    });
}

function filterByCategory(category) {
    const items = document.querySelectorAll(".cert-item");

    items.forEach(item => {
        if (category === "All" || item.dataset.category === category) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

/* ============================================================
   SEARCH FUNCTIONALITY
============================================================ */
function setupSearch() {
    const input = document.getElementById("searchInput");

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        const items = document.querySelectorAll(".cert-item");

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? "block" : "none";
        });
    });
}

/* ============================================================
   COLLAPSE ALL
============================================================ */
function setupCollapseAll() {
    const btn = document.getElementById("collapseAllBtn");

    btn.addEventListener("click", () => {
        document.querySelectorAll(".cert-item.open")
            .forEach(item => item.classList.remove("open"));
    });
}

/* ============================================================
   PRINT MODE
============================================================ */
function setupPrintMode() {
    const btn = document.getElementById("printModeBtn");

    btn.addEventListener("click", () => {
        window.print();
    });
}

/* ============================================================
   EXPORT PDF (Browser Print-to-PDF)
============================================================ */
function setupExportPDF() {
    const btn = document.getElementById("exportPdfBtn");

    btn.addEventListener("click", () => {
        window.print(); // User selects “Save as PDF”
    });
}

/* ============================================================
   POPUP MENUS (CV + PORTFOLIO)
============================================================ */
function openCVMenu(event) {
    event.preventDefault();
    togglePopup("cvMenu", event.target);
}

function openPortfolioMenu(event) {
    event.preventDefault();
    togglePopup("portfolioMenu", event.target);
}

function togglePopup(id, anchor) {
    const menu = document.getElementById(id);

    const rect = anchor.getBoundingClientRect();
    menu.style.top = rect.bottom + window.scrollY + "px";
    menu.style.left = rect.left + "px";

    const isVisible = menu.style.display === "flex";
    document.querySelectorAll(".popup-menu").forEach(m => m.style.display = "none");

    menu.style.display = isVisible ? "none" : "flex";
}

document.addEventListener("click", (e) => {
    if (!e.target.closest(".popup-menu") && !e.target.closest(".brand-btn")) {
        document.querySelectorAll(".popup-menu").forEach(m => m.style.display = "none");
    }
});

/* ============================================================
   TOOLTIP (Tap-to-open on mobile)
============================================================ */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("tooltip-icon")) {
        const tooltip = e.target.closest(".tooltip");
        tooltip.classList.toggle("tap-active");
    } else {
        document.querySelectorAll(".tooltip.tap-active")
            .forEach(t => t.classList.remove("tap-active"));
    }
});

/* ============================================================
   BACK TO TOP BUTTON (Auto Injected)
============================================================ */
function injectBackToTop() {
    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.textContent = "↑ Top";

    btn.style.position = "fixed";
    btn.style.bottom = "90px";
    btn.style.right = "24px";
    btn.style.padding = "12px 18px";
    btn.style.borderRadius = "50px";
    btn.style.background = "#0A1A2F";
    btn.style.color = "white";
    btn.style.fontFamily = "Montserrat";
    btn.style.fontWeight = "600";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
    btn.style.display = "none";
    btn.style.zIndex = "9999";

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
        btn.style.display = window.scrollY > 600 ? "block" : "none";
    });
}

/* ============================================================
   INITIALISE EVERYTHING
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    renderSections();
    setupFilters();
    setupSearch();
    setupCollapseAll();
    setupPrintMode();
    setupExportPDF();
    injectBackToTop();
});
