const notesData = [
  {
    id: 1,
    title: "Đảo ngược chuỗi (String Reversal)",
    category: "Lập trình",
    subCategory: "Python",
    difficulty: "Cơ bản",
    answer: "Sử dụng slicing với bước nhảy $-1$ để đảo ngược chuỗi một cách ngắn gọn và 'Pythonic'.",
    code: {
      lang: "Python",
      content: `text = "hello world"\nreversed_text = text[::-1]\nprint(reversed_text) # dlrow olleh`,
    },
  },
  {
    id: 2,
    title: "Sử dụng List Comprehension",
    category: "Lập trình", 
    subCategory: "Python", 
    difficulty: "Cơ bản",
    answer: "List Comprehension giúp tạo danh sách mới một cách nhanh chóng dựa trên các danh sách đã có.",
    code: {
      lang: "Python",
      content: `numbers = [1, 2, 3, 4, 5]\nsquares = [x**2 for x in numbers if x > 2]\nprint(squares) # [9, 16, 25]`,
    },
  },
  {
    id: 3,
    title: "Bắt lỗi bất đồng bộ với async/await",
    category: "Lập trình", 
    subCategory: "JavaScript", 
    difficulty: "Trung bình",
    answer: "Sử dụng khối `try...catch` bao quanh hàm `await` để xử lý các lỗi mạng hoặc lỗi từ server.",
    code: {
      lang: "JavaScript",
      content: `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Lỗi:", error);\n  }\n}`,
    },
  },
  {
    id: 4,
    title: "Căn giữa phần tử với Flexbox",
    category: "Giao diện",
    subCategory: "CSS",
    difficulty: "Cơ bản",
    answer: "Sử dụng cặp thuộc tính `justify-content` và `align-items` trên thẻ cha (display: flex).",
    code: {
      lang: "CSS",
      content: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}`,
    },
  },
  {
    id: 5,
    title: "Lọc trùng lặp trong mảng",
    category: "Lập trình",
    subCategory: "JavaScript",
    difficulty: "Cơ bản",
    answer: "Sử dụng đối tượng `Set` để loại bỏ các giá trị trùng lặp một cách nhanh nhất.",
    code: {
      lang: "JavaScript",
      content: `const numbers = [1, 2, 2, 3, 4, 4, 5];\nconst uniqueNumbers = [...new Set(numbers)];\nconsole.log(uniqueNumbers); // [1, 2, 3, 4, 5]`,
    },
  },
  {
    id: 6,
    title: "Tạo bảng (Table) chuẩn SEO",
    category: "Giao diện",
    subCategory: "HTML",
    difficulty: "Cơ bản",
    answer: "Sử dụng đầy đủ các thẻ semantic như `thead`, `tbody`, và `th` để hỗ trợ trình đọc màn hình.",
    code: {
      lang: "HTML",
      content: `<table>\n  <thead>\n    <tr><th>ID</th><th>Tên</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td>Gemini</td></tr>\n  </tbody>\n</table>`,
    },
  },
  {
    id: 7,
    title: "Truy vấn kết hợp (INNER JOIN)",
    category: "Dữ liệu",
    subCategory: "SQL",
    difficulty: "Trung bình",
    answer: "Sử dụng JOIN để lấy dữ liệu từ hai bảng có liên kết thông qua khóa ngoại.",
    code: {
      lang: "SQL",
      content: `SELECT orders.id, customers.name\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.id;`,
    },
  },
  {
    id: 8,
    title: "Biến CSS (CSS Variables)",
    category: "Giao diện",
    subCategory: "CSS",
    difficulty: "Cơ bản",
    answer: "Khai báo biến trong `:root` để có thể tái sử dụng màu sắc hoặc kích thước trên toàn bộ website.",
    code: {
      lang: "CSS",
      content: `:root {\n  --main-color: #bb86fc;\n}\n\n.card {\n  color: var(--main-color);\n}`,
    },
  },
  {
    id: 9,
    title: "Ngăn chặn tấn công XSS",
    category: "An ninh mạng",
    subCategory: "Web Security",
    difficulty: "Trung bình",
    answer: "Luôn mã hóa dữ liệu đầu vào từ người dùng trước khi hiển thị lên HTML để tránh thực thi script lạ.",
    code: {
      lang: "JavaScript",
      content: `function escapeHTML(str) {\n  const p = document.createElement('p');\n  p.textContent = str;\n  return p.innerHTML;\n}\n// Sử dụng: element.innerHTML = escapeHTML(userInput);`
    }
  },
  {
    id: 10,
    title: "Sử dụng Prepared Statements chống SQL Injection",
    category: "An ninh mạng",
    subCategory: "Database",
    difficulty: "Nâng cao",
    answer: "Thay vì cộng chuỗi SQL, hãy dùng tham số hóa (parameterized) để tách biệt lệnh thực thi và dữ liệu.",
    code: {
      lang: "PHP/SQL",
      content: `$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);\n$user = $stmt->fetch();`
    }
  },
  {
    id: 11,
    title: "Mã hóa mật khẩu với Bcrypt",
    category: "An ninh mạng",
    subCategory: "Node.js",
    difficulty: "Trung bình",
    answer: "Không bao giờ lưu mật khẩu dạng plain-text. Hãy dùng Salt và Hash với thuật toán Bcrypt.",
    code: {
      lang: "JavaScript",
      content: `const bcrypt = require('bcrypt');\nconst hash = await bcrypt.hash(myPassword, 10);\n// So sánh: const match = await bcrypt.compare(pass, hash);`
    }
  },
  {
    id: 12,
    title: "Cấu hình Content Security Policy (CSP)",
    category: "An ninh mạng",
    subCategory: "HTTP Header",
    difficulty: "Nâng cao",
    answer: "Hạn chế các nguồn tải tài nguyên (scripts, styles) để bảo vệ trang web khỏi các cuộc tấn công chèn mã.",
    code: {
      lang: "HTML",
      content: `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted.com;">`
    }
  },
  {
    id: 13,
    title: "Kiểm tra quyền truy cập (Middleware)",
    category: "Lập trình",
    subCategory: "Express.js",
    difficulty: "Trung bình",
    answer: "Sử dụng Middleware để kiểm tra Token (JWT) trước khi cho phép truy cập vào các Route nhạy cảm.",
    code: {
      lang: "JavaScript",
      content: `const auth = (req, res, next) => {\n  const token = req.header('x-auth-token');\n  if (!token) return res.status(401).send('Access Denied');\n  next();\n};`
    }
  },
  {
    id: 14,
    title: "Quét cổng với Python (Simple Port Scanner)",
    category: "An ninh mạng",
    subCategory: "Python",
    difficulty: "Nâng cao",
    answer: "Sử dụng thư viện socket để kiểm tra các cổng đang mở trên một địa chỉ IP mục tiêu.",
    code: {
      lang: "Python",
      content: `import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nresult = s.connect_ex(('127.0.0.1', 80))\nif result == 0: print("Port is open")`
    }
  },
  {
    id: 15,
    title: "Xác thực đa yếu tố (2FA) Logic",
    category: "An ninh mạng",
    subCategory: "Security Flow",
    difficulty: "Nâng cao",
    answer: "Sau khi đăng nhập đúng pass, tạo một mã OTP 6 số gửi qua Email/SMS và yêu cầu nhập lại.",
    code: {
      lang: "JavaScript",
      content: `const otp = Math.floor(100000 + Math.random() * 900000);\n// Gửi otp qua dịch vụ mail/sms và lưu vào Redis với TTL 5 phút.`
    }
  },
  {
    id: 16,
    title: "Lập trình đa luồng (Multithreading)",
    category: "Lập trình",
    subCategory: "Java",
    difficulty: "Nâng cao",
    answer: "Sử dụng Thread để thực hiện các tác vụ song song, giúp tối ưu hiệu suất xử lý.",
    code: {
      lang: "Java",
      content: `class MyThread extends Thread {\n  public void run() { System.out.println("Thread is running..."); }\n}\nMyThread t1 = new MyThread(); t1.start();`
    }
  },
  {
    id: 17,
    title: "Hàm Lambda trong C++",
    category: "Lập trình",
    subCategory: "C++",
    difficulty: "Trung bình",
    answer: "Lambda cho phép định nghĩa các hàm ẩn danh ngắn gọn ngay trong thân hàm khác.",
    code: {
      lang: "C++",
      content: `auto add = [](int a, int b) { return a + b; };\nstd::cout << add(5, 3); // Output: 8`
    }
  },
  {
    id: 18,
    title: "Sử dụng con trỏ (Pointers) cơ bản",
    category: "Lập trình",
    subCategory: "C",
    difficulty: "Trung bình",
    answer: "Con trỏ lưu trữ địa chỉ vùng nhớ của biến khác, cho phép thao tác trực tiếp trên bộ nhớ.",
    code: {
      lang: "C",
      content: `int var = 20; int *ip = &var;\nprintf("Địa chỉ: %p\\n", ip);\nprintf("Giá trị: %d\\n", *ip);`
    }
  },
  {
    id: 19,
    title: "Fetch API với Proxy",
    category: "Lập trình",
    subCategory: "JavaScript",
    difficulty: "Trung bình",
    answer: "Vượt qua lỗi CORS khi lập trình web bằng cách gọi qua một Proxy server trung gian.",
    code: {
      lang: "JavaScript",
      content: `fetch('https://proxy-server.com/target-api')\n  .then(res => res.json())\n  .then(data => console.log(data));`
    }
  },
  {
    id: 20,
    title: "Docker Compose cơ bản",
    category: "DevOps",
    subCategory: "Docker",
    difficulty: "Trung bình",
    answer: "Quản lý nhiều container (Web, DB) cùng lúc bằng một file cấu hình duy nhất.",
    code: {
      lang: "YAML",
      content: `services:\n  web: build: .\n  db:\n    image: postgres\n    environment: POSTGRES_PASSWORD=abc`
    }
  },
  {
    id: 21,
    title: "Git Rebase vs Merge",
    category: "Công cụ",
    subCategory: "Git",
    difficulty: "Trung bình",
    answer: "Rebase giúp lịch sử commit trông sạch sẽ và thẳng hàng hơn thay vì tạo các nhánh rẽ nhánh như Merge.",
    code: {
      lang: "Bash",
      content: `git checkout feature\ngit rebase main\n# Sau đó xử lý xung đột nếu có.`
    }
  },
  {
    id: 22,
    title: "Mô hình MVC (Model-View-Controller)",
    category: "Kiến trúc",
    subCategory: "Software Design",
    difficulty: "Trung bình",
    answer: "Tách biệt logic xử lý dữ liệu (Model), giao diện (View) và điều hướng (Controller).",
    code: {
      lang: "Concept",
      content: `Controller nhận Request -> Gọi Model lấy Data -> Trả Data về View hiển thị.`
    }
  },
  {
    id: 23,
    title: "Chống Brute Force bằng Rate Limiting",
    category: "An ninh mạng",
    subCategory: "Backend",
    difficulty: "Trung bình",
    answer: "Giới hạn số lần yêu cầu từ một địa chỉ IP trong một khoảng thời gian nhất định.",
    code: {
      lang: "JavaScript",
      content: `const rateLimit = require('express-rate-limit');\nconst limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });\napp.use(limiter);`
    }
  },
  {
    id: 24,
    title: "Xác thực JWT (JSON Web Token)",
    category: "An ninh mạng",
    subCategory: "Authentication",
    difficulty: "Trung bình",
    answer: "Tạo một chuỗi mã hóa chứa thông tin người dùng để gửi kèm trong mỗi Request Header.",
    code: {
      lang: "JavaScript",
      content: `const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });`
    }
  },
  {
    id: 25,
    title: "Quản lý State với Redux",
    category: "Lập trình",
    subCategory: "React",
    difficulty: "Nâng cao",
    answer: "Sử dụng Store duy nhất để quản lý dữ liệu toàn cục cho các ứng dụng React lớn.",
    code: {
      lang: "JavaScript",
      content: `const reducer = (state = 0, action) => {\n  switch(action.type) {\n    case 'INCREMENT': return state + 1;\n    default: return state;\n  }\n};`
    }
  },
  {
    id: 26,
    title: "Thuật toán Sắp xếp Nhanh (Quick Sort)",
    category: "Thuật toán",
    subCategory: "CS Theory",
    difficulty: "Nâng cao",
    answer: "Sử dụng chiến thuật chia để trị (Divide and Conquer) với phần tử chốt (pivot).",
    code: {
      lang: "Python",
      content: `def quicksort(arr):\n  if len(arr) <= 1: return arr\n  pivot = arr[len(arr)//2]\n  # Logic phân tách mảng trái, phải và giữa`
    }
  },
  {
    id: 27,
    title: "Regex kiểm tra Email",
    category: "Lập trình",
    subCategory: "Tool",
    difficulty: "Cơ bản",
    answer: "Sử dụng biểu thức chính quy để kiểm tra định dạng email người dùng nhập vào.",
    code: {
      lang: "Regex",
      content: `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`
    }
  },
  {
    id: 28,
    title: "Tối ưu hóa hình ảnh trên Web",
    category: "Giao diện",
    subCategory: "Performance",
    difficulty: "Cơ bản",
    answer: "Sử dụng thuộc tính `loading='lazy'` để chỉ tải ảnh khi người dùng cuộn tới.",
    code: {
      lang: "HTML",
      content: `<img src="large-image.jpg" loading="lazy" alt="Mô tả ảnh">`
    }
  },
  {
    id: 29,
    title: "Phòng chống Clickjacking",
    category: "An ninh mạng",
    subCategory: "HTTP Header",
    difficulty: "Trung bình",
    answer: "Sử dụng X-Frame-Options để ngăn trang web của bạn bị nhúng vào thẻ iframe của trang khác.",
    code: {
      lang: "Apache/Nginx",
      content: `Header always set X-Frame-Options "SAMEORIGIN"`
    }
  },
  {
    id: 30,
    title: "Kết nối MongoDB với Mongoose",
    category: "Dữ liệu",
    subCategory: "NoSQL",
    difficulty: "Trung bình",
    answer: "Sử dụng Mongoose để định nghĩa Schema và thao tác với Database dễ dàng hơn.",
    code: {
      lang: "JavaScript",
      content: `mongoose.connect('mongodb://localhost/test');\nconst Cat = mongoose.model('Cat', { name: String });\nconst kitty = new Cat({ name: 'Zildjian' });\nkitty.save();`
    }
  }
];