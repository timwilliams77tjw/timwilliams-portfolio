/* ============================================
   CLIENT-SIDE SEARCH ENGINE (Option A)
   ============================================ */

const pagesToSearch = [
    { title: "Home", url: "index.html" },
    { title: "About TWC Ltd", url: "twc-ltd.html" },
    { title: "Recommendations", url: "recommendations.html" },
    { title: "LinkedIn", url: "linkedin.html" },
    { title: "CV", url: "cv.html" },
    { title: "Interactive CV", url: "interactive-cv.html" },
    { title: "Digital Presence", url: "sites.html" },
    { title: "Services", url: "new.html" },
    { title: "Engagement Models", url: "engagement.html" },
    { title: "Portfolio", url: "portfolio.html" },
    { title: "Insights", url: "insights.html" },
    { title: "Playbooks", url: "playbooks.html" },
    { title: "FAQ", url: "faq.html" },
    { title: "Certifications", url: "certifications.html" },
    { title: "Downloads", url: "downloads.html" },
    { title: "Contact", url: "contact.html" },
    { title: "Calendar", url: "calendar.html" }
];

const input = document.getElementById("siteSearchInput");
const resultsBox = document.getElementById("searchResults");

if (input) {
    input.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        resultsBox.innerHTML = "";

        if (!query) {
            resultsBox.style.display = "none";
            return;
        }

        const matches = pagesToSearch.filter(page =>
            page.title.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            resultsBox.innerHTML = `<div class="no-results">No results found</div>`;
        } else {
            matches.forEach(page => {
                const link = document.createElement("a");
                link.href = page.url;
                link.textContent = page.title;
                resultsBox.appendChild(link);
            });
        }

        resultsBox.style.display = "flex";
    });

    // Hide results when clicking outside
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".search-wrapper")) {
            resultsBox.style.display = "none";
        }
    });
}
