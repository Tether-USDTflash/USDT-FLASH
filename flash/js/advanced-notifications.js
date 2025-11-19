// نظام الإشعارات المتقدم
class AdvancedNotifications {
    constructor() {
        this.newsData = [];
        this.lastCheckTime = localStorage.getItem('lastNotificationCheck') || 0;
        this.updateInterval = parseInt(localStorage.getItem('notificationUpdateInterval') || '24');
        this.init();
    }

    init() {
        this.loadNewsData();
        this.setupMenuItems();
        this.checkForNewContent();
        this.startAutoUpdate();
    }

    loadNewsData() {
        const stored = localStorage.getItem('companyNews');
        if (stored) {
            this.newsData = JSON.parse(stored);
        } else {
            this.newsData = this.getDefaultNews();
            this.saveNewsData();
        }
    }

    getDefaultNews() {
        return [
            {
                id: 1,
                title: 'USDT-FLASH الآن على 50 دولة',
                content: 'توسعنا العالمي وصل إلى 50 دولة حول العالم',
                date: new Date(),
                author: 'USDT-FLASH',
                avatar: '🌍',
                likes: 2453,
                comments: 312,
                shares: 567
            },
            {
                id: 2,
                title: 'تحديث أمان جديد 2024',
                content: 'إضافة حماية SSL 256-bit متقدمة وتشفير البيانات',
                date: new Date(Date.now() - 86400000),
                author: 'USDT-FLASH',
                avatar: '🔐',
                likes: 1823,
                comments: 234,
                shares: 345
            },
            {
                id: 3,
                title: 'مليون عملية نجاح هذا الشهر',
                content: 'شكراً لثقتكم - وصلنا لمليون عملية ناجحة',
                date: new Date(Date.now() - 172800000),
                author: 'USDT-FLASH',
                avatar: '🎉',
                likes: 3567,
                comments: 512,
                shares: 892
            },
            {
                id: 4,
                title: 'دعم عملات جديدة',
                content: 'أضفنا دعم SHIBA INU و PEPE بجانب DOGE',
                date: new Date(Date.now() - 259200000),
                author: 'USDT-FLASH',
                avatar: '🚀',
                likes: 2134,
                comments: 267,
                shares: 456
            }
        ];
    }

    saveNewsData() {
        localStorage.setItem('companyNews', JSON.stringify(this.newsData));
    }

    checkForNewContent() {
        const now = Date.now();
        const lastCheck = parseInt(this.lastCheckTime);
        const timeSinceCheck = now - lastCheck;
        const interval = this.updateInterval * 60 * 60 * 1000;

        if (timeSinceCheck > interval) {
            // هنا يمكن إضافة اتصال بـ API حقيقي لجلب الأخبار
            this.simulateNewNotifications();
            this.lastCheckTime = now;
            localStorage.setItem('lastNotificationCheck', now.toString());
        }

        document.dispatchEvent(new CustomEvent('notificationCheckComplete'));
    }

    simulateNewNotifications() {
        // محاكاة أخبار جديدة
        const newStories = [
            {
                title: 'عملاء جدد من منطقة الشرق الأوسط',
                content: 'ارتفاع كبير في عدد المستخدمين من السعودية والإمارات',
                emoji: '📈'
            },
            {
                title: 'تحسينات سرعة البلاتفورم',
                content: 'تم تحسين سرعة المعاملات بنسبة 300%',
                emoji: '⚡'
            },
            {
                title: 'شراكة جديدة مع منصات عالمية',
                content: 'توقيع عقود شراكة إستراتيجية مع منصات رائدة',
                emoji: '🤝'
            }
        ];

        // إضافة تنويع عشوائي
        const randomNews = newStories[Math.floor(Math.random() * newStories.length)];
        
        if (window.notificationsSystem && Math.random() > 0.5) {
            window.notificationsSystem.addNotification(
                randomNews.title,
                randomNews.content,
                'fas fa-newspaper',
                '#26a17b'
            );
        }
    }

    setupMenuItems() {
        // إضافة عنصر الأخبار في القائمة
        setTimeout(() => {
            const navMenu = document.querySelector('nav') || document.querySelector('[class*="menu"]');
            if (!navMenu || document.querySelector('.news-menu-item')) return;

            const newsMenuItem = document.createElement('a');
            newsMenuItem.className = 'news-menu-item';
            newsMenuItem.style.cssText = `
                cursor: pointer;
                padding: 8px 12px;
                border-radius: 6px;
                transition: all 0.3s ease;
                color: inherit;
                text-decoration: none;
            `;
            newsMenuItem.innerHTML = '<i class="fas fa-newspaper" style="margin-left: 8px;"></i> الأخبار';
            newsMenuItem.addEventListener('click', () => this.openNewsPage());
            newsMenuItem.addEventListener('mouseenter', (e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
            });
            newsMenuItem.addEventListener('mouseleave', (e) => {
                e.target.style.backgroundColor = 'transparent';
            });

            navMenu.appendChild(newsMenuItem);
        }, 1000);
    }

    openNewsPage() {
        // التحقق من وجود صفحة الأخبار
        const newsPageUrl = 'pages/company-news.html';
        
        // محاولة فتح الصفحة
        window.location.href = newsPageUrl;

        // إطلاق حدث مخصص
        document.dispatchEvent(new CustomEvent('newsPageOpened'));
        
        // تحديث حالة القراءة
        if (window.notificationsSystem) {
            const notifications = window.notificationsSystem.getNotifications();
            notifications.forEach(n => {
                window.notificationsSystem.markAsRead(n.id);
            });
        }
    }

    startAutoUpdate() {
        // فحص الأخبار الجديدة كل 24 ساعة
        setInterval(() => {
            this.checkForNewContent();
        }, 24 * 60 * 60 * 1000);
    }

    getNewsData() {
        return this.newsData;
    }

    setUpdateInterval(hours) {
        this.updateInterval = parseInt(hours);
        localStorage.setItem('notificationUpdateInterval', hours.toString());
    }

    // API عام للوصول إلى الأخبار
    getLatestNews(limit = 5) {
        return this.newsData.slice(0, limit);
    }

    getNewsByCategory(category) {
        return this.newsData.filter(news => news.category === category);
    }
}

// إنشاء instance عام
window.advancedNotifications = new AdvancedNotifications();