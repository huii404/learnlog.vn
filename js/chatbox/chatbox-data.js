// js/chatbox-data.js

const chatBotKnowledge = [
  //Gameshow/Chứng chỉ
  {
    keywords: ["chứng chỉ","thi","câu hỏi","score","pass","bằng khen","gameshow","làm bài thi","đậu chứng chỉ","bao nhiêu điểm","cách nhận bằng","quy tắc thi","thời gian thi","C++ chứng chỉ","Python chứng chỉ","Java chứng chỉ","An Ninh Mạng chứng chỉ",],
    response:'Trả lời câu hỏi thông qua bài test.Chi tiết hướng dẫn: <a href="index.html" target="_blank" style="color: #03dac6; font-weight: bold;">Xem tại đây</a>.',
  },
  //Sản phẩm/Tài nguyên
  {
    keywords: ["sản phẩm","tài nguyên","tool","source code","code","khóa học","mua code","tải tool","tài liệu học","đồ thanh lý","mã nguồn","phần mềm",],
    response:'Chi tiết hướng dẫn: <a href="sanpham.html" target="_blank" style="color: #03dac6; font-weight: bold;">Xem tại đây</a>.',
  },
  //Liên hệ
  {
    keywords: ["mua","giá","liên hệ","hotline","zalo","cách mua","phí","thanh toán","hỗ trợ","gặp admin","số điện thoại","email","mua sản phẩm",],
    response:'Email: hcao84539@gmail.com',
  },
  //  Cấu trúc trang
  {
    keywords: ["trang web","cấu trúc","web này","tác giả","giới thiệu","chủ trang web","mục đích","thông tin về trang","người làm web",],
    response:"Trang web này là một thư viện tổng hợp về Tài Nguyên Kỹ thuật, Lập trình và các Công cụ (Tool). Nó được xây dựng bởi HV, nhằm mục đích chia sẻ kiến thức và sản phẩm.",
  },

  // chào hỏi
  {
    keywords: ["hi","hello","chào bạn","hey seri","alo","hé lu","chào","good morning",],
    response: "Bro đang cần tôi giúp hay tâm sự gì hả 🐔",
  },

  // cười-vui vẻ
  {
    keywords: ["hii", "hehe", "kkk", "cười ẻ", "vãi", "hì", "kk", "hẹ hẹ","hi hi",":))",":)))",":>>",":>"],
    response: "Cười cái con khỉ 😂 ",
    sound:"audio/haha1.mp3",
  },

  // tải app web 
  {
    keywords: ["tải app", "tải về", "app web", "cách tải về"],
    response:'Bạn có thể cài đặt trang này như một ứng dụng (PWA) trên điện thoại và máy tính. Chi tiết hướng dẫn: <a href="huongdan.html" target="_blank" style="color: #03dac6; font-weight: bold;">Xem tại đây</a>.',
  },

  //========================================================================================

  // THIẾT LẬP CÂU HỎI + CHỨC NĂNG CODE= CHATBOX TÍNH NĂNG

  // TIME(ngày/tháng/năm-giờ/phút/giây-thứ)
  {
    keywords: ["mấy giờ", "thời gian", "time", "giờ", "hour"],
    response: "[CURRENT_TIME]", // Đánh dấu để logic xử lý
  },
  // báo cáo lỗi
  {
    keywords: ["app bị lỗi", "link bị lỗi", "lỗi giao diện", "lỗi", "báo cáo"],
    response: "[report]", // đường link hiển thị ở chatbox để điền thông tin
  },

  //
];

// Khởi tạo phản hồi mặc định
const defaultResponses = [
  "Dữ liệu hệ thống chưa được cập nhật với câu hỏi của bạn!",
  "Bạn muốn hỏi về vấn đề gì ạ? Tôi chỉ có thể trả lời các câu hỏi liên quan đến nội dung của trang web này.",
];
