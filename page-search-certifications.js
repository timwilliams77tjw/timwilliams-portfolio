/* ============================================================
   CERTIFICATIONS — LIVE SEARCH (MATCHES REAL HTML STRUCTURE)
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

        const categories = container.querySelectorAll(".category-section");
        let firstMatch = null;
        let anyMatch = false;

        if (q.length === 0) {
            categories.forEach(cat => {
                cat.style.display = "block";
                cat.querySelectorAll(".card").forEach(card => {
                    card.style.display = "block";
                });
            });
            noResults.style.display = "none";
            return;
        }

        categories.forEach(cat => {
            const cards = cat.querySelectorAll(".card");
            let categoryHasMatch = false;

            cards.forEach(card => {
                const raw = card.innerText;

                // Normalise text
                const clean = raw
                    .replace(/[^\w\s]/g, "")   // remove emoji + symbols
                    .replace(/\s+/g, " ")      // normalise whitespace
                    .trim()
                    .toLowerCase();

                const match = clean.includes(q);

                if (match) {
                    card.style.display = "block";
                    categoryHasMatch = true;
                    anyMatch = true;

                    card.querySelectorAll("p, h3, li, span").forEach(el => {
                        highlightMatches(el, q);
                    });

                    if (!firstMatch) firstMatch = card;
                } else {
                    card.style.display = "none";
                }
            });

            cat.style.display = categoryHasMatch ? "block" : "none";
        });

        noResults.style.display = anyMatch ? "none" : "block";

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    input.addEventListener("input", runSearch);
});
