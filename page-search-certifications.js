/* ============================================================
   CERTIFICATIONS — FINAL LIVE SEARCH (MATCHES REAL DOM)
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
        // Reset everything
        categories.forEach(cat => {
            cat.style.display = "block";
            const list = cat.querySelector(".card-list");
            const toggle = cat.querySelector(".category-toggle");
            list.style.display = "none";
            toggle.textContent = "+";

            cat.querySelectorAll(".cert-card").forEach(card => {
                card.style.display = "block";
            });
        });
        noResults.style.display = "none";
        return;
    }

    categories.forEach(cat => {
        const cards = cat.querySelectorAll(".cert-card");
        const list = cat.querySelector(".card-list");
        const toggle = cat.querySelector(".category-toggle");

        let categoryHasMatch = false;

        cards.forEach(card => {
            const title = card.querySelector(".cert-title")?.innerText || "";
            const issuer = card.querySelector(".cert-issuer")?.innerText || "";

            const clean = (title + " " + issuer)
                .replace(/[^\w\s]/g, "")
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

            const match = clean.includes(q);

            if (match) {
                card.style.display = "block";
                categoryHasMatch = true;
                anyMatch = true;

                highlightMatches(card.querySelector(".cert-title"), q);
                highlightMatches(card.querySelector(".cert-issuer"), q);

                if (!firstMatch) firstMatch = card;
            } else {
                card.style.display = "none";
            }
        });

        if (categoryHasMatch) {
            // ⭐ AUTO‑EXPAND MATCHING CATEGORY
            cat.style.display = "block";
            list.style.display = "block";
            toggle.textContent = "−";
        } else {
            // Hide category if no matches
            cat.style.display = "none";
        }
    });

    noResults.style.display = anyMatch ? "none" : "block";

    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
