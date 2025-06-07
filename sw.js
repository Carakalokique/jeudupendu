// Service Worker pour le jeu du pendu
const CACHE_NAME = 'jeu-pendu-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/YourGameScript.js',
  '/voice-commands.js',
  '/words.json',
  '/favicon.png',
  '/performance-monitor.js',
  'https://fonts.googleapis.com/css?family=Open+Sans',
  'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap',
  'https://fonts.googleapis.com/css?family=Luckiest+Guy&display=swap'
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie de cache: Network First avec fallback sur cache
self.addEventListener('fetch', event => {
  // Pour les ressources critiques (HTML), toujours essayer le réseau d'abord
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Mettre en cache la nouvelle version
          return caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, response.clone());
              return response;
            });
        })
        .catch(() => {
          // Si offline, utiliser le cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Pour les autres ressources, Cache First
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner la réponse du cache si trouvée
        if (response) {
          // Mettre à jour le cache en arrière-plan
          fetch(event.request)
            .then(fetchResponse => {
              return caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, fetchResponse.clone());
                });
            })
            .catch(() => {
              // Ignorer les erreurs de mise à jour
            });
          
          return response;
        }
        
        // Sinon, récupérer depuis le réseau
        return fetch(event.request)
          .then(response => {
            // Ne pas mettre en cache les réponses non valides
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cloner la réponse car elle ne peut être utilisée qu'une fois
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
}); 