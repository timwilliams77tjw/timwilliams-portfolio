/* ============================================================
GLOBAL HEADER v4 — FIXED VERSION
============================================================ */

function initHeader() {
    const hamburger = document.getElementById("hsHamburger");
    const overlay = document.getElementById("hsMenuOverlay");
    const panel = document.getElementById("hsMenuPanel");
    const searchBar = document.getElementById("hsSearchBar");
    const searchIcon = document.getElementById("hsSearchIcon");
    const searchInput = document.getElementById("hsSearchInput");
    const darkIcon = document.getElementById("hsDarkIcon");
    const mobileSearchItem = document.getElementById("hsMobileSearchItem");
    const mobileDarkItem = document.getElementById("hsMobileDarkItem");
    const fab = document.getElementById("fab");
    const bookingFab = document.getElementById("bookingFab");

    /* ---------------- BODY SCROLL LOCK ---------------- */

    function lockBody() {
        document.body.style.overflow = "hidden";
    }

    function unlockBody() {
        document.body.style.overflow = "";
    }

    /* ---------------- MENU ---------------- */

    function closeMenu() {
        overlay.classList.remove("open");
        unlockBody();
    }

    function toggleMenu() {
        overlay.classList.toggle("open");
        if (overlay.classList.contains("open")) lockBody();
        else unlockBody();
    }

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeMenu();
    });

    panel.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    /* ---------------- SEARCH ---------------- */

    function toggleSearchBar() {
        searchBar.classList.toggle("open");
        if (searchBar.classList.contains("open")) {
            setTimeout(() => searchInput.focus(), 50);
        }
    }

    searchIcon?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSearchBar();
    });

    mobileSearchItem?.addEventListener("click", () => {
        closeMenu();
        toggleSearchBar();
    });

    /* ---------------- DARK MODE ---------------- */

/* ---------------- DARK MODE ---------------- */

const DARK_MODE_KEY = "tw_dark_mode";

function applyDarkMode() {
    if (localStorage.getItem(DARK_MODE_KEY) === "true") {
        document.body.classList.add("dark");
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark");
        document.body.classList.remove("dark-mode");
    }
}

function toggleDarkMode() {
    const enabled = !document.body.classList.contains("dark");

    document.body.classList.toggle("dark", enabled);
    document.body.classList.toggle("dark-mode", enabled);

    localStorage.setItem(DARK_MODE_KEY, enabled ? "true" : "false");
}

darkIcon?.addEventListener("click", toggleDarkMode);

mobileDarkItem?.addEventListener("click", () => {
    closeMenu();
    toggleDarkMode();
});

applyDarkMode();

    /* ---------------- FAB ---------------- */

    if (fab) {
        window.addEventListener("scroll", () => {
            fab.style.display = window.scrollY > 200 ? "flex" : "none";
        });

        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (bookingFab) {
        bookingFab.style.display = "flex";
    }
}
