// تحديث أسعار العملات كل 5 ثواني
const CRYPTO_IDS = {
    'USDT': 'tether',
    'PEPE': 'pepe',
    'DOGE': 'dogecoin',
    'SHIB': 'shiba-inu'
};

async function updatePrices() {
    try {
        const ids = Object.values(CRYPTO_IDS).join(',');
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        const data = await response.json();
        
        // تحديث USDT
        if (data.tether) {
            document.getElementById('usdt-price').textContent = `$${data.tether.usd.toFixed(4)}`;
        }
        
        // تحديث PEPE
        if (data.pepe) {
            document.getElementById('pepe-price').textContent = `$${data.pepe.usd.toFixed(8)}`;
        }
        
        // تحديث DOGE
        if (data.dogecoin) {
            document.getElementById('doge-price').textContent = `$${data.dogecoin.usd.toFixed(4)}`;
        }
        
        // تحديث SHIB
        if (data['shiba-inu']) {
            document.getElementById('shib-price').textContent = `$${data['shiba-inu'].usd.toFixed(8)}`;
        }
    } catch (error) {
        console.error('خطأ في تحديث الأسعار:', error);
    }
}

// تحديث فوري عند التحميل
updatePrices();

// تحديث كل 5 ثواني
setInterval(updatePrices, 5000);
