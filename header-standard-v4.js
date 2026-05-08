/* ============================================================
GLOBAL HEADER v6 — MATCHED TO FLOATING PILL + VIDEO HERO
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initHeaderEnhancements();
});

/* ------------------------------------------------------------
MAIN HEADER INITIALISATION
------------------------------------------------------------ */
function initHeader() {

    const hamburger = document.getElementById("hsHamburger");
    const overlay = document.getElementById("hsMenuOverlay");
    const panel = document.getElementById("hsMenuPanel");
    const searchBar = document.getElementById("hsSearchBar");
    const searchIcon = document.getElementById("hsSearchIcon");
    const searchInput = document.getElementById("hsSearchInput");
    const darkIcon = document.getElementById("hsDarkIcon");
    const fab = document.getElementById("fab");
    const bookingFab = document.getElementById("bookingFab");

    /* ------------------------------------------------------------
    SAFETY CHECK — WAIT UNTIL HEADER EXISTS
    ------------------------------------------------------------ */
    if (!hamburger || !overlay || !panel) {
        console.warn("Header not ready, retrying…");
        setTimeout(initHeader, 100);
        return;
    }

    /* ------------------------------------------------------------
    BODY SCROLL LOCK (iPhone-safe)
    ------------------------------------------------------------ */
    function lockBody() {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
    }

    function unlockBody() {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
    }

    /* ------------------------------------------------------------
    MENU OPEN / CLOSE
    ------------------------------------------------------------ */
    function closeMenu() {
        overlay.classList.remove("open");
        panel.classList.remove("open");
        unlockBody();
    }

    function openMenu() {
        overlay.classList.add("open");
        panel.classList.add("open");
        lockBody();
    }

    function toggleMenu() {
        if (overlay.classList.contains("open")) closeMenu();
        else openMenu();
    }

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeMenu();
    });

    panel.addEventListener("click", (e) => e.stopPropagation());

    /* ------------------------------------------------------------
    SEARCH BAR
    ------------------------------------------------------------ */
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

    /* ------------------------------------------------------------
    DARK MODE
    ------------------------------------------------------------ */
    const DARK_MODE_KEY = "tw_dark_mode";

    function applyDarkMode() {
        const enabled = localStorage.getItem(DARK_MODE_KEY) === "true";
        document.body.classList.toggle("dark", enabled);
        document.body.classList.toggle("dark-mode", enabled);
    }

    function toggleDarkMode() {
        const enabled = !document.body.classList.contains("dark");
        document.body.classList.toggle("dark", enabled);
        document.body.classList.toggle("dark-mode", enabled);
        localStorage.setItem(DARK_MODE_KEY, enabled ? "true" : "false");
    }

    darkIcon?.addEventListener("click", toggleDarkMode);
    applyDarkMode();

    /* ------------------------------------------------------------
    FAB BUTTONS
    ------------------------------------------------------------ */
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

/* ------------------------------------------------------------
ACTIVE PAGE HIGHLIGHT + RECENTLY VIEWED
------------------------------------------------------------ */
function initHeaderEnhancements() {

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".hs-menu-column a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("hs-active-link");
        }
    });

    const pageTitle = document.title;
    const pageURL = window.location.pathname;

    let viewed = JSON.parse(localStorage.getItem("hsRecentlyViewed") || "[]");

    viewed = viewed.filter(v => v.url !== pageURL);
    viewed.unshift({ title: pageTitle, url: pageURL });
    viewed = viewed.slice(0, 5);

    localStorage.setItem("hsRecentlyViewed", JSON.stringify(viewed));

    const rvContainer = document.getElementById("hsRecentlyViewed");
    if (rvContainer) {
        rvContainer.innerHTML = viewed
            .map(v => `<a href="${v.url}">${v.title}</a>`)
            .join("");
    }
}
