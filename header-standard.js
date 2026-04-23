function initHeader() {

  const isMobile = () => window.innerWidth <= 700;

  /* BACK TO TOP (SAFE BIND) */
  const fab = document.getElementById("fab");

  if (fab && !fab.dataset.bound) {
    fab.dataset.bound = "true";

    fab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* CLOSE ALL MENUS */
  function closeAllMenus() {
    document.querySelectorAll(".nav-item.open").forEach(item => {
      item.classList.remove("open");
    });
  }

  /* MOBILE MENU */
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
    const stored = localStorage.getItem("tw_dark");
    if (stored === "1") body.classList.add("dark-mode");

    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("tw_dark", body.classList.contains("dark-mode") ? "1" : "0");
    });
  }
}

window.initHeader = initHeader;
