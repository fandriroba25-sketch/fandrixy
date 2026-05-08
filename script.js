// =================================================================
// TRACKHP - JAVASCRIPT UTAMA
// =================================================================

// DOM Elements
const elements = {
    phoneInput: document.getElementById('phoneNumber'),
    trackBtn: document.querySelector('.track-btn'),
    btnText: document.getElementById('btnText'),
    loadingText: document.getElementById('loadingText'),
    result: document.getElementById('result')
};

// Inisialisasi saat DOM loaded
document.addEventListener('DOMContentLoaded', initApp);

// Fungsi inisialisasi aplikasi
function initApp() {
    setupEventListeners();
    console.log('TrackHP App initialized ✅');
}

// Setup semua event listeners
function setupEventListeners() {
    // Auto-format nomor HP
    elements.phoneInput.addEventListener('input', formatPhoneNumber);
    
    // Track button click
    elements.trackBtn.addEventListener('click', trackPhone);
    
    // Enter key support
    elements.phoneInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') trackPhone();
    });
}

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

// Format nomor HP otomatis (+62)
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Tambah prefix +62 jika dimulai dengan 0
    if (value.startsWith('0') && value.length > 1) {
        value = '+62' + value.substring(1);
    } else if (!value.startsWith('+62') && value.length > 2) {
        value = '+62' + value;
    }
    
    e.target.value = value;
}

// =================================================================
// CORE TRACKING FUNCTION
// =================================================================

async function trackPhone() {
    const phoneNumber = elements.phoneInput.value.trim();
    
    // Validasi nomor
    if (!isValidPhone(phoneNumber)) {
        showResult('error', '❌ Nomor HP tidak valid!<br>Masukkan format: +62xxxxxxxxxx');
        return;
    }

    // Show loading state
    setLoadingState(true);
    elements.result.style.display = 'none';

    try {
        // Simulasi delay API (3-5 detik)
        await simulateTrackingDelay();
        
        // Generate hasil pelacakan
        const trackingData = generateTrackingResult(phoneNumber);
        showResult('success', trackingData);
        
    } catch (error) {
        showResult('error', '❌ Gagal melacak! Coba lagi dalam beberapa saat.');
        console.error('Tracking error:', error);
    } finally {
        setLoadingState(false);
    }
}

// Validasi nomor HP
function isValidPhone(phone) {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    return phoneRegex.test(phone.replace(/\+/g, ''));
}

// Set loading state
function setLoadingState(isLoading) {
    elements.btnText.style.display = isLoading ? 'none' : 'inline';
    elements.loadingText.style.display = isLoading ? 'inline' : 'none';
    elements.trackBtn.disabled = isLoading;
}

// Simulasi delay pelacakan
function simulateTrackingDelay() {
    return new Promise((resolve) => {
        const delay = Math.random() * 2000 + 3000; // 3-5 detik
        setTimeout(resolve, delay);
    });
}

// =================================================================
// RESULT GENERATOR
// =================================================================

function generateTrackingResult(phoneNumber) {
    const locations = [
        {
            city: 'Jakarta Pusat, DKI Jakarta',
            coords: { lat: -6.2088, lng: 106.8456 },
            accuracy: '12m',
            operator: 'Telkomsel',
            signal: '4G',
            battery: '87%'
        },
        {
            city: 'Bandung, Jawa Barat',
            coords: { lat: -6.9175, lng: 107.6191 },
            accuracy: '25m',
            operator: 'Indosat',
            signal: '5G',
            battery: '65%'
        },
        {
            city: 'Surabaya, Jawa Timur',
            coords: { lat: -7.2575, lng: 112.7521 },
            accuracy: '8m',
            operator: 'XL Axiata',
            signal: '4G',
            battery: '92%'
        },
        {
            city: 'Yogyakarta, DI Yogyakarta',
            coords: { lat: -7.7956, lng: 110.3695 },
            accuracy: '15m',
            operator: 'Tri',
            signal: '3G',
            battery: '43%'
        },
        {
            city: 'Medan, Sumatera Utara',
            coords: { lat: 3.5952, lng: 98.6728 },
            accuracy: '35m',
            operator: 'Smartfren',
            signal: '4G',
            battery: '76%'
        }
    ];

    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    const now = new Date();
    
    return `
        <div style="font-size: 1.2rem; font-weight: 600; margin-bottom: 15px; color: #155724;">
            ✅ HP ditemukan aktif!
        </div>
        
        <div class="location-info">
            <div class="info-item">
                <i class="fas fa-map-marker-alt" style="color: #28a745; font-size: 1.1rem;"></i>
                <span>${randomLoc.city}</span>
            </div>
            <div class="info-item">
                <i class="fas fa-ruler" style="color: #28a745;"></i>
                <span>⌀ ${randomLoc.accuracy}</span>
            </div>
        </div>
        
        <div class="location-info">
            <div class="info-item">
                <i class="fas fa-network-wired" style="color: #28a745;"></i>
                <span>${randomLoc.operator} ${randomLoc.signal}</span>
            </div>
            <div class="info-item">
                <i class="fas fa-battery-full" style="color: #28a745;"></i>
                <span>${randomLoc.battery}</span>
            </div>
        </div>
        
        <div class="map-placeholder" onclick="openGoogleMaps('${randomLoc.coords.lat}', '${randomLoc.coords.lng}')">
            <i class="fas fa-map-marked-alt" style="font-size: 2rem; margin-right: 10px; color: #667eea;"></i>
            Klik untuk buka Google Maps
        </div>
        
        <div style="font-size: 0.85rem; margin-top: 12px; opacity: 0.9; text-align: right;">
            📱 ${phoneNumber}<br>
            🕒 Terakhir update: ${now.toLocaleString('id-ID')}
        </div>
    `;
}

// =================================================================
// RESULT HANDLER
// =================================================================

function showResult(type, message) {
    elements.result.className = `result ${type}`;
    elements.result.innerHTML = message;
    elements.result.style.display = 'block';
    
    // Auto-scroll ke result
    elements.result.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Buka Google Maps
function openGoogleMaps(lat, lng) {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
}

// =================================================================
// ADVANCED FEATURES (Optional)
// =================================================================

// Copy nomor HP ke clipboard
function copyPhoneNumber() {
    navigator.clipboard.writeText(elements.phoneInput.value);
    showToast('Nomor HP disalin!');
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #28a745; 
        color: white; padding: 12px 20px; border-radius: 8px; 
        z-index: 10000; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Export tracking history (simulasi)
function exportHistory() {
    const history = [
        { phone: '+6281234567890', location: 'Jakarta', time: new Date().toISOString() }
    ];
    
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'tracking_history.json';
    link.click();
}

// =================================================================
// API INTEGRATION READY (Untuk developer)
// =================================================================

/*
async function trackPhoneReal(phoneNumber) {
    try {
        const response = await fetch('https://api.tracking-service.com/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                phone: phoneNumber,
                device_id: 'web_client_001'
            })
        });
        
        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        throw new Error('Tracking service unavailable');
    }
}
*/

console.log('TrackHP JavaScript loaded successfully! 🚀');
