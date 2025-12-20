document.addEventListener('DOMContentLoaded', function() {
    if (typeof notesData === 'undefined') return;

    const noteGrid = document.getElementById('noteGrid');
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const favCount = document.getElementById('favCount');

    // 1. RENDER DANH SÁCH CHÍNH (Loại bỏ hashtag độ khó)
    function renderAll() {
        const term = searchInput.value.toLowerCase();
        const cat = categorySelect.value;
        const favorites = JSON.parse(localStorage.getItem('favNotes')) || [];

        const filtered = notesData.filter(n => {
            return (cat === 'all' || n.category === cat) && (n.title.toLowerCase().includes(term));
        });

        noteGrid.innerHTML = filtered.map(n => `
            <div class="note-card collapsible animate-fade-in" id="note-${n.id}">
                <div class="note-header">
                    <h3>${n.title}</h3>
                    <div class="header-actions">
                        <i class="${favorites.includes(n.id) ? 'fas' : 'far'} fa-heart fav-btn" onclick="toggleFavorite(${n.id})"></i>
                    </div>
                </div>
                <div class="note-body">
                    <p class="answer">${n.answer}</p>
                    <div class="code-snippet">
                        <pre><code>${n.code.content}</code></pre>
                    </div>
                </div>
            </div>
        `).join('');

        if(favCount) favCount.innerText = favorites.length;
        setupAccordion();
    }

    // 2. XỬ LÝ YÊU THÍCH
    window.toggleFavorite = function(id) {
        let favorites = JSON.parse(localStorage.getItem('favNotes')) || [];
        favorites = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
        localStorage.setItem('favNotes', JSON.stringify(favorites));
        renderAll();
    };

    // 3. XUẤT PDF NỘI DUNG THUẦN (Đã sửa lỗi định dạng)
    // 3. XUẤT PDF NỘI DUNG THUẦN (Trích xuất logic từ archive.js và fix triệt để lỗi màu đen)
    window.exportPurePDF = function() {
        const term = searchInput.value.toLowerCase();
        const cat = categorySelect.value;
        
        const listToExport = notesData.filter(n => {
            return (cat === 'all' || n.category === cat) && (n.title.toLowerCase().includes(term));
        });

        if (listToExport.length === 0) return alert("Không có nội dung để xuất!");

        // Tạo container tạm thời để xuất PDF sạch (nền trắng tuyệt đối)
        const element = document.createElement('div');
        element.style.padding = '40px';
        element.style.backgroundColor = '#ffffff';
        element.style.color = '#000000';

        let html = `<h1 style="text-align:center; border-bottom: 2px solid #333; padding-bottom: 10px; font-family: Arial, sans-serif; color: #000000;">TÀI LIỆU GHI CHÚ CODE</h1>`;
        
        listToExport.forEach(n => {
            html += `
                <div style="margin-bottom: 30px; page-break-inside: avoid; font-family: Arial, sans-serif; background-color: #ffffff;">
                    <h2 style="color: #0056b3; margin-bottom: 5px; border-left: 5px solid #0056b3; padding-left: 10px;">${n.title}</h2>
                    <p style="font-size: 12px; color: #444444; margin-bottom: 10px;">Danh mục: ${n.category} | Ngôn ngữ: ${n.code.lang}</p>
                    <div style="margin-bottom: 10px; line-height: 1.5; color: #000000;">${n.answer}</div>
                    
                    <div style="background-color: #f4f4f4 !important; border: 1px solid #cccccc !important; padding: 15px; border-radius: 5px;">
                        <pre style="margin: 0; white-space: pre-wrap; font-family: 'Courier New', Courier, monospace; font-size: 11pt; color: #000000 !important; background: transparent !important; display: block !important;"><code style="color: #000000 !important;">${n.code.content}</code></pre>
                    </div>
                </div>
            `;
        });
        element.innerHTML = html;

        const opt = {
            margin: 10,
            filename: 'Tai-Lieu-Ghi-Chu-Tong-Hop.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { 
                scale: 2, 
                backgroundColor: '#ffffff', // Ngăn chặn nền canvas bị đen
                useCORS: true,
                logging: false
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Thực hiện xuất file
        html2pdf().set(opt).from(element).save();
    };

    // 4. ĐỒNG BỘ DỮ LIỆU (SAO LƯU & NHẬP FILE)
    window.downloadBackup = function() {
        const favorites = JSON.parse(localStorage.getItem('favNotes')) || [];
        if (favorites.length === 0) return alert("Kho lưu trữ trống!");

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `backup_notes.json`);
        downloadAnchor.click();
    };

    window.importBackup = function(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData)) {
                    localStorage.setItem('favNotes', JSON.stringify(importedData));
                    alert("Đồng bộ thành công!");
                    renderAll();
                }
            } catch (err) { alert("File không hợp lệ!"); }
        };
        reader.readAsText(file);
    };

    // CẤU CỨU ACCORDION & KHỞI TẠO
    function setupAccordion() {
        document.querySelectorAll('.note-header').forEach(h => {
            h.onclick = (e) => {
                if (e.target.classList.contains('fa-heart')) return;
                h.parentElement.classList.toggle('open');
            };
        });
    }

    const cats = ['all', ...new Set(notesData.map(n => n.category))];
    categorySelect.innerHTML = cats.map(c => `<option value="${c}">${c === 'all' ? 'Tất cả danh mục' : c}</option>`).join('');

    searchInput.oninput = renderAll;
    categorySelect.onchange = renderAll;
    renderAll();
});