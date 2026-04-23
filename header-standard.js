function initHeader() {

  const body = document.body;
  const isMobile = () => window.innerWidth <= 1024;

  /* ===========================================================
     DARK MODE (PERSISTENT + CROSS PAGE SAFE)
  =========================================================== */

  const storedTheme = localStorage.getItem("tw_dark");

  if (storedTheme === "1") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }

  const darkToggle = document.getElementById("darkToggleHeader");

  if (darkToggle && !darkToggle.dataset.bound) {
    darkToggle.dataset.bound = "true";

    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      localStorage.setItem(
        "tw_dark",
        body.classList.contains("dark-mode") ? "1" : "0"
      );
    });
  }

  /* ===========================================================
     BACK TO TOP (ROBUST + SINGLE BIND)
  =========================================================== */

  const fab = document.getElementById("fab");

  if (fab && !fab.dataset.bound) {
    fab.dataset.bound = "true";

    fab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===========================================================
     SEARCH (FIXED: ALWAYS HIDDEN ON LOAD)
  =========================================================== */

  const icon = document.getElementById("searchIcon");
  const input = document.getElementById("siteSearchInput");
  const resultsBox = document.getElementById("searchResults");

  if (input) {
    input.classList.remove("open");
    input.style.display = ""; // ensure CSS controls visibility
  }

  if (resultsBox) {
    resultsBox.style.display = "none";
  }

  if (icon && input && !icon.dataset.bound) {
    icon.dataset.bound = "true";

    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      input.classList.toggle("open");

      if (input.classList.contains("open")) {
        input.focus();
      } else {
        if (resultsBox) resultsBox.style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrapper")) {
        input.classList.remove("open");
        if (resultsBox) resultsBox.style.display = "none";
      }
    });
  }

  /* ===========================================================
     MOBILE / TABLET MENU SYSTEM (FIXED iOS/iPad ISSUE)
  =========================================================== */

  function closeMenus() {
    document.querySelectorAll(".nav-item.open")
      .forEach(i => i.classList.remove("open"));
  }

  document.querySelectorAll(".nav-item.mega > a").forEach(link => {

    if (link.dataset.bound) return;
    link.dataset.bound = "true";

    link.addEventListener("click", function (e) {

      const parent = this.parentElement;

      // Only intercept on touch/tablet/mobile
      if (isMobile()) {

        e.preventDefault();
        e.stopPropagation();

        // toggle behaviour (important fix for iPad)
        const isOpen = parent.classList.contains("open");

        closeMenus();

        if (!isOpen) {
          parent.classList.add("open");
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item")) {
      closeMenus();
    }
  });

  window.addEventListener("scroll", () => {
    closeMenus();
  });

  window.addEventListener("resize", () => {
    closeMenus();
  });

}

window.initHeader = initHeader;
