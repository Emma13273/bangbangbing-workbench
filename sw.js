// 棒棒冰工作台 - Service Worker
const CACHE_NAME = 'bangbangbing-v7';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS).catch(() => {});
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// 网络优先：在线时始终拉取最新文件，确保更新立即生效；离线时回退缓存
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request)
            .then(response => {
                const cloned = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
                return response;
            })
            .catch(() => {
                return caches.match(event.request).then(r => r || caches.match('./index.html'));
            })
    );
});
