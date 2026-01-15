(function() {
    function init() {
        if (document.getElementById('nwContainer')) return;

        const container = document.createElement('div');
        container.id = 'nwContainer';
        container.className = 'nw-anchor';
        
        // Loại bỏ phần hiển thị tag ở đây
        const items = newsWidgetData.map(item => `
            <a href="${item.link}" class="nw-card">
                <strong class="nw-title">${item.title}</strong>
                <p class="nw-desc">${item.desc}</p>
            </a>
        `).join('');

        container.innerHTML = `
            <div class="nw-panel" id="nwPanel">
                <div class="nw-header">
                    <span><i class="fas fa-bolt"></i> Bản tin</span>
                    <i class="fas fa-times" style="cursor:pointer" id="nwClose"></i>
                </div>
                <div style="max-height: 350px; overflow-y: auto;">${items}</div>
            </div>
            <div class="nw-bubble" id="nwToggle">
                <i class="fas fa-newspaper"></i>
            </div>
        `;
        document.body.appendChild(container);

        // Logic đóng mở (giữ nguyên)
        document.getElementById('nwToggle').onclick = (e) => {
            document.getElementById('nwPanel').classList.toggle('active');
            e.stopPropagation();
        };

        document.getElementById('nwClose').onclick = () => {
            document.getElementById('nwPanel').classList.remove('active');
        };

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                document.getElementById('nwPanel').classList.remove('active');
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();