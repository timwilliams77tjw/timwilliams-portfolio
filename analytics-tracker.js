// analytics-tracker.js — Plausible version

function track(event, props = {}) {
  if (window.plausible) {
    window.plausible(event, { props });
  }
}

// Page view (Plausible does this automatically, but we add metadata)
track("page_view", { path: window.location.pathname });

// Outbound link clicks
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const isExternal =
    link.href &&
    !link.href.includes(window.location.hostname) &&
    !link.href.startsWith("javascript:");

  if (isExternal) {
    track("outbound_click", { url: link.href });
  }
}, true);

// Button clicks
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const label =
    btn.dataset.label ||
    btn.innerText.trim() ||
    btn.id ||
    "Unnamed Button";

  track("button_click", { label });
}, true);

// Copy events
document.addEventListener("copy", () => {
  const sel = window.getSelection().toString();
  track("copy_event", { text: sel || "Copied content" });
});

// Accordion opens/closes
document.addEventListener("click", (e) => {
  const acc = e.target.closest(".accordion, .faq-item, details");
  if (!acc) return;

  const label =
    acc.dataset.label ||
    acc.querySelector("summary")?.innerText?.trim() ||
    acc.innerText.slice(0, 40);

  const state = acc.open ? "accordion_close" : "accordion_open";
  track(state, { label });
}, true);

// Search queries
document.addEventListener("input", (e) => {
  if (!e.target.matches("input[type='search'], .search-input")) return;
  const query = e.target.value.trim();
  if (query.length < 2) return;
  track("search_query", { query });
});

// Filter selections
document.addEventListener("click", (e) => {
  const filter = e.target.closest("[data-filter]");
  if (!filter) return;
  track("filter_select", { filter: filter.dataset.filter });
}, true);
