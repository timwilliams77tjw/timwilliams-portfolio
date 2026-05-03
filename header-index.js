/* ============================================================
   DESKTOP + IPAD NAV (unchanged)
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
   SEARCH FIELD TOGGLE (unchanged)
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
   DARK MODE TOGGLE (unchanged)
============================================================ */

function initDarkMode() {
    const toggle = document.getElementById("darkModeToggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

/* ============================================================
   iPHONE MOBILE MENU — Handover Style
   - Push-down menu
   - Smooth slide-down
   - Accordion behaviour
============================================================ */

function initMobileMenu() {
    const toggle = document.getElementById("mobileMenuToggle");
    const menu = document.getElementById("mobileMenu");

    if (!toggle || !menu) return;

    // Toggle entire mobile menu
    toggle.addEventListener("click", () => {
        menu.classList.toggle("open");
    });

    // Accordion behaviour
    const triggers = menu.querySelectorAll(".hs-mobile-trigger");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {

            // Close all other sections
            triggers.forEach(other => {
                if (other !== trigger) {
                    other.nextElementSibling.classList.remove("open");
                }
            });

            // Toggle this section
            const sub = trigger.nextElementSibling;
            sub.classList.toggle("open");
        });
    });
}

/* ============================================================
   INITIALISE EVERYTHING
   (Runs immediately after header injection)
============================================================ */

function initHeaderSystem() {
    initHeaderNav();
    initSearchToggle();
    initDarkMode();
    initMobileMenu();
}

// Run immediately — header HTML is already injected
initHeaderSystem();
