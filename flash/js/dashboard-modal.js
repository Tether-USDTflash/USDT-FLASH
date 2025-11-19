// Dashboard Modal Handler
function showDashboardModal() {
    const modal = document.getElementById('dashboardModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDashboardModal() {
    const modal = document.getElementById('dashboardModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function goToMyWallet() {
    closeDashboardModal();
    // Show the transaction modal instead of redirecting
    showWithdrawalTransactionModal();
}

function goToExternalWallet() {
    closeDashboardModal();
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        window.location.href = 'account-info.html';
    } else {
        window.location.href = 'pages/account-info.html';
    }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('dashboardModal');
    if (modal && e.target === modal) {
        closeDashboardModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDashboardModal();
    }
});
