const STORAGE_KEY = "neon_pet_god_final";
const WALK_KEY = "global_walking_emoji";

let gameState = {
    gold: 500,
    pets: [
        { id: 1, name: "Lân Neon", emoji: "🦄", lv: 1, xp: 0, hunger: 100 }
    ],
    missions: []
};

document.addEventListener("DOMContentLoaded", () => {
    loadGame();
    initSidebar(); 
    renderPets();
    renderMissions();
    checkWalkingStatus();
});

// --- 1. SỬA LỖI MENU ---
function initSidebar() {
    const btn = document.getElementById('menuToggleBtn');
    const close = document.getElementById('menuCloseBtn');
    const side = document.getElementById('sidebarMenu');
    const over = document.getElementById('sidebarOverlay');

    if (btn) {
        btn.onclick = () => {
            side.classList.add('active');
            over.classList.add('active');
        };
        const closeMenu = () => {
            side.classList.remove('active');
            over.classList.remove('active');
        };
        if(close) close.onclick = closeMenu;
        if(over) over.onclick = closeMenu;
    }
}

// --- 2. THÔNG BÁO TỰ TẮT (THAY THẾ ALERT) ---
function showToast(message, icon = '✨') {
    const area = document.getElementById('notification-area');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> ${message}`;
    area.appendChild(toast);
    
    // Tự động xóa khỏi DOM sau khi hiệu ứng kết thúc
    setTimeout(() => { toast.remove(); }, 3000);
}

// --- 3. LOGIC CHO ĂN & TĂNG LEVEL ---
function feedPet(id) {
    const pet = gameState.pets.find(p => p.id === id);
    if (gameState.gold >= 20) {
        gameState.gold -= 20;
        pet.hunger = Math.min(100, pet.hunger + 25);
        pet.xp += 30;

        // Kiểm tra lên cấp
        const xpNeeded = pet.lv * 100;
        if (pet.xp >= xpNeeded) {
            pet.xp = 0;
            pet.lv++;
            // Thay vì alert, dùng showToast để không đứng màn hình
            showToast(`CẤP ĐỘ MỚI! ${pet.name} đã lên Lv.${pet.lv}`, '🎉');
        }

        renderPets();
        saveGame();
    } else {
        showToast("Không đủ vàng rồi!", '❌');
    }
}

// --- 4. NHẬN NUÔI THÊM N THÚ CƯNG ---
function addNewPet() {
    if (gameState.gold >= 200) {
        gameState.gold -= 200;
        const emojis = ["🐉", "🦊", "🦁", "🦉", "🦋", "🐼", "🐲"];
        const names = ["Thần Long", "Hồ Ly", "Sư Tử", "Cú Đêm", "Bướm Tiên", "Gấu Trúc", "Hỏa Long"];
        const rand = Math.floor(Math.random() * emojis.length);
        
        const newPet = {
            id: Date.now(),
            name: names[rand] + " " + (gameState.pets.length + 1),
            emoji: emojis[rand],
            lv: 1,
            xp: 0,
            hunger: 100
        };
        
        gameState.pets.push(newPet);
        renderPets();
        saveGame();
        showToast(`Đã nhận nuôi thành công bé ${newPet.name}!`, '🥚');
    } else {
        showToast("Bạn cần 200 vàng để nhận nuôi!", '💰');
    }
}

// --- 5. NHIỆM VỤ NGẪU NHIÊN (TỐI ĐA 20) ---
function renderMissions() {
    const list = document.getElementById('missionList');
    // Nếu hết nhiệm vụ, tạo thêm cho đủ 20 cái
    if (gameState.missions.length < 5) { 
        while (gameState.missions.length < 20) {
            gameState.missions.push({ 
                id: Date.now() + Math.random(), 
                text: "Luyện tập linh lực " + (gameState.missions.length + 1), 
                reward: 50 + Math.floor(Math.random() * 50), 
                done: false 
            });
        }
    }
    
    list.innerHTML = gameState.missions.map(m => `
        <div class="mission-card">
            <span>${m.text} (+${m.reward} Vàng)</span>
            <button onclick="completeMission(${m.id})" class="mini-btn" style="background:#00ff9d; border:none; padding:8px 12px; border-radius:8px; font-weight:bold; cursor:pointer;">LÀM</button>
        </div>
    `).join("");
}

function completeMission(id) {
    const idx = gameState.missions.findIndex(m => m.id === id);
    if(idx !== -1) {
        gameState.gold += gameState.missions[idx].reward;
        gameState.missions.splice(idx, 1);
        showToast(`Nhiệm vụ hoàn tất! +${gameState.gold} vàng`);
        renderMissions(); 
        renderPets(); 
        saveGame();
    }
}

// (Các hàm renderPets, save/load game giữ nguyên logic ổn định)
function renderPets() {
    const grid = document.getElementById('petGrid');
    const goldDisplay = document.getElementById('goldCount');
    if(goldDisplay) goldDisplay.innerText = gameState.gold;
    
    if(!grid) return;
    grid.innerHTML = gameState.pets.map(p => {
        const xpNeeded = p.lv * 100;
        return `
            <div class="pet-card animate-fade-in">
                <div class="lv-tag">LV.${p.lv}</div>
                <span class="pet-emoji">${p.emoji}</span>
                <h4>${p.name}</h4>
                <div class="mini-stats">
                    <div style="font-size:0.7rem; margin-bottom:2px">XP: ${p.xp}/${xpNeeded}</div>
                    <div class="bar-bg"><div class="bar-fill" style="width:${(p.xp/xpNeeded)*100}%; background:#00ff9d"></div></div>
                    <div style="font-size:0.7rem; margin-top:5px">NO: ${p.hunger}%</div>
                    <div class="bar-bg"><div class="bar-fill" style="width:${p.hunger}%; background:#ff5252"></div></div>
                </div>
                <button onclick="feedPet(${p.id})" style="width:100%; padding:8px; background:#bb86fc; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">CHO ĂN</button>
                <button onclick="startWalking('${p.emoji}')" style="width:100%; margin-top:5px; background:none; border:1px solid #00ff9d; color:#00ff9d; padding:4px; border-radius:5px; font-size:0.7rem; cursor:pointer;">ĐI DẠO</button>
            </div>
        `;
    }).join("");
}

function switchTab(event, tabId) {
    document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function saveGame() { localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState)); }
function loadGame() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) gameState = JSON.parse(saved);
}

function checkWalkingStatus() {
    const emoji = localStorage.getItem(WALK_KEY);
    if (emoji) {
        const container = document.getElementById('walkingPet');
        const emojiEl = document.getElementById('walkingEmoji');
        if(!container || !emojiEl) return;
        emojiEl.innerText = emoji;
        container.style.display = "block";
        let x = 0, y = 0, dir = "R";
        setInterval(() => {
            const w = window.innerWidth - 80, h = window.innerHeight - 100;
            if (dir === "R") { x += 3; container.style.transform = "scaleX(1)"; if(x >= w) dir = "D"; }
            else if (dir === "D") { y += 3; if(y >= h) dir = "L"; }
            else if (dir === "L") { x -= 3; container.style.transform = "scaleX(-1)"; if(x <= 0) dir = "U"; }
            else if (dir === "U") { y -= 3; if(y <= 0) dir = "R"; }
            container.style.left = x + "px"; container.style.top = y + "px";
        }, 40);
    }
}