/* ============================================================
   HEADER-STANDARD.JS — CLEAN + iOS SAFE
   ============================================================ */

setTimeout(() => {

  const isMobile = () => window.innerWidth <= 700;
  let openMenu = null;

  /* CLOSE ALL MENUS */
  function closeAllMenus() {
    document.querySelectorAll(".nav-item.open").forEach(item => {
      item.classList.remove("open");
    });
    openMenu = null;
  }
function initHeader() {
  // all event listeners, search, dropdowns, etc
}

window.initHeader = initHeader;
   
  /* MOBILE TAP MENU */
  document.querySelectorAll(".nav-item > a").forEach(link => {
    link.addEventListener("click", function (e) {

      if (!isMobile()) return;

      const parent = this.parentElement;

      if (parent.classList.contains("open")) {
        return; // second tap follows link
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

  /* 🔥 CRITICAL iOS FIX: allow horizontal scroll */
  const navMenu = document.querySelector(".nav-menu");
  if (navMenu) {
    navMenu.addEventListener(
      "touchstart",
      function (e) {
        e.stopPropagation();
      },
      { passive: true }
    );
  }

  /* SEARCH */
  const icon = document.getElementById("searchIcon");
  const input = document.getElementById("siteSearchInput");
  const resultsBox = document.getElementById("searchResults");

  if (icon && input) {
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

  /* DARK MODE */
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

  /* BACK TO TOP */
  const fab = document.getElementById("fab");

  if (fab) {
    fab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

}, 0);
