/* ============================================================
   GLOBAL.JS — Unified Dark Mode + Shared Behaviour
   Applies to ALL pages (index + standard pages)
============================================================ */

window.initGlobal = function () {

  /* ------------------------------------------------------------
     1. APPLY SAVED DARK MODE BEFORE ANYTHING ELSE
  ------------------------------------------------------------ */
  if (localStorage.getItem("tw_dark") === "1") {
    document.body.classList.add("dark-mode");
  }

  /* ------------------------------------------------------------
     2. ATTACH DARK MODE TOGGLE (after header loads)
  ------------------------------------------------------------ */
  setTimeout(() => {
    const btn = document.getElementById("darkToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "tw_dark",
        document.body.classList.contains("dark-mode") ? "1" : "0"
      );
    });
  }, 50);

  /* ------------------------------------------------------------
     3. CATEGORY HEADERS (CV, Portfolio, etc.)
  ------------------------------------------------------------ */
  document.querySelectorAll(".category-header").forEach(header => {
    header.addEventListener("click", () => {
      const section = header.closest(".category-section");
      if (!section) return;

      section.classList.toggle("open");
      const icon = header.querySelector(".category-toggle");
      if (icon) icon.textContent = section.classList.contains("open") ? "−" : "+";
    });
  });

  /* ------------------------------------------------------------
     4. ACTIVE BUTTON HIGHLIGHTING (brand-btn)
  ------------------------------------------------------------ */
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".brand-btn").forEach(btn => {
    const href = btn.getAttribute("href");
    if (href && href === path) btn.classList.add("active");
  });

  /* ------------------------------------------------------------
     5. DRAWER NAVIGATION (if present)
  ------------------------------------------------------------ */
  const hamburger = document.getElementById("navHamburger");
  const drawer = document.getElementById("navDrawer");
  const overlay = document.getElementById("navOverlay");
  const drawerClose = document.getElementById("drawerClose");

  function openDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.add("open");
    overlay.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    if (!drawer || !overlay) return;
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

  /* ------------------------------------------------------------
     6. MOBILE MENU BEHAVIOUR (drawer-based, if present)
  ------------------------------------------------------------ */
  document.querySelectorAll(".nav-toggle").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const isMobile = window.innerWidth <= 900;
      const menu = btn.getAttribute("data-menu");
      if (!isMobile || !menu) return;

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

  /* ------------------------------------------------------------
     7. DRAWER ACCORDIONS (if present)
  ------------------------------------------------------------ */
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

  /* ------------------------------------------------------------
     8. ACTIVE LINK HIGHLIGHTING (main nav + drawer)
  ------------------------------------------------------------ */
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

/* ------------------------------------------------------------
   9. SIMPLE MOBILE TOGGLE (if used)
------------------------------------------------------------ */
function toggleMenu() {
  const nav = document.querySelector(".main-nav");
  if (nav) nav.classList.toggle("active");
}
