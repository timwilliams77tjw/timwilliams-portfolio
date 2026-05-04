/* ============================================================
UNIFIED HAMBURGER HEADER — SITE‑WIDE
============================================================ */

function initHeader() {

    const hamburger = document.getElementById("hsHamburger");
    const mobileMenu = document.getElementById("hsMobileMenu");

    if (!hamburger || !mobileMenu) return;

    // Toggle entire mobile menu
    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    // Expand/collapse submenus
    document.querySelectorAll(".hs-mobile-trigger").forEach(trigger => {
        trigger.addEventListener("click", () => {
            const sub = trigger.nextElementSibling;
            sub.classList.toggle("open");
        });
    });

    /* ============================================================
    SEARCH (inside menu)
    ============================================================= */
    const searchInput = document.getElementById("siteSearchMobile");
    const searchResults = document.getElementById("searchResultsMobile");

    if (searchInput && searchResults) {
        searchInput.addEventListener("input", () => {
            const term = searchInput.value.toLowerCase();
            searchResults.innerHTML = term.length < 2
                ? ""
                : `<div style="padding:10px;color:#fff;">Searching for: ${term}</div>`;
        });
    }

    /* ============================================================
    DARK MODE
    ============================================================= */
    const darkToggle = document.getElementById("darkToggleMobile");

    if (darkToggle) {
        darkToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem("darkMode", document.body.classList.contains("dark"));
        });

        // Load saved preference
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark");
        }
    }

    /* ============================================================
    FAB BUTTONS
    ============================================================= */
    const fab = document.getElementById("fab");
    if (fab) {
        window.addEventListener("scroll", () => {
            fab.style.display = window.scrollY > 200 ? "block" : "none";
        });

        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}
