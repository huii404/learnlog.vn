(function() {
    // Đường dẫn đến thư mục CSS và JS của widget
    const cssPath = 'css/news-widget/style.css'; 
    const jsPath = 'js/news-widget/';

    // 1. Nạp đúng file CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);

    // 2. Nạp Data và Logic
    const scripts = ['data.js', 'logic.js'];
    scripts.forEach(file => {
        const script = document.createElement('script');
        script.src = jsPath + file;
        script.async = false;
        document.body.appendChild(script);
    });
})();