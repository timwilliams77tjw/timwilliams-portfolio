/* ---------------------------------------------------------
   GLOBAL ANALYTICS ENGINE – Runs on ALL pages
--------------------------------------------------------- */

function logAnalytics(action, value) {
  const events = JSON.parse(localStorage.getItem("analytics") || "[]");

  events.push({
    timestamp: Date.now(),
    action,
    value
  });

  localStorage.setItem("analytics", JSON.stringify(events));
}

/* ---------------------------------------------------------
   1. PAGE VIEWS
--------------------------------------------------------- */
logAnalytics("page_view", window.location.pathname);


/* ---------------------------------------------------------
   2. OUTBOUND LINK CLICKS (capture mode)
--------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const isExternal =
    link.href &&
    !link.href.includes(window.location.hostname) &&
    !link.href.startsWith("javascript:");

  if (isExternal) {
    logAnalytics("outbound_click", link.href);
  }
}, true);


/* ---------------------------------------------------------
   3. BUTTON CLICKS (capture mode)
--------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const label =
    btn.dataset.label ||
    btn.innerText.trim() ||
    btn.id ||
    "Unnamed Button";

  logAnalytics("button_click", label);
}, true);


/* ---------------------------------------------------------
   4. COPY EVENTS
--------------------------------------------------------- */
document.addEventListener("copy", () => {
  const active = document.activeElement;

  let value = "Copied content";

  if (active && active.value) value = active.value;
  if (window.getSelection().toString()) value = window.getSelection().toString();

  logAnalytics("copy_event", value);
});


/* ---------------------------------------------------------
   5. ACCORDION EVENTS
--------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const acc = e.target.closest(".accordion, .faq-item, details");
  if (!acc) return;

  const label =
    acc.dataset.label ||
    acc.querySelector("summary")?.innerText?.trim() ||
    acc.innerText.slice(0, 40);

  const state = acc.open ? "accordion_close" : "accordion_open";

  logAnalytics(state, label);
}, true);


/* ---------------------------------------------------------
   6. SEARCH QUERIES
--------------------------------------------------------- */
document.addEventListener("input", (e) => {
  if (!e.target.matches("input[type='search'], .search-input")) return;

  const query = e.target.value.trim();
  if (query.length < 2) return;

  logAnalytics("search_query", query);
});


/* ---------------------------------------------------------
   7. FILTER SELECTIONS
--------------------------------------------------------- */
document.addEventListener("click", (e) => {
  const filter = e.target.closest("[data-filter]");
  if (!filter) return;

  logAnalytics("filter_select", filter.dataset.filter);
}, true);
