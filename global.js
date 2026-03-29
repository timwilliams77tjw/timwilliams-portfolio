document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     AUTO-ACTIVE BUTTON DETECTION
  ----------------------------------------- */
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".brand-btn").forEach(btn => {
    const href = btn.getAttribute("href");
    if (href && href === path) {
      btn.classList.add("active");
    }
  });

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
    toggleMenu("cvMenu", event.target);
  };

  window.openPortfolioMenu = function (event) {
    event.stopPropagation();
    toggleMenu("portfolioMenu", event.target);
  };

  function toggleMenu(id, button) {
    const menu = document.getElementById(id);
    const isOpen = menu.style.display === "flex";

    closeAllMenus();

    if (!isOpen) {
      menu.style.display = "flex";
      button.classList.add("open");
    }
  }

  /* -----------------------------------------
     TOOLTIP TAP BEHAVIOUR
  ----------------------------------------- */
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

});
