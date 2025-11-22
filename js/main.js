document.addEventListener('DOMContentLoaded', function() {
    console.log("Trang web đã tải xong!");

    // ===============================================
    // PHẦN CẬP NHẬT: Xử lý active link trên cả 2 navbar
    // ===============================================
    const navLinks = document.querySelectorAll('.nav-links a, .dock-nav a'); // Chọn link ở cả 2 nơi
    const currentPath = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Logic cho Hamburger Menu (giữ nguyên)
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainNavLinks = document.querySelector('.navbar .nav-links'); 

    if (hamburgerMenu && mainNavLinks) {
        hamburgerMenu.addEventListener('click', function() {
            mainNavLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('open'); 
        });

        mainNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNavLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
            });
        });
    }

    // =============================================================
    // PHẦN MỚI: Logic hiệu ứng phóng to cho thanh Dock
    // =============================================================
    // Logic cho hiệu ứng Dock (Macbook)
    const dock = document.getElementById('dockNav');
    if (dock) {
        // Thêm điều kiện để chỉ kích hoạt hiệu ứng trên màn hình lớn
        if (window.innerWidth > 768) {
            const dockIcons = dock.querySelectorAll('a');
            const maxScale = 0; // Độ phóng to tối đa
            const effectRadius = 0; // Bán kính ảnh hưởng của hiệu ứng

        dock.addEventListener('mousemove', function(e) {
            const dockRect = dock.getBoundingClientRect();
            const mouseX = e.clientX - dockRect.left;

            dockIcons.forEach(icon => {
                const iconRect = icon.getBoundingClientRect();
                const iconCenterX = (iconRect.left - dockRect.left) + (iconRect.width / 2);
                
                const distance = Math.abs(mouseX - iconCenterX);
                
                let scale = 1;
                if (distance < effectRadius) {
                    const scaleFactor = (1 - distance / effectRadius);
                    scale = 1 + (maxScale - 1) * Math.cos(scaleFactor * (Math.PI / 2));
                }
                
                icon.style.transform = `scale(${scale.toFixed(2)}) translateY(${(1-scale)*20}px)`;
            });
        });

        // Reset lại kích thước khi chuột rời khỏi thanh Dock
        dock.addEventListener('mouseleave', function() {
            dockIcons.forEach(icon => {
                icon.style.transform = 'scale(1) translateY(0px)';
            });
        });
    }
}
});

// Hàm format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}