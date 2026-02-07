document.getElementById('trollBtn').addEventListener('click', function() {
    // 1. Tạo hiệu ứng rung lắc toàn trang web
    document.body.classList.add('earthquake');
    
    // 2. Làm cho các khối meme bay loạn xạ (xoay vòng)
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() + 0.5})`;
    });

    // 3. Đổi chữ trên nút thành câu chửi xéo
    this.innerText = "THẤY CHƯA? HỎNG WEB RỒI!";
    this.style.background = "#ff0000";

    // Sau 3 giây thì trả về bình thường nhưng để lại hậu quả
    setTimeout(() => {
        document.body.classList.remove('earthquake');
        alert("Đã bảo là đừng bấm rồi mà, lì ghê! F5 để sửa lỗi nhé.");
    }, 3000);
});