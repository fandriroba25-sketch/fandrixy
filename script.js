// Pages
const pages = {
    home: 'home', qr: 'qr', loading: 'loading', 
    success: 'success', failed: 'failed'
};

// Show page
function showPage(page) {
    Object.values(pages).forEach(p => {
        document.getElementById(p).classList.remove('active');
    });
    document.getElementById(page).classList.add('active');
}

// Navigation
function showQR() { showPage('qr'); }
function showHome() { showPage('home'); }

// Share QR
function shareQR() {
    const qrUrl = 'img/qr-universal.png';
    const text = 'TopUp ML 728 Diamond Rp150rb';
    
    if (navigator.share) {
        navigator.share({ title: 'TopUp ML', text, url: qrUrl });
    } else {
        // Copy to clipboard
        navigator.clipboard.writeText(`${text}\n${window.location.origin}/${qrUrl}`);
        alert('✅ QR Link copied! Kirim ke WA');
    }
}

// Check Payment (SIMULASI - ganti dengan API real)
async function checkPayment() {
    showPage('loading');
    
    // Simulasi delay + random result
    setTimeout(() => {
        const success = Math.random() > 0.4; // 60% success
        
        if (success) {
            showPage('success');
            // Auto redirect 4 detik
            setTimeout(() => {
                window.open('https://game.mediafire.com', '_blank');
            }, 4000);
        } else {
            showPage('failed');
        }
    }, 3500);
}

// Auto check setelah 12 detik di QR page
setTimeout(() => {
    if (document.getElementById('qr').classList.contains('active')) {
        checkPayment();
    }
}, 12000);
