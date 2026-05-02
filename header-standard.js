/* ==================================================
   header-standard.js — FINAL VERSION
   - Uses portal on tablet/desktop only
   - Mobile keeps inline dropdowns (no portal)
================================================== */

function initHeader() {

    const body = document.body;
    const header = document.querySelector(".header-standard");
    const portal = document.querySelector(".hs-mega-portal");

    /* ===========================
       CLOSE ALL MENUS
    =========================== */
    function closeAllMenus() {
        document.querySelectorAll(".hs-nav-item.open")
            .forEach(item => item.classList.remove("open"));

        // Hide any portaled menus
        document.querySelectorAll(".hs-mega-menu").forEach(menu => {
            menu.style.display = "none";
            menu.style.position = "";
            menu.style.top = "";
            menu.style.left = "";
        });
    }

    /* ===========================
       OPEN MEGA MENU (PORTAL FOR TABLET/DESKTOP)
    =========================== */
    function openMegaMenuDesktop(parent, menu) {
        if (!header || !portal) return;

        // Move menu into portal
        portal.appendChild(menu);

        const headerRect = header.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        // Position relative to header, not viewport
        const top = parentRect.bottom - headerRect.top;
        const left = parentRect.left - headerRect.left;

        menu.style.position = "absolute";
        menu.style.top = top + "px";
        menu.style.left = left + "px";
        menu.style.display = "flex";
        menu.style.zIndex = 999999;
    }

    /* ===========================
       MENU TRIGGERS
    =========================== */
    const triggers = document.querySelectorAll(".hs-mega-trigger");

    triggers.forEach(btn => {

        btn.addEventListener("click", function(e){

            const parent = this.closest(".hs-nav-item");
            const menu = parent.querySelector(".hs-mega-menu");
            if (!parent || !menu) return;

            e.preventDefault();
            e.stopPropagation();

            const alreadyOpen = parent.classList.contains("open");
            closeAllMenus();

            // MOBILE: keep menu inline, no portal
            if (window.innerWidth <= 700) {
                if (!alreadyOpen) {
                    parent.classList.add("open");
                    // CSS handles: .hs-nav-item.open .hs-mega-menu { display:flex; }
                }
                return;
            }

            // TABLET / DESKTOP: use portal
            if (!alreadyOpen) {
                parent.classList.add("open");
                openMegaMenuDesktop(parent, menu);
            }

        });

    });

    /* ===========================
       CLOSE ON OUTSIDE CLICK
    =========================== */
    document.addEventListener("click", e => {
        if (!e.target.closest(".hs-nav-item")) {
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
       SEARCH
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
            if (!e.target.closest(".hs-search-wrapper")) {
                input.classList.remove("open");
                if (results) results.style.display = "none";
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

/* Global */
window.initHeader = initHeader;

/* Init */
document.addEventListener("DOMContentLoaded", () => {

    initHeader();

    const fab = document.getElementById("fab");

    if (fab) {
        fab.addEventListener("click", () => {
            window.scrollTo({
                top:0,
                behavior:"smooth"
            });
        });
    }

});
