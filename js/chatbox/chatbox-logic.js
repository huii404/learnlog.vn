// js/chatbox/chatbox-logic.js

(function() {
    try {
        // Kiểm tra dữ liệu đầu vào
        if (typeof chatBotKnowledge === 'undefined') return;

        const toggleBtn = document.getElementById('chatboxToggle');
        const chatWindow = document.getElementById('chatboxWindow');
        const messagesContainer = document.getElementById('chatboxMessages');
        const inputField = document.getElementById('chatboxInput');
        const sendBtn = document.getElementById('chatboxSend');
        const suggestionsContainer = document.getElementById('chatboxSuggestions');
        const menuToggleBtn = document.getElementById('chatboxMenuToggle');

        // === 1. Thuật toán Fuzzy Search (Giữ nguyên từ bản gốc) ===
        function getSimilarity(s1, s2) {
            let longer = s1.toLowerCase(), shorter = s2.toLowerCase();
            if (s1.length < s2.length) [longer, shorter] = [shorter, longer];
            const longerLength = longer.length;
            if (longerLength === 0) return 1.0;
            const costs = [];
            for (let i = 0; i <= longer.length; i++) {
                let lastValue = i;
                for (let j = 0; j <= shorter.length; j++) {
                    if (i === 0) costs[j] = j;
                    else if (j > 0) {
                        let newValue = costs[j - 1];
                        if (longer.charAt(i - 1) !== shorter.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
                if (i > 0) costs[shorter.length] = lastValue;
            }
            return (longerLength - costs[shorter.length]) / parseFloat(longerLength);
        }

        // === 2. Xử lý phản hồi thông minh (TÍNH NĂNG 4) ===
        function getBotResponse(userInput) {
            const inputLower = userInput.toLowerCase();

            // Ưu tiên 1: Tìm trong kho dữ liệu Ghi chú (noteData)
            if (typeof noteData !== 'undefined' && Array.isArray(noteData)) {
                const matchedNote = noteData.find(note => 
                    note.title.toLowerCase().includes(inputLower) || 
                    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(inputLower)))
                );
                if (matchedNote) {
                    return { 
                        response: `Tôi tìm thấy tài liệu: **${matchedNote.title}**. <br>Bạn có thể tìm kiếm tên này ở trang Ghi chú nhé! 📚` 
                    };
                }
            }

            // Ưu tiên 2: Tìm trong kiến thức Chatbot
            let bestMatch = null, highestSimilarity = 0;
            for (const item of chatBotKnowledge) {
                for (const keyword of item.keywords) {
                    const kw = keyword.toLowerCase();
                    if (inputLower.includes(kw)) return item;
                    const sim = getSimilarity(inputLower, kw);
                    if (sim > highestSimilarity) { highestSimilarity = sim; bestMatch = item; }
                }
            }
            
            return highestSimilarity >= 0.65 ? bestMatch : { response: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] };
        }

        // === 3. Gợi ý theo ngữ cảnh (TÍNH NĂNG 3) ===
        function renderSuggestions() {
            const path = window.location.pathname;
            let chips = ["Báo cáo lỗi", "Mấy giờ rồi?"];

            // Thay đổi gợi ý dựa trên trang đang đứng
            if (path.includes("ghichu.html")) {
                chips = ["Tìm ghi chú", "Cách xuất PDF", ...chips];
            } else if (path.includes("sanpham.html")) {
                chips = ["Tải Tool", "Source code", ...chips];
            } else {
                chips = ["Chứng chỉ", "Liên hệ Admin", ...chips];
            }

            suggestionsContainer.innerHTML = '';
            chips.forEach(txt => {
                const chip = document.createElement('div');
                chip.className = 'suggestion-chip';
                chip.textContent = txt;
                chip.onclick = () => {
                    inputField.value = txt;
                    sendMessage();
                };
                suggestionsContainer.appendChild(chip);
            });
            suggestionsContainer.classList.remove('hidden');
        }

        // === 4. Hiển thị UI & Xử lý đặc biệt ===
        function handleSpecialFunctions(response) {
            let result = response;
            if (result.includes("[CURRENT_TIME]")) {
                const now = new Date();
                result = result.replace("[CURRENT_TIME]", now.toLocaleString('vi-VN'));
            }
            if (result.includes("[report]")) {
                result = result.replace("[report]", '<a href="https://forms.gle/HJgQJqUbmeMbVoYQ9" target="_blank" style="color:#03dac6">Bấm vào đây để báo lỗi</a>');
            }
            return result;
        }

        function renderMessageUI(text, type) {
            const wrapper = document.createElement('div');
            wrapper.className = `message-wrapper ${type === 'bot-message' ? 'bot-wrapper' : 'user-wrapper'}`;
            wrapper.innerHTML = `<div class="message ${type}">${text}</div>`;
            messagesContainer.appendChild(wrapper);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function sendMessage() {
            const text = inputField.value.trim();
            if (!text) return;

            renderMessageUI(text, 'user-message');
            inputField.value = '';
            suggestionsContainer.classList.add('hidden');

            setTimeout(() => {
                const res = getBotResponse(text);
                const content = handleSpecialFunctions(res.response);
                renderMessageUI(content, 'bot-message');
            }, 600);
        }

        // === 5. Gán sự kiện ===
        sendBtn.onclick = sendMessage;
        inputField.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
        
        toggleBtn.onclick = () => {
            const isHidden = chatWindow.style.display === 'none';
            chatWindow.style.display = isHidden ? 'flex' : 'none';
            if (isHidden) renderSuggestions(); // Hiện gợi ý ngay khi mở
        };

        menuToggleBtn.onclick = () => {
            suggestionsContainer.classList.toggle('hidden');
            if (!suggestionsContainer.classList.contains('hidden')) renderSuggestions();
        };

        document.getElementById('chatboxClose').onclick = () => {
            chatWindow.style.display = 'none';
        };

    } catch (e) { console.error("Chatbox Logic Error:", e); }
})();