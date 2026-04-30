/* ============================
   HEADER NAV JS (A2 CLEAN)
   ============================ */

setTimeout(() => {

    const isMobile = () => window.innerWidth <= 700;
    let openMenu = null;

    function closeAllMenus() {
        document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
        openMenu = null;
    }

    // Mobile tap-to-open
    document.querySelectorAll('.nav-item > a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (!isMobile()) return;

            const parent = this.parentElement;

            if (parent.classList.contains('open')) return;

            e.preventDefault();
            e.stopPropagation();

            closeAllMenus();
            parent.classList.add('open');
            openMenu = parent;
        });
    });

    document.addEventListener('click', e => {
        if (!isMobile()) return;
        if (!e.target.closest('.nav-item')) closeAllMenus();
    });

    window.addEventListener('scroll', () => {
        if (isMobile()) closeAllMenus();
    });

    // Search toggle
    const icon = document.getElementById("searchIcon");
    const input = document.getElementById("siteSearchInput");
    const results = document.getElementById("searchResults");

    if (icon && input) {
        icon.addEventListener("click", () => {
            input.classList.toggle("open");
            if (input.classList.contains("open")) input.focus();
        });

        document.addEventListener("click", e => {
            if (!e.target.closest(".search-wrapper")) {
                input.classList.remove("open");
                if (results) results.style.display = "none";
            }
        });
    }

    // Dark mode
    const darkBtn = document.getElementById("darkToggleHeader");
    if (darkBtn) {
        darkBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("tw_dark",
                document.body.classList.contains("dark-mode") ? "1" : "0"
            );
        });
    }

}, 0);
