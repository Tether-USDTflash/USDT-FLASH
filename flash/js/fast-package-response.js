// تحسين استجابة أزرار الباقات للضغط الفوري
document.addEventListener('DOMContentLoaded', function() {
    const packageButtons = document.querySelectorAll('.package-card button, .pricing-card button, .tether-action-button, .package-btn');
    
    packageButtons.forEach(button => {
        // إزالة أي تأخير في اللمس
        button.style.touchAction = 'manipulation';
        button.style.webkitTapHighlightColor = 'transparent';
        
        // استجابة فورية للضغط
        button.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.97)';
            this.style.transition = 'transform 0.05s ease';
        }, {passive: true});
        
        button.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                this.style.transition = '';
            }, 50);
        }, {passive: true});
        
        // استجابة للماوس أيضاً
        button.addEventListener('mousedown', function(e) {
            this.style.transform = 'scale(0.97)';
        });
        
        button.addEventListener('mouseup', function(e) {
            this.style.transform = 'scale(1)';
        });
    });
});
