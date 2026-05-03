// version 40000 — includes mobile hamburger + submenus + fixed FAB wiring

function initHeader() {

    const body = document.body;
    const header = document.querySelector(".header-standard");
    const portal = document.querySelector(".hs-mega-portal");

    if (!header) return;

    /* ============================================================
       MOBILE HAMBURGER MENU
    ============================================================ */
    const burger = document.getElementById("hsHamburger");
    const mobileMenu = document.getElementById("hsMobileMenu");
    const mobileTriggers = document.querySelectorAll(".hs-mobile-trigger");

    if (burger && mobileMenu) {
        burger.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
        });
    }

    mobileTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const sub = trigger.nextElementSibling;
            if (sub) sub.classList.toggle("open");
        });
    });

    /* ============================================================
       DESKTOP + IPAD MEGA MENU
    ============================================================ */

    function closeAllMenus() {
        document.querySelectorAll(".hs-nav-item.open")
            .forEach(item => item.classList.remove("open"));

        document.querySelectorAll(".hs-mega-menu").forEach(menu => {
            menu.style.display = "none";
            menu.style.position = "";
            menu.style.top = "";
            menu.style.left = "";
        });
    }

    function openMegaMenuDesktop(parent, menu) {
        if (!portal || !menu || !header) return;

        portal.appendChild(menu);

        const headerRect = header.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        menu.style.position = "absolute";
        menu.style.top = (parentRect.bottom - headerRect.top) + "px";
        menu.style.left = (parentRect.left - headerRect.left) + "px";
        menu.style.display = "flex";
        menu.style.zIndex = 999999;
    }

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

            // Mobile / iPhone behaviour
            if (window.innerWidth <= 1024) {
                if (!alreadyOpen) parent.classList.add("open");
                return;
            }

            // Desktop / iPad behaviour
            if (!alreadyOpen) {
                parent.classList.add("open");
                openMegaMenuDesktop(parent, menu);
            }
        });
    });

    document.addEventListener("click", e => {
        if (!e.target.closest(".hs-nav-item")) closeAllMenus();
    });

    window.addEventListener("resize", closeAllMenus);

    let lastScroll = window.scrollY;
    window.addEventListener("scroll", () => {
        const current = window.scrollY;
        if (Math.abs(current - lastScroll) > 20) closeAllMenus();
        lastScroll = current;
    });

    /* ============================================================
       SEARCH + DARK MODE
    ============================================================ */
    const icon = document.getElementById("searchIcon");
    const input = document.getElementById("siteSearchInput");
    const results = document.getElementById("searchResults");

    if (icon && input) {
        icon.addEventListener("click", e => {
            e.stopPropagation();
            input.classList.toggle("open");
            if (input.classList.contains("open")) input.focus();
            else if (results) results.style.display = "none";
        });

        document.addEventListener("click", e => {
            if (!e.target.closest(".hs-search-wrapper")) {
                input.classList.remove("open");
                if (results) results.style.display = "none";
            }
        });
    }

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

    /* ============================================================
       FAB (BACK TO TOP) — FIXED
       Must be inside initHeader() so it works on FAQ
    ============================================================ */
    const fab = document.getElementById("fab");
    if (fab) {
        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

window.initHeader = initHeader;
