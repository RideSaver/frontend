import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST || []);
const { assets } = global.serviceWorkerOption;

let assetsToCache = [...assets, './'];

assetsToCache = assetsToCache.map((path) => {
  return new URL(path, global.location).toString();
});

// When the service worker is first added to a computer.
self.addEventListener('install', (event) => {
  // Perform install steps.
  if (DEBUG) {
    console.log('[SW] Install event');
  }

  // Add core website files to cache during serviceworker installation.
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(assetsToCache);
      })
      .then(() => {
        if (DEBUG) {
          console.log('Cached assets: main', assetsToCache);
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      })
  );
});
