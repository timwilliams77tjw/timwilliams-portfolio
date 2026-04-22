/* ============================================================
   HEADER-STANDARD.JS — Unified behaviour (non-index pages)
   ============================================================ */

setTimeout(() => {
  /* MOBILE CHECK */
  const isMobile = () => window.innerWidth <= 700;
  let openMenu = null;

  /* CLOSE ALL MENUS */
  function closeAllMenus() {
    document.querySelectorAll(".nav-item.open").forEach((item) => {
      item.classList.remove("open");
    });
    openMenu = null;
  }

  /* TAP-TO-OPEN MEGA MENUS ON MOBILE */
  document.querySelectorAll(".nav-item > a").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (!isMobile()) return;

      const parent = this.parentElement;
      if (parent.classList.contains("open")) {
        // second tap follows link
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      closeAllMenus();
      parent.classList.add("open");
      openMenu = parent;
    });
  });

  document.addEventListener("click", function (e) {
    if (!isMobile()) return;
    if (!e.target.closest(".nav-item")) closeAllMenus();
  });

  window.addEventListener("scroll", function () {
    if (isMobile()) closeAllMenus();
  });

  /* SEARCH TOGGLE */
  const icon = document.getElementById("searchIcon");
  const input = document.getElementById("siteSearchInput");
  const resultsBox = document.getElementById("searchResults");

  if (icon && input) {
    // ensure initial state is closed
    input.classList.remove("open");
    if (resultsBox) resultsBox.style.display = "none";

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

  /* GLOBAL DARK MODE (light by default, persisted via localStorage) */
  const darkToggle = document.getElementById("darkToggleHeader");
  const body = document.body;

  if (darkToggle) {
    const storedMode = localStorage.getItem("tw_dark");
    if (storedMode === "1") {
      body.classList.add("dark-mode");
    }

    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem(
        "tw_dark",
        body.classList.contains("dark-mode") ? "1" : "0"
      );
    });
  }

  /* BACK TO TOP (FAB) */
  const fab = document.getElementById("fab");
  if (fab) {
    fab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}, 0);
