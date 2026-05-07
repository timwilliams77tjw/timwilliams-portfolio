/* ============================================================
   PORTFOLIO — LIVE SEARCH (NO GO BUTTON)
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

        closeAll();

        let firstMatch = null;

        sections.forEach(section => {
            const text = section.innerText.toLowerCase();
            const match = text.includes(q);

            if (match) {
                openSection(section);

                section.querySelectorAll(".card").forEach(card => {
                    highlightMatches(card, q);
                });

                if (!firstMatch) firstMatch = section;
            }
        });

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    input.addEventListener("input", runSearch);
});
