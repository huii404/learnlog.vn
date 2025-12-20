document.addEventListener('DOMContentLoaded', function () {
    if (typeof quizData === 'undefined') return;

    // Các biến trạng thái bài thi
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let startTime = 0;
    let timerInterval = null;

    // Lấy Elements
    const startExamBtn = document.getElementById('startExamBtn');
    const quizContainer = document.getElementById('quizContainer');
    const quizSummary = document.getElementById('quizSummary');
    const downloadCertBtn = document.getElementById('downloadCertBtn');

    // Bắt đầu thi
    startExamBtn.onclick = () => {
        const topic = document.getElementById('examTopicSelect').value;
        if (!topic) return alert('Vui lòng chọn loại chứng chỉ!');
        initExam(topic);
    };

    function initExam(topic) {
        let pool = [];
        // Lọc câu hỏi theo chủ đề
        if (topic === 'exam_programming') pool = [...quizData.cpp, ...quizData.python, ...quizData.java, ...quizData.programming];
        else if (quizData[topic.replace('exam_', '')]) pool = quizData[topic.replace('exam_', '')];

        currentQuestions = pool.sort(() => 0.5 - Math.random()).slice(0, 30);
        score = 0;
        currentQuestionIndex = 0;
        startTime = Date.now();
        
        document.getElementById('mainSetup').style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
        startTimer(1200); // 20 phút
    }

    function loadQuestion() {
        const q = currentQuestions[currentQuestionIndex];
        document.getElementById('questionText').textContent = q.question;
        document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
        document.getElementById('totalQ').textContent = currentQuestions.length;
        
        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span>${String.fromCharCode(65+i)}.</span> ${opt}`;
            btn.onclick = () => {
                const all = container.querySelectorAll('button');
                all.forEach(b => b.disabled = true);
                if (i === q.correct) {
                    btn.classList.add('correct');
                    score++;
                } else btn.classList.add('incorrect');
                document.getElementById('nextQuestionBtn').style.display = 'block';
            };
            container.appendChild(btn);
        });
        document.getElementById('progressFill').style.width = `${(currentQuestionIndex/30)*100}%`;
    }

    document.getElementById('nextQuestionBtn').onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            loadQuestion();
            document.getElementById('nextQuestionBtn').style.display = 'none';
        } else showSummary();
    };

    function startTimer(duration) {
        let time = duration;
        timerInterval = setInterval(() => {
            let m = Math.floor(time / 60);
            let s = time % 60;
            document.getElementById('timerDisplay').textContent = `⏰ ${m}:${s < 10 ? '0' : ''}${s}`;
            if (time-- <= 0) { clearInterval(timerInterval); showSummary(); }
        }, 1000);
    }

    function showSummary() {
        clearInterval(timerInterval);
        quizContainer.style.display = 'none';
        quizSummary.style.display = 'flex';
        
        const rank = score >= 27 ? 'S' : (score >= 21 ? 'B' : 'C'); // Cách tính hạng
        document.getElementById('scoreText').textContent = `Đúng ${score}/30 câu`;
        document.getElementById('rankText').textContent = rank;
        
        if (score >= 21) { // Đạt trên 70%
            document.getElementById('resultTitle').textContent = "BẠN ĐÃ ĐẠT CHỨNG CHỈ!";
            downloadCertBtn.style.display = 'block';
        } else {
            document.getElementById('resultTitle').textContent = "CHƯA ĐẠT";
            downloadCertBtn.style.display = 'none';
        }
    }

    // TẢI BẰNG KHEN CHUYÊN NGHIỆP
    downloadCertBtn.onclick = () => {
        const name = prompt("Nhập Họ và Tên của bạn để in lên bằng:", "Nguyễn Văn A");
        if (!name) return;

        // Đổ dữ liệu vào Template ẩn
        document.getElementById('certRecipientName').textContent = name.toUpperCase();
        document.getElementById('certSubject').textContent = document.getElementById('examTopicSelect').options[document.getElementById('examTopicSelect').selectedIndex].text.toUpperCase();
        document.getElementById('certRank').textContent = document.getElementById('rankText').textContent;
        document.getElementById('certScore').textContent = `${score}/30`;
        const d = new Date();
        document.getElementById('certDate').textContent = `Ngày ${d.getDate()} tháng ${d.getMonth()+1} năm ${d.getFullYear()}`;

        const cert = document.querySelector('.cert-canvas');
        html2canvas(cert, { scale: 2 }).then(canvas => {
            const link = document.createElement('a');
            link.download = `BangKhen_${name.replace(/\s/g, '_')}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    document.getElementById('restartQuizBtn').onclick = () => location.reload();
});                             