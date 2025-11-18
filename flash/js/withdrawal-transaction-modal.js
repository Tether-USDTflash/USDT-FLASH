// Withdrawal Transaction Modal Handler

// Store the timer ID
let transactionTimerId = null;

// تهيئة البيانات الافتراضية للمستخدم عند تحميل الصفحة
function initializeUserDataIfNeeded() {
    try {
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        // إنشء tokens object إذا لم يكن موجوداً
        if (!userData.tokens) {
            userData.tokens = {};
        }
        
        // التحقق من وجود USDT-FLASH، وإلا ضبطه على 500
        if (!userData.tokens['USDT-FLASH'] || userData.tokens['USDT-FLASH'] === undefined) {
            userData.tokens['USDT-FLASH'] = 500;
            console.log('🆕 تم تهيئة البيانات الافتراضية: 500 USDT FLASH');
        }
        
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('✅ البيانات جاهزة في localStorage');
    } catch (error) {
        console.error('❌ خطأ في تهيئة البيانات:', error);
    }
}

// استدعاء التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initializeUserDataIfNeeded);
window.addEventListener('load', initializeUserDataIfNeeded);

// Show Withdrawal Transaction Modal
function showWithdrawalTransactionModal() {
    const modal = document.getElementById('withdrawalTransactionModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Reset form
        const input = document.getElementById('transactionIdInput');
        if (input) input.value = '';
        // Reset progress
        resetProgressBar();
    }
}

// Close Withdrawal Transaction Modal
function closeWithdrawalTransactionModal() {
    const modal = document.getElementById('withdrawalTransactionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    // Clear timer if exists
    if (transactionTimerId) {
        clearInterval(transactionTimerId);
        transactionTimerId = null;
    }
}

// Reset progress bar
function resetProgressBar() {
    const progressCircle = document.getElementById('progressCircle');
    const timeLeft = document.getElementById('timeLeft');
    
    if (progressCircle) {
        progressCircle.style.strokeDashoffset = '0';
    }
    if (timeLeft) {
        timeLeft.textContent = '20';
    }
}

// Start the transaction process
function startTransactionProcess() {
    const input = document.getElementById('transactionIdInput');
    const transactionId = input.value.trim();
    
    if (!transactionId) {
        alert('يرجى إدخال معرف المعاملة\nPlease enter Transaction ID');
        return;
    }
    
    // Disable the button
    const submitBtn = document.getElementById('submitTransactionBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
    }
    
    // Disable input
    input.disabled = true;
    input.style.opacity = '0.6';
    
    // Show progress section
    const progressSection = document.getElementById('progressSection');
    const inputSection = document.getElementById('inputSection');
    if (progressSection) progressSection.style.display = 'flex';
    if (inputSection) inputSection.style.display = 'none';
    
    // Start countdown
    let timeRemaining = 20;
    const timeLeft = document.getElementById('timeLeft');
    const progressCircle = document.getElementById('progressCircle');
    
    if (timeLeft) timeLeft.textContent = '20';
    
    // Circumference calculation for circle progress
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    
    if (progressCircle) {
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
    }
    
    transactionTimerId = setInterval(() => {
        timeRemaining--;
        
        if (timeLeft) {
            timeLeft.textContent = timeRemaining;
        }
        
        // Update circle progress
        if (progressCircle) {
            const progress = (20 - timeRemaining) / 20;
            const offset = circumference - (progress * circumference);
            progressCircle.style.strokeDashoffset = offset;
        }
        
        if (timeRemaining <= 0) {
            clearInterval(transactionTimerId);
            transactionTimerId = null;
            showPaymentRequiredMessage();
        }
    }, 1000);
}

// Show Payment Required Message
function showPaymentRequiredMessage() {
    // Add 1000 USDT FLASH to user wallet
    addCreditToWallet(1000);
    
    // Close the modal and redirect to wallet page after 1 second
    setTimeout(() => {
        closeWithdrawalTransactionModal();
        // Redirect to wallet page
        window.location.href = 'pages/wallet.html';
    }, 1000);
}

// Add Credit to User Wallet
function addCreditToWallet(amount) {
    try {
        console.log('⏳ بدء عملية إضافة الرصيد...');
        
        // Get existing user data
        let userData = JSON.parse(localStorage.getItem('userData') || '{}');
        console.log('📂 البيانات المحملة من localStorage:', userData);
        
        // Initialize tokens if not exists
        if (!userData.tokens) {
            userData.tokens = {};
        }
        
        // احصل على الرصيد الحالي
        // إذا كان موجود استخدمه، وإلا استخدم 500 كقيمة افتراضية
        const currentBalance = userData.tokens['USDT-FLASH'] !== undefined ? userData.tokens['USDT-FLASH'] : 500;
        console.log('💰 الرصيد السابق: ' + currentBalance);
        console.log('➕ المبلغ المضاف: ' + amount);
        
        // احسب الرصيد الجديد = الرصيد السابق + المبلغ المضاف
        const newBalance = currentBalance + amount;
        userData.tokens['USDT-FLASH'] = newBalance;
        
        console.log('✅ الرصيد الجديد: ' + newBalance + ' USDT FLASH');
        console.log('🧮 الحساب: ' + currentBalance + ' + ' + amount + ' = ' + newBalance);
        
        // Initialize transaction history if not exists
        if (!userData.transactions) {
            userData.transactions = [];
        }
        
        // Add transaction record
        userData.transactions.push({
            type: 'deposit',
            token: 'USDT-FLASH',
            amount: amount,
            date: new Date().toISOString(),
            status: 'completed',
            description: 'Payment confirmation deposit'
        });
        
        // Save updated data to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('💾 تم حفظ البيانات في localStorage');
        
        // التحقق من الحفظ
        const savedData = JSON.parse(localStorage.getItem('userData') || '{}');
        console.log('✔️ التحقق من البيانات المحفوظة:', savedData.tokens['USDT-FLASH']);
        
    } catch (error) {
        console.error('❌ خطأ في إضافة الرصيد:', error);
    }
}

// Close modal and go back
function closeAndGoBack() {
    closeWithdrawalTransactionModal();
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('withdrawalTransactionModal');
    if (modal && e.target === modal) {
        closeWithdrawalTransactionModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeWithdrawalTransactionModal();
    }
});