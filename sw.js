const CACHE_NAME = 'abu-youssef-v1';
const ASSETS = [
  '/',
  '/index.html',
  './images/logooo.jpg'
];

// تثبيت التطبيق في الذاكرة
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تشغيل التطبيق كأنه أبلكيشن
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
