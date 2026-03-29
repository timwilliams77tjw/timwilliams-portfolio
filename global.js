/* -----------------------------------------
   DROPDOWN MENUS
----------------------------------------- */
function closeAllMenus() {
  document.querySelectorAll(".popup-menu").forEach(m => m.style.display = "none");
  document.querySelectorAll(".brand-btn.open").forEach(b => b.classList.remove("open"));
}

document.addEventListener("click", () => closeAllMenus());

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

/* -----------------------------------------
   INIT AFTER HEADER IS LOADED
----------------------------------------- */
window.initGlobal = function () {
  const path = window.location.pathname.split("/").pop();

  // Active button
  document.querySelectorAll(".brand-btn").forEach(btn => {
    const href = btn.getAttribute("href");
    if (href && href === path) {
      btn.classList.add("active");
    }
  });

  // Tooltips
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

  // Back to top
  const fab = document.getElementById("fab");
  if (fab) {
    fab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};
