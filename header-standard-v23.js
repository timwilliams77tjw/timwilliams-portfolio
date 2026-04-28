/* ==================================================
   header-standard.js
   FINAL FIXED VERSION
   - iPhone submenu works
   - keeps horizontal scroll
   - no jumping menu
   - iPad menus work
================================================== */

function initHeader() {

    const body = document.body;

    const isTouchDevice = () =>
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0;

    const isMobile = () =>
        window.innerWidth <= 900;


    /* ===========================
       HELPERS
    =========================== */

    function closeAllMenus() {
        document.querySelectorAll(".nav-item.open")
            .forEach(item => item.classList.remove("open"));
    }


    /* ===========================
       MEGA MENUS
    =========================== */

    const triggers = document.querySelectorAll(".mega-trigger");

    triggers.forEach(btn => {

        let startX = 0;
        let startY = 0;
        let moved = false;

        /* touch start */
        btn.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            moved = false;
        }, { passive: true });

        /* detect swipe */
        btn.addEventListener("touchmove", e => {
            const dx = Math.abs(e.touches[0].clientX - startX);
            const dy = Math.abs(e.touches[0].clientY - startY);

            if (dx > 10 || dy > 10) moved = true;
        }, { passive: true });

        /* IMPORTANT FIX:
           use pointerup for iPhone Safari */
        btn.addEventListener("pointerup", function (e) {

            if (moved) return;

            const parent = this.closest(".nav-item");
            if (!parent) return;

            if (!isTouchDevice() && !isMobile()) return;

            e.preventDefault();
            e.stopPropagation();

            const isOpen = parent.classList.contains("open");

            closeAllMenus();

            if (!isOpen) {
                parent.classList.add("open");
            }

        });

        /* fallback click */
        btn.addEventListener("click", function (e) {

            if (isTouchDevice() || isMobile()) {
                e.preventDefault();
                e.stopPropagation();
            }

        });

    });


    /* ===========================
       OUTSIDE CLICK CLOSE
    =========================== */

    document.addEventListener("pointerup", e => {
        if (!e.target.closest(".nav-item")) {
            closeAllMenus();
        }
    });


    /* ===========================
       RESIZE CLOSE
    =========================== */

    window.addEventListener("resize", closeAllMenus);


    /* ===========================
       SCROLL PAGE CLOSE
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
            e.preventDefault();
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


/* ===========================
   GLOBAL INIT
=========================== */

window.initHeader = initHeader;

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
});


/* ===========================
   BACK TO TOP
=========================== */

document.addEventListener("DOMContentLoaded", () => {

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
