/* ============================
   GLOBAL SEARCH RESULTS ENGINE
   ============================ */

async function loadIndex() {
    const res = await fetch("search-index.json");
    return await res.json();
}

function highlight(text, query) {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

async function runSearch() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    const resultsContainer = document.getElementById("results");
    if (!q) {
        resultsContainer.innerHTML = "<p>No search query provided.</p>";
        return;
    }

    const index = await loadIndex();
    const results = [];

    index.forEach(page => {
        if (page.content.toLowerCase().includes(q.toLowerCase())) {
            results.push({
                title: page.title,
                url: page.url,
                snippet: highlight(page.content.substring(0, 200), q)
            });
        }
    });

    if (results.length === 0) {
        resultsContainer.innerHTML = `<p>No results found for <strong>${q}</strong>.</p>`;
        return;
    }

    resultsContainer.innerHTML = results.map(r => `
        <div class="search-result">
            <h3><a href="${r.url}">${r.title}</a></h3>
            <p>${r.snippet}...</p>
        </div>
    `).join("");
}

runSearch();
