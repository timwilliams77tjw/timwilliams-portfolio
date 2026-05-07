/* ============================================================
   PORTFOLIO — LIVE SEARCH (NO HTML CORRUPTION + NO RESULTS MSG)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("pageSearchInput");
    const sections = document.querySelectorAll(".portfolio-section");
    const noResults = document.getElementById("noResultsMessage");

    if (!input) return;

    function clearHighlights() {
        document.querySelectorAll(".highlight").forEach(el => {
            el.outerHTML = el.innerText;
        });
    }

    function highlightMatches(el, q) {
        const regex = new RegExp(`(${q})`, "gi");
        el.innerHTML = el.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
    }

    function closeAll() {
        sections.forEach(sec => {
            sec.style.display = "block";
            sec.querySelector(".card-list").style.display = "none";
            sec.querySelector(".category-toggle").textContent = "+";
        });
    }

    function openSection(section) {
        const list = section.querySelector(".card-list");
        const toggle = section.querySelector(".category-toggle");
        list.style.display = "block";
        toggle.textContent = "–";
    }

    function runSearch() {
        const q = input.value.trim().toLowerCase();
        clearHighlights();

        if (q.length === 0) {
            closeAll();
            if (noResults) noResults.style.display = "none";
            return;
        }

        // Open all sections so content is searchable
        sections.forEach(sec => {
            sec.style.display = "block";
            sec.querySelector(".card-list").style.display = "block";
            sec.querySelector(".category-toggle").textContent = "–";
        });

        let firstMatch = null;
        let anyMatch = false;

        sections.forEach(section => {
            const cards = section.querySelectorAll(".card");
            let sectionHasMatch = false;

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                const match = text.includes(q);

                if (match) {
                    sectionHasMatch = true;
                    anyMatch = true;

                    // Only highlight inside text elements, not whole card
                    card.querySelectorAll("p, h3, li").forEach(el => {
                        highlightMatches(el, q);
                    });

                    if (!firstMatch) firstMatch = section;
                }
            });

            // Hide entire section if no match
            section.style.display = sectionHasMatch ? "block" : "none";
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
