/* ==================================================
   header-standard.js — FINAL VERSION WITH PORTAL
   Fixes iPhone/iPad clipping by moving mega menus
   outside the scroll container.
================================================== */

function initHeader() {

    const body = document.body;

    /* ==================================================
       PORTAL CONTAINER (added in header-standard.html)
    =================================================== */
    const portal = document.querySelector(".hs-mega-portal");

    /* ==================================================
       CLOSE ALL MENUS
    =================================================== */
    function closeAllMenus() {
        document.querySelectorAll(".hs-nav-item.open")
            .forEach(item => item.classList.remove("open"));

        // Hide all mega menus in the portal
        document.querySelectorAll(".hs-mega-menu").forEach(menu => {
            menu.style.display = "none";
        });
    }

    /* ==================================================
       OPEN MEGA MENU (PORTAL LOGIC)
    =================================================== */
    function openMegaMenu(parent, menu) {

        // Move menu into the portal container
        portal.appendChild(menu);

        // Get trigger position
        const rect = parent.getBoundingClientRect();

        // Position menu under trigger
        menu.style.position = "absolute";
        menu.style.top = rect.bottom + "px";
        menu.style.left = rect.left + "px";
        menu.style.display = "flex";
        menu.style.zIndex = 999999;
    }

    /* ==================================================
       MENU TRIGGERS
    =================================================== */
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

            if (!alreadyOpen) {
                parent.classList.add("open");
                openMegaMenu(parent, menu);
            }
        });

    });

    /* ==================================================
       CLOSE ON OUTSIDE CLICK
    =================================================== */
    document.addEventListener("click", e => {
        if (!e.target.closest(".hs-nav-item")) {
            closeAllMenus();
        }
    });

    /* ==================================================
       CLOSE ON RESIZE
    =================================================== */
    window.addEventListener("resize", closeAllMenus);

    /* ==================================================
       CLOSE ON PAGE SCROLL
    =================================================== */
    let lastScroll = window.scrollY;

    window.addEventListener("scroll", () => {
        const current = window.scrollY;

        if (Math.abs(current - lastScroll) > 20) {
            closeAllMenus();
        }

        lastScroll = current;
    });

    /* ==================================================
       SEARCH
    =================================================== */
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

    /* ==================================================
       DARK MODE
    =================================================== */
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
