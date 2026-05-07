/* ============================================================
   CERTIFICATIONS — SIMPLE LIVE SEARCH (HIGHLIGHT + SCROLL)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("pageSearchInput");
    const container = document.getElementById("certificationsContainer");
    const noResults = document.getElementById("noResultsMessage");

    if (!input || !container) return;

    function clearHighlights() {
        container.querySelectorAll(".highlight").forEach(el => {
            el.outerHTML = el.innerText;
        });
    }

    function highlightMatches(el, q) {
        const regex = new RegExp(`(${q})`, "gi");
        el.innerHTML = el.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
    }

    function runSearch() {
        const q = input.value.trim().toLowerCase();
        clearHighlights();

        if (q.length === 0) {
            if (noResults) noResults.style.display = "none";
            return;
        }

        // Search all reasonable text elements inside the container
        const candidates = container.querySelectorAll("h2, h3, h4, p, li, span, a, div");
        let firstMatch = null;
        let anyMatch = false;

        candidates.forEach(el => {
            const raw = el.innerText || "";
            const clean = raw
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

            if (!clean) return;

            if (clean.includes(q)) {
                anyMatch = true;
                highlightMatches(el, q);
                if (!firstMatch) firstMatch = el;
            }
        });

        if (!anyMatch) {
            if (noResults) noResults.style.display = "block";
        } else {
            if (noResults) noResults.style.display = "none";
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }

    input.addEventListener("input", runSearch);
});
