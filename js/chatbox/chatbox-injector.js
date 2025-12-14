// js/chatbox/chatbox-injector.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Hàm tải file HTML cục bộ
    function loadChatboxHtml() {
        fetch('chatbox.html') // Giả sử chatbox.html nằm cùng cấp với index.html, sanpham.html...
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Không thể tải chatbox.html: ${response.statusText}`);
                }
                return response.text();
            })
            .then(htmlContent => {
                // 1. Nhúng nội dung HTML đã tải vào cuối body
                document.body.insertAdjacentHTML('beforeend', htmlContent);

                // 2. Dynamic import CSS và JS Logic
                
                // Nhúng CSS
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'css/chatbox.css'; 
                document.head.appendChild(link);
                
                // Nhúng Data
                const dataScript = document.createElement('script');
                dataScript.src = 'js/chatbox/chatbox-data.js'; 
                dataScript.onload = () => {
                    // Nhúng Logic sau khi Data đã tải xong
                    const logicScript = document.createElement('script');
                    logicScript.src = 'js/chatbox/chatbox-logic.js'; 
                    document.body.appendChild(logicScript);
                };
                document.body.appendChild(dataScript);

            })
            .catch(error => {
                console.error('Lỗi khi tải hoặc nhúng Chatbox:', error);
            });
    }

    loadChatboxHtml();
});