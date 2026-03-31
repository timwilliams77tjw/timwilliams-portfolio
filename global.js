/* -----------------------------------------
INIT AFTER HEADER LOAD
----------------------------------------- */

window.initGlobal = function () {

    /* ACTIVE BUTTON */
    const path = window.location.pathname.split("/").pop();
    document.querySelectorAll(".brand-btn").forEach(btn => {
        const href = btn.getAttribute("href");
        if (href && href === path) {
            btn.classList.add("active");
        }
    });

    /* TOOLTIP BEHAVIOUR */
    document.querySelectorAll(".tooltip-icon").forEach(icon => {
        icon.addEventListener("click", e => {
            e.stopPropagation();
            const tooltip = icon.closest(".tooltip");

            document.querySelectorAll(".tooltip").forEach(t => {
                if (t !== tooltip) t.classList.remove("tap-active");
            });

            tooltip.classList.toggle("tap-active");
        });
    });

    /* BACK TO TOP */
    const fab = document.getElementById("fab");
    if (fab) {
        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* -----------------------------------------
       DROPDOWN CLICK HANDLER (MUST RUN AFTER HEADER LOADS)
    ----------------------------------------- */
    document.addEventListener("click", (e) => {

        // Click inside a menu → keep it open
        if (e.target.closest(".popup-menu")) return;

        // Click on menu buttons → let onclick handle it
        if (e.target.closest(".cv-btn") || e.target.closest(".portfolio-btn")) return;

        // Click anywhere else → close menus
        closeAllMenus();
    });
};


/* -----------------------------------------
DROPDOWN MENUS
----------------------------------------- */

function closeAllMenus() {
    document.querySelectorAll(".popup-menu").forEach(m => m.style.display = "none");
    document.querySelectorAll(".brand-btn.open").forEach(b => b.classList.remove("open"));
}

window.openCVMenu = function (event) {
    event.stopPropagation();
    toggleMenu("cvMenu", event.currentTarget);
};

window.openPortfolioMenu = function (event) {
    event.stopPropagation();
    toggleMenu("portfolioMenu", event.currentTarget);
};

function toggleMenu(id, button) {
    const menu = document.getElementById(id);
    if (!menu) return;

    const isOpen = menu.style.display === "flex";

    closeAllMenus();

    if (!isOpen) {
        const width = button.offsetWidth;
        menu.style.setProperty("--menu-width", width + "px");
        menu.style.display = "flex";
        button.classList.add("open");
    }
}
