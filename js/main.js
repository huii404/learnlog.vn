document.addEventListener("DOMContentLoaded", function () {
  console.log("Hệ thống đã sẵn sàng!");

  // --- KẾT NỐI UI ELEMENTS ---
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const menuCloseBtn = document.getElementById("menuCloseBtn");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  // --- 1. XỬ LÝ ĐÓNG/MỞ SIDEBAR ---
  if (menuToggleBtn && sidebarMenu && sidebarOverlay && menuCloseBtn) {
    
    // Mở menu: Hiện sidebar, hiện overlay, ẩn nút hamburger
    const openMenu = () => {
      sidebarMenu.classList.add("active");
      sidebarOverlay.classList.add("active");
      menuToggleBtn.classList.add("hidden"); 
      document.body.style.overflow = "hidden"; // Chặn cuộn trang khi mở menu
    };

    // Đóng menu: Ngược lại với mở
    const closeMenu = () => {
      sidebarMenu.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      menuToggleBtn.classList.remove("hidden");
      document.body.style.overflow = "";
    };

    menuToggleBtn.addEventListener("click", openMenu);
    menuCloseBtn.addEventListener("click", closeMenu);
    sidebarOverlay.addEventListener("click", closeMenu); // Đóng khi click vào vùng mờ
  }

  // --- 2. TỰ ĐỘNG ACTIVE LINK THEO TRANG HIỆN TẠI ---
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  
  sidebarLinks.forEach((link) => {
    link.classList.remove("active");
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPath) {
      link.classList.add("active");
    }
  });

  // --- 3. HIỆU ỨNG CUỘN MƯỢT (SMOOTH SCROLL) ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});