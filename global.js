window.initGlobal = function () {

/* -----------------------------------------------------------
ACCORDION SYSTEM
----------------------------------------------------------- */
document.querySelectorAll(".category-header").forEach(header => {
    header.addEventListener("click", () => {
        const section = header.closest(".category-section");
        if (!section) return;

        section.classList.toggle("open");

        const icon = header.querySelector(".category-toggle");
        if (icon) {
            icon.textContent = section.classList.contains("open") ? "−" : "+";
        }
    });
});

/* -----------------------------------------------------------
ACTIVE LINK HIGHLIGHTING
----------------------------------------------------------- */
const currentPath = window.location.pathname.split("/").pop() || "index.html";

function markActive(selector) {
    document.querySelectorAll(selector).forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const file = href.split("/").pop();
        if (file === currentPath) link.classList.add("active");
    });
}

markActive(".main-nav a");
markActive(".drawer-link");
markActive(".drawer-sublink");

/* -----------------------------------------------------------
MOBILE DRAWER
----------------------------------------------------------- */
const hamburger = document.getElementById("navHamburger");
const drawer = document.getElementById("navDrawer");
const overlay = document.getElementById("navOverlay");
const drawerClose = document.getElementById("drawerClose");

function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("open");
}

function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
}

if (hamburger) hamburger.addEventListener("click", openDrawer);
if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
if (overlay) overlay.addEventListener("click", closeDrawer);

/* -----------------------------------------------------------
BACK TO TOP BUTTON
----------------------------------------------------------- */
const fab = document.getElementById("fab");

if (fab) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            fab.classList.add("show");
        } else {
            fab.classList.remove("show");
        }
    });

    fab.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* -----------------------------------------------------------
DARK MODE
----------------------------------------------------------- */
const darkToggle = document.getElementById("darkToggle");

if (darkToggle) {
    const body = document.body;
    const stored = localStorage.getItem("tw_dark");

    if (stored === "1") {
        body.classList.add("dark-mode");
    }

    darkToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("tw_dark", body.classList.contains("dark-mode") ? "1" : "0");
    });
}

};
