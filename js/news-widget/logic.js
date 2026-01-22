(function() {
    function init() {
        if (document.getElementById('nwContainer')) return;

        // 1. Logic sắp xếp ngày mới nhất lên trên
        const sortedData = [...newsWidgetData].sort((a, b) => {
            const dateA = new Date(a.title.split('/').reverse().join('-'));
            const dateB = new Date(b.title.split('/').reverse().join('-'));
            return dateB - dateA;
        });

        const container = document.createElement('div');
        container.id = 'nwContainer';
        container.className = 'nw-anchor';
        
        const newsCount = sortedData.length;

        // 2. Hàm lấy label và class cho hashtag
        const getTagInfo = (type) => {
            const tags = {
                'update': { label: '#UPDATE', class: 'tag-update' },
                'hot': { label: '#HOT', class: 'tag-hot' },
                'fix': { label: '#FIX', class: 'tag-fix' },
                'new': { label: '#NEW', class: 'tag-new' }
            };
            return tags[type] || { label: '#INFO', class: 'tag-default' };
        };

        const items = sortedData.map(item => {
            const tag = getTagInfo(item.type);
            return `
                <a href="${item.link}" class="nw-card">
                    <div class="nw-tag-row">
                        <span class="nw-tag ${tag.class}">${tag.label}</span>
                        <small class="nw-date">${item.title}</small>
                    </div>
                    <p class="nw-desc">${item.desc}</p>
                </a>
            `;
        }).join('');

        // Giữ nguyên phần innerHTML cũ nhưng cập nhật biến hiển thị
        container.innerHTML = `
            <div class="nw-panel" id="nwPanel">
                <div class="nw-header">
                    <span><i class="fas fa-bolt"></i> Bản tin</span>
                    <i class="fas fa-times" id="nwClose"></i>
                </div>
                <div class="nw-scroll-area">${items}</div>
            </div>
            <div class="nw-bubble" id="nwToggle">
                <i class="fas fa-newspaper"></i>
                ${newsCount > 0 ? `<span class="nw-badge">${newsCount}</span>` : ''}
            </div>
        `;
        document.body.appendChild(container);

        // Logic đóng mở (Giữ nguyên từ logic.js cũ)
        document.getElementById('nwToggle').onclick = (e) => {
            document.getElementById('nwPanel').classList.toggle('active');
            e.stopPropagation();
        };
        document.getElementById('nwClose').onclick = () => {
            document.getElementById('nwPanel').classList.remove('active');
        };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();