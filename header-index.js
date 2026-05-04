/* ============================================================
   0. DARK MODE — APPLY SAVED STATE IMMEDIATELY
============================================================ */
if (localStorage.getItem("tw_dark") === "1") {
    document.body.classList.add("dark-mode");
}

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
            menu.style.display = "block";
        });

        item.addEventListener("mouseleave", () => {
            menu.style.display = "none";
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
   4. DARK MODE TOGGLE (with persistence)
============================================================ */

function initDarkMode() {
    const toggle = document.getElementById("darkModeToggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
            "tw_dark",
            document.body.classList.contains("dark-mode") ? "1" : "0"
        );
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

    if (width <= 1024) {
        initMobileDrawer();
    } else {
        initDesktopMenu();
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
