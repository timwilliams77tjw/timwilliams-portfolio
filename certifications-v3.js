/* LOAD JSON */
function loadCertData() {
    return JSON.parse(document.getElementById("cert-data").textContent);
}

/* RENDER SECTIONS */
function renderSections() {
    const data = loadCertData();
    const container = document.getElementById("certificationsContainer");

    Object.keys(data).forEach(category => {
        const section = document.createElement("div");
        section.className = "section";
        section.id = category;

        section.innerHTML = `
            <h2>${category} Certifications</h2>
            <div class="accent"></div>
        `;

        data[category].forEach(cert => {
            const row = document.createElement("div");
            row.className = "cert-row";

            row.innerHTML = `
                <span class="cert-icon">${cert.icon}</span>
                <span>${cert.title} — ${cert.issuer} (${cert.year})</span>
            `;

            section.appendChild(row);
        });

        container.appendChild(section);
    });
}

/* FILTER BUTTONS */
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const target = btn.dataset.target;

            if (target === "all") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const section = document.getElementById(target);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
}

/* POPUP MENUS */
function openCVMenu(e) {
    e.preventDefault();
    togglePopup("cvMenu", e.target);
}

function openPortfolioMenu(e) {
    e.preventDefault();
    togglePopup("portfolioMenu", e.target);
}

function togglePopup(id, anchor) {
    const menu = document.getElementById(id);
    const rect = anchor.getBoundingClientRect();

    menu.style.top = rect.bottom + window.scrollY + "px";
    menu.style.left = rect.left + "px";

    const visible = menu.style.display === "flex";
    document.querySelectorAll(".popup-menu").forEach(m => m.style.display = "none");
    menu.style.display = visible ? "none" : "flex";
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
    renderSections();
    setupFilters();
});
