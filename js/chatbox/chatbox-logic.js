// js/chatbox/chatbox-logic.js

// Bỏ qua sự kiện DOMContentLoaded vì chatbox-injector.js đã xử lý thứ tự tải,
// nhưng chúng ta sẽ bọc bằng try/catch và kiểm tra tính hợp lệ của phần tử.

(function() {
    try {
        // Đảm bảo chatBotKnowledge và defaultResponses đã được load từ chatbox-data.js
        if (typeof chatBotKnowledge === 'undefined' || typeof defaultResponses === 'undefined') {
            console.error('Lỗi: Không tìm thấy dữ liệu chatBotKnowledge hoặc defaultResponses. Kiểm tra chatbox-data.js.');
            return;
        }

        // === 1. DOM Elements ===
        const toggleBtn = document.getElementById('chatboxToggle');
        const closeBtn = document.getElementById('chatboxClose');
        const chatWindow = document.getElementById('chatboxWindow');
        const messagesContainer = document.getElementById('chatboxMessages');
        const inputField = document.getElementById('chatboxInput');
        const sendBtn = document.getElementById('chatboxSend');
        const badge = document.getElementById('chatboxBadge');
        const suggestionsContainer = document.getElementById('chatboxSuggestions'); 
        const menuToggleBtn = document.getElementById('chatboxMenuToggle');
        
        // Kiểm tra tất cả các phần tử quan trọng
        if (!toggleBtn || !chatWindow || !messagesContainer || !inputField || !sendBtn || !suggestionsContainer || !menuToggleBtn) {
            console.error('Lỗi: Không tìm thấy ít nhất một phần tử DOM chính của Chatbox.');
            if(toggleBtn) toggleBtn.style.display = 'block'; 
            return;
        }


        // === 2. Giao diện & Trạng thái ===
        let isChatOpen = false;
        let isSuggestionsVisible = false; 

        // Các gợi ý ban đầu (hiển thị khi bấm nút Dấu +)
        const initialSuggestions = ["báo cáo lỗi", "Time", "Liên hệ", "Tải app về"]; 

        if (badge) badge.style.display = 'block';

        // --- Gắn Sự kiện Toggle (Mở/Đóng) ---
        toggleBtn.addEventListener('click', () => {
            isChatOpen = !isChatOpen;
            chatWindow.style.display = isChatOpen ? 'flex' : 'none';
            if (isChatOpen) {
                if (badge) badge.style.display = 'none';
                scrollToBottom();
                inputField.focus();
            } else {
                // Đóng cửa sổ chat thì ẩn suggestions
                suggestionsContainer.classList.add('hidden');
                isSuggestionsVisible = false;
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                isChatOpen = false;
                chatWindow.style.display = 'none';
                suggestionsContainer.classList.add('hidden'); // Ẩn khi đóng
                isSuggestionsVisible = false;
            });
        }
        
        // --- Gắn Sự kiện cho nút Dấu + (Menu Toggle) ---
        if (menuToggleBtn) {
            menuToggleBtn.addEventListener('click', () => {
                isSuggestionsVisible = !isSuggestionsVisible;
                if (isSuggestionsVisible) {
                    renderSuggestions(initialSuggestions);
                } else {
                    suggestionsContainer.classList.add('hidden');
                }
            });
        }

        // === 3. Xử lý Gợi ý (Suggestions) ===

        function renderSuggestions(suggestions) {
            suggestionsContainer.innerHTML = '';
            if (suggestions && suggestions.length > 0) {
                suggestions.forEach(text => {
                    const chip = document.createElement('div');
                    chip.className = 'suggestion-chip';
                    chip.textContent = text;
                    chip.dataset.keyword = text;
                    
                    chip.addEventListener('click', handleSuggestionClick);
                    suggestionsContainer.appendChild(chip);
                });
                suggestionsContainer.classList.remove('hidden'); 
                scrollToBottom();
            } else {
                suggestionsContainer.classList.add('hidden');
            }
        }

        function handleSuggestionClick(event) {
            const keyword = event.target.dataset.keyword;
            
            appendMessage(keyword, 'user-message', false);
            scrollToBottom();
            
            suggestionsContainer.classList.add('hidden');
            isSuggestionsVisible = false;

            setTimeout(() => {
                // Lấy toàn bộ kết quả (bao gồm response và sound)
                const botResult = getBotResponse(keyword); 
                
                // Lấy và xử lý response (thay thế [CURRENT_TIME] hoặc [report])
                let botResponse = handleSpecialFunctions(botResult.response); 
                
                // PHÁT MP3 (nếu có)
                if (botResult.sound) {
                    playSoundEffect(botResult.sound);
                }
                
                appendMessage(botResponse, 'bot-message', true);
                scrollToBottom();
            }, 800);
        }


        // === 4. Xử lý Tin nhắn Người dùng (Text Message Logic) ===
        
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
        sendBtn.addEventListener('click', sendMessage);

        function sendMessage() {
            const text = inputField.value.trim();
            if (text === "") return;

            appendMessage(text, 'user-message', false);
            inputField.value = '';
            scrollToBottom();
            
            suggestionsContainer.classList.add('hidden');
            isSuggestionsVisible = false;

            setTimeout(() => {
                // Lấy toàn bộ kết quả (bao gồm response và sound)
                const botResult = getBotResponse(text); 
                
                // Lấy và xử lý response
                let botResponse = handleSpecialFunctions(botResult.response); 
                
                // PHÁT MP3 (nếu có)
                if (botResult.sound) {
                    playSoundEffect(botResult.sound);
                }
                
                appendMessage(botResponse, 'bot-message', true);
                scrollToBottom();
            }, 800);
        }

        
        // === 5. Các Hàm Tiện ích & Xử lý Đặc biệt ===

        function appendMessage(text, type, useHtml = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            
            if (useHtml) {
                messageDiv.innerHTML = `<p>${text}</p>`;
            } else {
                const p = document.createElement('p');
                p.textContent = text;
                messageDiv.appendChild(p);
            }
            
            messagesContainer.appendChild(messageDiv);
        }

        function scrollToBottom() {
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
        
        function playSoundEffect(filePath) {
            // Sử dụng đối tượng Audio để phát file MP3 cục bộ (web thuần FE)
            if (filePath) {
                try {
                    const audio = new Audio(filePath);
                    audio.play().catch(e => console.error("Không thể phát âm thanh:", e));
                } catch (e) {
                    console.error("Lỗi tạo Audio object:", e);
                }
            }
        }

        function handleSpecialFunctions(response) {
            let result = response;

            if (result.includes("[CURRENT_TIME]")) {
                const timeString = getCurrentTimeFormatted();
                result = result.replace("[CURRENT_TIME]", timeString);
            }
            
            if (result.includes("[report]")) {
                const reportLink = 'https://forms.gle/HJgQJqUbmeMbVoYQ9'; 
                const reportText = `Vui lòng báo cáo lỗi tại đây: <a href="${reportLink}" target="_blank" style="color: #03dac6; font-weight: bold;">Mẫu Báo cáo Lỗi</a>.`;
                result = result.replace("[report]", reportText);
            }

            return result;
        }

        function getCurrentTimeFormatted() {
            const now = new Date();
            
            const date = now.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            const time = now.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false 
            });
            
            const dayOfWeek = now.toLocaleDateString('vi-VN', { weekday: 'long' });

            return `${time} - ${date} (${dayOfWeek}).`;
        }


        // === 6. Logic Bot (Rule-based) - Đã cập nhật để trả về object ===
        function getBotResponse(userInput) {
            const inputLower = userInput.toLowerCase();
            let bestMatch = null;
            let longestKeywordLength = 0; 

            for (const item of chatBotKnowledge) {
                for (const keyword of item.keywords) {
                    const keywordLower = keyword.toLowerCase();

                    // Tìm từ khóa dài nhất khớp
                    if (inputLower.includes(keywordLower) && keywordLower.length > longestKeywordLength) {
                        
                        longestKeywordLength = keywordLower.length;
                        bestMatch = item;
                    }
                }
            }
            
            if (bestMatch) {
                // Trả về toàn bộ đối tượng (bao gồm response và sound)
                return bestMatch; 
            }

            const randomIndex = Math.floor(Math.random() * defaultResponses.length);
            // Trả về một đối tượng đơn giản cho phản hồi mặc định
            return { response: defaultResponses[randomIndex] }; 
        }

    } catch (e) {
        console.error('Lỗi nghiêm trọng khi khởi tạo Chatbox logic:', e);
        // Nếu có lỗi, đảm bảo nút toggle bị ẩn để tránh trải nghiệm người dùng tệ
        const toggleBtn = document.getElementById('chatboxToggle');
        if(toggleBtn) toggleBtn.style.display = 'none';
    }
})();