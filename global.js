window.initGlobal = function () {

/* APPLY SAVED DARK MODE BEFORE ANYTHING ELSE */
if (localStorage.getItem("tw_darkmode") === "1") {
    document.body.classList.add("dark-mode");
}

/* ATTACH DARK MODE TOGGLE AFTER HEADER IS IN DOM */
setTimeout(() => {
    const btn = document.getElementById("darkToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
            "tw_darkmode",
            document.body.classList.contains("dark-mode") ? "1" : "0"
        );
    });
}, 50);

/* SECTION TOGGLES (GROUP HEADERS) */
document.querySelectorAll(".category-header").forEach(header => {
    header.addEventListener("click", () => {
        const section = header.closest(".category-section");
        if (!section) return;
        section.classList.toggle("open");
        const icon = header.querySelector(".category-toggle");
        if (icon) icon.textContent = section.classList.contains("open") ? "−" : "+";
    });
});

/* ACTIVE BUTTONS */
const path = window.location.pathname.split("/").pop();
document.querySelectorAll(".brand-btn").forEach(btn => {
    const href = btn.getAttribute("href");
    if (href && href === path) btn.classList.add("active");
});

/* NAV DRAWER + ACCORDIONS */
const hamburger = document.getElementById("navHamburger");
const drawer = document.getElementById("navDrawer");
const overlay = document.getElementById("navOverlay");
const drawerClose = document.getElementById("drawerClose");

function openDrawer() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
}

if (hamburger) hamburger.addEventListener("click", openDrawer);
if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
if (overlay) overlay.addEventListener("click", closeDrawer);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
});

/* MOBILE MENU BEHAVIOUR */
document.querySelectorAll(".nav-toggle").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const isMobile = window.innerWidth <= 900;
        const menu = btn.getAttribute("data-menu");
        if (!isMobile) return;

        e.preventDefault();
        openDrawer();

        const map = {
            aboutMenu: "drawerAbout",
            servicesMenu: "drawerServices",
            insightsMenu: "drawerInsights",
            resourcesMenu: "drawerResources",
            contactMenu: "drawerContact"
        };

        const target = map[menu];
        if (target) {
            document.querySelectorAll(".drawer-panel").forEach(p => p.classList.remove("open"));
            const panel = document.getElementById(target);
            if (panel) panel.classList.add("open");
        }
    });
});

/* DRAWER ACCORDIONS */
document.querySelectorAll(".drawer-accordion").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-acc");
        const panel = document.getElementById(id);
        if (!panel) return;

        const isOpen = panel.classList.contains("open");
        document.querySelectorAll(".drawer-panel").forEach(p => p.classList.remove("open"));
        if (!isOpen) panel.classList.add("open");
    });
});

/* ACTIVE LINK HIGHLIGHTING */
const currentPath = window.location.pathname.split("/").pop() || "index.html";

function markActive(selector) {
    document.querySelectorAll(selector).forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        const hrefFile = href.split("/").pop();
        if (hrefFile === currentPath) link.classList.add("active");
    });
}

markActive(".main-nav a");
markActive(".drawer-link");
markActive(".drawer-sublink");

};

/* MOBILE TOGGLE */
function toggleMenu() {
document.querySelector(".main-nav").classList.toggle("active");
}
