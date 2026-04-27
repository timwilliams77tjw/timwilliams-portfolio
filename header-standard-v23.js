/* ==================================================
   header.js (REWRITTEN)
   iOS SAFE + NO SCROLL BREAKS
================================================== */

function initHeader() {

    const isTouch = () =>
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;

    const body = document.body;

    /* ===========================
       CLOSE ALL MENUS
    =========================== */
    function closeMenus() {
        document.querySelectorAll(".nav-item.open")
            .forEach(el => el.classList.remove("open"));
    }

    /* ===========================
       MEGA MENU TOGGLE
    =========================== */
    document.querySelectorAll(".mega-trigger").forEach(btn => {

        let moved = false;
        let startX = 0;
        let startY = 0;

        btn.addEventListener("touchstart", (e) => {
            const t = e.touches[0];
            startX = t.clientX;
            startY = t.clientY;
            moved = false;
        }, { passive: true });

        btn.addEventListener("touchmove", (e) => {
            const t = e.touches[0];
            if (Math.abs(t.clientX - startX) > 10 ||
                Math.abs(t.clientY - startY) > 10) {
                moved = true;
            }
        }, { passive: true });

        btn.addEventListener("click", (e) => {

            if (moved) return;

            const item = btn.closest(".nav-item");
            if (!item) return;

            if (!isTouch()) return;

            e.preventDefault();

            const isOpen = item.classList.contains("open");

            closeMenus();

            if (!isOpen) {
                item.classList.add("open");
            }

        });

    });

    /* ===========================
       OUTSIDE CLICK CLOSE
    =========================== */
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-item")) {
            closeMenus();
        }
    });

    /* ===========================
       SEARCH
    =========================== */
    const icon = document.getElementById("searchIcon");
    const input = document.getElementById("siteSearchInput");

    if (icon && input) {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            input.classList.toggle("open");
            if (input.classList.contains("open")) {
                input.focus();
            }
        });

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".search-wrapper")) {
                input.classList.remove("open");
            }
        });
    }

    /* ===========================
       DARK MODE
    =========================== */
    const darkBtn = document.getElementById("darkToggleHeader");

    if (darkBtn) {
        if (localStorage.getItem("dark") === "1") {
            body.classList.add("dark-mode");
        }

        darkBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            localStorage.setItem(
                "dark",
                body.classList.contains("dark-mode") ? "1" : "0"
            );
        });
    }

    /* ===========================
       SAFE RESIZE HANDLER
    =========================== */
    let lastWidth = window.innerWidth;

    window.addEventListener("resize", () => {
        if (Math.abs(window.innerWidth - lastWidth) > 80) {
            closeMenus();
            lastWidth = window.innerWidth;
        }
    });

    /* ===========================
       SCROLL CLOSE
    =========================== */
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const now = window.scrollY;

        if (Math.abs(now - lastScroll) > 25) {
            closeMenus();
        }

        lastScroll = now;
    });

}

/* global */
window.initHeader = initHeader;
