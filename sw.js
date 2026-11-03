const CACHE_NAME = 'rematri-sehat-v1';

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

setInterval(() => {
    const sekarang = new Date();
    if (sekarang.getHours() === 19 && sekarang.getMinutes() === 0) {
        tampilkanNotifikasi();
    }
}, 60000); 

function tampilkanNotifikasi() {
    self.registration.showNotification("🌸 Evaluasi Harian Rematri Sehat", {
        body: "Sudah jam 7 malam nih! Jangan lupa ceklis jurnal sehatmu hari ini ya, pastikan TTD-mu sudah diminum!",
        icon: "favicon.ico",
        vibrate: [200, 100, 200],
        tag: "rematri-reminder"
    });
}
