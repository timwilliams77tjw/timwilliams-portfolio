function initHeader() {

  const isMobile = () => window.innerWidth <= 700;

  /* ===========================
     DARK MODE (MUST RUN FIRST)
  =========================== */
  const body = document.body;
  const storedTheme = localStorage.getItem("tw_dark");

  if (storedTheme === "1") {
    body.classList.add("dark-mode");
  }

  /* ===========================
     BACK TO TOP (SAFE)
  =========================== */
  const fab = document.getElementById("fab");

  if (fab && !fab.dataset.bound) {
    fab.dataset.bound = "true";

    fab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===========================
     MOBILE MENU
  =========================== */
  function closeAllMenus() {
    document.querySelectorAll(".nav-item.open").forEach(item => {
      item.classList.remove("open");
    });
  }

  document.querySelectorAll(".nav-item.mega > a").forEach(link => {
    link.addEventListener("click", function (e) {

      if (!isMobile()) return;

      const parent = this.parentElement;

      if (parent.classList.contains("open")) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      closeAllMenus();
      parent.classList.add("open");
    });
  });

  document.addEventListener("click", function (e) {
    if (!isMobile()) return;
    if (!e.target.closest(".nav-item")) closeAllMenus();
  });

  window.addEventListener("scroll", function () {
    if (isMobile()) closeAllMenus();
  });

  /* ===========================
     SEARCH (FIXED)
  =========================== */
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

  /* ===========================
     DARK MODE TOGGLE
  =========================== */
  const darkToggle = document.getElementById("darkToggleHeader");

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem(
        "tw_dark",
        body.classList.contains("dark-mode") ? "1" : "0"
      );
    });
  }

  /* ===========================
     ENSURE BODY READY STATE
  =========================== */
  document.body.classList.add("header-ready");
}

window.initHeader = initHeader;
