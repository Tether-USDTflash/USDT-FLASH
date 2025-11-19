// نظام الدردشة البسيط
document.addEventListener('DOMContentLoaded', function() {
    // إنشاء عناصر الدردشة
    const chatHTML = `
        <div class="chat-icon" id="chatIcon">
            <i class="fas fa-comments"></i>
        </div>
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <h3>💬 مساعد USDT-FLASH</h3>
                <button class="close-chat" id="closeChat">×</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot">
                    مرحباً! كيف يمكنني مساعدتك اليوم؟
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="chatInput" placeholder="اكتب رسالتك...">
                <button id="sendBtn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    
    // العناصر
    const chatIcon = document.getElementById('chatIcon');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    // فتح/إغلاق الدردشة
    chatIcon.addEventListener('click', () => {
        chatWindow.classList.add('active');
    });
    
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
    
    // إرسال رسالة
    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        // رسالة المستخدم
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);
        
        chatInput.value = '';
        
        // رد تلقائي
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            botMsg.textContent = getResponse(text);
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // ردود بسيطة
    function getResponse(text) {
        text = text.toLowerCase();
        
        if (text.includes('سعر') || text.includes('price')) {
            return 'أسعارنا تبدأ من $29.99 للباقة الأساسية. تفضل بزيارة قسم الباقات للمزيد من التفاصيل.';
        }
        if (text.includes('شراء') || text.includes('buy')) {
            return 'يمكنك الشراء بسهولة من خلال اختيار الباقة المناسبة والدفع عبر USDT أو البطاقات البنكية.';
        }
        if (text.includes('أمان') || text.includes('security')) {
            return 'نحن نستخدم أعلى معايير الأمان مع تشفير SSL وحماية كاملة لبياناتك.';
        }
        if (text.includes('دعم') || text.includes('support')) {
            return 'فريق الدعم متاح 24/7 عبر البريد: support@usdt-flash.com';
        }
        
        return 'شكراً لتواصلك! يمكنك السؤال عن الأسعار، الشراء، الأمان، أو الدعم الفني.';
    }
});
