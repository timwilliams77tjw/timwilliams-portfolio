/* ---------------------------------------------------------
   HEADER INITIALISATION
--------------------------------------------------------- */
function initHeader() {
   
console.log("Mega triggers found:", document.querySelectorAll(".mega-trigger").length);

    const isTouch = () => (
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
    );

    const isMobile = () => window.innerWidth <= 700;

    function closeAllMenus() {
        document.querySelectorAll(".nav-item.open").forEach(item => {
            item.classList.remove("open");
        });
    }

    /* ---------------------------------------------------------
       MEGA MENU TRIGGERS (BUTTONS)
    --------------------------------------------------------- */
    const triggers = document.querySelectorAll(".mega-trigger");
    console.log("Mega triggers found:", triggers.length);

    triggers.forEach(btn => {
        btn.addEventListener("click", function (e) {

            const parent = this.closest(".nav-item");

            // Desktop hover mode → ignore click
            if (!isTouch() && !isMobile()) return;

            // Second tap → close
            if (parent.classList.contains("open")) {
                parent.classList.remove("open");
                return;
            }

            // First tap → open
            e.preventDefault();
            e.stopPropagation();
            closeAllMenus();
            parent.classList.add("open");
        });
    });

    /* CLOSE ON OUTSIDE TAP */
    document.addEventListener("click", function (e) {
        if (!isTouch()) return;
        if (!e.target.closest(".nav-item")) closeAllMenus();
    });

    /* CLOSE ON SCROLL */
    window.addEventListener("scroll", function () {
        if (isTouch()) closeAllMenus();
    });

    /* ---------------------------------------------------------
       SEARCH
    --------------------------------------------------------- */
    const icon = document.getElementById("searchIcon");
    const input = document.getElementById("siteSearchInput");
    const resultsBox = document.getElementById("searchResults");

    if (icon && input) {
        input.classList.remove("open");
        if (resultsBox) resultsBox.style.display = "none";

        icon.addEventListener("click", () => {
            input.classList.toggle("open");
            if (input.classList.contains("open")) input.focus();
        });

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".search-wrapper")) {
                input.classList.remove("open");
                if (resultsBox) resultsBox.style.display = "none";
            }
        });
    }

    /* ---------------------------------------------------------
       DARK MODE
    --------------------------------------------------------- */
    const darkToggle = document.getElementById("darkToggleHeader");
    const body = document.body;

    if (darkToggle) {
        const stored = localStorage.getItem("tw_dark");
        if (stored === "1") body.classList.add("dark-mode");

        darkToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            localStorage.setItem(
                "tw_dark",
                body.classList.contains("dark-mode") ? "1" : "0"
            );
        });
    }
}

/* Make initHeader() available globally */
window.initHeader = initHeader;


/* ---------------------------------------------------------
   BACK TO TOP — MUST RUN AFTER DOM EXISTS
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    const fab = document.getElementById("fab");
    if (fab) {
        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
