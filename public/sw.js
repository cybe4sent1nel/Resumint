const CACHE_NAME = 'resume-builder-v1';
const OFFLINE_PAGE = '/offline.html';
const ASSETS_TO_CACHE = [
    OFFLINE_PAGE,
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Caching offline assets');
            // Cache offline page
            return cache.add(OFFLINE_PAGE).then(() => {
                console.log('[ServiceWorker] Offline page cached successfully');
            }).catch(err => {
                console.error('[ServiceWorker] Error caching offline page:', err);
            });
        })
    );
    // Force activation immediately
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[ServiceWorker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve offline page when offline
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip non-http(s) requests
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // For navigation requests (page loads)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // If successful, cache it
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache).catch(err => {
                                console.log('[SW] Cache put error:', err);
                            });
                        });
                    }
                    return response;
                })
                .catch((error) => {
                    console.log('[SW] Fetch failed for navigation, serving offline page:', error);
                    // Network failed, serve offline page
                    return caches.match(OFFLINE_PAGE).then((response) => {
                        if (response) {
                            console.log('[SW] Serving cached offline page');
                            return response;
                        }
                        // Fallback if offline page not cached
                        console.log('[SW] Offline page not in cache, returning error response');
                        return new Response('You are offline', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/html'
                            })
                        });
                    });
                })
        );
        return;
    }

    // For non-navigation requests
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Cache successful responses
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache).catch(err => {
                            console.log('[SW] Cache put error:', err);
                        });
                    });
                }
                return response;
            })
            .catch(() => {
                console.log('[SW] Fetch failed for resource:', event.request.url);
                // Try to serve from cache
                return caches.match(event.request).catch(() => {
                    return new Response('Resource unavailable offline', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                });
            })
    );
});

// Listen for messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('[ServiceWorker] Skipping waiting and taking control');
        self.skipWaiting();
    }
});
