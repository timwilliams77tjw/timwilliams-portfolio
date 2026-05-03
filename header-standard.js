// version 30040 — fully guarded, no early init, iPhone‑safe

/* ==================================================
   header-standard.js — FINAL STABLE VERSION
   Mobile/tablet = inline menus
   Desktop = portal menus (if portal exists)
================================================== */

function initHeader() {

    const body = document.body;
    const header = document.querySelector(".header-standard");
    const portal = document.querySelector(".hs-mega-portal");

    /* ==================================================
       SAFETY: If header doesn't exist, abort cleanly
       (e.g., index.html uses a different header)
    =================================================== */
    if (!header) {
        console.warn("initHeader: .header-standard not found — skipping header init");
        return;
    }

    /* ==================================================
       CLOSE ALL MENUS
    =================================================== */
    function closeAllMenus() {
        document.querySelectorAll(".hs-nav-item.open")
            .forEach(item => item.classList.remove("open"));

        // Hide any portaled menus (if portal exists)
        document.querySelectorAll(".hs-mega-menu").forEach(menu => {
            menu.style.display = "none";
            menu.style.position = "";
            menu.style.top = "";
            menu.style.left = "";
        });
    }

    /* ==================================================
       OPEN MEGA MENU (DESKTOP ONLY)
    =================================================== */
    function openMegaMenuDesktop(parent, menu) {

        // SAFETY: Portal or menu missing
        if (!portal || !menu || !header) return;

        // Move menu into portal
        try {
            portal.appendChild(menu);
        } catch (err) {
            console.warn("Portal append failed:", err);
            return;
        }

        const headerRect = header.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        const top = parentRect.bottom - headerRect.top;
        const left = parentRect.left - headerRect.left;

        menu.style.position = "absolute";
        menu.style.top = top + "px";
        menu.style.left = left + "px";
        menu.style.display = "flex";
        menu.style.zIndex = 999999;
    }

    /* ==================================================
       MENU TRIGGERS
    =================================================== */
    const triggers = document.querySelectorAll(".hs-mega-trigger");

    if (triggers.length > 0) {
        triggers.forEach(btn => {

            btn.addEventListener("click", function(e){

                const parent = this.closest(".hs-nav-item");
                if (!parent) return;

                const menu = parent.querySelector(".hs-mega-menu");
                if (!menu) return;

                e.preventDefault();
                e.stopPropagation();

                const alreadyOpen = parent.classList.contains("open");

                closeAllMenus();

                /* ==========================================
                   MOBILE + TABLET (≤1024px)
                   → inline dropdowns
                ========================================== */
                if (window.innerWidth <= 1024) {
                    if (!alreadyOpen) {
                        parent.classList.add("open");
                    }
                    return;
                }

                /* ==========================================
                   DESKTOP (≥1025px)
                   → portal menus (if portal exists)
                ========================================== */
                if (!alreadyOpen) {
                    parent.classList.add("open");
                    openMegaMenuDesktop(parent, menu);
                }

            });

        });
    }

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

/* ==================================================
   GLOBAL EXPORT
================================================== */
window.initHeader = initHeader;

/* ==================================================
   FAB ONLY — header init is handled by fetch block
================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const fab = document.getElementById("fab");
    if (fab) {
        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
