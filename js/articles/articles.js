document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("articleGrid");
  const modal = document.getElementById("articleModal");
  const body = document.getElementById("modalBody");
  const closeBtn = document.getElementById("closeBtn");
  const bg = document.getElementById("modalBg");
  const modalCopyBtn = document.getElementById("modalCopyBtn");
  const toast = document.getElementById("toast");

  // Các thành phần điều khiển
  const searchInput = document.getElementById("articleSearch");
  const sortSelect = document.getElementById("articleSort");
  const categorySelect = document.getElementById("categoryFilter"); // Cần thêm ID này vào HTML

  let currentOpenId = null;

  // Hàm chuyển "DD/MM/YYYY" -> Date object
  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  }

  // Tự động tạo danh sách phân loại từ dữ liệu thực tế
  function populateCategories() {
    if (!categorySelect || typeof articlesData === "undefined") return;
    
    // Lấy các danh mục duy nhất
    const categories = [...new Set(articlesData.map(post => post.category))];
    
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }

  // Hàm Render danh sách bài viết chính
  function renderList() {
    if (!grid || typeof articlesData === "undefined") return;

    const searchTerm = searchInput.value.toLowerCase();
    const sortType = sortSelect.value;
    const selectedCategory = categorySelect ? categorySelect.value : "all";

    // B1: Lọc kết hợp Tìm kiếm + Phân loại
    let filtered = articlesData.filter((post) => {
      const matchSearch = post.title.toLowerCase().includes(searchTerm);
      const matchCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchSearch && matchCategory;
    });

    // B2: Sắp xếp theo ngày
    filtered.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortType === "newest" ? dateB - dateA : dateA - dateB;
    });

    // B3: Hiển thị giao diện
    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: #8c78a6;">Không tìm thấy bài viết nào phù hợp.</div>`;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (post) => `
            <div class="article-card animate-fade-in" onclick="openPost(${post.id})">
                <button class="card-copy-btn" onclick="copyArticleLink(event, ${post.id})" title="Copy Link">
                    <i class="far fa-copy"></i>
                </button>
                <small>${post.category} • ${post.date}</small>
                <h3>${post.title}</h3>
            </div>
        `
      )
      .join("");
  }

  // Lắng nghe sự kiện người dùng
  if (searchInput) searchInput.oninput = renderList;
  if (sortSelect) sortSelect.onchange = renderList;
  if (categorySelect) categorySelect.onchange = renderList;

  // Logic Modal và Sao chép (giữ nguyên từ bản cũ)
  window.openPost = function (id) {
    const post = articlesData.find((a) => a.id === id);
    if (!post) return;
    currentOpenId = id;
    body.innerHTML = `
        <small style="color: #bb86fc;">${post.date} | ${post.category}</small>
        <h1>${post.title}</h1>
        <div class="post-content">${post.content}</div>
    `;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  };

  function closePost() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    currentOpenId = null;
  }

  window.copyArticleLink = function (event, id) {
    if (event) event.stopPropagation();
    const shareLink = `${window.location.origin}${window.location.pathname}?id=${id}`;
    navigator.clipboard.writeText(shareLink).then(() => {
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
      }
    });
  };

  // Khởi chạy
  populateCategories();
  renderList();

  // Sự kiện đóng modal
  if (closeBtn) closeBtn.onclick = closePost;
  if (bg) bg.onclick = closePost;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePost(); });
});