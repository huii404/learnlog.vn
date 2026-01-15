document.addEventListener("DOMContentLoaded", function () {
  const allProductGrid = document.getElementById("allProductGrid");
  const searchInput = document.getElementById("searchInput");
  const paginationControls = document.getElementById("paginationControls");
  const productCountElement = document.getElementById("productCount");

  // Elements cho Drawer Menu
  const verticalMenu = document.getElementById("verticalMenu");
  const mainMenu = document.getElementById("mainMenu");
  const menuAllBtn = document.getElementById("menuAllBtn");
  const closeDrawer = document.getElementById("closeDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  const BASE_URL = "https://huiinguen.github.io/share.vn.free/";
  const productsPerPage = 8;
  let currentPage = 1;
  let currentFilters = { category: "all", subCategory: null, searchTerm: "" };

  if (typeof allProducts === "undefined" || allProducts.length === 0) return;

  // --- 1. HIỂN THỊ DANH SÁCH SẢN PHẨM ---
  function displayProducts(products, page) {
    if (!allProductGrid) return;
    allProductGrid.innerHTML = "";
    const start = (page - 1) * productsPerPage;
    const productsToDisplay = products.slice(start, start + productsPerPage);

    if (productsToDisplay.length === 0) {
      allProductGrid.innerHTML =
        '<p class="loading-text">Không tìm thấy sản phẩm nào.</p>';
      return;
    }

    productsToDisplay.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      // Lấy link từ resourceLink trong data, nếu không có thì dùng link hiện tại của trang
      const linkToShare =
        product.resourceLink || `${BASE_URL}sanpham.html?id=${product.id}`;

      card.innerHTML = `
        <div class="product-card-link-content" onclick="openProductModal(${product.id})" style="cursor:pointer">
            <h3 class="san-pham__title">${product.name}</h3>
        </div>
        <button class="share-icon-btn" onclick="openQrModal('${linkToShare}')">
            <i class="fas fa-qrcode"></i>
        </button>
    `;
      allProductGrid.appendChild(card);
    });
  }

  // --- 2. LOGIC LỌC VÀ PHÂN TRANG ---
  function filterAndSortProducts() {
    let results = allProducts.filter((p) => {
      const matchCat =
        currentFilters.category === "all" ||
        p.category === currentFilters.category;
      const matchSub =
        !currentFilters.subCategory ||
        p.subCategory === currentFilters.subCategory;
      const matchSearch = p.name
        .toLowerCase()
        .includes(currentFilters.searchTerm.toLowerCase());
      return matchCat && matchSub && matchSearch;
    });
    results.sort((a, b) => (b.id || 0) - (a.id || 0));
    displayProducts(results, currentPage);
    setupPagination(results);
    if (productCountElement)
      productCountElement.textContent = `Số sản phẩm: ${results.length}`;
  }

  function setupPagination(products) {
    if (!paginationControls) return;
    paginationControls.innerHTML = "";
    const pageCount = Math.ceil(products.length / productsPerPage);
    if (pageCount <= 1) return;
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.classList.add("active");
      btn.onclick = () => {
        currentPage = i;
        filterAndSortProducts();
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      paginationControls.appendChild(btn);
    }
  }

  // --- 3. KHỞI TẠO MENU & TÌM KIẾM ---
  searchInput.oninput = () => {
    currentFilters.searchTerm = searchInput.value.trim();
    currentPage = 1;
    filterAndSortProducts();
  };

  // (Các hàm initVerticalMenu, toggleDrawer... giữ nguyên như bản cũ của bạn)
  function initVerticalMenu() {
    const categories = [...new Set(allProducts.map((p) => p.category))];
    let menuHTML = `<li class="category-item"><a class="category-link" onclick="handleMenuClick('all', 'all')"><i class="fas fa-globe"></i> Tất cả</a></li>`;
    categories.forEach((cat) => {
      const subCats = [
        ...new Set(
          allProducts
            .filter((p) => p.category === cat && p.subCategory)
            .map((p) => p.subCategory)
        ),
      ];
      menuHTML += `<li class="category-item"><div class="category-link" onclick="toggleSubMenu(this)"><span><i class="fas fa-folder"></i> ${cat}</span><i class="fas fa-chevron-right arrow-icon"></i></div><ul class="vertical-sub-menu"><li><a onclick="handleMenuClick('${cat}', 'all')">Xem tất cả</a></li>${subCats
        .map(
          (sc) =>
            `<li><a onclick="handleMenuClick('${cat}', '${sc}')">${sc}</a></li>`
        )
        .join("")}</ul></li>`;
    });
    mainMenu.innerHTML = menuHTML;
  }
  window.toggleSubMenu = (el) => el.parentElement.classList.toggle("open");
  window.handleMenuClick = (cat, sub) => {
    currentFilters.category = cat;
    currentFilters.subCategory = sub === "all" ? null : sub;
    currentPage = 1;
    filterAndSortProducts();
    verticalMenu.classList.remove("open");
    drawerOverlay.classList.remove("show");
  };
  if (menuAllBtn)
    menuAllBtn.onclick = () => {
      verticalMenu.classList.add("open");
      drawerOverlay.classList.add("show");
    };
  if (closeDrawer)
    closeDrawer.onclick = () => {
      verticalMenu.classList.remove("open");
      drawerOverlay.classList.remove("show");
    };

  initVerticalMenu();
  filterAndSortProducts();
});

// --- 4. HÀM MỞ MODAL CHI TIẾT (PHẢI NẰM NGOÀI DOMContentLoaded) ---
window.openProductModal = function (id) {
  const modal = document.getElementById("productModal");
  const content = document.getElementById("modalBodyContent");
  const product = allProducts.find((p) => p.id === id);

  if (!product || !modal || !content) return;

  const functionsHtml = product.functions
    ? `<div class="product-details-section"><h3>Tính năng</h3><ul class="professional-list">${product.functions
        .split("\n")
        .map((f) => `<li><i class="fas fa-check"></i> ${f.trim()}</li>`)
        .join("")}</ul></div>`
    : "";

  content.innerHTML = `
        <div class="product-detail">
            <div class="product-gallery">
                <img src="${
                  product.images_gallery[0] || "images/placeholder.png"
                }" style="width:100%; border-radius:10px;">
            </div>
            <div class="product-info-content">
                <h1 style="color:#fff">${product.name}</h1>
                <p style="color:#bb86fc"><i class="fas fa-tags"></i> Danh mục: ${
                  product.category
                }</p>
                <div class="new-actions" style="display:flex; gap:10px; margin: 20px 0;">
                    <a href="${
                      product.resourceLink
                    }" target="_blank" class="cta-button visit-btn" style="background:#03dac6; color:#000; flex:1; text-align:center; padding:12px; border-radius:8px; font-weight:bold; text-decoration:none;">
                        <i class="fas fa-external-link-alt"></i> TRUY CẬP
                    </a>
                </div>
                <div class="product-details-section">
                    <h3>Mô tả</h3>
                    <p>${product.description || "Đang cập nhật..."}</p>
                </div>
                ${functionsHtml}
            </div>
        </div>
    `;

  modal.style.display = "flex"; // Hiện modal
  document.body.style.overflow = "hidden"; // Chặn cuộn trang
};

// Đóng modal
window.closeDetail = function () {
  document.getElementById("productModal").style.display = "none";
  document.body.style.overflow = "auto";
};

document.getElementById("closeProductModal").onclick = window.closeDetail;
window.onclick = (e) => {
  if (e.target.id === "productModal") window.closeDetail();
};
// --- 5. HÀM XỬ LÝ QR CODE ---

window.openQrModal = function (link) {
    const qrModal = document.getElementById("qrModal");
    const qrcodeContainer = document.getElementById("qrcodeContainer");
    const qrProductLink = document.getElementById("qrProductLink");

    if (!qrModal || !qrcodeContainer) return;

    // Xóa mã QR cũ nếu có
    qrcodeContainer.innerHTML = "";

    // Tạo mã QR mới
    new QRCode(qrcodeContainer, {
        text: link,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Hiển thị text link bên dưới (tùy chọn)
    if (qrProductLink) {
        qrProductLink.textContent = link;
    }

    // Hiển thị Modal
    qrModal.style.display = "block";
};

// Hàm đóng QR Modal
window.closeQrModal = function () {
    document.getElementById("qrModal").style.display = "none";
};

// Gán sự kiện đóng cho nút X và click ra ngoài
document.getElementById("closeQrModal").onclick = window.closeQrModal;

window.addEventListener("click", function (e) {
    const qrModal = document.getElementById("qrModal");
    if (e.target === qrModal) {
        window.closeQrModal();
    }
});