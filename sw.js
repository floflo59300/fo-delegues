const CACHE_NAME = 'fo-delegues-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data.json',
  'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700;900&family=Libre+Baskerville:wght@700&display=swap'
];

// Installation - mise en cache des ressources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation - nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - stratégie Network First pour data.json, Cache First pour le reste
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Pour data.json : Network First (toujours chercher la dernière version)
  if (url.pathname.endsWith('data.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Mettre en cache la nouvelle version
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Si hors-ligne, utiliser le cache
          return caches.match(event.request);
        })
    );
  } else {
    // Pour les autres ressources : Cache First
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((response) => {
            // Ne pas mettre en cache les requêtes non-GET
            if (!event.request.url.startsWith('http') || event.request.method !== 'GET') {
              return response;
            }
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          });
        })
    );
  }
});

// Message pour forcer la mise à jour
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
