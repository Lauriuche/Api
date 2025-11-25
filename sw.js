const CACHE_NAME = 'bolao-camino-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './1001855377.png'
];

// Instalação do Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Resposta offline/online
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});


