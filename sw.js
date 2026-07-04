const CACHE_NAME = 'abu-youssef-v1';
const ASSETS = [
  '/',
  '/index.html',
  './images/logooo.jpg'
];

// السيرفيس وركر ده "بيسجل" الموقع كأنه تطبيق في ذاكرة الموبايل
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ده اللي بيخلي التطبيق يفتح بسرعة كأنه تطبيق فيسبوك
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// ده بيخلي التطبيق "يحدّث" نفسه علطول
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cache) => cache !== CACHE_NAME).map((cache) => caches.delete(cache))
      );
    })
  );
});