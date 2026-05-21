# Kế hoạch Tái cấu trúc và Phân chia Mã nguồn AlgoCraft

Mục tiêu của kế hoạch này là tách mã nguồn từ một tệp duy nhất `index.html` thành các tệp CSS và Javascript riêng biệt, tổ chức theo thư mục rõ ràng và thêm chú thích (comments) đầy đủ để nâng cao tính bảo trì, mở rộng và dễ đọc của dự án.

## Đề xuất cấu trúc thư mục mới

Chúng ta sẽ tạo các thư mục và tệp mới trong thư mục `user/` như sau:
```text
user/
├── index.html (Sẽ được sửa đổi để liên kết tới CSS và JS bên ngoài)
├── css/
│   └── style.css (Chứa toàn bộ style CSS tự định nghĩa)
└── js/
    ├── data.js (Chứa dữ liệu cấu hình danh mục và đồ thị mặc định)
    ├── database.js (Chứa cơ sở dữ liệu thuật toán và các hàm sinh bước trực quan)
    └── main.js (Chứa logic điều khiển UI, tương tác, giả lập, âm thanh, và sự kiện)
```

## Các thay đổi chi tiết

### 1. Thành phần CSS
#### [NEW] [style.css](file:///d:/Mindx/AppProducer/Sample%20Personal/AlgoCraft/user/css/style.css)
- Di chuyển toàn bộ mã CSS trong thẻ `<style>` của `index.html` sang tệp này.
- Thêm bình luận giải thích chi tiết cho từng nhóm CSS (Custom scrollbar, transitions, sidebar collapsed rules).

### 2. Thành phần dữ liệu cấu hình (Javascript Data)
#### [NEW] [data.js](file:///d:/Mindx/AppProducer/Sample%20Personal/AlgoCraft/user/js/data.js)
- Định nghĩa mảng danh mục thuật toán `algoCategories` (gồm 31 danh mục).
- Định nghĩa mảng phân nhóm lớn `megaGroups` (7 nhóm chính).
- Định nghĩa dữ liệu đồ thị mặc định `graphData` sử dụng cho phần trực quan hóa đồ thị.

### 3. Cơ sở dữ liệu thuật toán (Javascript Database & Generators)
#### [NEW] [database.js](file:///d:/Mindx/AppProducer/Sample%20Personal/AlgoCraft/user/js/database.js)
- Định nghĩa đối tượng `algorithmDatabase` chứa các thông tin học thuật (concept, conditions, idea, guide, pseudocode, code mẫu C++/Python, codeTrace).
- Chứa các hàm sinh tiến trình chạy thử thuật toán (`generator`) cho các thuật toán:
  - `linear` (Tìm kiếm tuần tự)
  - `binary` (Tìm kiếm nhị phân)
  - `bubble` (Sắp xếp nổi bọt)
  - `selection` (Sắp xếp chọn)
  - `sieve_primes` (Sàng Eratosthenes)
- Đảm bảo các hàm sinh dữ liệu hoạt động độc lập và trả về chuỗi các bước mô phỏng.

### 4. Logic điều khiển và hiển thị (Javascript Main Controller)
#### [NEW] [main.js](file:///d:/Mindx/AppProducer/Sample%20Personal/AlgoCraft/user/js/main.js)
- Quản lý trạng thái toàn cục của ứng dụng (`activeMegaGroupId`, `activeAlgoId`, `currentMode`, `playTimer`, v.v.).
- Chạy hệ thống âm thanh phản hồi bằng Web Audio API.
- Các hàm điều khiển hiển thị sidebar, vẽ biểu đồ dạng SVG hoặc Array Bars:
  - `buildSidebarCategories()`, `renderMegaGroupDashboard()`, `selectMegaGroup()`
  - `drawInteractiveGraph()`, `runGraphTraversalSimulation()`
- Các sự kiện điều khiển dòng thời gian (timeline slider), tự động chạy (`playback`), kiểm soát phím tắt.
- Logic lọc tìm kiếm trực tiếp thuật toán (`algoSearchInput` event).
- Hàm nạp ban đầu `window.onload`.

### 5. Cập nhật trang chủ
#### [MODIFY] [index.html](file:///d:/Mindx/AppProducer/Sample%20Personal/AlgoCraft/user/index.html)
- Loại bỏ thẻ `<style>` nội tuyến (inline CSS).
- Thêm thẻ `<link rel="stylesheet" href="css/style.css">`.
- Loại bỏ thẻ `<script>` chứa logic Javascript nội tuyến khổng lồ.
- Thêm các thẻ tải tệp JS mới theo thứ tự chuẩn:
  ```html
  <script src="js/data.js"></script>
  <script src="js/database.js"></script>
  <script src="js/main.js"></script>
  ```

---

## Kế hoạch kiểm thử & Xác minh

### Kiểm thử thủ công:
1. Mở trang `index.html` trên trình duyệt và kiểm tra giao diện ban đầu (dashboard hiển thị 7 nhóm thuật toán).
2. Kiểm tra tính năng tìm kiếm (gõ từ khóa như "KMP" hoặc "Sort" để lọc thẻ hiển thị).
3. Bấm vào một thuật toán trong nhóm "Thuật toán cơ sở" (ví dụ: Binary Search):
   - Đảm bảo giao diện Sandbox tải đúng.
   - Thử bấm "Play" để xem animation cột di chuyển hoặc đổi màu, và kiểm tra thanh tiến trình chạy khớp.
   - Thử chuyển tab sang "Xem Chi Tiết" (tab lý thuyết học thuật) xem 10 mục lý thuyết có hiển thị đầy đủ thông tin chuẩn không.
4. Bấm vào thuật toán Đồ thị (ví dụ: BFS hoặc DFS):
   - Kiểm tra canvas SVG vẽ các đỉnh A, B, C, D, E.
   - Bấm nút "+ Nút" và click lên canvas xem nút mới được thêm thành công không.
   - Bấm vào một đỉnh để chạy mô phỏng duyệt đồ thị (các đỉnh đổi màu vàng/xanh theo tiến trình).
5. Kiểm tra phím tắt (Space để Dừng/Chạy, ArrowRight/Left để dịch bước).
