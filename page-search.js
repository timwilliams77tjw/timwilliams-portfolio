if (document.body.classList.contains("page-site-search")) return;

/* ============================
   PAGE SEARCH ENGINE
   ============================ */

document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#pageSearchBar input");
    const button = document.querySelector("#pageSearchBar button");

    if (!input || !button) return;

    function clearHighlights() {
        document.querySelectorAll(".highlight").forEach(el => {
            el.outerHTML = el.innerText;
        });
    }

    function highlightMatches(element, query) {
        const regex = new RegExp(`(${query})`, "gi");
        element.innerHTML = element.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
    }

    function runPageSearch() {
        const q = input.value.trim();
        if (q.length === 0) return;

        clearHighlights();

        const cards = document.querySelectorAll(".card, .category-section, .card-list");

        let firstMatch = null;

        cards.forEach(card => {
            if (card.innerText.toLowerCase().includes(q.toLowerCase())) {
                card.style.display = "block";

                highlightMatches(card, q);

                if (!firstMatch) firstMatch = card;
            } else {
                card.style.display = "none";
            }
        });

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    button.addEventListener("click", runPageSearch);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") runPageSearch();
    });
});
