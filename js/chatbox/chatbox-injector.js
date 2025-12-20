// js/chatbox/chatbox-injector.js

document.addEventListener('DOMContentLoaded', () => {
    async function loadChatbox() {
        try {
            // 1. Tải cấu trúc HTML từ file rời
            const response = await fetch('chatbox.html');
            if (!response.ok) throw new Error('Không thể tải file chatbox.html');
            const htmlContent = await response.text();
            document.body.insertAdjacentHTML('beforeend', htmlContent);

            // 2. Nhúng CSS vào Head
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/chatbox.css';
            document.head.appendChild(link);

            // 3. Danh sách Script cần nạp theo thứ tự
            // Nạp ghichu-data trước để Logic có thể truy cập dữ liệu ghi chú
            const scripts = [
                'js/note/ghichu-data.js',
                'js/chatbox/chatbox-data.js',
                'js/chatbox/chatbox-logic.js'
            ];

            for (const src of scripts) {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = false; // Đảm bảo thực thi đúng thứ tự nạp
                    script.onload = resolve;
                    script.onerror = () => {
                        console.warn(`Bỏ qua file không tồn tại: ${src}`);
                        resolve();
                    };
                    document.body.appendChild(script);
                });
            }
        } catch (error) {
            console.error('Lỗi khởi tạo Chatbox:', error);
        }
    }

    loadChatbox();
});