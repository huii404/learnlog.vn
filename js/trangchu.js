document.addEventListener('DOMContentLoaded', function () {

    // ================================================
    // 1. DỮ LIỆU CÂU HỎI (ĐÃ THÊM GIẢI THÍCH CHI TIẾT)
    // ================================================
    const quizData = {
        programming: [
            { 
                question: "Trong C++, hàm nào được gọi tự động khi đối tượng bị hủy?", 
                options: ["constructor", "destructor", "finalizer", "delete"], 
                correct: 1,
                explanation: "Destructor (hàm hủy) có tên trùng với class kèm dấu ~, tự động chạy để giải phóng tài nguyên khi object hủy."
            },
            { 
                question: "Lệnh `git reset --hard HEAD~1` sẽ làm gì?", 
                options: ["Xóa commit gần nhất và giữ thay đổi", "Xóa commit gần nhất và xóa luôn thay đổi", "Tạo branch mới", "Chỉ xóa staging area"], 
                correct: 1, 
                explanation: "--hard sẽ đưa cả HEAD, Index và Working Directory về trạng thái cũ, xóa bay mọi thay đổi chưa commit."
            },
            { 
                question: "Trong Python, `list[:] = []` và `list = []` khác nhau thế nào?", 
                options: ["Không khác nhau", "Cái đầu chỉ xóa phần tử, giữ địa chỉ nhớ", "Cái đầu tạo list mới", "Cái sau báo lỗi"], 
                correct: 1,
                explanation: "`list[:] = []` xóa nội dung tại chỗ (in-place), các biến tham chiếu khác vẫn thấy list rỗng. `list = []` tạo object mới."
            },
            { 
                question: "SQL injection có thể bị khai thác qua câu lệnh nào?", 
                options: ["SELECT * FROM users", "SELECT * FROM users WHERE id = 1", "SELECT * FROM users WHERE id = '1 OR 1=1'", "SELECT * FROM users LIMIT 1"], 
                correct: 2,
                explanation: "'OR 1=1' luôn đúng, khiến câu lệnh SQL trả về toàn bộ dữ liệu bảng thay vì lọc theo ID."
            },
            { 
                question: "Trong JavaScript, `Promise.race()` trả về gì?", 
                options: ["Promise đầu tiên xong (dù resolve hay reject)", "Promise đầu tiên reject", "Tất cả resolve", "Tất cả reject"], 
                correct: 0,
                explanation: "Race nghĩa là đua, promise nào xong trước (bất kể thành công hay thất bại) sẽ được trả về."
            }
        ],
        excel: [
            { 
                question: "Hàm nào trả về giá trị tìm kiếm gần nhất trong mảng không sắp xếp?", 
                options: ["VLOOKUP", "XLOOKUP", "INDEX+MATCH", "LOOKUP"], 
                correct: 1,
                explanation: "XLOOKUP mạnh mẽ hơn, mặc định tìm chính xác nhưng có thể cấu hình tìm gần nhất mà không cần sort dữ liệu."
            },
            { 
                question: "Cách nhanh nhất để freeze cả row và column cùng lúc?", 
                options: ["View → Freeze Panes", "Alt + W + F + F", "Cả hai", "Không thể"], 
                correct: 2,
                explanation: "Alt + W + F + F là phím tắt nhanh để kích hoạt Freeze Panes tại ô đang chọn."
            }
        ],
        cybersecurity: [
            { 
                question: "Zero Trust model dựa trên nguyên tắc gì?", 
                options: ["Tin tưởng nhưng xác minh", "Không bao giờ tin tưởng, luôn xác minh", "Chỉ tin nội bộ", "Tin tưởng firewall"], 
                correct: 1,
                explanation: "Zero Trust: 'Never Trust, Always Verify'. Mọi truy cập dù từ bên trong hay bên ngoài đều phải xác thực."
            },
            { 
                question: "XSS khác CSRF ở điểm nào?", 
                options: ["XSS chạy mã trên client, CSRF lừa gửi request", "CSRF nguy hiểm hơn", "XSS chỉ đọc cookie", "Không khác"], 
                correct: 0,
                explanation: "XSS (Cross-Site Scripting) tiêm mã độc vào trang web. CSRF (Cross-Site Request Forgery) mượn phiên đăng nhập để gửi lệnh giả."
            }
        ],
        fillblank: [
            { question: "Ngôn ngữ lập trình được Google phát triển dành riêng cho Android là _____?", answer: "kotlin", explanation: "Kotlin là ngôn ngữ hiện đại, được Google ưu tiên (First-class) cho Android." },
            { question: "Thư viện quản lý trạng thái nổi tiếng nhất trong React là _____", answer: "redux", explanation: "Redux giúp quản lý State tập trung (Store) cho ứng dụng lớn." },
            { question: "Công cụ container hóa phổ biến nhất hiện nay là _____", answer: "docker", explanation: "Docker đóng gói ứng dụng và môi trường chạy vào Container." },
            { question: "Framework frontend của Google được viết bằng TypeScript là _____", answer: "angular", explanation: "Angular là một framework hoàn chỉnh (full-fledged) dùng TypeScript." },
            { question: "Hệ điều hành mã nguồn mở phổ biến nhất cho server là _____ server", answer: "ubuntu", explanation: "Ubuntu Server rất phổ biến nhờ cộng đồng lớn và dễ sử dụng." }
        ]
    };

    // ================================================
    // 2. DOM ELEMENTS
    // ================================================
    const topicSelect = document.getElementById('topicSelect');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizContainer = document.getElementById('quizContainer');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const progressFill = document.getElementById('progressFill');
    const currentQ = document.getElementById('currentQ');
    const totalQ = document.getElementById('totalQ');
    const quizSummary = document.getElementById('quizSummary');
    const scoreText = document.getElementById('scoreText');
    const rewardText = document.getElementById('rewardText');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    const resultTitle = document.getElementById('resultTitle');
    const timeTaken = document.getElementById('timeTaken');
    const rankText = document.getElementById('rankText');
    const comboText = document.getElementById('comboText');
    const quitQuizBtn = document.getElementById('quitQuizBtn');

    const fillBlankInputContainer = document.getElementById('fillBlankInputContainer');
    const fillBlankInput = document.getElementById('fillBlankInput');
    const submitFillBlankBtn = document.getElementById('submitFillBlankBtn');

    // TẠO KHUNG GIẢI THÍCH ĐỘNG (Nếu HTML chưa có)
    let explanationBox = document.getElementById('explanationBox');
    if (!explanationBox) {
        explanationBox = document.createElement('div');
        explanationBox.id = 'explanationBox';
        explanationBox.style.display = 'none';
        explanationBox.className = 'explanation-box';
        // Chèn vào sau optionsContainer hoặc input điền từ
        quizContainer.insertBefore(explanationBox, nextQuestionBtn);
    }

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let isFillBlankMode = false;
    let startTime = 0;
    let combo = 0;

    // ================================================
    // 3. BẮT ĐẦU GAME
    // ================================================
    startQuizBtn.addEventListener('click', () => {
        const topic = topicSelect.value;
        if (!topic) return alert('Vui lòng chọn chủ đề!');

        startTime = Date.now();
        isFillBlankMode = (topic === 'fillblank');
        currentQuestionIndex = 0;
        score = 0;
        combo = 0;

        // Logic chọn câu hỏi
        if (topic === 'random') {
            // Gộp tất cả câu trắc nghiệm
            currentQuestions = [
                ...quizData.programming, 
                ...quizData.excel, 
                ...quizData.cybersecurity
            ];
            shuffleArray(currentQuestions);
            currentQuestions = currentQuestions.slice(0, 10); // Lấy 10 câu ngẫu nhiên
        } else if (isFillBlankMode) {
            currentQuestions = [...quizData.fillblank];
            shuffleArray(currentQuestions);
        } else {
            currentQuestions = [...quizData[topic]];
            shuffleArray(currentQuestions);
        }

        // Hiển thị giao diện chơi
        document.querySelector('.quiz-setup').style.display = 'none';
        quizContainer.style.display = 'block';
        quitQuizBtn.style.display = 'block';
        
        fillBlankInputContainer.style.display = isFillBlankMode ? 'block' : 'none';
        optionsContainer.style.display = isFillBlankMode ? 'none' : 'grid'; // Grid cho đẹp
        
        explanationBox.style.display = 'none'; // Ẩn giải thích cũ
        nextQuestionBtn.style.display = 'none';

        isFillBlankMode ? loadFillBlankQuestion() : loadQuestion();
    });

    // ================================================
    // 4. LOGIC TRẮC NGHIỆM (CÓ GIẢI THÍCH)
    // ================================================
    function loadQuestion() {
        const q = currentQuestions[currentQuestionIndex];
        questionText.textContent = q.question;
        currentQ.textContent = currentQuestionIndex + 1;
        totalQ.textContent = currentQuestions.length;
        
        explanationBox.style.display = 'none'; // Ẩn giải thích
        optionsContainer.innerHTML = '';

        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="opt-char">${String.fromCharCode(65 + i)}</span> ${opt}`;
            btn.onclick = () => selectAnswer(btn, i, q.correct, q.explanation);
            optionsContainer.appendChild(btn);
        });
        updateProgress();
    }

    function selectAnswer(btn, selectedIdx, correctIdx, explanationText) {
        const allBtns = optionsContainer.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.disabled = true); // Khóa tất cả nút

        let isCorrect = (selectedIdx === correctIdx);

        if (isCorrect) {
            btn.classList.add('correct');
            score++;
            combo++;
            createParticle(btn);
            playSound('correct');
            showExplanation(true, explanationText || "Chính xác!");
        } else {
            btn.classList.add('incorrect');
            allBtns[correctIdx].classList.add('correct'); // Hiện đáp án đúng
            combo = 0;
            playSound('wrong');
            showExplanation(false, explanationText || `Sai rồi. Đáp án đúng là: ${String.fromCharCode(65 + correctIdx)}`);
        }
        
        nextQuestionBtn.style.display = 'block';
    }

    // ================================================
    // 5. LOGIC ĐIỀN TỪ (CẢI TIẾN)
    // ================================================
    function loadFillBlankQuestion() {
        const q = currentQuestions[currentQuestionIndex];
        questionText.textContent = q.question;
        currentQ.textContent = currentQuestionIndex + 1;
        totalQ.textContent = currentQuestions.length;

        fillBlankInput.value = '';
        fillBlankInput.classList.remove('correct', 'incorrect');
        fillBlankInput.disabled = false;
        submitFillBlankBtn.disabled = false;
        explanationBox.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
        
        fillBlankInput.focus();
        updateProgress();
    }

    submitFillBlankBtn.onclick = checkFillBlankAnswer;
    fillBlankInput.addEventListener('keypress', e => {
        if (e.key === 'Enter' && !fillBlankInput.disabled) checkFillBlankAnswer();
    });

    function checkFillBlankAnswer() {
        const q = currentQuestions[currentQuestionIndex];
        const userAnswer = fillBlankInput.value.trim();
        const correctAnswer = q.answer;
        const normalize = str => str.toLowerCase().replace(/\s+/g, ' ').trim();

        const isCorrect = normalize(userAnswer) === normalize(correctAnswer);

        fillBlankInput.disabled = true;
        submitFillBlankBtn.disabled = true;

        if (isCorrect) {
            score++;
            combo++;
            fillBlankInput.classList.add('correct');
            createParticle(submitFillBlankBtn);
            playSound('correct');
            showExplanation(true, q.explanation || "Tuyệt vời! Bạn nhớ rất tốt.");
        } else {
            fillBlankInput.classList.add('incorrect');
            combo = 0;
            playSound('wrong');
            // Hiện đáp án đúng nếu sai
            showExplanation(false, `Sai rồi! Đáp án là: <strong>${correctAnswer.toUpperCase()}</strong><br>${q.explanation || ''}`);
        }

        // Ở chế độ điền từ, cho hiện nút Tiếp theo thay vì tự động chuyển
        nextQuestionBtn.style.display = 'block';
    }

    // ================================================
    // 6. HÀM HIỂN THỊ GIẢI THÍCH
    // ================================================
    function showExplanation(isCorrect, text) {
        explanationBox.innerHTML = isCorrect 
            ? `<i class="fas fa-check-circle"></i> ${text}`
            : `<i class="fas fa-times-circle"></i> ${text}`;
            
        explanationBox.className = isCorrect ? 'explanation-box explain-correct' : 'explanation-box explain-wrong';
        explanationBox.style.display = 'block';
        
        // Scroll nhẹ xuống để thấy giải thích trên mobile
        explanationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            isFillBlankMode ? loadFillBlankQuestion() : loadQuestion();
            nextQuestionBtn.style.display = 'none';
        } else {
            showSummary();
        }
    });

    // ================================================
    // 7. TỔNG KẾT & LƯU KỶ LỤC (HIGH SCORE)
    // ================================================
    function showSummary() {
        quizContainer.style.display = 'none';
        fillBlankInputContainer.style.display = 'none';
        quizSummary.style.display = 'flex';

        const total = currentQuestions.length;
        // Tính thời gian
        const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        timeTaken.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        // Xử lý Rank
        let rank = 'F';
        if (score === total) rank = 'S+';
        else if (score >= total * 0.8) rank = 'A';
        else if (score >= total * 0.6) rank = 'B';
        else if (score >= total * 0.4) rank = 'C';

        rankText.textContent = rank;
        comboText.textContent = score; // Tổng số câu đúng coi như combo trong session này
        scoreText.innerHTML = `Đúng <strong>${score}/${total}</strong> câu`;

        // --- HIGH SCORE LOGIC ---
        const currentHighScore = localStorage.getItem('quizHighScore') || 0;
        let msg = '';
        
        if (score > currentHighScore) {
            localStorage.setItem('quizHighScore', score);
            msg = `<span style="color: #ffeb3b; text-shadow: 0 0 10px gold;">🏆 KỶ LỤC MỚI! (Cũ: ${currentHighScore})</span>`;
            launchConfetti();
        } else {
            msg = `Kỷ lục của bạn: ${currentHighScore}`;
            if (score === total) launchConfetti();
        }
        
        rewardText.innerHTML = msg;
        quitQuizBtn.style.display = 'none';
    }

    restartQuizBtn.onclick = () => {
        quizSummary.style.display = 'none';
        document.querySelector('.quiz-setup').style.display = 'block';
        progressFill.style.width = '0%';
    };

    quitQuizBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn rời game? Tiến độ sẽ mất.')) {
            quizContainer.style.display = 'none';
            fillBlankInputContainer.style.display = 'none';
            quizSummary.style.display = 'none';
            document.querySelector('.quiz-setup').style.display = 'block';
            quitQuizBtn.style.display = 'none';
        }
    });

    // ================================================
    // 8. UTILS (Hiệu ứng, Âm thanh)
    // ================================================
    function updateProgress() {
        const percent = ((currentQuestionIndex) / currentQuestions.length) * 100;
        progressFill.style.width = percent + '%';
    }

    function createParticle(element) {
        // Tạo hiệu ứng pháo hoa nhỏ tại vị trí nút
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            document.body.appendChild(p); // Append vào body để ko bị che
            
            // Vị trí ngẫu nhiên xung quanh tâm
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            p.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            
            // Animation ngẫu nhiên
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            p.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0, .9, .57, 1)',
            }).onfinish = () => p.remove();
        }
    }

    function launchConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
        const div = document.getElementById('confetti');
        div.innerHTML = '';
        for (let i = 0; i < 100; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + '%';
            c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            c.style.animationDelay = Math.random() * 2 + 's';
            div.appendChild(c);
        }
        setTimeout(() => div.innerHTML = '', 5000);
    }

    function playSound(type) {
        // Giả lập âm thanh nếu không có file mp3 thực
        // Bạn có thể thay đường dẫn file thực vào đây
        /*
        const audio = new Audio(type === 'correct' ? 'sounds/correct.mp3' : 'sounds/wrong.mp3');
        audio.volume = 0.4;
        audio.play().catch(e => console.log("Audio play failed", e));
        */
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});