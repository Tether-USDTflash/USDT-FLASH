// معالج النقر على أزرار الباقات
function handlePackageClick(url) {
    // التحقق من نوع الرابط
    if (url.startsWith('#')) {
        // التمرير إلى القسم
        const element = document.querySelector(url);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else {
        // الانتقال إلى الصفحة
        window.location.href = url;
    }
}

// إضافة معالج للأزرار عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // معالجة جميع أزرار الباقات
    const packageButtons = document.querySelectorAll('[onclick*="handlePackageClick"]');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const onclickAttr = this.getAttribute('onclick');
            const match = onclickAttr.match(/handlePackageClick\(['"](.+?)['"]\)/);
            if (match && match[1]) {
                handlePackageClick(match[1]);
            }
        });
    });
});
