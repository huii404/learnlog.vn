function renderVlogMemories() {
    const grid = document.getElementById('vlogGrid');
    if (!grid) return;

    grid.innerHTML = VLOG_DATA.map(item => `
        <div class="memory-card animate-fade-in" onclick="openVlogDetail(${item.id})">
            ${item.type === 'video' ? '<div class="video-indicator"><i class="fas fa-play"></i></div>' : ''}
            <img src="${item.type === 'video' ? (item.thumbnail || item.src) : item.src}" alt="Memory">
            <div class="memory-caption">${item.title}</div>
        </div>
    `).join('');
}

function openVlogDetail(id) {
    const item = VLOG_DATA.find(v => v.id === id);
    const modal = document.getElementById('detailModal');
    const container = document.getElementById('modalMediaContainer');
    
    if (!item) return;

    // Hiển thị nội dung trong khung vuông
    container.innerHTML = `
        <div class="modal-content-media">
            ${item.type === 'video' 
                ? `<video src="${item.src}" id="mediaSource" controls autoplay loop class="modal-video"></video>`
                : `<img src="${item.src}" id="mediaSource" class="modal-img">`
            }
        </div>
        <button class="download-btn" onclick="downloadMedia('${item.src}', '${item.title}')">
            <i class="fas fa-download"></i> Tải về
        </button>
    `;

    document.getElementById('detailTitle').innerText = item.title;
    document.getElementById('detailCaption').innerText = item.caption;
    document.getElementById('detailDate').innerText = item.date;
    modal.style.display = 'flex';
}

// Chức năng tải về
async function downloadMedia(url, fileName) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName || 'ghost-code-memory';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        alert("Không thể tải tệp này. Hãy thử nhấn chuột phải và chọn Lưu.");
    }
}

function closeVlogDetail() {
    const modal = document.getElementById('detailModal');
    document.getElementById('modalMediaContainer').innerHTML = ''; 
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', renderVlogMemories);