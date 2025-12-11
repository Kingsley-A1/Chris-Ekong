// Service Worker for Barr. Chris Ekong Portfolio PWA
const CACHE_NAME = 'barr-chris-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './about.html',
  './contact.html',
  './testimonials.html',
  './thanks.html',
  './404.html',
  './style.css',
  './site.webmanifest',
  './assets/js/main.js',
  './assets/js/testimonials.js',
  './assets/firm-logo.png',
  './assets/chris-ekong.png',
  './assets/chris-ekong-2.png',
  './assets/lawyers-meeting.png',
  './assets/lawyers-meeting-2.png',
  './assets/office-room.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and external resources
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // Fallback for navigation requests
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
