/* ============================================================
GLOBAL HEADER v4 — ONE SYSTEM, ALL PAGES
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

    /* ---------------- HAMBURGER + MENU ---------------- */

    function closeMenu() {
        overlay?.classList.remove("open");
    }

    function toggleMenu() {
        overlay?.classList.toggle("open");
    }

    hamburger?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    overlay?.addEventListener("click", (e) => {
        if (e.target === overlay) {
            closeMenu();
        }
    });

    panel?.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        closeMenu();
    });

    /* ---------------- SEARCH BAR ---------------- */

    function toggleSearchBar() {
        if (!searchBar) return;
        const open = searchBar.classList.toggle("open");
        if (open && searchInput) {
            setTimeout(() => searchInput.focus(), 50);
        }
    }

    searchIcon?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSearchBar();
    });

    mobileSearchItem?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMenu();
        toggleSearchBar();
    });

    /* ---------------- DARK MODE ---------------- */

    function applyDarkModeFromStorage() {
        const stored = localStorage.getItem("darkMode");
        if (stored === "true") {
            document.body.classList.add("dark");
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark")
        );
    }

    darkIcon?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDarkMode();
    });

    mobileDarkItem?.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMenu();
        toggleDarkMode();
    });

    applyDarkModeFromStorage();

    /* ---------------- FAB BUTTONS ---------------- */

    if (fab) {
        window.addEventListener("scroll", () => {
            fab.style.display = window.scrollY > 200 ? "flex" : "none";
        });

        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if (bookingFab) {
        // Just ensure it's visible; behaviour is via href
        bookingFab.style.display = "flex";
    }
}
