// Inisialisasi halaman pertama
document.addEventListener('DOMContentLoaded', function() {
    showPage('initialPage');
});

// Fungsi navigasi halaman
function showPage(pageId) {
    // Sembunyikan semua container
    document.querySelectorAll('.container').forEach(container => {
        container.classList.remove('active');
    });
    
    // Tampilkan halaman yang dipilih
    document.getElementById(pageId).classList.add('active');
}

// Show QR Page
function showQR() {
    showPage('qrPage');
    startPaymentCheck();
}

// Show Initial Page
function showInitial() {
    clearInterval(checkInterval);
    showPage('initialPage');
}

// Auto check payment
let checkInterval;
function startPaymentCheck() {
    checkInterval = setTimeout(checkPayment, 10000); // 10 detik auto check
}

// Manual check payment
function manualCheck() {
    clearInterval(checkInterval);
    checkPayment();
}

// Simulasi pengecekan pembayaran
function checkPayment() {
    showPage('loadingPage');
    
    // Simulasi delay (ganti dengan API real)
    setTimeout(() => {
        const isSuccess = Math.random() > 0.3; // 70% sukses untuk demo
        
        if (isSuccess) {
            showPage('successPage');
            // Auto redirect setelah 3 detik
            setTimeout(() => {
                const redirectUrl = document.querySelector('.redirect-btn').href;
                window.open(redirectUrl, '_blank');
            }, 3000);
        } else {
            showPage('failedPage');
        }
    }, 4000);
}

// Fungsi untuk integrasi API real (contoh)
async function checkRealPayment(orderId) {
    try {
        const response = await fetch(`/api/check-payment/${orderId}`);
        const result = await response.json();
        
        if (result.status === 'success') {
            showPage('successPage');
        } else {
            showPage('failedPage');
        }
    } catch (error) {
        console.error('Payment check failed:', error);
        showPage('failedPage');
    }
}

// Generate order ID unik
function generateOrderId() {
    return 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Event listener untuk tombol Enter di QR page
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.getElementById('qrPage').classList.contains('active')) {
        manualCheck();
    }
});
