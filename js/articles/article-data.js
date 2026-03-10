const articlesData = [
 {
    id: 2,
    title: "Hướng dẫn toàn diện: Giảm dung lượng lưu trữ ổ cứng",
    date: "14/01/2026",
    category: "Tech",
    excerpt: "Cách thực tế giải phóng dung lượng ổ cứng: nén file, xóa rác, lưu cloud, quản lý thông minh. Tiết kiệm 100GB+ chỉ trong vài bước.",
    content: `
    <img src="https://cdn2.fptshop.com.vn/unsafe/1080x0/filters:format(webp):quality(75)/2024_1_29_638421655993600143_750.jpg" alt="Ổ cứng" height="150px" width="150px"><br><br>
    
    <h3><b>🎯 TẠI SAO PHẢI GIẢM DUNG LƯỢNG?</b></h3>
    <p>+ Máy tính chạy chậm khi ổ cứng >85% dung lượng<br>
    + Windows cần tối thiểu 15-20% không gian trống để hoạt động bình thường<br>
    + Giải phóng dung lượng = máy nhanh hơn 30-50%<br>
    + Tránh mất dữ liệu do ổ cứng đầy<br>
    </p>
    <hr>
    
    <h3><b>📊 PHƯƠNG PHÁP 1: XÓA FILE RÁC WINDOWS (Tiết kiệm 10-30GB)</b></h3>
    <p><b>Cách 1: Dùng Disk Cleanup (Cách dễ nhất)</b></p>
    + B1: Nhấn tổ hợp <b>Win + R</b><br>
    + B2: Gõ <b>cleanmgr</b> rồi Enter<br>
    + B3: Chọn ổ cứng C (hoặc ổ muốn xóa)<br>
    + B4: Tick chọn:<br>
    &nbsp;&nbsp;&nbsp;- Temporary files<br>
    &nbsp;&nbsp;&nbsp;- Recycle Bin<br>
    &nbsp;&nbsp;&nbsp;- Temporary Internet Files<br>
    &nbsp;&nbsp;&nbsp;- Thumbnail cache<br>
    &nbsp;&nbsp;&nbsp;- Log files<br>
    + B5: Nhấn OK để xóa<br>
    <br>
    <p><b>Cách 2: Xóa thư mục Temp trực tiếp (Tiết kiệm 5-15GB)</b></p>
    + B1: Win + R → gõ <b>%temp%</b> → Enter<br>
    + B2: Chọn Ctrl + A để chọn tất cả<br>
    + B3: Nhấn Delete để xóa<br>
    + <u>Mẹo:</u> Nếu file đang dùng thì skip, không cần xóa hết<br>
    <br>
    <p><b>Cách 3: Xóa Windows Update cache (Tiết kiệm 5-20GB)</b></p>
    + B1: Win + R → gõ <b>%systemroot%\\SoftwareDistribution\\Download</b><br>
    + B2: Xóa tất cả file trong folder này<br>
    + <u>Lưu ý:</u> Không sợ, Windows tự tải lại khi update<br>
    </p>
    <hr>
    
    <h3><b>🗑️ PHƯƠNG PHÁP 2: XÓA WINDOWS.OLD (Tiết kiệm 15-30GB)</b></h3>
    <p>Sau khi cập nhật Windows, có thư mục "Windows.old" chứa phiên bản cũ - hoàn toàn có thể xóa sau 30 ngày.<br>
    <br>
    + B1: Mở File Explorer → Ổ C<br>
    + B2: Tìm folder <b>Windows.old</b><br>
    + B3: Click chuột phải → Delete<br>
    + <u>Mẹo:</u> Nếu không thể xóa, dùng <b>Disk Cleanup</b> → Previous Windows installation<br>
    </p>
    <hr>
    
    <h3><b>🎬 PHƯƠNG PHÁP 3: NÉN ẢNH & VIDEO (Tiết kiệm 20-50GB)</b></h3>
    <p><b>Nén video online (miễn phí, không cần cài đặt):</b></p>
    + <b>YouCompress:</b> <a href="https://www.youcompress.com/videos/" target="_blank">youcompress.com</a> - Nén video nhanh<br>
    + <b>Compress.video:</b> <a href="https://compress.video" target="_blank">compress.video</a> - Chuyên nén, chất lượng tốt<br>
    + <b>TinyPNG:</b> <a href="https://tinypng.com" target="_blank">tinypng.com</a> - Nén ảnh 70-80%<br>
    + <b>Bulk Image Compressor:</b> Nén hàng loạt ảnh cùng lúc<br>
    <br>
    <p><b>Cách nén video bằng FFmpeg (Lưu hình ảnh 60%):</b></p>
    + Cài FFmpeg: <a href="https://ffmpeg.org/download.html" target="_blank">ffmpeg.org</a><br>
    + Command: <b>ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4</b><br>
    + Giải thích: -crf 28 = chất lượng trung bình, càng cao càng xấu nhưng file nhỏ<br>
    </p>
    <hr>
    
    <h3><b>☁️ PHƯƠNG PHÁP 4: CHUYỂN DỮ LIỆU LÊN CLOUD (Tiết kiệm 30-100GB)</b></h3>
    <p><b>Các dịch vụ cloud miễn phí 2025:</b></p>
    + <b>Google Drive:</b> <a href="https://drive.google.com" target="_blank">drive.google.com</a> - 15GB free<br>
    + <b>OneDrive:</b> <a href="https://onedrive.live.com" target="_blank">onedrive.live.com</a> - 5GB free<br>
    + <b>Dropbox:</b> <a href="https://dropbox.com" target="_blank">dropbox.com</a> - 2GB free<br>
    + <b>MEGA:</b> <a href="https://mega.nz" target="_blank">mega.nz</a> - 20GB free, mã hóa cao<br>
    + <b>Sync.com:</b> <a href="https://sync.com" target="_blank">sync.com</a> - 5GB free, bảo mật tuyệt<br>
    <br>
    <p><b>Cách tự động backup:</b></p>
    + Cài Google Drive Backup & Sync<br>
    + Tự động upload ảnh, video mỗi ngày<br>
    + Xóa bản local sau khi backup thành công<br>
    </p>
    <hr>
    
    <h3><b>📁 PHƯƠNG PHÁP 5: NÉN FILE VÀO RAR/ZIP (Tiết kiệm 30-50%)</b></h3>
    <p><b>Công cụ nén file:</b></p>
    + <b>7-Zip:</b> <a href="https://www.7-zip.org/" target="_blank">7-zip.org</a> - Miễn phí, nén tốt nhất<br>
    + <b>WinRAR:</b> <a href="https://www.rarlab.com/" target="_blank">rarlab.com</a> - Phổ biến (trial 40 ngày)<br>
    + <b>Bandizip:</b> <a href="https://bandisoft.com" target="_blank">bandisoft.com</a> - Nhanh, đẹp<br>
    <br>
    <p><b>Cách nén:</b></p>
    + Click phải folder → 7-Zip → Add to archive<br>
    + Chọn định dạng: 7z (nén tốt nhất) hoặc zip<br>
    + Compression level: Ultra (nén tối đa)<br>
    + Tiết kiệm 30-50% dung lượng<br>
    </p>
    <hr>
    
    <h3><b>🔍 PHƯƠNG PHÁP 6: TÌM & XÓA FILE LỚNVÔ DỤNG (Tiết kiệm 10-40GB)</b></h3>
    <p><b>Công cụ tìm file lớn:</b></p>
    + <b>TreeSize Free:</b> <a href="https://www.jam-software.com/treesize_free" target="_blank">jam-software.com</a> - Xem phần trăm dung lượng từng folder<br>
    + <b>WizTree:</b> <a href="https://wiztreefree.com" target="_blank">wiztreefree.com</a> - Quét nhanh nhất<br>
    + <b>SpaceSniffer:</b> <a href="http://www.uderzo.it/main_products/spacesniffer/" target="_blank">uderzo.it</a> - Hiển thị đẹp, dễ hiểu<br>
    <br>
    <p><b>Cách sử dụng:</b></p>
    + Cài một trong những công cụ trên<br>
    + Quét ổ C hoặc ổ cần giảm dung lượng<br>
    + Xem các folder nào chiếm dung lượng lớn<br>
    + Xóa các file cũ, backup cũ, game không chơi...<br>
    </p>
    <hr>
    
    <h3><b>🖥️ PHƯƠNG PHÁP 7: TẮT CÁC TÍNH NĂNG LÃNG PHÍ DỮ LIỆU</b></h3>
    <p><b>Tắt System Restore (Tiết kiệm 5-15GB):</b></p>
    + B1: Click phải <b>This PC</b> → Properties<br>
    + B2: <b>System protection</b> → Configure<br>
    + B3: Chọn ổ C → Disable System Protection<br>
    + <u>Lưu ý:</u> Nếu máy gặp lỗi không thể rollback, nhưng không ảnh hưởng thường xuyên<br>
    <br>
    <p><b>Tắt Hibernation (Tiết kiệm RAM size):</b></p>
    + B1: Mở Command Prompt (Admin)<br>
    + B2: Gõ <b>powercfg /h off</b><br>
    + Tiết kiệm bằng dung lượng RAM của bạn<br>
    <br>
    <p><b>Tắt Pagefile lớn:</b></p>
    + Nếu RAM ≥ 16GB: Tắt pagefile để tiết kiệm<br>
    + Nếu RAM ≤ 8GB: Giữ lại (cần dùng)<br>
    </p>
    <hr>
    
    <h3><b>📦 PHƯƠNG PHÁP 8: CHUYỂN HỖ TRỢ CCLEANER (Tiết kiệm 5-20GB)</b></h3>
    <p><b>CCleaner (Phần mềm quét rác hàng đầu):</b></p>
    + Download free: <a href="https://www.ccleaner.com" target="_blank">ccleaner.com</a><br>
    + B1: Mở CCleaner → Cleaner → Analyzer<br>
    + B2: Chọn các mục để xóa (không nên xóa hết)<br>
    + B3: Nhấn Clean để xóa<br>
    + <u>Mẹo:</u> Dùng 1 lần mỗi tháng là đủ<br>
    </p>
    <hr>
    
    <h3><b>💾 PHƯƠNG PHÁP 9: CHUYỂN Ổ CỨNG NGOÀI (Tiết kiệm vĩnh viễn)</b></h3>
    <p><b>Ngoài cách xóa, bạn có thể:</b></p>
    + Mua ổ cứng ngoài 1-2TB (giá 1-2 triệu)<br>
    + Chuyển toàn bộ dữ liệu cũ lên ổ ngoài<br>
    + Xóa trên ổ chính → máy nhanh, dữ liệu an toàn<br>
    + Ổ ngoài tốt: Seagate, WD, Samsung<br>
    </p>
    <hr>
    
    <h3><b>⚡ TÓMLẠITỪNG PHƯƠNG PHÁP THEO HIỆU QUẢ:</b></h3>
    <p>
    <b>Tiết kiệm nhiều nhất:</b> Windows.old (15-30GB) + Temp folder (10-30GB) = 25-60GB<br>
    <b>Tiết kiệm vừa phải:</b> Nén ảnh/video (20-50GB) + Cloud backup (30-100GB)<br>
    <b>Tiết kiệm ít nhưng quan trọng:</b> Tắt System Restore (5-15GB)<br>
    <b>Giải pháp lâu dài:</b> Cloud backup + ổ cứng ngoài<br>
    </p>
    <hr>
    `,
  },
  {
    id: 3,
    title: "Xuất file capcut dùng pro mà không cần pro",
    date: "14/01/2026",
    category: "Trick",
    excerpt: "Mẹo xuất video CapCut với tính năng Pro trên PC mà không cần đăng ký trả phí.",
    content: `
  <img src="https://cdn2.fptshop.com.vn/unsafe/1080x0/filters:format(webp):quality(75)/2024_1_29_638421655993600143_750.jpg" alt="" height="100px"weight="100px">
  + B1: edit chán đi<br>
  + B2: xuất->bắt dùng pro->thoát app->bật vpn->quay lại và xuất<br>
  + tổ hợp phím: win+r --> nhập %temp%-->enter-->xóa hết<br>
  + Tận dụng tài khoản: (ondrive,gg drive) để lưu<br>
  <u>áp dụng cho lap/pc</u></p><br>
  <b>Mẹo 2</b><br>
   dùng capcut mod: <a href="https://capcut.vi.uptodown.com/windows/versions"target="_blank">link</a> </br>
   tải version 1.5.0,khi dùng không đăng nhập/ký<br>
  <p> <u>note:</u> 1 số tính năng pro không dùng được</p>
  `,
  },
  {
    id: 4,
    title: "Tổng hợp các app VPN phổ biến hiện nay",
    date: "14/01/2026",
    category: "Tài nguyên",
    excerpt: "So sánh 6 VPN phổ biến nhất: 1.1.1.1, Shadowrocket, Turbo VPN, Proton, Psiphon, VPNify.",
    content: `
  <img src="https://cdn2.fptshop.com.vn/unsafe/1080x0/filters:format(webp):quality(75)/2024_1_29_638421655993600143_750.jpg" alt="VPN apps" height="100px" width="200px"><br><br>

  <p><b>VPN là gì?</b>
    VPN (Virtual Private Network) giúp mã hóa kết nối mạng, 
    ẩn địa chỉ IP và thay đổi vị trí truy cập Internet.
    Thường được dùng để bảo mật, truy cập nội dung bị giới hạn vùng.
  </p>
  <hr>
  <p><b>1. 1.1.1.1 (Cloudflare WARP)</b><br>
  <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/12/1-1-1-1-for-pc-1.jpg"alt=""heght="200px"width="200px"><br>
    + Miễn phí, tốc độ nhanh<br>
    + Không cần đăng ký tài khoản<br>
    + Phù hợp dùng hàng ngày
  </p>
  <p><u>Nhược điểm:</u> Không chọn được quốc gia cụ thể</p>
  <hr>
  <p><b>2. Shadowrocket (iOS)</b><br>
  <img src="https://cdn2.fptshop.com.vn/unsafe/1080x0/filters:format(webp):quality(75)/2024_3_13_638459520438357897_shadowrocket_.jpg"alt=""heght="200px"width="200px"><br>
    + Hỗ trợ cấu hình proxy / VPN nâng cao<br>
    + Dùng file config (V2Ray, Trojan, SSR...)<br>
    + Phù hợp người dùng có kinh nghiệm
  </p>
  <p><u>Nhược điểm:</u> Trả phí, cần config riêng</p>
  <hr>
  <p><b>3. Turbo VPN</b><br>
  <img src="https://cdn2.fptshop.com.vn/unsafe/1240x0/filters:format(webp):quality(75)/small/turbo_vpn_1_1d6bb6c3c9.jpg"alt=""heght="200px"width="200px"><br>
    + Giao diện đơn giản, dễ dùng<br>
    + Có bản miễn phí<br>
    + Phù hợp người mới
  </p>
  <p><u>Nhược điểm:</u> Có quảng cáo, giới hạn server</p>
  <hr>
  <p><b>4. Proton VPN</b><br>
    + Độ bảo mật cao, uy tín<br>
    + Có bản free không giới hạn dung lượng<br>
    + Hỗ trợ nhiều nền tảng
  </p>
  <p><u>Nhược điểm:</u> Bản free tốc độ trung bình</p>
  <hr>
  <p><b>5. Psiphon</b></p>
  <p>
    + Chuyên vượt kiểm duyệt<br>
    + Không cần đăng nhập<br>
    + Nhẹ, dễ sử dụng
  </p>
  <p><u>Nhược điểm:</u> Không phù hợp xem video chất lượng cao</p>

  <br>
  <p><u>Lưu ý:</u> Không nên dùng VPN miễn phí cho các tác vụ nhạy cảm 
  như ngân hàng, ví điện tử.</p>

  <hr>
  <p><b>6.vpnify-unlimited vpn</b></p>
  <p>
  + chọn nhiều quốc gia
  </p>
  <p><u>Nhược điểm:</u> duy trì 24h và <b>rất lag máy</b></p>
  `,
  },
  {
    id: 5,
    title: "Combo Shadowrocket",
    date: "11/01/2026",
    category: "Trick",
    excerpt: "Bộ sưu tập đầy đủ config & module Shadowrocket: Locket, YouTube, Spotify, Lightroom...",
    content: `
         <img src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2024_3_13_638459520438357897_shadowrocket_.jpg"alt=""heght="200px"width="200px">
         <ol>
           <li>App locket mod: <a href="https://dvsteam.vn/locket-free"target="_blank">link</a><br>
           <li>Config locket 1: <a href="https://raw.githubusercontent.com/vuong2023/shad/main/modules/Locket_ohb.sgmodule"target="_blank">link</a>
           <li>Config locket 2: <a href="https://raw.githubusercontent.com/hvbstar/coderhvb/main/Locket_Gold_HVB.sgmodule"target="_blank">link</a>
           <li>Config youtube: <a href="https://raw.githubusercontent.com/quocchienn/YouTubePIP/refs/heads/YouTube%2B%2B/YouTubefix3.conf"target="_blank">link</a>
           <li>Module youtube: <a href="https://raw.githubusercontent.com/vuong2023/shad/main/modules/Locket_ohb.sgmodule"target="_blank">link</a>
           <li>Config spotify: <a href="https://raw.githubusercontent.com/quocchienn/1in1/refs/heads/main/Spotify.conf"target="_blank">link</a>
           <li>module spotify: <a href="https://raw.githubusercontent.com/quocchienn/1in1/refs/heads/main/Spotify.module"target="_blank">link</a>
           <li>Config soundcloud: <a href="https://raw.githubusercontent.com/vantuan380/vantuan/refs/heads/main/soundcloud.module"target="_blank">link</a>
           <li>Module tổng hợp: <a href="https://raw.githubusercontent.com/quocchienn/Make/refs/heads/crack/ALL_Lucky_VP3.modules"target="_blank">link</a>
           <li>Module meitu: <a href="https://raw.githubusercontent.com/vantuan380/vantuan/refs/heads/main/Meitu.module"target="_blank">link</a>
           <li>Module lightrom: <a href="https://raw.githubusercontent.com/vantuan380/phonton/refs/heads/main/lightroom.module"target="_blank">link</a></li>
          </ol>
         `,
  },
  {
    id: 7,
    title: "Tài liệu lập trình",
    date: "11/01/2026",
    category: "Tech",
    excerpt: "Kho tài liệu lập trình miễn phí: C++, Java, JavaScript, Python và các nguồn tổng hợp.",
    content:
    `
    <div>
    <div align="center">
    <img src="https://mikotech.vn/wp-content/uploads/2022/10/lap-trinh.jpg.webp"alt="lap trinh"width="200"height="200">
    </div>
    <hr>
    <h3>C/C++</h3>
    <p>
        Tài liệu C++: <a href="https://github.com/codetoanbug/Tai_Lieu_cpp">Link</a><br>
        Kho thuật toán: <a href="https://github.com/MAZHARMIK/Interview_DS_Algo">Link</a><br>
        Project C/C++: <a href="https://github.com/codetoanbug/The-Ultimate-C-Programming-Course">Link</a><br>
        Giao diện C++ MPC: <a href="https://www.youtube.com/playlist?list=PLfszubEEhakf7mGTDjsImyp-YGU69_S5k">Link</a><br>
    </p><hr>
    <h3>JAVA</h3>
    <p>
        9 tuần học Java: <a href="https://github.com/hit-haui/Java-HIT-2019">Link</a><br>
        Java HIT: <a href="https://github.com/codetoanbug/Java-HIT-2019">Link</a><br>
        Java PTIT: <a href="https://github.com/codetoanbug/Java-PTIT">Link</a><br>
    <p>

    <hr>
    <h3>JAVASCRIPT</h3>
    <p>Câu hỏi phỏng vấn JS: <a href="https://github.com/lydiahallie/javascript-questions/blob/master/vi-VI/README-vi.md">Link</a></p>
    <hr>
    <h3>PYTHON</h3>
    <p>
      Tài liệu Python: <a href="https://github.com/codetoanbug/pytutor">Link</a><br>
      Python PDF: <a href="https://drive.google.com/drive/u/0/folders/1XxvRMSDA-KgfRL8oC-vLkbUpM8Tdcq3o">Link</a>
    </p>
    <hr>
    <h3>Tổng hợp</h3>
    <ol>
        <li><a href="https://github.com/orgs/TheAlgorithms/repositories?q=sort%3Astars">The Algorithms</a></li>
        <li><a href="https://github.com/tmsanghoclaptrinh/tai-lieu-lap-trinh-tieng-viet-mien-phi">Tài liệu lập trình tiếng Việt</a></li>
        <li><a href="https://www.youtube.com/@stanfordonline/videos">Học AI</a></li>
        <li><a href="https://www.youtube.com/playlist?list=PLgPbN3w-ia_PeT1_c5jiLW3RJdR7853b9">Deep learning</a></li>
        <li><a href="https://www.themedevhub.com/">them code html/css</a></li>
        <li><a href="https://codepen.io/collection/XMoeqD">mẫu html/css/js</a></li>
        <li><a href="https://goalkicker.com/">tổng hợp lập trình pdf</a></li>
        <li><a href="https://uiverse.io/elements">source html/css/js</a></li>
        <li><a href="https://fontawesome.com/search?o=r">icon lập trình web</a></li>
        <li><a href="https://www.youtube.com/playlist?list=PLRLJQuuRRcFnwlQxGeVSVv-z_5tFwAh0j">lập trình dot net</a></li>
        <li><a href="https://it-tools.tech/">web full tính năng IT</a></li>
    </ol>
</div>
    `,
  },
  {
    id: 8,
    title: "Tổng hợp Tài nguyên",
    date: "11/01/2026",
    category: "Tài nguyên",
    excerpt: "Excel, CapCut IPA, kho phần mềm, chặn quảng cáo iPhone, prompt AI, ksign, esign...",
    content:`
    <p>Excel: <a href="https://drive.google.com/drive/folders/1ym2rV7q5GcpBsuVAIxwZkiP34T5KeL93">link</a><br>
    Kho phần mềm: <a href="https://www.hoanghaopc.com/trang-ch%E1%BB%A7">link</a><br>
    chặn qc iphone: <a href="https://www.mediafire.com/file/mp73j9qvevt2hdq">link</a><br>
    promt lệnh AI: <a href="https://academy.openai.com/public/tags/prompt-packs-6849a0f98c613939acef841c?fbclid=IwY2xjawNIzVRleHRuA2FlbQIxMABicmlkETFZVlF2WHVLS05nWEpIWU1NAR45V0SeTFKGz53z9-256aTMWtcU5XiVFUFc3CGZRo2KYItt4C-rQAvsXDFJ6g_aem_21CasUjZMjr35LAmYJEL5w">link</a><br>
    nhân bản app: <a href="https://github.com/sandboxie-plus/Sandboxie/releases/tag/v1.16.3">link</a><br>
    kho api: <a href="https://ios.codevn.net/">link</a><br>
    ksign,esign...: <a href="https://khoindvn.io.vn/">link</a>
    chat gpt:<a href="https://drive.google.com/drive/folders/17OmUO45MVdow04ahkvtad2c5Up-cjnMU"target="_blank">link</a><br>
    photoshop: <a href="https://drive.google.com/drive/folders/1ZaS5kstFSNlxms07pQHL7d8q5ENY5W-G"target="_blank">link</a><br>
    <hr>
    <h1>capcut</h1>
    khóa học: <a href="https://drive.google.com/drive/folders/1FNNweSUKpAYYx9BOPh9ZN0D3RfXnJy9Q"target="_blank">link</a><br>
    khóa học: <a href="https://drive.google.com/drive/folders/158AjHmp5kHyjr4aqJnq_o4oVEjr7TcRp"target="_blank">link</a>
    Capcut ipa: <a href="https://ipaomtk.com/capcut-ipa/">link</a><br>
    <hr>
    <h1>shoppe</h1>
    khóa học: <a href="https://drive.google.com/drive/folders/1lQpnZoyG7hI-V57xOtn9-qOGfL5yoLq4"target="_blank">link</a><br>
    <hr>
    <h1>canva</h1>
    khóa học<a href="https://drive.google.com/drive/folders/1jEYVBRK6UIMzGb8yw3fn8ziYOPKBsoer"target=">blank">link</a>
    <hr>
    <h1>tiktok</h1>
    reup tiktok: <a href="https://drive.google.com/drive/folders/1QLbk4yfZ5VLhuzYDhQAhmI2f36SwXQlh"target="_blank">link</a><br>
    tiktok shop: <a href="https://drive.google.com/drive/folders/1kKu-Ln2CMlmm05TRSRd1-1B0DTNzuU0I"target="_blank">link</a><br>
    chạy qc tiktok: <a href="https://drive.google.com/drive/folders/1-d_zpGlu8ma4mnFXvXw_5m1_5VEso2t7"target="_blank">link</a><br>
    </p>

    `
  },
  {
  id: 9,
  title: "Tổng hợp Web hữu ích 2025 theo nhóm thể loại",
  date: "26/02/2026",
  category: "Tài nguyên",
  excerpt: "Kho website hữu ích phân loại theo nhóm: AI, Design, Coding, Marketing, Chỉnh sửa ảnh, Video...",
  content: `
  <h3><b>🤖 NHÓM AI & CHATBOT</b></h3>
  <p>+ <b>ChatGPT:</b> <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> - Chatbot AI phổ biến nhất<br>
  + <b>Google Gemini:</b> <a href="https://gemini.google.com" target="_blank">gemini.google.com</a> - AI của Google, tiếng Việt rất tốt<br>
  + <b>Claude:</b> <a href="https://claude.ai" target="_blank">claude.ai</a> - AI xử lý tài liệu dài tốt nhất<br>
  + <b>Perplexity:</b> <a href="https://perplexity.ai" target="_blank">perplexity.ai</a> - Công cụ trả lời (answer engine)<br>
  + <b>DeepSeek:</b> <a href="https://deepseek.com" target="_blank">deepseek.com</a> - AI mới của Trung Quốc, miễn phí, mạnh mẽ<br>
  </p>
  <hr>
  
  <h3><b>🎨 NHÓM DESIGN & HÌNH ẢNH</b></h3>
  <p>+ <b>Midjourney:</b> <a href="https://midjourney.com" target="_blank">midjourney.com</a> - Tạo ảnh AI chất lượng cao<br>
  + <b>DALL-E 3:</b> <a href="https://openai.com/dall-e-3" target="_blank">openai.com/dall-e-3</a> - AI tạo ảnh từ text<br>
  + <b>Canva:</b> <a href="https://canva.com" target="_blank">canva.com</a> - Thiết kế poster, flyer, thumbnail<br>
  + <b>Figma:</b> <a href="https://figma.com" target="_blank">figma.com</a> - Thiết kế UI/UX chuyên nghiệp<br>
  + <b>Vance AI:</b> <a href="https://vanceai.com" target="_blank">vanceai.com</a> - Upscale ảnh, làm nét, bóc tách nền<br>
  + <b>Remove.bg:</b> <a href="https://remove.bg" target="_blank">remove.bg</a> - Xóa nền ảnh tự động<br>
  + <b>Photopea:</b> <a href="https://photopea.com" target="_blank">photopea.com</a> - Photoshop online miễn phí<br>
  </p>
  <hr>
  
  <h3><b>💻 NHÓM LẬP TRÌNH & CODING</b></h3>
  <p>+ <b>GitHub Copilot:</b> <a href="https://github.com/features/copilot" target="_blank">github.com/copilot</a> - AI viết code tốt nhất<br>
  + <b>Codeium:</b> <a href="https://codeium.com" target="_blank">codeium.com</a> - Copilot free, không giới hạn<br>
  + <b>Tabnine:</b> <a href="https://tabnine.com" target="_blank">tabnine.com</a> - AI code completion<br>
  + <b>OpenAI Playground:</b> <a href="https://platform.openai.com/playground" target="_blank">platform.openai.com/playground</a> - Test AI code<br>
  + <b>StackBlitz:</b> <a href="https://stackblitz.com" target="_blank">stackblitz.com</a> - IDE online cho Web<br>
  + <b>Replit:</b> <a href="https://replit.com" target="_blank">replit.com</a> - Coding online đầy đủ<br>
  + <b>CodePen:</b> <a href="https://codepen.io" target="_blank">codepen.io</a> - Chia sẻ code HTML/CSS/JS<br>
  </p>
  <hr>
  
  <h3><b>🌐 NHÓM TẠO WEBSITE</b></h3>
  <p>+ <b>Wix:</b> <a href="https://wix.com" target="_blank">wix.com</a> - Builder website dễ dùng (110M users)<br>
  + <b>WordPress.com:</b> <a href="https://wordpress.com" target="_blank">wordpress.com</a> - CMS phổ biến nhất thế giới<br>
  + <b>Webflow:</b> <a href="https://webflow.com" target="_blank">webflow.com</a> - Thiết kế web chuyên sâu<br>
  + <b>Strikingly:</b> <a href="https://strikingly.com" target="_blank">strikingly.com</a> - Tạo landing page nhanh<br>
  + <b>Jimdo:</b> <a href="https://jimdo.com" target="_blank">jimdo.com</a> - Website builder dễ dùng (20M sites)<br>
  + <b>Google Sites:</b> <a href="https://sites.google.com" target="_blank">sites.google.com</a> - Tạo web cơ bản miễn phí<br>
  + <b>Relume:</b> <a href="https://relume.io" target="_blank">relume.io</a> - AI tạo sitemap & wireframe<br>
  + <b>B12:</b> <a href="https://b12.io" target="_blank">b12.io</a> - AI tạo website trong 60 giây<br>
  </p>
  <hr>
  
  <h3><b>🎬 NHÓM CHỈNH SỬA VIDEO</b></h3>
  <p>+ <b>CapCut:</b> <a href="https://capcut.com" target="_blank">capcut.com</a> - Edit video, short form trending<br>
  + <b>DaVinci Resolve:</b> <a href="https://davinciresolve.com" target="_blank">davinciresolve.com</a> - Editor video chuyên nghiệp FREE<br>
  + <b>Shotcut:</b> <a href="https://shotcut.org" target="_blank">shotcut.org</a> - Open source video editor<br>
  + <b>Clipchamp:</b> <a href="https://clipchamp.com" target="_blank">clipchamp.com</a> - Tạo video từ ảnh/text<br>
  + <b>Runway:</b> <a href="https://runwayml.com" target="_blank">runwayml.com</a> - AI edit video, tạo hiệu ứng<br>
  + <b>FlexClip:</b> <a href="https://flexclip.com" target="_blank">flexclip.com</a> - Tạo video marketing dễ<br>
  </p>
  <hr>
  
  <h3><b>✍️ NHÓM VIẾT & CONTENT</b></h3>
  <p>+ <b>Writesonic:</b> <a href="https://writesonic.com" target="_blank">writesonic.com</a> - AI viết bài tiếp thị<br>
  + <b>Copy.ai:</b> <a href="https://copy.ai" target="_blank">copy.ai</a> - AI copywriting nhanh<br>
  + <b>Grammarly:</b> <a href="https://grammarly.com" target="_blank">grammarly.com</a> - Sửa grammar & chính tả<br>
  + <b>Hemingway Editor:</b> <a href="https://hemingwayapp.com" target="_blank">hemingwayapp.com</a> - Viết văn rõ ràng, súc tích<br>
  + <b>Medium:</b> <a href="https://medium.com" target="_blank">medium.com</a> - Đăng blog, bài viết<br>
  </p>
  <hr>
  
  <h3><b>📊 NHÓM DỮ LIỆU & ANALYTICS</b></h3>
  <p>+ <b>Google Analytics:</b> <a href="https://analytics.google.com" target="_blank">analytics.google.com</a> - Theo dõi traffic website<br>
  + <b>Mixpanel:</b> <a href="https://mixpanel.com" target="_blank">mixpanel.com</a> - Analytics app/website<br>
  + <b>Looker Studio:</b> <a href="https://lookerstudio.google.com" target="_blank">lookerstudio.google.com</a> - Tạo dashboard data<br>
  + <b>Airtable:</b> <a href="https://airtable.com" target="_blank">airtable.com</a> - Database & CRM linh hoạt<br>
  </p>
  <hr>
  
  <h3><b>🎵 NHÓM ÂM THANH & MUSIC</b></h3>
  <p>+ <b>Audacity:</b> <a href="https://audacityteam.org" target="_blank">audacityteam.org</a> - Edit âm thanh chuyên sâu<br>
  + <b>Adobe Podcast:</b> <a href="https://podcast.adobe.com" target="_blank">podcast.adobe.com</a> - Giảm ồn podcast AI<br>
  + <b>Splice:</b> <a href="https://splice.com" target="_blank">splice.com</a> - Tạo nhạc & beat<br>
  + <b>Soundraw:</b> <a href="https://soundraw.io" target="_blank">soundraw.io</a> - AI tạo nhạc nền<br>
  + <b>YouTube Audio Library:</b> <a href="https://www.youtube.com/audiolibrary" target="_blank">youtube.com/audiolibrary</a> - Nhạc free cho video<br>
  </p>
  <hr>
  
  <h3><b>📱 NHÓM TƯ VẤN & TOOL SINH VIÊN</b></h3>
  <p>+ <b>Canva Education:</b> <a href="https://canva.com/education" target="_blank">canva.com/education</a> - Canva free cho sinh viên<br>
  + <b>GitHub Student:</b> <a href="https://education.github.com" target="_blank">education.github.com</a> - Copilot & tools free<br>
  + <b>JetBrains for Students:</b> <a href="https://www.jetbrains.com/community/education/" target="_blank">jetbrains.com/community/education</a> - IDE/IDE professional free<br>
  + <b>Figma for Education:</b> <a href="https://www.figma.com/education" target="_blank">figma.com/education</a> - Figma miễn phí cho học sinh<br>
  + <b>Google One for Students:</b> <a href="https://www.google.com/onekstudy" target="_blank">google.com/one</a> - Storage, tools free<br>
  </p>
  <hr>
  `,
},
];