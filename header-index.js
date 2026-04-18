/* ============================================================
   HEADER-INDEX.JS
   Executes AFTER header-index.html is injected into the DOM
   ============================================================ */


/* ------------------------------------------------------------
   1. MOBILE MENU LOGIC (tap-to-open)
   ------------------------------------------------------------ */

(function () {

  const isMobile = () => window.innerWidth <= 700;
  let openMenu = null;

  function closeAllMenus() {
    document.querySelectorAll('.nav-item.open').forEach(item => {
      item.classList.remove('open');
    });
    openMenu = null;
  }

  // Top-level menu click handler
  document.querySelectorAll('.nav-item > a').forEach(link => {
    link.addEventListener('click', function (e) {

      // Desktop / wide iPad → hover only
      if (!isMobile()) return;

      const parent = this.parentElement;

      // If already open → allow navigation
      if (parent.classList.contains('open')) return;

      // First tap → open menu
      e.preventDefault();
      e.stopPropagation();
      closeAllMenus();
      parent.classList.add('open');
      openMenu = parent;
    });
  });

  // Tap outside closes menu
  document.addEventListener('click', function (e) {
    if (!isMobile()) return;
    if (!e.target.closest('.nav-item')) {
      closeAllMenus();
    }
  });

  // Close on scroll (mobile only)
  window.addEventListener('scroll', function () {
    if (isMobile()) closeAllMenus();
  });

})();
  


/* ------------------------------------------------------------
   2. SEARCH TOGGLE
   ------------------------------------------------------------ */

(function () {

  const icon = document.getElementById("searchIcon");
  const input = document.getElementById("siteSearchInput");
  const resultsBox = document.getElementById("searchResults");

  if (!icon || !input) return;

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

})();

/* ------------------------------------------------------------
   3. DARK MODE (Unified system, works after injection)
   ------------------------------------------------------------ */

/* Apply saved mode BEFORE render */
(function () {
  const saved = localStorage.getItem("tw_dark");
  if (saved === "1") {
    document.body.classList.add("dark-mode");
  }
})();

/* Attach toggle AFTER header is injected */
(function () {
  const observer = new MutationObserver(() => {
    const btn = document.getElementById("darkToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
          "tw_dark",
          document.body.classList.contains("dark-mode") ? "1" : "0"
        );
      });
      observer.disconnect(); // stop watching once attached
    }
  });

  // Watch for header injection
  observer.observe(document.body, { childList: true, subtree: true });
})();
