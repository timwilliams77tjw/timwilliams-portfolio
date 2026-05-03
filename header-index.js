/* ============================================================
   DESKTOP/IPAD NAV (your existing behaviour)
============================================================ */
function initHeaderNav() {
    const items = document.querySelectorAll("#header-content .nav-item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });
}

/* ============================================================
   iPHONE-ONLY MOBILE MEGA-MENU
============================================================ */
function initMobileMenu() {
    const toggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    const navItems = document.querySelectorAll("#header-content .nav-item");

    navItems.forEach(item => {
        const title = item.querySelector(".brand-btn").innerText;
        const submenu = item.querySelector(".mega-menu");

        const section = document.createElement("div");
        section.className = "mobile-section-header";
        section.innerHTML = `${title} <span>+</span>`;
        mobileMenu.appendChild(section);

        const sub = document.createElement("div");
        sub.className = "mobile-submenu";

        if (submenu) {
            submenu.querySelectorAll("a").forEach(link => {
                const a = document.createElement("a");
                a.href = link.href;
                a.innerText = link.innerText;
                sub.appendChild(a);
            });
        }

        mobileMenu.appendChild(sub);

        section.addEventListener("click", () => {
            sub.classList.toggle("open");
            section.querySelector("span").innerText =
                sub.classList.contains("open") ? "−" : "+";
        });
    });

    toggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });
}

/* ============================================================
   INITIALISE BOTH SYSTEMS
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    initHeaderNav();
    initMobileMenu();
});
