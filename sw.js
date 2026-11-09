const CACHE_NAME = 'rematri-sehat-v2'; // Cache dinaikkan versinya

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

// Mengecek waktu secara reguler (Selama SW dalam status Awake)
setInterval(() => {
    const sekarang = new Date();
    
    // getDay(): 0=Minggu, 1=Senin, 2=Selasa, 3=Rabu, 4=Kamis, 5=Jumat, 6=Sabtu
    // Logika di bawah akan mengingatkan pengguna HANYA di hari JUMAT jam 19.00
    if (sekarang.getDay() === 1 && sekarang.getHours() === 19 && sekarang.getMinutes() === 0) {
        tampilkanNotifikasi();
    }
}, 60000); 

function tampilkanNotifikasi() {
    self.registration.showNotification("🌸 Evaluasi Mingguan Rematri Sehat", {
        body: "Waktunya isi jurnal mingguanmu! Pastikan Strike apimu terus menyala ya 🔥",
        icon: "favicon.ico",
        vibrate: [200, 100, 200],
        tag: "rematri-reminder-weekly"
    });
}
