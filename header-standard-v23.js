/* ==================================================
   header-standard.js
   CLEAN REBUILD — Stable Desktop + iPhone + iPad
================================================== */

function initHeader() {

    const body = document.body;
    const mobileBreakpoint = 1024;

    /* ===========================
       HELPERS
    =========================== */
    const isMobile = () => window.innerWidth <= mobileBreakpoint;

    const closeAllMenus = () => {
        document.querySelectorAll(".nav-item.open")
            .forEach(item => item.classList.remove("open"));
    };

    /* ===========================
       MEGA MENUS
    =========================== */
    const triggers = document.querySelectorAll(".mega-trigger");

    triggers.forEach(btn => {

        btn.addEventListener("click", function (e) {

            const parent = this.closest(".nav-item");
            if (!parent) return;

            /* MOBILE / TABLET CLICK MODE */
            if (isMobile()) {

                e.preventDefault();
                e.stopPropagation();

                const alreadyOpen = parent.classList.contains("open");

                closeAllMenus();

                if (!alreadyOpen) {
                    requestAnimationFrame(() => {
                        parent.classList.add("open");
                    });
                }

                return;
            }

            /* DESKTOP:
               allow hover CSS, but first click opens if wanted */
            e.preventDefault();

            const alreadyOpen = parent.classList.contains("open");

            closeAllMenus();

            if (!alreadyOpen) {
                parent.classList.add("open");
            }
        });

    });

    /* ===========================
       CLOSE ON OUTSIDE CLICK
    =========================== */
    document.addEventListener("click", e => {
        if (!e.target.closest(".nav-item")) {
            closeAllMenus();
        }
    });

    /* ===========================
       CLOSE ON ESC
    =========================== */
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeAllMenus();
        }
    });

    /* ===========================
       CLOSE ON RESIZE
    =========================== */
    window.addEventListener("resize", closeAllMenus);

    /* ===========================
       CLOSE ON PAGE SCROLL
    =========================== */
    let lastScroll = window.scrollY;

    window.addEventListener("scroll", () => {
        const current = window.scrollY;

        if (Math.abs(current - lastScroll) > 20) {
            closeAllMenus();
        }

        lastScroll = current;
    });

    /* ===========================
       SEARCH TOGGLE
    =========================== */
    const icon = document.getElementById("searchIcon");
    const input = document.getElementById("siteSearchInput");
    const results = document.getElementById("searchResults");

    if (icon && input) {

        icon.addEventListener("click", e => {
            e.stopPropagation();

            input.classList.toggle("open");

            if (input.classList.contains("open")) {
                input.focus();
            } else if (results) {
                results.style.display = "none";
            }
        });

        document.addEventListener("click", e => {
            if (!e.target.closest(".search-wrapper")) {
                input.classList.remove("open");

                if (results) {
                    results.style.display = "none";
                }
            }
        });
    }

    /* ===========================
       DARK MODE
    =========================== */
    const darkBtn = document.getElementById("darkToggleHeader");

    if (darkBtn) {

        if (localStorage.getItem("tw_dark") === "1") {
            body.classList.add("dark-mode");
        }

        darkBtn.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            localStorage.setItem(
                "tw_dark",
                body.classList.contains("dark-mode") ? "1" : "0"
            );
        });
    }
}

/* ===========================
   GLOBAL ACCESS
=========================== */
window.initHeader = initHeader;

/* ===========================
   DOM READY
=========================== */
document.addEventListener("DOMContentLoaded", () => {

    initHeader();

    /* Back to top button */
    const fab = document.getElementById("fab");

    if (fab) {
        fab.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
