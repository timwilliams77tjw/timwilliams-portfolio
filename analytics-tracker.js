import { db } from "./firebase-init.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

async function logAnalytics(action, value) {
  try {
    await addDoc(collection(db, "events"), {
      action,
      value,
      path: window.location.pathname,
      userAgent: navigator.userAgent,
      ts: serverTimestamp()
    });
  } catch (e) {
    console.error("Analytics error:", e);
  }
}

logAnalytics("page_view", window.location.pathname);

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

document.addEventListener("copy", () => {
  const sel = window.getSelection().toString();
  logAnalytics("copy_event", sel || "Copied content");
});

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

document.addEventListener("input", (e) => {
  if (!e.target.matches("input[type='search'], .search-input")) return;
  const query = e.target.value.trim();
  if (query.length < 2) return;
  logAnalytics("search_query", query);
});

document.addEventListener("click", (e) => {
  const filter = e.target.closest("[data-filter]");
  if (!filter) return;
  logAnalytics("filter_select", filter.dataset.filter);
}, true);
