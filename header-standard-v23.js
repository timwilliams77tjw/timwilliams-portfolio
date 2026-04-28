/* ==================================================
header-standard.js
FINAL — Minimal Diff, iPad Fix Only
================================================== */

function initHeader() {

/* ===========================
DEVICE DETECTION
=========================== */
const isTouchDevice = () =>
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0;

const isMobile = () =>
    window.innerWidth <= 900;

/* NEW — iPad detection */
const isIpad = () =>
    navigator.userAgent.includes("iPad") ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const body = document.body;

/* ===========================
CLOSE ALL MENUS
=========================== */
function closeAllMenus() {
    document.querySelectorAll(".nav-item.open")
        .forEach(item => item.classList.remove("open"));
}

/* ===========================
MEGA MENU HANDLING
=========================== */
const triggers = document.querySelectorAll(".mega-trigger");

triggers.forEach(btn => {

    let startX = 0;
    let startY = 0;
    let moved = false;

    btn.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        moved = false;
    }, { passive:true });

    btn.addEventListener("touchmove", e => {
        const dx = Math.abs(e.touches[0].clientX - startX);
        const dy = Math.abs(e.touches[0].clientY - startY);
        if (dx > 10 || dy > 10) moved = true;
    }, { passive:true });

    btn.addEventListener("click", function(e){

        if (moved) return;

        const parent = this.closest(".nav-item");
        if (!parent) return;

        /* Desktop hover mode */
        if (!isTouchDevice() && !isMobile() && !isIpad()) return;

        /* Toggle */
        if (parent.classList.contains("open")){
            parent.classList.remove("open");
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        closeAllMenus();
        parent.classList.add("open");
    });
});
// Force Safari to recalc layout before positioning submenu
requestAnimationFrame(() => {
    const menu = parent.querySelector(".mega-menu");
    if (menu) {
        menu.style.transform = "translateY(0)"; // triggers layout
        menu.offsetHeight; // forces reflow
        menu.style.transform = ""; // clean up
    }
});

/* ===========================
CLOSE ON OUTSIDE TAP
=========================== */
document.addEventListener("click", e => {
    if (!e.target.closest(".nav-item")){
        closeAllMenus();
    }
});

/* ===========================
CLOSE ON RESIZE
=========================== */
window.addEventListener("resize", closeAllMenus);

/* ===========================
CLOSE ON SCROLL
=========================== */
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (Math.abs(current - lastScroll) > 20){
        closeAllMenus();
    }
    lastScroll = current;
});

/* ===========================
SEARCH
=========================== */
const icon = document.getElementById("searchIcon");
const input = document.getElementById("siteSearchInput");
const results = document.getElementById("searchResults");

if (icon && input){

    icon.addEventListener("click", e => {
        e.stopPropagation();
        input.classList.toggle("open");

        if (input.classList.contains("open")){
            input.focus();
        } else {
            if (results) results.style.display = "none";
        }
    });

    document.addEventListener("click", e => {
        if (!e.target.closest(".search-wrapper")){
            input.classList.remove("open");
            if (results) results.style.display = "none";
        }
    });
}

/* ===========================
DARK MODE
=========================== */
const darkBtn = document.getElementById("darkToggleHeader");

if (darkBtn){

    const stored = localStorage.getItem("tw_dark");
    if (stored === "1"){
        body.classList.add("dark-mode");
    }

    darkBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem(
            "tw_dark",
            body.classList.contains("dark-mode") ? "1" : "0"
        );
    });
}

}

/* Make initHeader globally available */
window.initHeader = initHeader;

/* ===========================
BACK TO TOP
=========================== */
document.addEventListener("DOMContentLoaded", () => {
    const fab = document.getElementById("fab");
    if (fab){
        fab.addEventListener("click", () => {
            window.scrollTo({ top:0, behavior:"smooth" });
        });
    }
});
