const CACHE_NAME = 'lunardays-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Install — cache core static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fall back to cache
// This strategy ensures ads and live lunar data always load fresh
// but the app shell works offline if network fails
self.addEventListener('fetch', (event) => {
  // Never cache ad network requests — let them fail silently offline
  const adDomains = [
    'n6wxm.com',
    'nap5k.com',
    'profitablecpmratenetwork.com',
    'monetag.com',
  ];
  const isAdRequest = adDomains.some(domain =>
    event.request.url.includes(domain)
  );
  if (isAdRequest) return;

  // Network first for everything else
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});