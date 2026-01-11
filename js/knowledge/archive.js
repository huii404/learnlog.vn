document.addEventListener("DOMContentLoaded", function () {
  renderArchive();
  renderQuickNotes();
});

// ==================== KHO CHÍNH ====================
function renderArchive() {
  const favorites = JSON.parse(localStorage.getItem("favNotes")) || [];
  const archivedNotes = notesData.filter((n) => favorites.includes(n.id));

  const archiveGrid = document.getElementById("archiveGrid");

  if (archivedNotes.length === 0) {
    archiveGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #8c78a6;">
        <i class="fas fa-inbox" style="font-size: 4rem; margin-bottom: 20px;"></i>
        <p>Kho chính đang trống!</p>
      </div>`;
    return;
  }

  archiveGrid.innerHTML = archivedNotes
    .map(
      (n) => `
    <div class="note-card open animate-fade-in">
      <div class="note-header">
        <h3>${n.title}</h3>
        <div class="header-actions">
          <i class="fas fa-trash-alt" onclick="removeFromArchive(${n.id})" style="color: #ff5252; cursor: pointer;" title="Xóa khỏi kho"></i>
        </div>
      </div>
      <div class="note-body">
        <p class="answer">${n.answer}</p>
        <div class="code-snippet">
          <pre><code>${n.code.content}</code></pre>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

window.removeFromArchive = function (id) {
  let favorites = JSON.parse(localStorage.getItem("favNotes")) || [];
  favorites = favorites.filter((f) => f !== id);
  localStorage.setItem("favNotes", JSON.stringify(favorites));
  renderArchive();
};

// ==================== GHI CHÚ NHANH ====================
// Sử dụng timestamp làm key duy nhất → tránh lỗi index khi xóa
function renderQuickNotes() {
  let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];

  const grid = document.getElementById("quickNotesGrid");
  const badge = document.getElementById("quickCountBadge");

  badge.textContent = quickNotes.length;

  if (quickNotes.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #8c78a6;">
        <i class="fas fa-sticky-note" style="font-size: 4rem; margin-bottom: 20px;"></i>
        <p>Chưa có ghi chú nhanh nào</p>
      </div>`;
    return;
  }

  // Sắp xếp mới nhất lên đầu
  quickNotes.sort((a, b) => b.timestamp - a.timestamp);

  grid.innerHTML = quickNotes
    .map(
      (n) => `
    <div class="note-card open animate-fade-in" data-timestamp="${n.timestamp}">
      <div class="note-header">
        <h3>${n.title} <small style="color:#00ff9d;">(tự tạo)</small></h3>
        <div class="header-actions">
          <i class="fas fa-trash-alt" onclick="removeQuickNote(${n.timestamp})" style="color: #ff5252; cursor: pointer;" title="Xóa"></i>
        </div>
      </div>
      <div class="note-body">
        ${n.answer ? `<p class="answer">${n.answer}</p>` : ""}
        ${n.code ? `<div class="code-snippet"><pre><code>${n.code}</code></pre></div>` : ""}
      </div>
    </div>
  `
    )
    .join("");
}

window.addQuickNote = function () {
  const title = document.getElementById("quickTitle").value.trim();
  const answer = document.getElementById("quickAnswer").value.trim();
  const code = document.getElementById("quickCode").value.trim();

  if (!title) {
    alert("Hãy nhập tiêu đề ghi chú!");
    return;
  }

  let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];
  quickNotes.unshift({
    title,
    answer: answer || null,
    code: code || null,
    timestamp: Date.now(),
  });

  localStorage.setItem("quickNotes", JSON.stringify(quickNotes));

  // Reset form
  document.getElementById("quickTitle").value = "";
  document.getElementById("quickAnswer").value = "";
  document.getElementById("quickCode").value = "";

  renderQuickNotes();
};

// Xóa bằng timestamp → chính xác 100%, không sợ lệch index
window.removeQuickNote = function (timestamp) {
  let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];
  quickNotes = quickNotes.filter((n) => n.timestamp !== timestamp);
  localStorage.setItem("quickNotes", JSON.stringify(quickNotes));
  renderQuickNotes();
};

// ==================== XUẤT PDF (SỬA LỖI TAB) ====================
window.exportArchivePDF = function () {
    // 1. Lấy dữ liệu thực tế (Lấy từ nguồn data, không lấy từ giao diện)
    const activeTabBtn = document.querySelector(".tab-btn.active");
    const isQuickTab = activeTabBtn && activeTabBtn.innerText.includes("Ghi Chú Nhanh");
    
    let dataToExport = [];
    let reportTitle = "";

    if (isQuickTab) {
        dataToExport = JSON.parse(localStorage.getItem("quickNotes")) || [];
        reportTitle = "BÁO CÁO GHI CHÚ NHANH (QUICK NOTES)";
    } else {
        const favorites = JSON.parse(localStorage.getItem("favNotes")) || [];
        // notesData lấy từ file knowledge-data.js đã import
        dataToExport = notesData.filter(n => favorites.includes(n.id));
        reportTitle = "DANH SÁCH KIẾN THỨC ĐÃ LƯU TRỮ";
    }

    if (dataToExport.length === 0) {
        return alert("Không có dữ liệu để xuất file!");
    }

    // 2. Tạo nội dung HTML thuần cho bản PDF (Clean Design)
    let pdfContent = `
        <div style="padding: 20px; font-family: 'Arial', sans-serif; color: #000; background: #fff;">
            <h1 style="text-align: center; color: #333; text-transform: uppercase; border-bottom: 2px solid #333; padding-bottom: 10px;">
                ${reportTitle}
            </h1>
            <p style="text-align: right; font-style: italic; font-size: 12px;">Ngày xuất: ${new Date().toLocaleString('vi-VN')}</p>
    `;

    dataToExport.forEach((item, index) => {
        pdfContent += `
            <div style="margin-bottom: 30px; border: 1px solid #eee; padding: 15px; border-radius: 5px; page-break-inside: avoid;">
                <h2 style="margin-top: 0; color: #d63384; font-size: 18px;">${index + 1}. ${item.title}</h2>
                <div style="margin: 10px 0; line-height: 1.5; color: #333;">
                    <strong>Nội dung:</strong><br>
                    ${item.answer || "Không có mô tả"}
                </div>
                ${item.code ? `
                    <div style="background: #f8f9fa; border-left: 4px solid #bb86fc; padding: 10px; font-family: 'Courier New', monospace; font-size: 13px; white-space: pre-wrap;">
                        ${typeof item.code === 'object' ? item.code.content : item.code}
                    </div>
                ` : ""}
            </div>
        `;
    });

    pdfContent += `</div>`;

    // 3. Tạo phần tử tạm thời nhưng ẨN HOÀN TOÀN với người dùng
    const workerDiv = document.createElement("div");
    workerDiv.style.position = "fixed";
    workerDiv.style.top = "0";
    workerDiv.style.left = "-9999px"; // Đẩy ra ngoài màn hình thay vì phủ lên trên
    workerDiv.style.width = "800px";
    workerDiv.innerHTML = pdfContent;
    document.body.appendChild(workerDiv);

    // 4. Cấu hình html2pdf để xử lý mượt mà
    const opt = {
        margin: 10,
        filename: isQuickTab ? 'Quick-Notes.pdf' : 'Knowledge-Archive.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            letterRendering: true 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Thực hiện chuyển đổi
    html2pdf().set(opt).from(workerDiv).save().then(() => {
        document.body.removeChild(workerDiv); // Xóa bỏ ngay sau khi xong
    }).catch(err => {
        console.error("Lỗi xuất PDF:", err);
        alert("Có lỗi xảy ra khi tạo file PDF!");
    });
};
// ==================== SAO LƯU & KHÔI PHỤC ====================
window.downloadBackup = function () {
  const favorites = JSON.parse(localStorage.getItem("favNotes")) || [];
  const quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];

  if (favorites.length === 0 && quickNotes.length === 0) {
    return alert("Kho lưu trữ trống!");
  }

  const backupData = {
    favNotes: favorites,
    quickNotes: quickNotes,
    timestamp: new Date().toISOString(),
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData));
  const a = document.createElement("a");
  a.href = dataStr;
  a.download = `backup_archive_${Date.now()}.json`;
  a.click();
};

window.importBackup = function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);

      if (data.favNotes !== undefined) localStorage.setItem("favNotes", JSON.stringify(data.favNotes));
      if (data.quickNotes !== undefined) localStorage.setItem("quickNotes", JSON.stringify(data.quickNotes));

      renderArchive();
      renderQuickNotes();
      alert("Đồng bộ thành công! Đã tải lại dữ liệu.");
    } catch (err) {
      alert("File backup không hợp lệ!");
    }
  };
  reader.readAsText(file);
};

window.clearAllArchive = function () {
  if (confirm("Xóa toàn bộ kho lưu trữ (cả kho chính và ghi chú nhanh)? Không thể hoàn tác!")) {
    localStorage.removeItem("favNotes");
    localStorage.removeItem("quickNotes");
    renderArchive();
    renderQuickNotes();
    alert("Đã xóa sạch!");
  }
};