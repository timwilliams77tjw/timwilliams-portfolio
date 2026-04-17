window.initGlobal = function () {

    /* -----------------------------------------------------------
       DARK MODE
    ----------------------------------------------------------- */
    const body = document.body;
    const storedMode = localStorage.getItem("tw_dark");

    if (storedMode === "1") {
        body.classList.add("dark-mode");
    }

    const darkToggle = document.getElementById("darkToggle");
    if (darkToggle) {
        darkToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            localStorage.setItem(
                "tw_dark",
                body.classList.contains("dark-mode") ? "1" : "0"
            );
        });
    }

    /* -----------------------------------------------------------
       BACK TO TOP FAB
    ----------------------------------------------------------- */
    const fab = document.getElementById("fab");
    if (fab) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                fab.classList.add("show");
            } else {
                fab.classList.remove("show");
            }
        });

        fab.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* -----------------------------------------------------------
       CALENDAR FAB — ALWAYS VISIBLE
    ----------------------------------------------------------- */
    const bookingFab = document.getElementById("bookingFab");
    if (bookingFab) {
        bookingFab.classList.add("show");
    }

    /* -----------------------------------------------------------
       ACTIVE LINK HIGHLIGHTING
    ----------------------------------------------------------- */
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-btn, .brand-btn").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const file = href.split("/").pop();
        if (file === currentPath) {
            link.classList.add("active");
        }
    });
};
