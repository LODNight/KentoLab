# UI Components & Architecture

## 1. Công nghệ Giao diện (Tech Stack)
-   **CSS Framework:** Tailwind CSS (Load qua CDN trong file html). Giúp xây dựng UI nhanh chóng thông qua Utility Classes mà không cần viết file CSS riêng lẻ quá nhiều.
-   **Icons:** FontAwesome 6 (CDN) cho các biểu tượng trực quan.
-   **Layout Structure:** Sử dụng mô hình Flexbox (CSS Flex) để chia đôi trang màn hình (`flex-col md:flex-row`).
-   **Typography:** Google Fonts (Inter cho văn bản thường, Fira Code cho Code block/Terminal).

## 2. Hệ thống Modals (Cửa sổ nổi)
Ứng dụng sử dụng một thiết kế chung (Generic Model) cho tất cả các Popup (Xác thực, Thanh toán, Thông báo):
-   Cấu trúc chung: Một lớp overlay mờ bọc ngoài (`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center`).
-   Cửa sổ bên trong: Có animation `scale-95` kết hợp với transition để tạo hiệu ứng Popup bật lên.
-   Mỗi Module JS (`auth.js`, `payment.js`) đều có hàm đóng/mở Modal riêng thông qua việc toggle class `hidden` của DOM.

## 3. Sidebar (Thanh Điều Hướng)
-   **Responsive:** Trên Desktop (trên 768px), Sidebar có thể thu gọn (Collapsed) để nhường toàn bộ không gian cho vùng hiển thị thuật toán. Trên Mobile, Sidebar được giấu và hiện lên thông qua nút Hamburger menu.
-   **Trạng thái Ẩn/Hiện:** Giao diện Sidebar tự động hiển thị hoặc che giấu các nút Đăng nhập / Bảng điều khiển Cá nhân (Profile) / Nâng cấp tùy theo Mock Session (lưu tại `localStorage.getItem('currentUser')`). Quá trình đồng bộ này được thực hiện bởi hàm `syncAuthUI()` (nằm trong `auth.js`).

## 4. Khu vực Trực quan hoá (Visualizer Workspace)
-   **Toolbar:** Nơi người dùng nhập mảng đầu vào (`[1, 5, 2]`), chọn tham số tùy biến, và thanh điều khiển tốc độ mô phỏng (`speed-slider`).
-   **Canvas / DOM Area:** Nơi các element thực tế (Cột mảng, Node đồ thị) được vẽ lên.
    -   *Cách cũ:* Gắn trực tiếp mã HTML string vào thuộc tính `.innerHTML`.
    -   *Cách KentoLab 2.0:* Được vẽ thông qua class `Renderer` (ví dụ `ArrayRenderer.js`) bằng cách duyệt mảng `State`. Các Element (như vạch cột array) được bọc trong các class Tailwind (ví dụ `bg-orange-500` khi Đang so sánh) để thay đổi màu sắc mượt mà.
-   **Bảng điều khiển Code (Code Tracker):** Gồm vùng Pseudo-code, Source Code (C++, Python), và Console Terminal giả lập. Mọi hành động của thuật toán (Action) đều truyền kèm `codeLine` để UI highlight chính xác dòng code tương ứng.
