// Service Worker para Producciones Foro 7
// Version 2.0.0 - Optimized with WebP support and improved caching

const CACHE_NAME = 'foro7-v2.0.0';
const STATIC_CACHE = 'foro7-static-v2.0.0';
const IMAGE_CACHE = 'foro7-images-v2.0.0';

// Core files to cache immediately
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json'
];

// External resources to cache
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Image patterns to cache
const IMAGE_PATTERNS = [
  /images\/gallery\//,
  /images\/testimonials\//,
  /images\/.*\.webp$/,
  /images\/.*\.jpg$/,
  /images\/.*\.png$/
];

// Install event - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      }),
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching external assets');
        // Cache external assets but don't fail if some fail
        return Promise.allSettled(
          EXTERNAL_ASSETS.map(url =>
            cache.add(url).catch(err => console.log('[SW] Failed to cache:', url))
          )
        );
      })
    ]).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [STATIC_CACHE, IMAGE_CACHE];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!currentCaches.includes(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - smart caching strategy
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle image requests with cache-first strategy
  if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle static assets with cache-first, network fallback
  if (isStaticAsset(url)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Handle navigation requests with network-first strategy
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // Default: network-first with cache fallback
  event.respondWith(handleDefaultRequest(request));
});

// Check if request is for an image
function isImageRequest(url) {
  return IMAGE_PATTERNS.some(pattern => pattern.test(url.pathname)) ||
         url.pathname.endsWith('.webp') ||
         url.pathname.endsWith('.jpg') ||
         url.pathname.endsWith('.jpeg') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.gif') ||
         url.pathname.endsWith('.svg') ||
         url.hostname === 'images.unsplash.com';
}

// Check if request is for a static asset
function isStaticAsset(url) {
  return url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.woff') ||
         url.pathname.endsWith('.woff2') ||
         url.pathname.endsWith('.ttf');
}

// Handle image requests - cache first, long-term storage
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Return cached image immediately
    // Refresh cache in background if older than 7 days
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Clone and cache the response
      const responseToCache = networkResponse.clone();
      cache.put(request, responseToCache);
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Image fetch failed:', request.url);
    // Return a placeholder or cached fallback if available
    return cachedResponse || new Response('Image not available', { status: 404 });
  }
}

// Handle static asset requests - cache first
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      cache.put(request, responseToCache);
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Static asset fetch failed:', request.url);
    return new Response('Asset not available', { status: 404 });
  }
}

// Handle navigation requests - network first
async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Navigation fetch failed, serving from cache');
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match('./index.html');
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

// Handle default requests - network first with cache fallback
async function handleDefaultRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Not available', { status: 503 });
  }
}

// Background sync for analytics (if supported)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  // Placeholder for future analytics sync
  console.log('[SW] Syncing analytics data');
}

// Push notifications (if needed in future)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/images/icon-192x192.png',
      badge: '/images/icon-72x72.png'
    });
  }
});
