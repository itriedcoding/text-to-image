const CACHE_NAME = 'gemini-image-crafter-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx', // Assuming build system handles this to JS
  '/manifest.json',
  // Add other critical static assets here
  // Note: In a real build, these would be the compiled JS/CSS files
  // For this example, we'll cache the source TSX and HTML.
  // Ideally, you'd precache `index.js`, `main.css` etc.
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react-router-dom@^7.9.4',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0',
  'https://aistudiocdn.com/uuid@^13.0.0',
  'https://aistudiocdn.com/@google/genai@^1.27.0'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // For API calls or dynamic content, we might go network-first or not cache.
  // For now, let's keep it simple and try to serve from cache for all requests,
  // falling back to network.
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request).catch(() => {
          // Fallback for offline if no cache available and network fails
          // Could return an offline page here if one existed.
          console.warn('Network request failed and no cache match for:', event.request.url);
          // For now, simply reject the fetch.
          throw new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});