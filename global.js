window.initGlobal = function () {

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

/* MOBILE: tapping desktop menu opens drawer + correct accordion */
document.querySelectorAll(".nav-toggle").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const isMobile = window.innerWidth <= 900;
    const menu = btn.getAttribute("data-menu");

    if (isMobile) {
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
    }
  });
});

/* Drawer accordions */
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
// Mobile toggle (optional future-proofing)

function toggleMenu() {
    document.querySelector(".main-nav").classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("a");
  btn.href = "#";
  btn.className = "fab";
  btn.id = "backToTop";
  btn.textContent = "↑";
  document.body.appendChild(btn);

  btn.style.display = "none";

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
