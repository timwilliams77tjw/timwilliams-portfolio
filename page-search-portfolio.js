/* ============================================================
   PORTFOLIO — LIVE SEARCH (FINAL VERSION)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("pageSearchInput");
    const sections = document.querySelectorAll(".portfolio-section");

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
            return;
        }

        // ⭐ IMPORTANT: Open all sections so cards are searchable
        sections.forEach(sec => {
            sec.querySelector(".card-list").style.display = "block";
            sec.querySelector(".category-toggle").textContent = "–";
        });

        let firstMatch = null;

        sections.forEach(section => {
            const cards = section.querySelectorAll(".card");
            let sectionHasMatch = false;

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                const match = text.includes(q);

                if (match) {
                    highlightMatches(card, q);
                    sectionHasMatch = true;
                    if (!firstMatch) firstMatch = section;
                }
            });

            // Hide entire section if no match
            section.style.display = sectionHasMatch ? "block" : "none";
        });

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    input.addEventListener("input", runSearch);
});
