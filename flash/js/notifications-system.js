// نظام الإشعارات الأساسي
class NotificationsSystem {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.init();
    }

    init() {
        this.loadNotifications();
        this.createNotificationIcon();
        this.setupEventListeners();
        this.startPeriodicCheck();
    }

    loadNotifications() {
        const stored = localStorage.getItem('notifications');
        if (stored) {
            this.notifications = JSON.parse(stored);
            this.unreadCount = this.notifications.filter(n => !n.read).length;
        } else {
            this.notifications = this.getDefaultNotifications();
            this.unreadCount = this.notifications.length;
            this.saveNotifications();
        }
    }

    getDefaultNotifications() {
        return [
            {
                id: 1,
                title: 'مرحباً في USDT-FLASH',
                message: 'اكتشف طريقة جديدة سهلة وآمنة للحصول على USDT-FLASH',
                icon: 'fas fa-star',
                color: '#26a17b',
                time: new Date(),
                read: false
            },
            {
                id: 2,
                title: 'عرض خاص محدود',
                message: 'احصل على خصم 10% على أول شراء لك',
                icon: 'fas fa-tag',
                color: '#ffa726',
                time: new Date(Date.now() - 3600000),
                read: false
            },
            {
                id: 3,
                title: 'نصيحة أمان مهمة',
                message: 'استخدم محفظة آمنة مثل MetaMask أو Trust Wallet',
                icon: 'fas fa-shield-alt',
                color: '#3b82f6',
                time: new Date(Date.now() - 7200000),
                read: false
            }
        ];
    }

    createNotificationIcon() {
        setTimeout(() => {
            const headerIconsSection = document.querySelector('.header-icons') || 
                                      document.querySelector('[class*="icon"]');
            
            if (!headerIconsSection) return;

            // تحقق من عدم وجود الأيقونة بالفعل
            if (document.querySelector('.notifications-btn')) return;

            const notificationHTML = `
                <div class="icon-item notifications-btn" style="position: relative; cursor: pointer;">
                    <i class="fas fa-bell" style="font-size: 20px; color: white;"></i>
                    ${this.unreadCount > 0 ? `
                        <span class="notification-badge" style="display: flex;">
                            ${this.unreadCount > 9 ? '9+' : this.unreadCount}
                        </span>
                    ` : ''}
                </div>
            `;

            // أضف الأيقونة إلى الهيدر
            const headerIcons = document.querySelector('[class*="header"] [class*="icon"]') ||
                              document.querySelector('.icon-item')?.parentElement;
            
            if (headerIcons) {
                headerIcons.insertAdjacentHTML('afterbegin', notificationHTML);
                this.setupNotificationButtonListener();
            }
        }, 500);
    }

    setupNotificationButtonListener() {
        const notificationBtn = document.querySelector('.notifications-btn');
        if (!notificationBtn) return;

        notificationBtn.addEventListener('click', () => {
            window.advancedNotifications?.openNewsPage?.();
        });

        // إظهار التلميح عند المرور
        notificationBtn.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: #1a1a2e;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                border: 1px solid rgba(255,255,255,0.2);
            `;
            tooltip.textContent = 'أخبار وإشعارات';
            notificationBtn.appendChild(tooltip);

            setTimeout(() => tooltip.remove(), 3000);
        });
    }

    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            this.unreadCount--;
            this.updateBadge();
            this.saveNotifications();
        }
    }

    updateBadge() {
        const badge = document.querySelector('.notification-badge');
        const btn = document.querySelector('.notifications-btn');
        
        if (this.unreadCount > 0) {
            if (badge) {
                badge.textContent = this.unreadCount > 9 ? '9+' : this.unreadCount;
                badge.style.display = 'flex';
            }
            btn?.style.setProperty('--notification-active', 'true');
        } else {
            if (badge) badge.style.display = 'none';
            btn?.style.setProperty('--notification-active', 'false');
        }
    }

    addNotification(title, message, icon = 'fas fa-info-circle', color = '#26a17b') {
        const notification = {
            id: Date.now(),
            title,
            message,
            icon,
            color,
            time: new Date(),
            read: false
        };

        this.notifications.unshift(notification);
        this.unreadCount++;
        this.updateBadge();
        this.saveNotifications();

        // تشغيل الصوت والاهتزاز
        if (window.notificationEnhancements) {
            window.notificationEnhancements.playNotificationSound();
            window.notificationEnhancements.vibrate();
        }

        // إطلاق حدث مخصص
        document.dispatchEvent(new CustomEvent('newNotification', {
            detail: notification
        }));

        return notification;
    }

    startPeriodicCheck() {
        // فحص الإشعارات كل 30 دقيقة
        setInterval(() => {
            this.checkForNewContent();
        }, 30 * 60 * 1000);
    }

    checkForNewContent() {
        // هذا يتم تجاوزه في advanced-notifications.js
    }

    getNotifications() {
        return this.notifications;
    }

    clearAll() {
        this.notifications = [];
        this.unreadCount = 0;
        this.updateBadge();
        this.saveNotifications();
    }
}

// إنشاء instance عام
window.notificationsSystem = new NotificationsSystem();