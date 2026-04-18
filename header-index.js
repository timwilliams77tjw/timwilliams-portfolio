/* ============================================================
   HEADER-INDEX.JS — FINAL VERSION
   Ensures header logic runs AFTER injection (Safari-safe)
   ============================================================ */

setTimeout(() => {

  /* ------------------------------------------------------------
     1. MOBILE MENU LOGIC (tap-to-open)
     ------------------------------------------------------------ */

  const isMobile = () => window.innerWidth <= 700;
  let openMenu = null;

  function closeAllMenus() {
    document.querySelectorAll('.nav-item.open').forEach(item => {
      item.classList.remove('open');
    });
    openMenu = null;
  }

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



  /* ------------------------------------------------------------
     2. SEARCH TOGGLE
     ------------------------------------------------------------ */

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

/* ------------------------------------------------------------
   3. DARK MODE (iPad-safe)
   ------------------------------------------------------------ */

// Apply saved mode immediately
if (localStorage.getItem("tw_dark") === "1") {
  document.body.classList.add("dark-mode");
}

// Attach toggle once the button exists
(function waitForDarkButton() {
  const btn = document.getElementById("darkToggle");

  if (!btn) {
    requestAnimationFrame(waitForDarkButton);
    return;
  }

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "tw_dark",
      document.body.classList.contains("dark-mode") ? "1" : "0"
    );
  });
})();

