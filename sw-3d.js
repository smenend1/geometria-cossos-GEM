const CACHE_NAME = 'geovolum-3d-v1';
const ASSETS = ['./', './index.html', './styles.css', './app-3d.js', './manifest-3d.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});