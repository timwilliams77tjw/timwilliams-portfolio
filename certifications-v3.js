/* DEBUG */
document.body.insertAdjacentHTML(
  "afterbegin",
  "<div style='background:red;color:white;padding:10px;font-size:18px;'>DEBUG: JS v3 LOADED</div>"
);

/* LOAD JSON */
function loadCertData() {
    return JSON.parse(document.getElementById("cert-data").textContent);
}

/* RENDER CARDS */
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
            const card = document.createElement("div");
            card.className = "cert-card";

            card.innerHTML = `
                <div class="cert-header">
                    <span><span class="cert-icon">${cert.icon}</span>${cert.title} — ${cert.issuer} (${cert.year})</span>
                    <span class="expand-symbol">+</span>
                </div>
                <div class="cert-body">
                    <p><strong>Issuer:</strong> ${cert.issuer}</p>
                    <p><strong>Year:</strong> ${cert.year}</p>
                </div>
            `;

            section.appendChild(card);
        });

        container.appendChild(section);
    });

    setupCardBehaviour();
}

/* CARD EXPAND/COLLAPSE (ACCORDION MODE) */
function setupCardBehaviour() {
    const headers = document.querySelectorAll(".cert-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const body = header.nextElementSibling;
            const symbol = header.querySelector(".expand-symbol");

            // Close all other cards
            document.querySelectorAll(".cert-body").forEach(b => {
                if (b !== body) b.style.display = "none";
            });
            document.querySelectorAll(".expand-symbol").forEach(s => {
                if (s !== symbol) s.textContent = "+";
            });

            // Toggle this card
            const isOpen = body.style.display === "block";
            body.style.display = isOpen ? "none" : "block";
            symbol.textContent = isOpen ? "+" : "–";

            if (!isOpen) {
                header.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
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

/* FLOATING BUTTON */
function setupFloatingButton() {
    const fab = document.getElementById("fab");

    fab.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    setupFloatingButton();
});
