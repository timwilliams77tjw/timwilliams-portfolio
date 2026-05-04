

/* ============================================================
   1. MOBILE/TABLET DRAWER MENU (≤1024px)
============================================================ */

function initMobileDrawer() {
    const toggle = document.getElementById("mobileMenuToggle");
    const drawer = document.getElementById("mobileDrawer");
    const overlay = document.getElementById("mobileOverlay");
    const sections = document.querySelectorAll(".drawer-section");

    if (!toggle || !drawer || !overlay) return;

    // Open drawer
    toggle.addEventListener("click", () => {
        drawer.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    // Close drawer when clicking overlay
    overlay.addEventListener("click", () => {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    });

    // ESC closes drawer
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            drawer.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // Accordion logic
    sections.forEach(section => {
        const trigger = section.querySelector(".drawer-trigger");
        const submenu = section.querySelector(".drawer-sub");

        if (!trigger || !submenu) return;

        trigger.addEventListener("click", () => {
            const isOpen = section.classList.contains("open");

            // Close all sections
            sections.forEach(s => s.classList.remove("open"));

            // Toggle current
            if (!isOpen) {
                section.classList.add("open");
            }
        });
    });
}

/* ============================================================
   2. DESKTOP MEGA-MENU (≥1025px)
============================================================ */

function initDesktopMenu() {
    const navItems = document.querySelectorAll(".desktop-nav .nav-item");

    if (!navItems.length) return;

    navItems.forEach(item => {
        const menu = item.querySelector(".mega-menu");
        if (!menu) return;

item.addEventListener("mouseenter", () => {
    menu.classList.add("open");
    window.parent.postMessage({ headerResize: true }, "*");
});

item.addEventListener("mouseleave", () => {
    menu.classList.remove("open");
    window.parent.postMessage({ headerResize: true }, "*");
});

    });
}

/* ============================================================
   3. SEARCH FIELD TOGGLE
============================================================ */

function initSearchToggle() {
    const toggle = document.getElementById("siteSearchToggle");
    const input = document.getElementById("siteSearchInput");

    if (!toggle || !input) return;

    toggle.addEventListener("click", () => {
        input.classList.toggle("open");
        if (input.classList.contains("open")) {
            input.focus();
        }
    });
}

/* ============================================================
0. DARK MODE — APPLY SAVED STATE IN PARENT
============================================================ */

if (window.parent && window.parent !== window) {
    // Ask parent to apply saved state on load
    window.parent.postMessage({ tw_dark_init: true }, "*");
}

/* ============================================================
4. DARK MODE TOGGLE (with persistence, via parent)
============================================================ */

function initDarkMode() {
    const toggle = document.getElementById("darkModeToggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ tw_dark_toggle: true }, "*");
        }
    });
}


/* ============================================================
   5. CATEGORY HEADERS (CV, Portfolio, etc.)
============================================================ */

function initCategoryHeaders() {
    document.querySelectorAll(".category-header").forEach(header => {
        header.addEventListener("click", () => {
            const section = header.closest(".category-section");
            if (!section) return;

            section.classList.toggle("open");

            const icon = header.querySelector(".category-toggle");
            if (icon) {
                icon.textContent = section.classList.contains("open") ? "−" : "+";
            }
        });
    });
}

/* ============================================================
   6. ACTIVE LINK HIGHLIGHTING
============================================================ */

function initActiveLinks() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const file = href.split("/").pop();
        if (file === currentPath) {
            link.classList.add("active");
        }
    });
}

/* ============================================================
   7. INITIALISE BASED ON SCREEN SIZE
============================================================ */

function initHeaderMenus() {
    const width = window.innerWidth;

    if (width <= 1365) {
        initMobileDrawer();     // iPhone + all iPads
    } else {
        initDesktopMenu();      // only laptops/desktops
    }
}

/* ============================================================
   8. RUN EVERYTHING AFTER HEADER LOAD
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initHeaderMenus();
    initSearchToggle();
    initDarkMode();
    initCategoryHeaders();
    initActiveLinks();
});
