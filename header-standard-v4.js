/* ============================================================
GLOBAL HEADER v5 — FIXED FOR DYNAMIC LOADING
============================================================ */

/* ------------------------------------------------------------
MAIN HEADER INITIALISATION
------------------------------------------------------------ */
function initHeader() {

    /* Grab all header elements */
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

    /* ------------------------------------------------------------
    SAFETY CHECK — ENSURE HEADER EXISTS BEFORE ATTACHING LISTENERS
    ------------------------------------------------------------ */
    if (!hamburger || !overlay || !panel) {
        console.warn("Header not ready, retrying…");
        setTimeout(initHeader, 100);
        return;
    }

    /* ------------------------------------------------------------
    BODY SCROLL LOCK
    ------------------------------------------------------------ */
    function lockBody() {
        document.body.style.overflow = "hidden";
    }

    function unlockBody() {
        document.body.style.overflow = "";
    }

    /* ------------------------------------------------------------
    MENU OPEN / CLOSE
    ------------------------------------------------------------ */
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

    /* ------------------------------------------------------------
    SEARCH BAR
    ------------------------------------------------------------ */
    function toggleSearchBar() {
        searchBar.classList.toggle("open");
        if (searchBar.classList.contains("open")) {
            setTimeout(() => searchInput?.focus(), 50);
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

    /* ------------------------------------------------------------
    DARK MODE
    ------------------------------------------------------------ */
    const DARK_MODE_KEY = "tw_dark_mode";

    function applyDarkMode() {
        if (localStorage.getItem(DARK_MODE_KEY) === "true") {
            document.body.classList.add("dark", "dark-mode");
        } else {
            document.body.classList.remove("dark", "dark-mode");
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

    /* Active page highlight */
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".hs-menu-column a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("hs-active-link");
        }
    });

    /* Recently viewed pages */
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

/* ------------------------------------------------------------
MOBILE BAR INITIALISATION
------------------------------------------------------------ */
function initMobileBar() {
    const mobileBar = document.querySelector(".mobile-sticky-bar");
    if (mobileBar) mobileBar.style.display = "flex";
}
/* ============================================================
ADD TO HOME SCREEN (PWA INSTALL)
============================================================ */

let deferredPrompt;

function initA2HS() {
    const installBtn = document.getElementById("hsInstallBtn");
    const iosModal = document.getElementById("iosModal");
    const closeIosModal = document.getElementById("closeIosModal");

    // Detect iOS Safari
    function isIos() {
        return /iphone|ipad|ipod/i.test(navigator.userAgent);
    }

    function isInStandaloneMode() {
        return ('standalone' in window.navigator) && window.navigator.standalone;
    }

    // Show iOS modal
    if (isIos() && !isInStandaloneMode()) {
        installBtn.style.display = "inline-flex";
        installBtn.addEventListener("click", () => {
            iosModal.style.display = "flex";
        });
        closeIosModal.addEventListener("click", () => {
            iosModal.style.display = "none";
        });
        return;
    }

    // Android / Desktop
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = "inline-flex";
    });

    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
    });
}

/* Call inside initHeader() after DOM is ready */
setTimeout(initA2HS, 700);

