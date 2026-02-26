document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const starsContainer = document.getElementById('shooting-stars-container');
    const orbitCenter = document.getElementById('orbitCenter');
    const rainContainer = document.getElementById('rainContainer');
    const birdsContainer = document.getElementById('birdsContainer');
    const lightningFlash = document.getElementById('lightningFlash');
    const timeIcon = document.getElementById('timeIcon');
    const timeLabel = document.getElementById('timeLabel');

    // =============================================
    // 1. HỆ THỐNG QUỸ ĐẠO THỜI GIAN
    // Chu kỳ 20 giây = 1 ngày hoàn chỉnh
    // =============================================
    const CYCLE_TIME_MS = 20000;
    const DEGREES_PER_MS = 360 / CYCLE_TIME_MS;

    // Bắt đầu từ ban đêm
    let currentAngle = 180;
    let lastTime = performance.now();

    // Phases: night | dawn | day | dusk | rain
    let currentPhase = 'night';
    // Mưa ngẫu nhiên ~20% chu kỳ đêm
    let rainScheduled = false;

    function getPhaseFromAngle(angle) {
        // angle 0-360
        // 270->360 & 0->90 = BAN NGÀY (mặt trời trên bầu trời)
        // 80->100 = BÌNH MINH (mặt trời mới mọc)
        // 260->280 = HOÀNG HÔN (mặt trời sắp lặn)
        // 90->270 = BAN ĐÊM (mặt trăng trên bầu trời)
        if (angle > 260 && angle <= 280) return 'dusk';
        if (angle > 280 || angle < 80) return 'day';
        if (angle >= 80 && angle < 100) return 'dawn';
        return 'night';
    }

    function setPhase(phase) {
        if (phase === currentPhase) return;
        currentPhase = phase;

        // Xóa tất cả class mode cũ
        body.classList.remove('day-mode', 'dawn-mode', 'dusk-mode', 'rain-mode');

        switch (phase) {
            case 'day':
                body.classList.add('day-mode');
                timeIcon.textContent = '☀️';
                timeLabel.textContent = 'Ban Ngày';
                stopRain();
                rainScheduled = false;
                break;
            case 'dawn':
                body.classList.add('dawn-mode');
                timeIcon.textContent = '🌅';
                timeLabel.textContent = 'Bình Minh';
                stopRain();
                break;
            case 'dusk':
                body.classList.add('dusk-mode');
                timeIcon.textContent = '🌇';
                timeLabel.textContent = 'Hoàng Hôn';
                stopRain();
                break;
            case 'night':
                // Không có class, dùng CSS mặc định :root
                timeIcon.textContent = '🌙';
                timeLabel.textContent = 'Ban Đêm';
                // Lên lịch mưa ngẫu nhiên
                if (!rainScheduled && Math.random() < 0.4) {
                    rainScheduled = true;
                    const delay = Math.random() * 3000 + 1000;
                    setTimeout(() => {
                        if (currentPhase === 'night') startRain();
                    }, delay);
                }
                break;
        }
    }

    function animateTimeOrbit(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        currentAngle += DEGREES_PER_MS * deltaTime;
        if (currentAngle >= 360) currentAngle -= 360;

        orbitCenter.style.transform = `rotate(${currentAngle}deg)`;

        let normalizedAngle = currentAngle % 360;
        if (normalizedAngle < 0) normalizedAngle += 360;

        const phase = getPhaseFromAngle(normalizedAngle);
        setPhase(phase);

        requestAnimationFrame(animateTimeOrbit);
    }

    requestAnimationFrame(animateTimeOrbit);

    // =============================================
    // 2. HỆ THỐNG MƯA
    // =============================================
    let rainDrops = [];
    let rainActive = false;
    let rainInterval = null;

    function createRaindrop() {
        const drop = document.createElement('div');
        drop.classList.add('raindrop');
        const x = Math.random() * window.innerWidth;
        const height = Math.random() * 30 + 15;
        const duration = Math.random() * 0.6 + 0.7;
        const delay = Math.random() * 2;
        drop.style.left = `${x}px`;
        drop.style.height = `${height}px`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        rainContainer.appendChild(drop);
        return drop;
    }

    function startRain() {
        if (rainActive) return;
        rainActive = true;
        body.classList.add('rain-mode');
        timeIcon.textContent = '🌧️';
        timeLabel.textContent = 'Đêm Mưa';

        // Tạo nhiều giọt mưa
        for (let i = 0; i < 120; i++) {
            rainDrops.push(createRaindrop());
        }

        // Lên lịch sấm chớp
        scheduleLightning();

        // Tự dừng sau 6-10 giây
        const rainDuration = Math.random() * 4000 + 6000;
        setTimeout(() => {
            stopRain();
        }, rainDuration);
    }

    function stopRain() {
        if (!rainActive) return;
        rainActive = false;
        body.classList.remove('rain-mode');

        // Xóa giọt mưa
        rainDrops.forEach(d => d.remove());
        rainDrops = [];

        if (currentPhase === 'night') {
            timeIcon.textContent = '🌙';
            timeLabel.textContent = 'Ban Đêm';
        }
        rainScheduled = false;
    }

    // =============================================
    // 3. SẤM CHỚP
    // =============================================
    function flashLightning() {
        lightningFlash.classList.add('active');
        setTimeout(() => {
            lightningFlash.classList.remove('active');
            // Đôi khi chớp 2 lần liên tiếp
            if (Math.random() < 0.35) {
                setTimeout(() => {
                    lightningFlash.classList.add('active');
                    setTimeout(() => lightningFlash.classList.remove('active'), 80);
                }, 150);
            }
        }, 100);
    }

    function scheduleLightning() {
        if (!rainActive) return;
        const delay = Math.random() * 3000 + 1500;
        setTimeout(() => {
            if (rainActive) {
                flashLightning();
                scheduleLightning();
            }
        }, delay);
    }

    // =============================================
    // 4. SAO BĂNG (ban đêm không mưa)
    // =============================================
    function createShootingStar() {
        if (body.classList.contains('day-mode') ||
            body.classList.contains('dawn-mode') ||
            body.classList.contains('dusk-mode') ||
            body.classList.contains('rain-mode')) return;

        const star = document.createElement('div');
        star.classList.add('shooting-star');
        const startY = Math.random() * (window.innerHeight / 2.5);
        const startX = window.innerWidth + Math.random() * 200;
        star.style.top = `${startY}px`;
        star.style.left = `${startX}px`;
        const scale = 0.5 + Math.random() * 0.8;
        star.style.transform = `scale(${scale}) rotate(-45deg)`;
        starsContainer.appendChild(star);
        setTimeout(() => star.remove(), 2500);
    }

    function starLoop() {
        const randomTime = Math.floor(Math.random() * 5000) + 3000;
        setTimeout(() => {
            createShootingStar();
            starLoop();
        }, randomTime);
    }

    starLoop();

    // =============================================
    // 5. CHIM BAY (ban ngày)
    // =============================================
    function createBird() {
        // Chỉ tạo chim ban ngày
        if (!body.classList.contains('day-mode')) return;

        const bird = document.createElement('div');
        bird.classList.add('bird');

        // SVG chim đơn giản kiểu chữ M
        const size = Math.random() * 10 + 10;
        bird.innerHTML = `
            <svg width="${size * 2}" height="${size}" viewBox="0 0 20 10">
                <path d="M0,5 Q5,${-2 + Math.random() * 4} 10,5 Q15,${-2 + Math.random() * 4} 20,5" 
                      fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
        `;

        const y = Math.random() * (window.innerHeight * 0.45) + 20;
        const duration = Math.random() * 8 + 10;
        const delay = Math.random() * 2;

        bird.style.top = `${y}px`;
        bird.style.left = '-80px';
        bird.style.animationDuration = `${duration}s`;
        bird.style.animationDelay = `${delay}s`;

        birdsContainer.appendChild(bird);
        setTimeout(() => bird.remove(), (duration + delay + 1) * 1000);
    }

    function birdLoop() {
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
            setTimeout(() => createBird(), i * 400);
        }
        const nextTime = Math.random() * 6000 + 4000;
        setTimeout(birdLoop, nextTime);
    }

    birdLoop();

    // =============================================
    // 6. SIDEBAR MENU
    // =============================================
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openMenu() {
        sidebarMenu.classList.add('open');
        sidebarOverlay.classList.add('active');
    }
    function closeMenu() {
        sidebarMenu.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMenu);
});