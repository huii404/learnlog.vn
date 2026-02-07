/**
 * Personal Notes System - Logic Controller
 * Các tính năng: CRUD, LocalStorage, Backup/Sync JSON, Progress Tracker
 */

document.addEventListener("DOMContentLoaded", () => {
  // Khai báo các phần tử DOM
  const noteGrid = document.getElementById("noteGrid");
  const noteModal = document.getElementById("noteModal");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const noteSearch = document.getElementById("noteSearch");
  const dateFilter = document.getElementById("dateFilter");

  // Tải dữ liệu từ LocalStorage
  let notes = JSON.parse(localStorage.getItem("my_personal_notes")) || [];
  let editId = null; // Biến tạm lưu ID khi đang sửa ghi chú

  // --- TIỆN ÍCH HỖ TRỢ ---
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const saveToLocal = () =>
    localStorage.setItem("my_personal_notes", JSON.stringify(notes));

  // --- HÀM HIỂN THỊ (RENDER) ---
  function renderNotes(searchTerm = "", searchDate = "") {
    noteGrid.innerHTML = "";

    // Lọc ghi chú dựa trên từ khóa tìm kiếm và ngày tháng
    const filtered = notes.filter((n) => {
      const matchesText =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = searchDate ? n.date === searchDate : true;
      return matchesText && matchesDate;
    });

    if (filtered.length === 0) {
      noteGrid.innerHTML =
        '<div class="loading-text">Không có dữ liệu ghi chú.</div>';
      return;
    }

    // Sắp xếp ghi chú: Mới nhất (dựa trên ID/thời gian tạo) lên đầu
    filtered
      .sort((a, b) => b.id - a.id)
      .forEach((note) => {
        const card = document.createElement("div");
        card.className = "note-card animate-pop-in";

        // Logic màu sắc thanh tiến độ dựa trên %
        const prog = parseInt(note.progress) || 0;

card.innerHTML = `
    <div class="note-header">
        <span class="note-date"><i class="far fa-calendar-alt"></i> ${note.date}</span>
    </div>
    
    <h3 class="note-title-text">${note.title}</h3>
    
    <p class="note-body-text">${note.content.replace(/\n/g, '<br>')}</p>
    
    <div class="progress-container">
        <div class="progress-bar" style="width: ${prog}%">
            <span class="progress-text-inside">${prog}%</span>
        </div>
    </div>
    
    <div class="note-actions">
        <button onclick="editNote('${note.id}')" class="btn-icon edit" title="Chỉnh sửa">
            <i class="fas fa-edit"></i>
        </button>
        <button onclick="deleteNote('${note.id}')" class="btn-icon delete" title="Xóa">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`;
        noteGrid.appendChild(card);
      });
  }

  // --- THAO TÁC CƠ BẢN (CRUD) ---

  // Mở Modal Thêm mới
  document.getElementById("addNoteBtn").onclick = () => {
    editId = null;
    document.getElementById("modalTitle").innerText = "Ghi chú mới";
    document.getElementById("noteTitleInput").value = "";
    document.getElementById("noteContentInput").value = "";
    document.getElementById("noteProgressInput").value = 0;
    document.getElementById("progVal").innerText = 0;

    // Logic: Tự động điền ngày hiện tại
    document.getElementById("noteDateInput").value = getTodayDate();

    noteModal.classList.add("active");
  };

  // Lưu Ghi chú (Thêm hoặc Cập nhật)
  saveNoteBtn.onclick = () => {
    const title = document.getElementById("noteTitleInput").value.trim();
    const content = document.getElementById("noteContentInput").value.trim();
    const progress = document.getElementById("noteProgressInput").value;
    const date = document.getElementById("noteDateInput").value;

    if (!title || !content || !date) {
      alert("Vui lòng nhập đầy đủ tiêu đề, nội dung và ngày!");
      return;
    }

    if (editId) {
      // Cập nhật ghi chú cũ
      const idx = notes.findIndex((n) => n.id === editId);
      if (idx !== -1) {
        notes[idx] = { ...notes[idx], title, content, progress, date };
      }
      editId = null;
    } else {
      // Thêm ghi chú mới
      notes.push({
        id: Date.now().toString(), // Dùng timestamp làm ID duy nhất
        title,
        content,
        progress,
        date,
      });
    }

    saveToLocal();
    closeNoteModal();
    renderNotes();
  };

  // Sửa ghi chú (Đưa dữ liệu vào Modal)
  window.editNote = (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    editId = id;
    document.getElementById("modalTitle").innerText = "Chỉnh sửa ghi chú";
    document.getElementById("noteTitleInput").value = note.title;
    document.getElementById("noteContentInput").value = note.content;
    document.getElementById("noteProgressInput").value = note.progress;
    document.getElementById("progVal").innerText = note.progress;
    document.getElementById("noteDateInput").value = note.date;

    noteModal.classList.add("active");
  };

  // Xóa ghi chú
  window.deleteNote = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa ghi chú này?")) {
      notes = notes.filter((n) => n.id !== id);
      saveToLocal();
      renderNotes();
    }
  };

  window.closeNoteModal = () => {
    noteModal.classList.remove("active");
  };

  // --- QUẢN LÝ DỮ LIỆU NÂNG CAO ---

  // 1. Xuất dữ liệu ra file JSON
  window.exportNotes = () => {
    if (notes.length === 0) return alert("Không có dữ liệu để backup!");

    const dataStr = JSON.stringify(notes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `dev_notes_backup_${getTodayDate()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 2. Nhập dữ liệu từ file JSON (Sync)
  window.importNotes = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (!Array.isArray(importedData)) throw new Error();

        // Kiểm tra trùng lặp ID để tránh ghi đè dữ liệu cũ
        const currentIds = new Set(notes.map((n) => n.id));
        const uniqueNewItems = importedData.filter(
          (item) => !currentIds.has(item.id),
        );

        if (uniqueNewItems.length === 0) {
          alert("Tất cả dữ liệu trong file đã tồn tại trên web.");
          return;
        }

        notes = [...notes, ...uniqueNewItems];
        saveToLocal();
        renderNotes();
      } catch (err) {
        alert("Lỗi: File không đúng định dạng backup của hệ thống!");
      }
      e.target.value = ""; // Reset input file
    };
    reader.readAsText(file);
  };

  // 3. Xóa sạch LocalStorage
  window.clearAllData = () => {
    const password = confirm(
      "Hành động này sẽ XÓA VĨNH VIỄN toàn bộ ghi chú trên trình duyệt này. Bạn chắc chắn chứ?",
    );
    if (password) {
      notes = [];
      localStorage.removeItem("my_personal_notes");
      renderNotes();
    }
  };

  // --- TÌM KIẾM & LỌC ---
  noteSearch.addEventListener("input", () => {
    renderNotes(noteSearch.value, dateFilter.value);
  });

  dateFilter.addEventListener("change", () => {
    renderNotes(noteSearch.value, dateFilter.value);
  });

  // Khởi chạy lần đầu
  renderNotes();
  const settingsToggle = document.getElementById("settingsToggle");
    const settingsDropdown = document.getElementById("settingsDropdown");

    // 1. Logic Đóng/Mở Menu
    settingsToggle.onclick = (e) => {
        e.stopPropagation();
        settingsDropdown.classList.toggle("active");
    };

    // Click ra ngoài menu thì tự động đóng
    document.addEventListener("click", (e) => {
        if (!settingsDropdown.contains(e.target) && e.target !== settingsToggle) {
            settingsDropdown.classList.remove("active");
        }
    });

    // 2. Wrapper functions để đóng menu sau khi chọn
    window.handleExport = () => {
        settingsDropdown.classList.remove("active");
        window.exportNotes(); // Gọi hàm export có sẵn của bạn
    };

    window.handleClear = () => {
        settingsDropdown.classList.remove("active");
        window.clearAllData(); // Gọi hàm clear có sẵn của bạn
    };

    // Lưu ý: Hàm importNotes(event) đã được gán trực tiếp trong HTML nên không cần wrapper.
});
