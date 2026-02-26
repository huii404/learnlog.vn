document.addEventListener("DOMContentLoaded", function () {
  // --- KẾT NỐI UI ELEMENTS ---
  const grid = document.getElementById("articleGrid");
  const modal = document.getElementById("articleModal");
  const body = document.getElementById("modalBody");
  const closeBtn = document.getElementById("closeBtn");
  const bg = document.getElementById("modalBg");
  const modalCopyBtn = document.getElementById("modalCopyBtn");
  const toast = document.getElementById("toast");
  const progressBar = document.getElementById("readingProgress");
  const backToTopBtn = document.getElementById("backToTop");
  const modalContentBox = document.querySelector(".modal-content-box");

  const searchInput = document.getElementById("articleSearch");
  const sortSelect = document.getElementById("articleSort");
  const categorySelect = document.getElementById("categoryFilter");

  let currentOpenId = null;

  // --- BOOKMARK: Load từ localStorage ---
  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem("articleBookmarks") || "[]");
    } catch { return []; }
  }

  function saveBookmarks(arr) {
    localStorage.setItem("articleBookmarks", JSON.stringify(arr));
  }

  function isBookmarked(id) {
    return getBookmarks().includes(id);
  }

  function toggleBookmark(id) {
    let bm = getBookmarks();
    if (bm.includes(id)) {
      bm = bm.filter(b => b !== id);
    } else {
      bm.push(id);
    }
    saveBookmarks(bm);
    return bm.includes(id);
  }

  // --- 1. SLUG ---
  function convertToSlug(str) {
    if (!str) return "";
    str = str.toLowerCase().trim();
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.replace(/[đĐ]/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/-+/g, '-');
    return str.replace(/^-+|-+$/g, '');
  }

  // --- 2. BỔ TRỢ ---
  function parseDate(dateStr) {
    if (!dateStr) return new Date(0);
    const parts = dateStr.split("/");
    if (parts.length !== 3) return new Date(0);
    const [day, month, year] = parts;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
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

  // --- 3. RENDER DANH SÁCH ---
  function renderList() {
    if (!grid || typeof articlesData === "undefined") return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const sortType = sortSelect ? sortSelect.value : "newest";
    const selectedCategory = categorySelect ? categorySelect.value : "all";
    const showBookmarksOnly = document.getElementById("bookmarkToggle")?.classList.contains("active");
    const bookmarks = getBookmarks();

    let filtered = articlesData.filter((post) => {
      const matchSearch = post.title.toLowerCase().includes(searchTerm);
      const matchCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchBookmark = !showBookmarksOnly || bookmarks.includes(post.id);
      return matchSearch && matchCategory && matchBookmark;
    });

    filtered.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortType === "newest" ? dateB - dateA : dateA - dateB;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state"><i class="fas fa-ghost"></i><p>Không tìm thấy bài viết nào.</p></div>`;
      return;
    }

    grid.innerHTML = filtered.map((post) => {
      const bookmarked = isBookmarked(post.id);
      return `
        <div class="article-card animate-fade-in" onclick="openPost(${post.id})">
          <div class="card-top-actions">
            <button class="card-bookmark-btn ${bookmarked ? 'bookmarked' : ''}" 
              onclick="handleBookmark(event, ${post.id})" title="${bookmarked ? 'Bỏ lưu' : 'Lưu bài'}">
              <i class="${bookmarked ? 'fas' : 'far'} fa-bookmark"></i>
            </button>
            <button class="card-copy-btn" onclick="copyArticleLink(event, ${post.id})" title="Copy Link">
              <i class="far fa-copy"></i>
            </button>
          </div>
          <small class="card-meta">${post.category} • ${post.date}</small>
          <h3>${post.title}</h3>
          ${post.excerpt ? `<p class="card-excerpt">${post.excerpt}</p>` : ""}
        </div>
      `;
    }).join("");
  }

  // --- 4. BOOKMARK HANDLER ---
  window.handleBookmark = function(event, id) {
    event.stopPropagation();
    const isNowBookmarked = toggleBookmark(id);

    // Cập nhật nút trong card
    const btn = event.currentTarget;
    btn.classList.toggle("bookmarked", isNowBookmarked);
    btn.querySelector("i").className = isNowBookmarked ? "fas fa-bookmark" : "far fa-bookmark";

    // Cập nhật nút trong modal nếu đang mở
    if (currentOpenId === id) {
      const modalBmBtn = document.getElementById("modalBookmarkBtn");
      if (modalBmBtn) {
        modalBmBtn.classList.toggle("bookmarked", isNowBookmarked);
        modalBmBtn.querySelector("i").className = isNowBookmarked ? "fas fa-bookmark" : "far fa-bookmark";
        modalBmBtn.title = isNowBookmarked ? "Bỏ lưu" : "Lưu bài viết";
      }
    }

    showToast(isNowBookmarked ? "Đã lưu bài viết!" : "Đã bỏ lưu!", isNowBookmarked ? "#bb86fc" : "#ff5252");
  };

  // --- 5. MỞ MODAL ---
  window.openPost = function (id) {
    const post = articlesData.find((a) => a.id === id);
    if (!post) return;
    currentOpenId = id;

    const postSlug = convertToSlug(post.title);
    window.history.pushState({ id }, post.title, `?post=${postSlug}`);

    const relatedPosts = articlesData
      .filter((a) => a.category === post.category && a.id !== id)
      .slice(0, 3);

    const bookmarked = isBookmarked(id);

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

    // Cập nhật nút bookmark trong modal
    const modalBmBtn = document.getElementById("modalBookmarkBtn");
    if (modalBmBtn) {
      modalBmBtn.classList.toggle("bookmarked", bookmarked);
      modalBmBtn.querySelector("i").className = bookmarked ? "fas fa-bookmark" : "far fa-bookmark";
      modalBmBtn.title = bookmarked ? "Bỏ lưu" : "Lưu bài viết";
    }

    modal.classList.add("active");
    document.body.classList.add("modal-open");
    if (modalContentBox) modalContentBox.scrollTop = 0;

    // Reset progress bar
    if (progressBar) progressBar.style.width = "0%";
    if (backToTopBtn) backToTopBtn.classList.remove("visible");
  };

  function closePost() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    currentOpenId = null;
    window.history.replaceState({}, document.title, window.location.pathname);
    if (progressBar) progressBar.style.width = "0%";
    if (backToTopBtn) backToTopBtn.classList.remove("visible");
  }

  // --- 6. READING PROGRESS BAR ---
  if (modalContentBox && progressBar) {
    modalContentBox.addEventListener("scroll", function () {
      const scrollTop = modalContentBox.scrollTop;
      const scrollHeight = modalContentBox.scrollHeight - modalContentBox.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = progress + "%";

      // Back to top button
      if (backToTopBtn) {
        backToTopBtn.classList.toggle("visible", scrollTop > 200);
      }
    });
  }

  // --- 7. BACK TO TOP ---
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      if (modalContentBox) {
        modalContentBox.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  // --- 8. COPY LINK ---
  window.copyArticleLink = function (event, id) {
    if (event) event.stopPropagation();
    const post = articlesData.find(a => a.id === id);
    if (!post) return;

    const postSlug = convertToSlug(post.title);
    const shareLink = `${window.location.origin}${window.location.pathname}?post=${postSlug}`;

    navigator.clipboard.writeText(shareLink).then(() => {
      showToast("Đã sao chép liên kết!", "#00ff9d");
    });
  };

  // --- 9. TOAST HELPER ---
  function showToast(message, color = "#00ff9d") {
    if (!toast) return;
    toast.style.background = color;
    toast.style.color = color === "#bb86fc" || color === "#ff5252" ? "#fff" : "#0f0f1e";
    toast.querySelector("span").textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  // --- 10. BOOKMARK TOGGLE BUTTON ---
  const bookmarkToggle = document.getElementById("bookmarkToggle");
  if (bookmarkToggle) {
    bookmarkToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      renderList();
    });
  }

  // --- 11. MODAL BOOKMARK BTN ---
  const modalBmBtn = document.getElementById("modalBookmarkBtn");
  if (modalBmBtn) {
    modalBmBtn.addEventListener("click", function () {
      if (currentOpenId == null) return;
      const isNowBookmarked = toggleBookmark(currentOpenId);
      this.classList.toggle("bookmarked", isNowBookmarked);
      this.querySelector("i").className = isNowBookmarked ? "fas fa-bookmark" : "far fa-bookmark";
      this.title = isNowBookmarked ? "Bỏ lưu" : "Lưu bài viết";
      showToast(isNowBookmarked ? "Đã lưu bài viết!" : "Đã bỏ lưu!", isNowBookmarked ? "#bb86fc" : "#ff5252");
      // re-render list để cập nhật icon card
      renderList();
    });
  }

  // --- 12. CHECK URL ---
  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const slugParam = params.get("post");
    if (slugParam && typeof articlesData !== "undefined") {
      const post = articlesData.find(a => convertToSlug(a.title) === slugParam);
      if (post) openPost(post.id);
    }
  }

  // --- KHỞI CHẠY ---
  populateCategories();
  renderList();
  checkUrlParams();

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