const notesData = [
  {
    title: "Đảo ngược chuỗi (String Reversal)",
    category: "Lập trình", 
    subCategory: "Python", 
    answer: "Sử dụng slicing với bước nhảy $-1$ để đảo ngược chuỗi một cách ngắn gọn và 'Pythonic'.",
    code: {
      lang: "Python",
      content: `text = "hello world"
reversed_text = text[::-1]
print(reversed_text) # dlrow olleh`,
    },
  },
  {
    title: "Sử dụng List Comprehension",
    category: "Lập trình", 
    subCategory: "Python", 
    answer: "List Comprehension giúp tạo danh sách mới từ danh sách hiện có một cách nhanh chóng và dễ đọc hơn vòng lặp truyền thống.",
    code: {
      lang: "Python",
      content: `# Tạo list các số chẵn từ 0 đến 10
even_numbers = [x for x in range(11) if x % 2 == 0]
print(even_numbers) # [0, 2, 4, 6, 8, 10]`,
    },
  },

  {
    title: "Top IDE dành cho C++ ?",
    category: "Lập trình", 
    subCategory: "C++", 
    answer:
      "Rất nhiều",
    code: {
      lang: "",
      content: `VSCODE XANH,VSCODE TÍM,CODE BLOCK,NETBEAN,...`,
    },
  },
  {
    title: "Vì sao dùng VSCODE XANH DỄ BỊ LỖI?",
    category: "Lập trình", 
    answer: "",
    code: {
      content: `
      1. VSCODE LÀ EDIT KHÔNG PHẢI IDE
      2. PHẢI CÀI MÔI TRƯỜNG + EXTENSION(APP)
      3. EXTENSION CẦN THỜI GIAN CHẠY KHI BIÊN DỊCH
      4. KHÓ CHỌN EXTENSION ĐÚNG`,
    },
  },

  {
    title: "Bắt lỗi bất đồng bộ với async/await",
    category: "Lập trình", 
    subCategory: "JavaScript", 
    answer:
      "Sử dụng khối `try...catch` bao quanh hàm `await` để xử lý lỗi trong các Promise, làm cho mã bất đồng bộ trông giống mã đồng bộ hơn.",
    code: {
      lang: "JavaScript",
      content: `async function fetchData(url) {
try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
} catch (error) {
    console.error('Lỗi khi fetch data:', error);
    return null; 
}
}`,
    },
  },
  {
    title: "Khác biệt giữa == và ===",
    category: "Lập trình", 
    subCategory: "JavaScript", 
    answer: "`===` so sánh cả giá trị và kiểu dữ liệu (Strict Equality), còn `==` chỉ so sánh giá trị (Coercion).",
    code: {
      lang: "JavaScript",
      content: `console.log(0 == false);    // true
console.log(0 === false);   // false 

console.log('10' == 10);    // true
console.log('10' === 10);   // false`,
    },
  },

  {
    title: "Tạo Layout 3 cột bằng Grid",
    category: "Lập trình", 
    subCategory: "HTML/CSS", 
    answer: "Sử dụng `display: grid` và `grid-template-columns` với đơn vị `fr` (fraction) để định nghĩa các cột.",
    code: {
      lang: "CSS",
      content: `.container {
    display: grid;
    /* 3 cột có kích thước bằng nhau */
    grid-template-columns: 1fr 1fr 1fr; 
    gap: 20px;
}`,
    },
  },
  {
    title: "Căn giữa một thẻ Div (Hiện đại)",
    category: "Lập trình", 
    subCategory: "HTML/CSS", 
    answer: "Cách phổ biến nhất là sử dụng Flexbox hoặc Grid để căn giữa hoàn toàn theo cả chiều ngang và chiều dọc.",
    code: {
      lang: "CSS",
      content: `.parent {
display: flex;
justify-content: center; /* Ngang */
align-items: center;     /* Dọc */
height: 100vh;
}`,
imageUrl: "images/1.png",
    },
  },
];