// Withdrawal Transaction Modal Handler

// Store the timer ID
let transactionTimerId = null;

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
    const progressSection = document.getElementById('progressSection');
    const messageSection = document.getElementById('messageSection');
    
    if (progressSection) progressSection.style.display = 'none';
    if (messageSection) messageSection.style.display = 'flex';
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