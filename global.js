// ------------------------------
// Dynamic Page Search with Auto-Expand
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pageSearchInput");
    if (!input) return;

    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        filterPageContent(query);
    });
});

function filterPageContent(query) {
    const items = document.querySelectorAll(".searchable-item");
    const sections = document.querySelectorAll(".cv-section");
    const noResults = document.getElementById("noResultsMessage");

    let visibleCount = 0;

    // 1. Hide all items first
    items.forEach(item => {
        item.style.display = "none";
    });

    // 2. Collapse all categories
    sections.forEach(section => {
        const list = section.querySelector(".card-list");
        const toggle = section.querySelector(".category-toggle");
        if (list) list.style.display = "none";
        if (toggle) toggle.textContent = "+";
    });

    // 3. If search is empty → restore default behaviour
    if (query === "") {
        sections.forEach(section => {
            section.style.display = "block";
        });
        if (noResults) noResults.style.display = "none";
        return;
    }

    // 4. Show only matching items and auto-expand their categories
    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        const match = text.includes(query);

        if (match) {
            item.style.display = "block";
            visibleCount++;

            // Auto-expand the parent category
            const section = item.closest(".cv-section");
            const list = section.querySelector(".card-list");
            const toggle = section.querySelector(".category-toggle");

            section.style.display = "block";
            if (list) list.style.display = "block";
            if (toggle) toggle.textContent = "−";
        }
    });

    // 5. Show/hide "No results"
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
}
