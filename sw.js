var cacheName = 'hello-pwa';
var filesToCache = [
    './',
    './images/hello-icon-512.png',
    './index.html',
    './css/style.css',
    './js/main.js'
];

/* starrt the service worker and cache all the app content*/
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});



self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});


self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    if (event.action === 'go') {
        console.log('user clicked GO');
        clients.openWithWindow('www.google.ca');
    } else if (event.action === 'close') {
        console.log('user clicked CLOSE');
    } else {
        console.log('user clicked main body of notificaion');
    }
});