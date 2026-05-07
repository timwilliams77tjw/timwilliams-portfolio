/* ============================================================
   CERTIFICATIONS — LIVE SEARCH (FINAL VERSION)
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

        const categories = container.querySelectorAll(".cert-category");
        let firstMatch = null;
        let anyMatch = false;

        if (q.length === 0) {
            // Reset to full view
            categories.forEach(cat => {
                cat.style.display = "block";
                cat.querySelectorAll(".cert-card").forEach(card => {
                    card.style.display = "block";
                });
            });
            if (noResults) noResults.style.display = "none";
            return;
        }

        categories.forEach(cat => {
            const cards = cat.querySelectorAll(".cert-card");
            let categoryHasMatch = false;

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                const match = text.includes(q);

                if (match) {
                    card.style.display = "block";
                    anyMatch = true;
                    categoryHasMatch = true;

                    // Highlight only text elements
                    card.querySelectorAll("p, h3, li, span").forEach(el => {
                        highlightMatches(el, q);
                    });

                    if (!firstMatch) firstMatch = card;
                } else {
                    card.style.display = "none";
                }
            });

            // Hide category if no cards match
            cat.style.display = categoryHasMatch ? "block" : "none";
        });

        if (!anyMatch) {
            if (noResults) noResults.style.display = "block";
        } else {
            if (noResults) noResults.style.display = "none";
        }

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    input.addEventListener("input", runSearch);
});
