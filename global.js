/* ============================================================
GLOBAL.JS — Unified Dark Mode + FAB + Shared Behaviour
============================================================ */

window.initGlobal = function () {

/* ------------------------------------------------------------
1. APPLY SAVED DARK MODE (unified)
------------------------------------------------------------ */

const savedDark = localStorage.getItem("darkMode") === "true";
if (savedDark) document.body.classList.add("dark");

/* ------------------------------------------------------------
2. ATTACH DARK MODE TOGGLE (supports both header systems)
------------------------------------------------------------ */

setTimeout(() => {
    const toggles = [
        document.getElementById("darkToggle"),     // old header
        document.getElementById("hsDarkIcon"),     // new header
        document.getElementById("hsMobileDarkItem") // mobile menu
    ];

    toggles.forEach(btn => {
        if (!btn) return;
        btn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem("darkMode",
                document.body.classList.contains("dark")
            );
        });
    });
}, 100);

/* ------------------------------------------------------------
3. CATEGORY HEADERS (unchanged)
------------------------------------------------------------ */
document.querySelectorAll(".category-header").forEach(header => {
    header.addEventListener("click", () => {
        const section = header.closest(".category-section");
        if (!section) return;
        section.classList.toggle("open");

        const icon = header.querySelector(".category-toggle");
        if (icon) icon.textContent = section.classList.contains("open") ? "−" : "+";
    });
});

/* ------------------------------------------------------------
4. ACTIVE BUTTON HIGHLIGHTING (unchanged)
------------------------------------------------------------ */
const path = window.location.pathname.split("/").pop();
document.querySelectorAll(".brand-btn").forEach(btn => {
    const href = btn.getAttribute("href");
    if (href && href === path) btn.classList.add("active");
});

/* ------------------------------------------------------------
5. FAB BUTTON (unified + guaranteed to work)
------------------------------------------------------------ */

setTimeout(() => {
    const fab = document.getElementById("fab");
    if (!fab) return;

    window.addEventListener("scroll", () => {
        fab.style.display = window.scrollY > 200 ? "flex" : "none";
    });

    fab.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}, 200);

/* ------------------------------------------------------------
6. BOOKING FAB (always visible)
------------------------------------------------------------ */
setTimeout(() => {
    const bookingFab = document.getElementById("bookingFab");
    if (bookingFab) bookingFab.style.display = "flex";
}, 200);

};
