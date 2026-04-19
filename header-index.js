/* ============================================================
HEADER-INDEX.JS — Cleaned + Stable
============================================================ */

setTimeout(() => {

  const isMobile = () => window.innerWidth <= 700;
  let openMenu = null;

  function closeAllMenus() {
    document.querySelectorAll('.nav-item.open').forEach(item => {
      item.classList.remove('open');
    });
    openMenu = null;
  }

  /* TAP-TO-OPEN MEGA MENUS ON MOBILE */
  document.querySelectorAll('.nav-item > a').forEach(link => {
    link.addEventListener('click', function (e) {

      if (!isMobile()) return;

      const parent = this.parentElement;

      if (parent.classList.contains('open')) return;

      e.preventDefault();
      e.stopPropagation();

      closeAllMenus();
      parent.classList.add('open');
      openMenu = parent;
    });
  });

  document.addEventListener('click', function (e) {
    if (!isMobile()) return;
    if (!e.target.closest('.nav-item')) closeAllMenus();
  });

  window.addEventListener('scroll', function () {
    if (isMobile()) closeAllMenus();
  });

  /* SEARCH TOGGLE */
  const icon = document.getElementById("searchIcon");
  const input = document.getElementById("siteSearchInput");
  const resultsBox = document.getElementById("searchResults");

  if (icon && input) {
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

}, 0);
