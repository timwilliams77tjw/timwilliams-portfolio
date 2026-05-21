// ------------------------------------------------------------
// Minimal Service Worker for PWA Installability
// ------------------------------------------------------------

// Activate immediately after installation
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Take control of all pages immediately
self.addEventListener("activate", (event) => {
  clients.claim();
});

// No caching — always fetch from network
self.addEventListener("fetch", (event) => {
  // Intentionally empty to avoid caching issues
});
