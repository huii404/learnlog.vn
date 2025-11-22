document.addEventListener('DOMContentLoaded', function() {
    const noteGrid = document.getElementById('noteGrid');

    // ====================================================
    // KHO DỮ LIỆU GHI CHÚ (Thêm sửa xóa tại đây)
    // ====================================================
    const notesData = [
        {
            id: 1,
            icon: "fab fa-css3-alt", // Icon tiêu đề
            title: "Làm sao để căn giữa một thẻ Div?",
            answer: "Cách hiện đại và phổ biến nhất là sử dụng Flexbox hoặc Grid.",
            note: {
                type: "warning", // 'warning' (đỏ) hoặc 'info' (tím)
                text: "Lưu ý: Container cha bắt buộc phải có chiều cao (height) xác định nếu muốn căn giữa theo chiều dọc."
            },
            code: {
                lang: "CSS",
                content: `.parent {
    display: flex;
    justify-content: center; /* Ngang */
    align-items: center;     /* Dọc */
    height: 100vh;
}`
            }
        },
        {
            id: 2,
            icon: "fab fa-js",
            title: "Call API đơn giản với Fetch",
            answer: "Sử dụng fetch kết hợp với async/await để code gọn gàng hơn, dễ đọc hơn so với .then().",
            note: {
                type: "info",
                text: "Luôn nhớ bọc trong khối try/catch để bắt lỗi mạng hoặc lỗi server."
            },
            code: {
                lang: "JavaScript",
                content: `async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Lỗi rồi:', error);
    }
}`
            }
        },
        {
            id: 3,
            icon: "fab fa-html5",
            title: "Tạo chữ màu Gradient (7 màu)",
            answer: "Dùng background-clip: text để cắt nền theo hình dạng chữ, tạo hiệu ứng màu sắc độc đáo.",
            note: {
                type: "info",
                text: "Thuộc tính này hỗ trợ tốt trên hầu hết các trình duyệt hiện đại."
            },
            code: {
                lang: "CSS",
                content: `.gradient-text {
    background: linear-gradient(45deg, #ff00cc, #3333ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
}`
            }
        },
        // --- BẠN CÓ THỂ COPY KHỐI NÀY ĐỂ THÊM GHI CHÚ MỚI ---
        /*
        {
            id: 4,
            icon: "fas fa-code",
            title: "Tiêu đề ghi chú mới",
            answer: "Câu trả lời...",
            note: {
                type: "warning", 
                text: "Lưu ý..."
            },
            code: {
                lang: "Ngôn ngữ",
                content: `Code ở đây...`
            }
        },
        */
    ];

    // ====================================================
    // HÀM RENDER GIAO DIỆN (Không cần sửa phần này)
    // ====================================================
    function renderNotes() {
        if (!noteGrid) return;
        
        noteGrid.innerHTML = ''; // Xóa nội dung cũ nếu có

        notesData.forEach(item => {
            // Xử lý loại note (warning hay info) để đổi icon và class
            const noteClass = item.note.type === 'warning' ? 'note-warning' : 'note-info';
            const noteIcon = item.note.type === 'warning' ? 'fa-exclamation-circle' : 'fa-info-circle';
            const noteLabel = item.note.type === 'warning' ? 'Lưu ý:' : 'Note:';

            // Tạo HTML thẻ card
            const cardHTML = `
                <div class="note-card animate-fade-in">
                    <div class="note-header">
                        <i class="${item.icon}"></i>
                        <h3>${item.title}</h3>
                    </div>
                    <div class="note-body">
                        <p class="answer">${item.answer}</p>
                        
                        <div class="${noteClass}">
                            <i class="fas ${noteIcon}"></i>
                            <div><strong>${noteLabel}</strong> ${item.note.text}</div>
                        </div>

                        <div class="code-snippet">
                            <div class="code-header">
                                <span>${item.code.lang}</span>
                                <button class="copy-btn" onclick="copyCode(this)">Copy</button>
                            </div>
                            <pre><code>${escapeHtml(item.code.content)}</code></pre>
                        </div>
                    </div>
                </div>
            `;
            
            noteGrid.innerHTML += cardHTML;
        });
    }

    // Hàm xử lý ký tự đặc biệt trong code (để hiển thị đúng thẻ < >)
    function escapeHtml(text) {
        if (!text) return "";
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Chạy hàm render
    renderNotes();
});

// ====================================================
// TÍNH NĂNG COPY CODE (Thêm cho xịn sò)
// ====================================================
function copyCode(btn) {
    // Tìm thẻ pre code gần nút bấm nhất
    const codeBlock = btn.parentElement.nextElementSibling.querySelector('code');
    const textToCopy = codeBlock.innerText;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Copied!';
        btn.style.background = '#00ff9d';
        btn.style.color = '#000';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Copy thất bại:', err);
    });
}