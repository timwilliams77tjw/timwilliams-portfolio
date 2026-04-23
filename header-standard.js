function initHeader() {

  const isMobile = () => window.innerWidth <= 700;
  const body = document.body;

  /* ===========================
     DARK MODE (FIXED TIMING)
  =========================== */
  const storedTheme = localStorage.getItem("tw_dark");
  if (storedTheme === "1") {
    body.classList.add("dark-mode");
  }

  const darkToggle = document.getElementById("darkToggleHeader");

  if (darkToggle) {
    darkToggle.onclick = () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("tw_dark", body.classList.contains("dark-mode") ? "1" : "0");
    };
  }

  /* ===========================
     BACK TO TOP (FIXED)
  =========================== */
  const fab = document.getElementById("fab");

  if (fab) {
    fab.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  /* ===========================
     SEARCH (FIXED RELIABILITY)
  =========================== */
  const icon = document.getElementById("searchIcon");
  const input = document.getElementById("siteSearchInput");
  const resultsBox = document.getElementById("searchResults");

  if (icon && input) {

    input.classList.remove("open");

    icon.onclick = () => {
      input.classList.toggle("open");
      if (input.classList.contains("open")) input.focus();
    };

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrapper")) {
        input.classList.remove("open");
        if (resultsBox) resultsBox.style.display = "none";
      }
    });
  }

  /* ===========================
     MOBILE MENU
  =========================== */
  function closeMenus() {
    document.querySelectorAll(".nav-item.open").forEach(i => i.classList.remove("open"));
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
      closeMenus();
      parent.classList.add("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    if (!e.target.closest(".nav-item")) closeMenus();
  });

  window.addEventListener("scroll", () => {
    if (isMobile()) closeMenus();
  });
}

window.initHeader = initHeader;
