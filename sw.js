self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

// Logika Pengecekan Waktu Pengingat di Latar Belakang
setInterval(() => {
    const sekarang = new Date();
    // Pemicu tepat pada pukul 19:00 (rentang pemeriksaan dalam 1 menit)
    if (sekarang.getHours() === 19 && sekarang.getMinutes() === 0) {
        tampilkanNotifikasi();
    }
}, 60000); // Eksekusi cek berkala setiap 60 detik

function tampilkanNotifikasi() {
    self.registration.showNotification("🌸 Evaluasi Harian Rematri Sehat", {
        body: "Sudah jam 7 malam nih! Jangan lupa ceklis jurnal sehatmu hari ini ya, pastikan TTD-mu sudah 
diminum!",
        icon: "icon.png",
        vibrate: [200, 100, 200],
        tag: "rematri-reminder"
    });
}

