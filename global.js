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
  /* NAV DRAWER + ACCORDIONS */
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

  if (hamburger) {
    hamburger.addEventListener("click", openDrawer);
  }
  if (drawerClose) {
    drawerClose.addEventListener("click", closeDrawer);
  }
  if (overlay) {
    overlay.addEventListener("click", closeDrawer);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
    }
  });

  // Drawer accordions
  document.querySelectorAll(".drawer-accordion").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-acc");
      const panel = id ? document.getElementById(id) : null;
      if (!panel) return;

      const isOpen = panel.classList.contains("open");
      document.querySelectorAll(".drawer-panel").forEach(p => p.classList.remove("open"));
      if (!isOpen) {
        panel.classList.add("open");
      }
    });
  });

  // Active link highlighting (desktop + drawer)
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  function markActive(selector) {
    document.querySelectorAll(selector).forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;
      const hrefFile = href.split("/").pop();
      if (hrefFile === currentPath) {
        link.classList.add("active");
      }
    });
  }

  markActive(".main-nav a");
  markActive(".drawer-link");
  markActive(".drawer-sublink");
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
    if (
        e.target.closest(".cv-btn") ||
        e.target.closest(".portfolio-btn") ||
        e.target.closest(".services-btn")
    ) return;

    // Click anywhere else → close menus
    closeAllMenus();
});
};


/* -----------------------------------------
DROPDOWN MENUS
----------------------------------------- */
window.openServicesMenu = function (event) {
    event.stopPropagation();
    toggleMenu("servicesMenu", event.currentTarget);
};
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
menu.style.display = "flex";
        button.classList.add("open");
    }
}
