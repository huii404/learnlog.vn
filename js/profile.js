document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentArea = document.getElementById('dynamic-content');

    // =============================================
    // DATA
    // =============================================
    const profileData = {

        about: `
            <div id="tab-about" class="tab-content">
                <h3 class="section-title">Dự án cá nhân</h3>
                <p class="description">
                    Sinh viên năm 2 Khoa học Máy tính. Dưới đây là các sản phẩm mình đã thực hiện trong quá trình học tập.
                </p>
                <div class="project-grid">
                    <div class="project-item">
                        <div class="project-img-placeholder">
                            <i class="fas fa-map-location-dot"></i>
                        </div>
                        <span class="project-name">CMD Tool</span>
                        <p class="project-desc">App c++</p>
                        <a href="https://github.com/huii404/sourcecode/tree/main/c%2B%2B/cmd_box" class="btn-link" target="_blank">
                            <i class="fab fa-github"></i> Xem chi tiết
                        </a>
                    </div>
                </div>
            </div>
        `,

        skills: `
            <div id="tab-skills" class="tab-content">
                <h3 class="section-title">Kỹ năng</h3>
                <p class="description">Các ngôn ngữ và công nghệ mình đang học và sử dụng.</p>
                <div class="skills-list">
                    <div class="skill-row">
                        <div class="skill-header">
                            <span class="skill-name"><i class="fab fa-html5" style="color:#e44d26"></i> HTML / CSS</span>
                            <span class="skill-pct">15%</span>
                        </div>
                        <div class="skill-bar-track">
                            <div class="skill-bar-fill" data-width="15" style="background: linear-gradient(90deg,#e44d26,#f0a04b)"></div>
                        </div>
                    </div>
                    <div class="skill-row">
                        <div class="skill-header">
                            <span class="skill-name"><i class="fas fa-code" style="color:#00d2ff"></i> C / C++</span>
                            <span class="skill-pct">60%</span>
                        </div>
                        <div class="skill-bar-track">
                            <div class="skill-bar-fill" data-width="60" style="background: linear-gradient(90deg,#00d2ff,#0072ff)"></div>
                        </div>
                    </div>
                    <div class="skill-row">
                        <div class="skill-header">
                            <span class="skill-name"><i class="fab fa-java" style="color:#f89820"></i> Java</span>
                            <span class="skill-pct">30%</span>
                        </div>
                        <div class="skill-bar-track">
                            <div class="skill-bar-fill" data-width="30" style="background: linear-gradient(90deg,#f89820,#e74c3c)"></div>
                        </div>
                    </div>

                    <div class="skill-row">
                        <div class="skill-header">
                            <span class="skill-name"><i class="fab fa-python" style="color:#f89820"></i>python</span>
                            <span class="skill-pct">0.2%</span>
                        </div>
                        <div class="skill-bar-track">
                            <div class="skill-bar-fill" data-width="0.2" style="background: linear-gradient(90deg,#f89820,#e74c3c)"></div>
                        </div>
                    </div>

                    <div class="skill-row">
                        <div class="skill-header">
                            <span class="skill-name"><i class="fab fa-cs" style="color:#f89820"></i>C#</span>
                            <span class="skill-pct">20%</span>
                        </div>
                        <div class="skill-bar-track">
                            <div class="skill-bar-fill" data-width="20" style="background: linear-gradient(90deg,#f89820,#e74c3c)"></div>
                        </div>
                    </div>
                </div>
            </div>
        `,

        hobby: `
            <div id="tab-hobby" class="tab-content">
                <h3 class="section-title">Sở thích</h3>
                <p class="description">Những thứ mình thích làm ngoài lúc code.</p>
                <div class="hashtag-container">
                    <span class="hashtag"><i class="fas fa-mountain"></i> Hiking</span>
                    <span class="hashtag"><i class="fas fa-person-hiking"></i> Trekking</span>
                    <span class="hashtag"><i class="fas fa-camera"></i> Photography</span>
                    <span class="hashtag"><i class="fas fa-music"></i> Music</span>
                    <span class="hashtag"><i class="fas fa-motorcycle"></i> Ride</span>
                    <span class="hashtag"><i class="fas fa-laptop-code"></i> Open Source</span>
                </div>
            </div>
        `,

        photos: `
            <div id="tab-photos" class="tab-content">
                <h3 class="section-title">Photos</h3>
                <div class="project-grid">
                    <div class="project-item">
                        <div class="project-img-placeholder">
                            <img src="https://www.bing.com/th/id/OIP.XqUoA7h4iNOGgmJ2xeNIzQHaEK?w=277&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Đà Nẵng">
                        </div>
                        <span class="project-name">Đà Nẵng 2024</span>
                    </div>
                    <div class="project-item">
                        <div class="project-img-placeholder" style="background:#111;font-size:2rem;color:#555;display:flex;align-items:center;justify-content:center;">
                            <i class="fas fa-plus" style="color:#2a2a4e"></i>
                        </div>
                        <span class="project-name" style="color:#555">Sắp cập nhật...</span>
                    </div>
                </div>
            </div>
        `,

        contact: `
            <div id="tab-contact" class="tab-content">
                <h3 class="section-title">Liên hệ</h3>
                <p class="description">Muốn hợp tác hoặc chỉ muốn nói chuyện? Liên hệ mình nhé!</p>
                <div class="contact-links">
                    <a href="mailto:nguyenhuy1832006@gmail.com" class="contact-card">
                        <div class="contact-icon" style="background:linear-gradient(135deg,#ea4335,#fbbc04)">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-info">
                            <span class="contact-label">Email</span>
                            <span class="contact-value">nguyenhuy1832006@gmail.com</span>
                        </div>
                        <i class="fas fa-arrow-right contact-arrow"></i>
                    </a>
                    <a href="https://github.com/huii404" target="_blank" class="contact-card">
                        <div class="contact-icon" style="background:linear-gradient(135deg,#333,#555)">
                            <i class="fab fa-github"></i>
                        </div>
                        <div class="contact-info">
                            <span class="contact-label">GitHub</span>
                            <span class="contact-value">github.com/huii404</span>
                        </div>
                        <i class="fas fa-arrow-right contact-arrow"></i>
                    </a>
                    <a href="#" class="contact-card">
                        <div class="contact-icon" style="background:linear-gradient(135deg,#1877f2,#42a5f5)">
                            <i class="fab fa-facebook"></i>
                        </div>
                        <div class="contact-info">
                            <span class="contact-label">Facebook</span>
                            <span class="contact-value">Nguyễn Huy</span>
                        </div>
                        <i class="fas fa-arrow-right contact-arrow"></i>
                    </a>
                    <a href="#" class="contact-card">
                        <div class="contact-icon" style="background:linear-gradient(135deg,#010101,#555)">
                            <i class="fa-brands fa-tiktok"></i>
                        </div>
                        <div class="contact-info">
                            <span class="contact-label">TikTok</span>
                            <span class="contact-value">@huii404</span>
                        </div>
                        <i class="fas fa-arrow-right contact-arrow"></i>
                    </a>
                </div>
            </div>
        `
    };

    // =============================================
    // SWITCH TAB
    // =============================================
    function switchTab(target) {
        contentArea.style.opacity = '0';
        contentArea.style.transform = 'translateY(8px)';

        setTimeout(() => {
            contentArea.innerHTML = profileData[target] || '<p style="color:#8c78a6">Đang cập nhật...</p>';
            contentArea.style.opacity = '1';
            contentArea.style.transform = 'translateY(0)';

            // Animate skill bars nếu tab skills
            if (target === 'skills') {
                setTimeout(() => {
                    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                        bar.style.width = bar.dataset.width + '%';
                    });
                }, 80);
            }
        }, 180);
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            switchTab(item.getAttribute('data-target'));
        });
    });

    // Khởi chạy
    switchTab('about');
    
});