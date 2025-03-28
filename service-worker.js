// service-worker.js

const CACHE_NAME = "watchTracker-cache-v1";
const urlsToCache = [
    "/watch-tracker/",
    "/watch-tracker/index.html",
    "/watch-tracker/style.css",
    "/watch-tracker/script.js",
    "/watch-tracker/manifest.json",
    "/watch-tracker/icons/icon-192x192.png",
    "/watch-tracker/icons/icon-512x512.png"
];

// Install Event: Caches app shell
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Event: Serves requests from cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate Event: Clears old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});