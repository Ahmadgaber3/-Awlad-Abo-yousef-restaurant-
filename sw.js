const CACHE_NAME = 'abu-youssef-v3'; // لما تغير الكود، زود الرقم ده لـ v4 عشان المتصفح يحدث فوراً

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['/', '/index.html']);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // أولاً حاول تجيب من الكاش، لو مش موجود حمل من النت
            return response || fetch(event.request);
        })
    );
});
