// 🤖 نظام الدردشة المتطور - USDT-FLASH Advanced Chat System
// نظام ثنائي اللغة مع أسئلة جاهزة

document.addEventListener('DOMContentLoaded', function() {
    let currentLanguage = localStorage.getItem('chat_language') || null;
    
    // قاعدة بيانات الأسئلة الجاهزة - عربي
    const readyQuestionsAR = [
        { icon: 'fas fa-coins', text: 'ما هي USDT-FLASH؟', key: 'what_is' },
        { icon: 'fas fa-shopping-cart', text: 'كيف أشتري USDT-FLASH؟', key: 'how_buy' },
        { icon: 'fas fa-shield-alt', text: 'هل الموقع آمن وموثوق؟', key: 'security' },
        { icon: 'fas fa-clock', text: 'كم يستغرق التسليم؟', key: 'delivery' },
        { icon: 'fas fa-credit-card', text: 'ما طرق الدفع المتاحة؟', key: 'payment' },
        { icon: 'fas fa-chart-line', text: 'ما الحد الأدنى للشراء؟', key: 'minimum' },
        { icon: 'fas fa-wallet', text: 'ما المحافظ المتوافقة؟', key: 'wallets' },
        { icon: 'fas fa-undo', text: 'ما سياسة الاسترداد؟', key: 'refund' },
        { icon: 'fas fa-percentage', text: 'هل هناك رسوم إضافية؟', key: 'fees' },
        { icon: 'fas fa-gift', text: 'كيف يعمل نظام الإحالة؟', key: 'referral' },
        { icon: 'fas fa-headset', text: 'كيف أتواصل مع الدعم؟', key: 'support' },
        { icon: 'fas fa-id-card', text: 'هل أحتاج تحقق الهوية؟', key: 'kyc' },
        { icon: 'fas fa-globe', text: 'ما الدول المدعومة؟', key: 'countries' },
        { icon: 'fas fa-exclamation-triangle', text: 'ماذا لو فشلت المعاملة؟', key: 'failed' },
        { icon: 'fas fa-dollar-sign', text: 'ما أسعار الباقات؟', key: 'prices' },
        { icon: 'fas fa-network-wired', text: 'ما الشبكات المدعومة؟', key: 'networks' }
    ];
    
    // قاعدة بيانات الأسئلة الجاهزة - إنجليزي
    const readyQuestionsEN = [
        { icon: 'fas fa-coins', text: 'What is USDT-FLASH?', key: 'what_is' },
        { icon: 'fas fa-shopping-cart', text: 'How to buy USDT-FLASH?', key: 'how_buy' },
        { icon: 'fas fa-shield-alt', text: 'Is the site safe and trusted?', key: 'security' },
        { icon: 'fas fa-clock', text: 'How long is delivery?', key: 'delivery' },
        { icon: 'fas fa-credit-card', text: 'What payment methods?', key: 'payment' },
        { icon: 'fas fa-chart-line', text: 'Minimum purchase amount?', key: 'minimum' },
        { icon: 'fas fa-wallet', text: 'Compatible wallets?', key: 'wallets' },
        { icon: 'fas fa-undo', text: 'Refund policy?', key: 'refund' },
        { icon: 'fas fa-percentage', text: 'Any additional fees?', key: 'fees' },
        { icon: 'fas fa-gift', text: 'How does referral work?', key: 'referral' },
        { icon: 'fas fa-headset', text: 'Contact support?', key: 'support' },
        { icon: 'fas fa-id-card', text: 'Need KYC verification?', key: 'kyc' },
        { icon: 'fas fa-globe', text: 'Supported countries?', key: 'countries' },
        { icon: 'fas fa-exclamation-triangle', text: 'Transaction failed?', key: 'failed' },
        { icon: 'fas fa-dollar-sign', text: 'Package prices?', key: 'prices' },
        { icon: 'fas fa-network-wired', text: 'Supported networks?', key: 'networks' }
    ];
    
    // الإجابات - عربي
    const answersAR = {
        what_is: '💎 **USDT-FLASH** عملة رقمية مستقرة مربوطة بالدولار\n\n✅ **المميزات:**\n• قيمة ثابتة: 1 USDT-FLASH = 1 USD\n• تحويلات سريعة وآمنة\n• رسوم منخفضة جداً\n• متوافقة مع المحافظ الشهيرة',
        how_buy: '🎯 **خطوات الشراء:**\n\n1️⃣ اختر الباقة المناسبة\n2️⃣ اختر طريقة الدفع\n3️⃣ أدخل عنوان المحفظة\n4️⃣ أكد الدفع\n5️⃣ استلم العملة خلال 5-15 دقيقة',
        security: '🛡️ **نعم، أمانك أولويتنا!**\n\n🔒 تشفير SSL 256-bit\n✅ شريك Tether معتمد\n✅ أكثر من 50,000 عميل راضٍ\n✅ تقييم 4.9/5 نجوم',
        delivery: '⚡ **التسليم السريع:**\n\n🚀 5-15 دقيقة (95% من الحالات)\n⚡ 1-5 دقائق للعملاء VIP\n📞 دعم فوري في حالة التأخير',
        payment: '💳 **طرق الدفع:**\n\n💳 Visa & MasterCard\n🏦 تحويل بنكي\n💰 PayPal\n₿ العملات الرقمية (BTC, ETH, USDT)',
        minimum: '💵 **الحد الأدنى:**\n\n🎯 100 USDT-FLASH مقابل $19.99\n📈 لا يوجد حد أقصى\n💡 خصومات للكميات الكبيرة',
        wallets: '👛 **المحافظ المدعومة:**\n\n📱 Trust Wallet, MetaMask\n💻 Exodus, Atomic Wallet\n🏛️ Ledger, Trezor\n⚙️ الشبكات: TRC-20, ERC-20, BEP-20',
        refund: '🔄 **سياسة الاسترداد:**\n\n✅ استرداد كامل خلال 24 ساعة\n⏰ معالجة خلال 1-3 أيام\n📋 شروط واضحة وعادلة',
        fees: '💰 **الرسوم:**\n\n✅ لا رسوم مخفية\n🔄 رسوم الشبكة: TRC-20 (1-3 USDT)\n💡 خصم 10% للطلبات الكبيرة',
        referral: '🎁 **نظام الإحالة:**\n\n💰 100 USDT-FLASH لكل إحالة ناجحة\n🔗 احصل على رابطك الخاص\n💎 سحب عند 1000 USDT-FLASH',
        support: '📞 **الدعم الفني 24/7:**\n\n💬 دردشة مباشرة: رد خلال 2-5 دقائق\n📧 support@flashusdt.com\n📱 واتساب: +1-555-USDT-HELP',
        kyc: '🆔 **التحقق من الهوية:**\n\n💚 أقل من $500: لا يتطلب تحقق\n📄 $500-$5000: تحقق بسيط\n🏦 أكثر من $5000: تحقق كامل',
        countries: '🌍 **التغطية:**\n\n✅ جميع دول الخليج\n✅ معظم الدول العربية\n✅ أوروبا وأمريكا\n✅ آسيا وأستراليا',
        failed: '🔧 **حل المشاكل:**\n\n1️⃣ انتظر 30 دقيقة\n2️⃣ تحقق من عنوان المحفظة\n3️⃣ راجع الشبكة المختارة\n4️⃣ تواصل مع الدعم الفني',
        prices: '💰 **الباقات:**\n\n🥉 Basic: 499 USDT مقابل $29.99\n🥈 Pro: 2,500 USDT مقابل $99.99\n🥇 Enterprise: 10,000 USDT مقابل $199',
        networks: '⚙️ **الشبكات:**\n\n🟢 TRC-20 (موصى به - أرخص)\n🔵 ERC-20 (Ethereum)\n🟡 BEP-20 (Binance)\n🟣 Polygon (MATIC)'
    };
    
    // الإجابات - إنجليزي
    const answersEN = {
        what_is: '💎 **USDT-FLASH** is a stablecoin pegged to USD\n\n✅ **Features:**\n• Stable value: 1 USDT-FLASH = 1 USD\n• Fast & secure transfers\n• Very low fees\n• Compatible with popular wallets',
        how_buy: '🎯 **Purchase Steps:**\n\n1️⃣ Choose your package\n2️⃣ Select payment method\n3️⃣ Enter wallet address\n4️⃣ Confirm payment\n5️⃣ Receive within 5-15 minutes',
        security: '🛡️ **Yes, your security is our priority!**\n\n🔒 SSL 256-bit encryption\n✅ Certified Tether partner\n✅ 50,000+ satisfied customers\n✅ 4.9/5 star rating',
        delivery: '⚡ **Fast Delivery:**\n\n🚀 5-15 minutes (95% cases)\n⚡ 1-5 minutes for VIP\n📞 Instant support if delayed',
        payment: '💳 **Payment Methods:**\n\n💳 Visa & MasterCard\n🏦 Bank Transfer\n💰 PayPal\n₿ Crypto (BTC, ETH, USDT)',
        minimum: '💵 **Minimum:**\n\n🎯 100 USDT-FLASH for $19.99\n📈 No maximum limit\n💡 Discounts for bulk orders',
        wallets: '👛 **Supported Wallets:**\n\n📱 Trust Wallet, MetaMask\n💻 Exodus, Atomic Wallet\n🏛️ Ledger, Trezor\n⚙️ Networks: TRC-20, ERC-20, BEP-20',
        refund: '🔄 **Refund Policy:**\n\n✅ Full refund within 24h\n⏰ Processing in 1-3 days\n📋 Clear and fair terms',
        fees: '💰 **Fees:**\n\n✅ No hidden fees\n🔄 Network fees: TRC-20 (1-3 USDT)\n💡 10% discount for large orders',
        referral: '🎁 **Referral System:**\n\n💰 100 USDT-FLASH per successful referral\n🔗 Get your unique link\n💎 Withdraw at 1000 USDT-FLASH',
        support: '📞 **24/7 Support:**\n\n💬 Live chat: 2-5 min response\n📧 support@flashusdt.com\n📱 WhatsApp: +1-555-USDT-HELP',
        kyc: '🆔 **KYC Verification:**\n\n💚 Under $500: No verification\n📄 $500-$5000: Simple verification\n🏦 Over $5000: Full verification',
        countries: '🌍 **Coverage:**\n\n✅ All Gulf countries\n✅ Most Arab countries\n✅ Europe & America\n✅ Asia & Australia',
        failed: '🔧 **Troubleshooting:**\n\n1️⃣ Wait 30 minutes\n2️⃣ Check wallet address\n3️⃣ Verify selected network\n4️⃣ Contact support',
        prices: '💰 **Packages:**\n\n🥉 Basic: 499 USDT for $29.99\n🥈 Pro: 2,500 USDT for $99.99\n🥇 Enterprise: 10,000 USDT for $199',
        networks: '⚙️ **Networks:**\n\n🟢 TRC-20 (Recommended - Cheapest)\n🔵 ERC-20 (Ethereum)\n🟡 BEP-20 (Binance)\n🟣 Polygon (MATIC)'
    };

    const chatHTML = `
        <div class="chat-icon" id="chat-icon">
            <i class="fas fa-robot"></i>
            <div class="chat-notification" id="chat-notification">1</div>
        </div>
        <div class="chat-window" id="chat-window">
            <div class="chat-header">
                <div class="assistant-info">
                    <div class="assistant-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="assistant-details">
                        <h3 id="chat-title">🤖 USDT-FLASH Assistant</h3>
                        <span class="status" id="chat-status">• Available Now</span>
                    </div>
                </div>
                <button class="close-chat" id="close-chat">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="chat-input-field" placeholder="اكتب سؤالك هنا... 💬">
                <button id="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    
    const chatIcon = document.getElementById('chat-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInputField = document.getElementById('chat-input-field');
    const sendMessage = document.getElementById('send-message');
    
    function showLanguageSelection() {
        const langHTML = `
            <div class="language-selection">
                <div class="lang-title">🌍 اختر اللغة / Choose Language</div>
                <div class="lang-buttons">
                    <button class="lang-btn" data-lang="ar">
                        <i class="fas fa-globe"></i>
                        <span>العربية</span>
                        <div class="lang-flag">🇸🇦</div>
                    </button>
                    <button class="lang-btn" data-lang="en">
                        <i class="fas fa-globe"></i>
                        <span>English</span>
                        <div class="lang-flag">🇺🇸</div>
                    </button>
                </div>
            </div>
        `;
        chatMessages.innerHTML = langHTML;
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentLanguage = this.getAttribute('data-lang');
                localStorage.setItem('chat_language', currentLanguage);
                showWelcomeMessage();
                showReadyQuestions();
            });
        });
    }
    
    function showWelcomeMessage() {
        const welcomeAR = '👋 **مرحباً بك في USDT-FLASH!**\n\nأنا مساعدك الذكي، يمكنني مساعدتك في:\n• شراء USDT-FLASH\n• معلومات الأمان والثقة\n• طرق الدفع والتسليم\n• نظام الإحالة والمكافآت\n• الدعم الفني\n\n**اختر سؤالاً من الأسفل:** 👇';
        
        const welcomeEN = '👋 **Welcome to USDT-FLASH!**\n\nI\'m your smart assistant, I can help you with:\n• Buying USDT-FLASH\n• Security and trust info\n• Payment and delivery methods\n• Referral system and rewards\n• Technical support\n\n**Choose a question below:** 👇';
        
        chatMessages.innerHTML = '';
        addMessage(currentLanguage === 'ar' ? welcomeAR : welcomeEN, 'assistant');
        
        chatInputField.placeholder = currentLanguage === 'ar' ? 'اكتب سؤالك هنا... 💬' : 'Type your question... 💬';
    }
    
    function showReadyQuestions() {
        const questions = currentLanguage === 'ar' ? readyQuestionsAR : readyQuestionsEN;
        const title = currentLanguage === 'ar' ? '🎯 اختر سؤالاً:' : '🎯 Choose a question:';
        
        const optionsHTML = `
            <div class="chat-options">
                <div class="options-title">${title}</div>
                ${questions.map(q => `
                    <div class="chat-option" data-key="${q.key}">
                        <i class="${q.icon}"></i>
                        <span>${q.text}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', optionsHTML);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        document.querySelectorAll('.chat-option').forEach(option => {
            option.addEventListener('click', function() {
                const key = this.getAttribute('data-key');
                const question = this.querySelector('span').textContent;
                handleQuestion(key, question);
            });
        });
    }
    
    function handleQuestion(key, question) {
        addMessage(question, 'user');
        
        setTimeout(() => {
            const answers = currentLanguage === 'ar' ? answersAR : answersEN;
            const answer = answers[key] || (currentLanguage === 'ar' ? 'عذراً، لم أفهم السؤال' : 'Sorry, I didn\'t understand');
            addMessage(answer, 'assistant');
        }, 500);
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        if (sender === 'assistant') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">${formatMessage(text)}</div>
                <div class="message-time">${getCurrentTime()}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${text}</div>
                <div class="message-time">${getCurrentTime()}</div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/• /g, '<br>• ')
            .replace(/\n/g, '<br>');
    }
    
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
    }
    
    function toggleChatWindow() {
        chatWindow.classList.toggle('active');
        
        if (chatWindow.classList.contains('active')) {
            document.getElementById('chat-notification').style.display = 'none';
            
            if (!currentLanguage) {
                showLanguageSelection();
            }
        }
    }
    
    chatIcon.addEventListener('click', toggleChatWindow);
    closeChat.addEventListener('click', () => chatWindow.classList.remove('active'));
    
    sendMessage.addEventListener('click', () => {
        const text = chatInputField.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInputField.value = '';
            
            setTimeout(() => {
                const response = currentLanguage === 'ar' 
                    ? 'شكراً لسؤالك! يمكنك اختيار سؤال من القائمة أو التواصل مع الدعم الفني.' 
                    : 'Thanks for your question! You can choose from the list or contact support.';
                addMessage(response, 'assistant');
            }, 500);
        }
    });
    
    chatInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage.click();
        }
    });
    
    console.log('🤖 USDT-FLASH Chat System loaded with language selection!');
});
