document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("articleGrid");
  const modal = document.getElementById("articleModal");
  const body = document.getElementById("modalBody");
  const closeBtn = document.getElementById("closeBtn");
  const bg = document.getElementById("modalBg");
  const modalCopyBtn = document.getElementById("modalCopyBtn"); // Nút copy trong modal
  const toast = document.getElementById("toast");

  const searchInput = document.getElementById("articleSearch");
  const sortSelect = document.getElementById("articleSort");
  const categorySelect = document.getElementById("categoryFilter");

  let currentOpenId = null;

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  }

  function populateCategories() {
    if (!categorySelect || typeof articlesData === "undefined") return;
    const categories = [...new Set(articlesData.map(post => post.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });
  }

  function renderList() {
    if (!grid || typeof articlesData === "undefined") return;
    const searchTerm = searchInput.value.toLowerCase();
    const sortType = sortSelect.value;
    const selectedCategory = categorySelect ? categorySelect.value : "all";

    let filtered = articlesData.filter((post) => {
      const matchSearch = post.title.toLowerCase().includes(searchTerm);
      const matchCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchSearch && matchCategory;
    });

    filtered.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortType === "newest" ? dateB - dateA : dateA - dateB;
    });

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

  // --- NÂNG CẤP 1: XỬ LÝ COPY TRONG MODAL ---
  window.openPost = function (id) {
    const post = articlesData.find((a) => a.id === id);
    if (!post) return;
    currentOpenId = id; // Cập nhật ID bài viết đang mở
    body.innerHTML = `
        <small style="color: #bb86fc;">${post.date} | ${post.category}</small>
        <h1>${post.title}</h1>
        <div class="post-content">${post.content}</div>
    `;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  };

  if (modalCopyBtn) {
    modalCopyBtn.onclick = function() {
        if (currentOpenId) {
            copyArticleLink(null, currentOpenId);
        }
    };
  }

  function closePost() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    currentOpenId = null;
    // Xóa tham số ID trên URL khi đóng modal để link trở lại bình thường
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  window.copyArticleLink = function (event, id) {
    if (event) event.stopPropagation();
    const shareLink = `${window.location.origin}${window.location.pathname}?id=${id}`;
    
    navigator.clipboard.writeText(shareLink).then(() => {
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
      }
    }).catch(err => {
        console.error('Lỗi khi copy: ', err);
    });
  };

  // --- NÂNG CẤP 2: TỰ ĐỘNG MỞ BÀI VIẾT TỪ URL ---
  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id && typeof articlesData !== "undefined") {
      const articleId = parseInt(id);
      openPost(articleId);
    }
  }

  // Khởi chạy các chức năng
  populateCategories();
  renderList();
  checkUrlParams(); // Kiểm tra URL ngay khi tải trang

  if (searchInput) searchInput.oninput = renderList;
  if (sortSelect) sortSelect.onchange = renderList;
  if (categorySelect) categorySelect.onchange = renderList;
  if (closeBtn) closeBtn.onclick = closePost;
  if (bg) bg.onclick = closePost;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePost(); });
});
