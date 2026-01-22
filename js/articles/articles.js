document.addEventListener("DOMContentLoaded", function () {
  // --- KẾT NỐI UI ELEMENTS ---
  const grid = document.getElementById("articleGrid");
  const modal = document.getElementById("articleModal");
  const body = document.getElementById("modalBody");
  const closeBtn = document.getElementById("closeBtn");
  const bg = document.getElementById("modalBg");
  const modalCopyBtn = document.getElementById("modalCopyBtn");
  const toast = document.getElementById("toast");

  const searchInput = document.getElementById("articleSearch");
  const sortSelect = document.getElementById("articleSort");
  const categorySelect = document.getElementById("categoryFilter");

  let currentOpenId = null;

  // --- 1. THUẬT TOÁN CHUYỂN TIÊU ĐỀ THÀNH SLUG (KHÔNG DẤU) ---
  function convertToSlug(str) {
    if (!str) return "";
    str = str.toLowerCase();
    // Loại bỏ dấu tiếng Việt
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[đĐ]/g, 'd');
    // Loại bỏ ký tự đặc biệt, chỉ giữ lại chữ, số và khoảng trắng
    str = str.replace(/([^0-9a-z-\s])/g, '');
    // Thay khoảng trắng bằng dấu gạch ngang
    str = str.replace(/(\s+)/g, '-');
    // Làm sạch dấu gạch ngang dư thừa
    str = str.replace(/-+/g, '-');
    return str.replace(/^-+|-+$/g, '');
  }

  // --- 2. CÁC HÀM BỔ TRỢ ---
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

  // --- 3. HIỂN THỊ DANH SÁCH BÀI VIẾT ---
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

  // --- 4. LOGIC MỞ MODAL & CẬP NHẬT URL ---
  window.openPost = function (id) {
    const post = articlesData.find((a) => a.id === id);
    if (!post) return;
    currentOpenId = id;

    // Thay đổi URL thành dạng ?post=tieu-de-khong-dau
    const postSlug = convertToSlug(post.title);
    window.history.pushState({ id: id }, post.title, `?post=${postSlug}`);

    // Xử lý bài viết liên quan
    const relatedPosts = articlesData
        .filter((a) => a.category === post.category && a.id !== id)
        .slice(0, 3);

    let relatedHtml = "";
    if (relatedPosts.length > 0) {
        relatedHtml = `
            <div class="related-section">
                <h3 class="related-title"><i class="fas fa-layer-group"></i> Bài viết liên quan</h3>
                <div class="related-grid">
                    ${relatedPosts.map(rel => `
                        <div class="related-card" onclick="openPost(${rel.id})">
                            <div class="related-card-info">
                                <small>${rel.date}</small>
                                <h4>${rel.title}</h4>
                            </div>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    body.innerHTML = `
        <small style="color: #bb86fc;">${post.date} | ${post.category}</small>
        <h1>${post.title}</h1>
        <div class="post-content">${post.content}</div>
        <hr style="border: 0; border-top: 1px solid #2a2a4e; margin: 40px 0 20px 0;">
        ${relatedHtml}
    `;

    modal.classList.add("active");
    document.body.classList.add("modal-open");
    document.querySelector(".modal-content-box").scrollTop = 0;
  };

  function closePost() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    currentOpenId = null;
    // Trở lại URL gốc khi đóng bài viết
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // --- 5. SAO CHÉP LIÊN KẾT (DÙNG SLUG) ---
  window.copyArticleLink = function (event, id) {
    if (event) event.stopPropagation();
    const post = articlesData.find(a => a.id === id);
    if (!post) return;

    const postSlug = convertToSlug(post.title);
    const shareLink = `${window.location.origin}${window.location.pathname}?post=${postSlug}`;
    
    navigator.clipboard.writeText(shareLink).then(() => {
      if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
      }
    });
  };

  // --- 6. KIỂM TRA URL ĐỂ MỞ BÀI TỰ ĐỘNG ---
  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const slugParam = params.get("post"); // Lấy tham số ?post=
    
    if (slugParam && typeof articlesData !== "undefined") {
      // Tìm bài viết có tiêu đề sau khi convert khớp với slug trên URL
      const post = articlesData.find(a => convertToSlug(a.title) === slugParam);
      if (post) {
        openPost(post.id);
      }
    }
  }

  // --- KHỞI CHẠY ---
  populateCategories();
  renderList();
  checkUrlParams();

  // Sự kiện
  if (searchInput) searchInput.oninput = renderList;
  if (sortSelect) sortSelect.onchange = renderList;
  if (categorySelect) categorySelect.onchange = renderList;
  if (closeBtn) closeBtn.onclick = closePost;
  if (bg) bg.onclick = closePost;
  if (modalCopyBtn) modalCopyBtn.onclick = () => currentOpenId && copyArticleLink(null, currentOpenId);
  
  document.addEventListener("keydown", (e) => { 
    if (e.key === "Escape") closePost(); 
  });
});