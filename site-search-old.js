/* ============================
   GLOBAL SITE SEARCH ENGINE
   ============================ */

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("hsSearchInput");
    const button = document.querySelector("#hsSearchBar button");

    if (!input || !button) return;

    function runGlobalSearch() {
        const q = input.value.trim();
        if (q.length === 0) return;

        window.location.href = `search-results.html?q=${encodeURIComponent(q)}`;
    }

    button.addEventListener("click", runGlobalSearch);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") runGlobalSearch();
    });
});
