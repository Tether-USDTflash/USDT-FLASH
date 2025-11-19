/**
 * Advanced Wallet Pro System
 * نظام المحفظة الاحترافية المتقدمة
 * 
 * Features:
 * - Advanced Portfolio Management
 * - Real-time Price Updates
 * - Transaction History
 * - Security Monitoring
 * - Performance Analytics
 * - Multi-language Support
 */

class AdvancedWalletPro {
    constructor() {
        this.portfolio = {
            USDT_F: { amount: 2500, price: 1.0, symbol: 'USDT-F', name: 'USDT Flash' },
            USDT: { amount: 43.85, price: 1.0, symbol: 'USDT', name: 'Tether USD' },
            BTC: { amount: 0.001, price: 39990, symbol: 'BTC', name: 'Bitcoin' }
        };
        
        this.transactions = [];
        this.settings = {
            currency: 'USD',
            theme: 'dark',
            notifications: true,
            twoFactorAuth: true
        };
        
        this.analytics = {
            totalDeposits: 5200,
            totalWithdrawals: 2656.15,
            totalTransactions: 12,
            bestPerformer: 'USDT-F',
            bestPerformancePercent: 28.5,
            dailyChange: 45.50,
            monthlyChange: 320.00,
            averageDailyVolume: 450
        };
        
        this.priceUpdates = {
            USDT_F: 1.0,
            USDT: 1.0,
            BTC: 39990,
            ETH: 2100,
            PEPE: 0.00001845,
            DOGE: 0.38,
            SHIB: 0.00002245
        };
        
        this.init();
    }

    /**
     * Initialize the wallet system
     */
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.startPriceUpdates();
        this.setupSecurityMonitoring();
        this.logInitialization();
    }

    /**
     * Load wallet data from localStorage
     */
    loadFromStorage() {
        const stored = localStorage.getItem('walletProData');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.portfolio = data.portfolio || this.portfolio;
                this.transactions = data.transactions || this.transactions;
                this.settings = { ...this.settings, ...data.settings };
            } catch (e) {
                console.error('Failed to load wallet data:', e);
            }
        }
    }

    /**
     * Save wallet data to localStorage
     */
    saveToStorage() {
        const data = {
            portfolio: this.portfolio,
            transactions: this.transactions,
            settings: this.settings
        };
        localStorage.setItem('walletProData', JSON.stringify(data));
    }

    /**
     * Setup event listeners for wallet actions
     */
    setupEventListeners() {
        // Deposit button
        const depositBtn = document.querySelector('.action-btn:nth-of-type(1)');
        if (depositBtn) {
            depositBtn.addEventListener('click', () => this.handleDeposit());
        }

        // Withdraw button
        const withdrawBtn = document.querySelector('.action-btn:nth-of-type(2)');
        if (withdrawBtn) {
            withdrawBtn.addEventListener('click', () => this.handleWithdraw());
        }

        // Transfer button
        const transferBtn = document.querySelector('.action-btn:nth-of-type(3)');
        if (transferBtn) {
            transferBtn.addEventListener('click', () => this.handleTransfer());
        }

        // Swap button
        const swapBtn = document.querySelector('.action-btn:nth-of-type(4)');
        if (swapBtn) {
            swapBtn.addEventListener('click', () => this.handleSwap());
        }

        // Settings button
        document.querySelectorAll('[title="Settings"], [title="الإعدادات"]').forEach(btn => {
            btn.addEventListener('click', () => this.openSettings());
        });

        // Eye/visibility toggle
        document.querySelectorAll('[title*="eye"], .header-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.closest('[title*="eye"]')) {
                    this.toggleBalanceVisibility();
                }
            });
        });
    }

    /**
     * Start real-time price updates
     */
    startPriceUpdates() {
        setInterval(() => {
            this.updatePrices();
        }, 30000); // Update every 30 seconds
        
        // Initial update
        this.updatePrices();
    }

    /**
     * Update cryptocurrency prices with realistic fluctuations
     */
    updatePrices() {
        // Simulate realistic price fluctuations
        Object.keys(this.priceUpdates).forEach(crypto => {
            const currentPrice = this.priceUpdates[crypto];
            const fluctuation = (Math.random() - 0.5) * 0.02; // ±1%
            this.priceUpdates[crypto] = Math.max(0, currentPrice * (1 + fluctuation));
        });

        // Update portfolio values
        this.updatePortfolioValues();
        
        // Display updated prices
        this.displayPrices();
    }

    /**
     * Update portfolio values based on current prices
     */
    updatePortfolioValues() {
        let totalValue = 0;
        
        Object.keys(this.portfolio).forEach(key => {
            const asset = this.portfolio[key];
            const price = this.priceUpdates[key];
            if (price) {
                asset.value = asset.amount * price;
                totalValue += asset.value;
            }
        });

        this.analytics.totalValue = totalValue;
    }

    /**
     * Display updated prices in UI
     */
    displayPrices() {
        // Update balance amount
        const balanceAmount = document.querySelector('.balance-amount');
        if (balanceAmount) {
            const total = Object.values(this.portfolio).reduce((sum, asset) => {
                return sum + (asset.amount * this.priceUpdates[asset.symbol.split('-')[0] === 'USDT' ? 'USDT_F' : asset.symbol] || 0);
            }, 0);
            balanceAmount.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    /**
     * Handle deposit transaction
     */
    handleDeposit() {
        const amount = this.promptDepositAmount();
        if (amount > 0) {
            const tx = {
                type: 'deposit',
                amount: amount,
                crypto: 'USDT',
                timestamp: new Date(),
                status: 'completed',
                txHash: this.generateTxHash()
            };
            
            this.transactions.push(tx);
            this.portfolio.USDT_F.amount += amount;
            this.saveToStorage();
            this.showNotification(`✅ Deposit successful: +${amount} USDT`, 'success');
            this.updateAnalytics();
        }
    }

    /**
     * Handle withdrawal transaction
     */
    handleWithdraw() {
        const totalValue = this.getTotalPortfolioValue();
        if (totalValue < 10) {
            this.showNotification('❌ Insufficient balance for withdrawal', 'error');
            return;
        }

        const amount = this.promptWithdrawAmount(totalValue);
        if (amount > 0 && amount <= totalValue) {
            const tx = {
                type: 'withdraw',
                amount: amount,
                crypto: 'USDT',
                timestamp: new Date(),
                status: 'pending',
                txHash: this.generateTxHash()
            };
            
            this.transactions.push(tx);
            this.portfolio.USDT_F.amount -= amount;
            this.saveToStorage();
            this.showNotification(`🔄 Withdrawal requested: -${amount} USDT`, 'info');
            
            // Simulate confirmation after 5 seconds
            setTimeout(() => {
                tx.status = 'completed';
                this.saveToStorage();
                this.showNotification(`✅ Withdrawal completed: -${amount} USDT`, 'success');
            }, 5000);
            
            this.updateAnalytics();
        }
    }

    /**
     * Handle transfer transaction
     */
    handleTransfer() {
        const totalValue = this.getTotalPortfolioValue();
        if (totalValue < 1) {
            this.showNotification('❌ Insufficient balance for transfer', 'error');
            return;
        }

        const amount = this.promptTransferAmount(totalValue);
        if (amount > 0 && amount <= totalValue) {
            const tx = {
                type: 'transfer',
                amount: amount,
                from: 'USDT-F',
                to: 'Custom Wallet',
                timestamp: new Date(),
                status: 'pending',
                txHash: this.generateTxHash()
            };
            
            this.transactions.push(tx);
            this.portfolio.USDT_F.amount -= amount;
            this.saveToStorage();
            this.showNotification(`📤 Transfer initiated: -${amount} USDT`, 'info');
            
            // Simulate confirmation
            setTimeout(() => {
                tx.status = 'completed';
                this.saveToStorage();
                this.showNotification(`✅ Transfer completed`, 'success');
            }, 8000);
            
            this.updateAnalytics();
        }
    }

    /**
     * Handle swap transaction
     */
    handleSwap() {
        const swapOptions = [
            { from: 'USDT', to: 'BTC', rate: 1/39990 },
            { from: 'USDT', to: 'ETH', rate: 1/2100 },
            { from: 'BTC', to: 'USDT', rate: 39990 },
            { from: 'ETH', to: 'USDT', rate: 2100 }
        ];

        const fromAmount = this.promptSwapAmount();
        if (fromAmount > 0) {
            const tx = {
                type: 'swap',
                amount: fromAmount,
                from: 'USDT',
                to: 'BTC',
                rate: 1/39990,
                timestamp: new Date(),
                status: 'completed',
                txHash: this.generateTxHash()
            };
            
            this.transactions.push(tx);
            this.showNotification(`🔄 Swap executed: ${fromAmount} USDT → ${(fromAmount * tx.rate).toFixed(6)} BTC`, 'success');
            this.updateAnalytics();
        }
    }

    /**
     * Get total portfolio value
     */
    getTotalPortfolioValue() {
        return Object.values(this.portfolio).reduce((sum, asset) => {
            const price = this.priceUpdates[asset.symbol.split('-')[0] === 'USDT' ? 'USDT_F' : asset.symbol] || 1;
            return sum + (asset.amount * price);
        }, 0);
    }

    /**
     * Update analytics
     */
    updateAnalytics() {
        this.analytics.totalTransactions = this.transactions.length;
        this.saveToStorage();
    }

    /**
     * Setup security monitoring
     */
    setupSecurityMonitoring() {
        // Monitor login attempts
        this.logSecurityEvent('Wallet opened', 'info');
        
        // Monitor suspicious activities
        window.addEventListener('beforeunload', () => {
            this.logSecurityEvent('Wallet session ended', 'info');
        });
    }

    /**
     * Log security events
     */
    logSecurityEvent(event, type) {
        const securityLog = localStorage.getItem('securityLog') || '[]';
        const logs = JSON.parse(securityLog);
        logs.push({
            event,
            type,
            timestamp: new Date(),
            ipInfo: 'Local'
        });
        
        // Keep only last 100 events
        if (logs.length > 100) logs.shift();
        localStorage.setItem('securityLog', JSON.stringify(logs));
    }

    /**
     * Toggle balance visibility
     */
    toggleBalanceVisibility() {
        const balanceAmount = document.querySelector('.balance-amount');
        if (balanceAmount) {
            balanceAmount.style.filter = balanceAmount.style.filter === 'blur(5px)' 
                ? 'none' 
                : 'blur(5px)';
        }
    }

    /**
     * Open settings modal
     */
    openSettings() {
        this.showSettingsModal();
    }

    /**
     * Generate transaction hash
     */
    generateTxHash() {
        return '0x' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
            .substring(0, 64);
    }

    /**
     * Prompt for deposit amount
     */
    promptDepositAmount() {
        const amount = prompt('Enter deposit amount (USDT):', '100');
        return amount ? parseFloat(amount) : 0;
    }

    /**
     * Prompt for withdrawal amount
     */
    promptWithdrawAmount(max) {
        const amount = prompt(`Enter withdrawal amount (Max: $${max.toFixed(2)} USDT):`, '50');
        return amount ? parseFloat(amount) : 0;
    }

    /**
     * Prompt for transfer amount
     */
    promptTransferAmount(max) {
        const amount = prompt(`Enter transfer amount (Max: $${max.toFixed(2)} USDT):`, '100');
        return amount ? parseFloat(amount) : 0;
    }

    /**
     * Prompt for swap amount
     */
    promptSwapAmount() {
        const amount = prompt('Enter swap amount (USDT):', '10');
        return amount ? parseFloat(amount) : 0;
    }

    /**
     * Show notification
     */
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            backdrop-filter: blur(10px);
            border: 2px solid;
        `;

        if (type === 'success') {
            notification.style.background = 'rgba(16, 185, 129, 0.2)';
            notification.style.color = '#10b981';
            notification.style.borderColor = '#10b981';
        } else if (type === 'error') {
            notification.style.background = 'rgba(239, 68, 68, 0.2)';
            notification.style.color = '#ef4444';
            notification.style.borderColor = '#ef4444';
        } else {
            notification.style.background = 'rgba(38, 161, 123, 0.2)';
            notification.style.color = '#26a17b';
            notification.style.borderColor = '#26a17b';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Show settings modal
     */
    showSettingsModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;

        modal.innerHTML = `
            <div style="background: #141e3c; border: 2px solid #26a17b; border-radius: 15px; padding: 30px; max-width: 400px; color: white;">
                <h2 style="margin-bottom: 20px; color: #26a17b;">⚙️ Settings</h2>
                <div style="margin-bottom: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" checked style="width: 20px; height: 20px;">
                        <span>Enable Notifications</span>
                    </label>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" checked style="width: 20px; height: 20px;">
                        <span>Two-Factor Authentication</span>
                    </label>
                </div>
                <button onclick="this.closest('div').parentElement.remove()" style="
                    width: 100%;
                    background: #26a17b;
                    color: white;
                    border: none;
                    padding: 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    margin-top: 20px;
                ">Close</button>
            </div>
        `;

        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    /**
     * Log initialization
     */
    logInitialization() {
        console.log('%c🚀 Advanced Wallet Pro Initialized', 'color: #26a17b; font-size: 16px; font-weight: bold;');
        console.log('%cPortfolio:', 'color: #fbbf24; font-weight: bold;', this.portfolio);
        console.log('%cAnalytics:', 'color: #fbbf24; font-weight: bold;', this.analytics);
    }

    /**
     * Get wallet statistics
     */
    getStatistics() {
        return {
            totalValue: this.getTotalPortfolioValue(),
            totalTransactions: this.analytics.totalTransactions,
            bestPerformer: this.analytics.bestPerformer,
            dailyChange: this.analytics.dailyChange,
            monthlyChange: this.analytics.monthlyChange
        };
    }

    /**
     * Export wallet data
     */
    exportData() {
        const data = {
            portfolio: this.portfolio,
            transactions: this.transactions,
            analytics: this.analytics,
            exportDate: new Date()
        };
        return JSON.stringify(data, null, 2);
    }
}

// Initialize wallet on page load
document.addEventListener('DOMContentLoaded', () => {
    window.walletPro = new AdvancedWalletPro();
});

// Add animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);