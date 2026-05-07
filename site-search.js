// site-search.js

function initSiteSearch() {
    const input = document.getElementById("hsSearchInput");
    const button = document.querySelector("#hsSearchBar button");

    if (!input || !button) return;

    function runGlobalSearch() {
        const q = input.value.trim();
        if (q.length === 0) return;
        window.location.href = `search-results.html?q=${encodeURIComponent(q)}`;
    }

    // Remove any existing listeners to avoid double-binding
    button.onclick = null;
    input.onkeydown = null;

    button.addEventListener("click", runGlobalSearch);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") runGlobalSearch();
    });
}
