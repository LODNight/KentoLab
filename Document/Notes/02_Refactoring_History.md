# Lịch sử Tái cấu trúc (Refactoring History)

Dự án KentoLab đã trải qua các đợt đập đi xây lại (Refactoring) lớn để giải quyết vấn đề Technical Debt (Nợ kỹ thuật) phát sinh do cách viết Code nguyên khối (Monolithic).

## Giai đoạn 1: Phân tách Giao diện & Logic Cơ bản
**Tình trạng ban đầu:**
File `template.html` chứa quá nhiều logic JavaScript nội tuyến (hơn 2500 dòng), bao gồm tất cả các tính năng từ Render, Auth, Payment cho đến Profile.

**Những thay đổi đã thực hiện:**
1.  **Chuyển đổi CSS:** Trích xuất thẻ `<style>` nội tuyến (chứa các tùy chỉnh Scrollbar, Animation, Sidebar thu gọn) vào `user/css/style.css`.
2.  **Tách Module JS (Features):**
    -   `user/js/auth.js`: Chứa toàn bộ Mock DB người dùng, logic Đăng ký, Đăng nhập và tự động cập nhật thanh Sidebar/UI sau khi đăng nhập.
    -   `user/js/payment.js`: Chứa logic hiển thị Popup giá tiền và kịch bản nâng cấp VIP. Hỗ trợ cơ chế tự động tạo "Guest VIP" nếu user chưa đăng nhập.
    -   `user/js/profile.js`: Chứa logic render Thông tin cá nhân, cập nhật Email, Password.
3.  **Làm sạch HTML:** Xóa bỏ toàn bộ các logic đã tách ra khỏi `user/index.html` (được sao chép từ `template.html`), chỉ giữ lại các thẻ `<script src="...">` ở cuối body.

## Giai đoạn 2: Thiết kế lại Simulation Engine (KentoLab 2.0)
**Tình trạng ban đầu:**
Logic thuật toán bị đặt chung vào 2 file khổng lồ: `database.js` (chứa Data) và `execution.js` (chứa toàn bộ Generator của mọi thuật toán). Generator bị ép trả về chuỗi HTML (Hardcode), khiến cho việc Undo/Tua ngược tốn rất nhiều RAM (phải sao chép mảng liên tục) và không thể mở rộng (Scalability thấp).

**Kiến trúc KentoLab 2.0 (Clean Architecture & Plugin System):**
1.  **Event-Driven (Action-based):** Thay vì trả về Array State, các Generator giờ đây `yield` ra một Action Object (VD: `{ type: 'SWAP', payload: {idx1, idx2} }`).
2.  **State Machine:** Core Engine đọc các Action, đưa qua một `Reducer` (giống Redux) để tính toán ra State hiện hành (Data, Highlights, Pointers).
3.  **Strategy Renderer:** Giao diện được vẽ bởi một lớp độc lập (VD: `ArrayRenderer`). Renderer chỉ cần biết đọc State để vẽ (Canvas/DOM) mà không cần quan tâm nó đang vẽ thuật toán Bubble Sort hay Quick Sort.
4.  **Cấu trúc Thư mục chuẩn:** Đã chuyển đổi sang mô hình Plugin:
    -   `src/core/`: `engine.js`, `stateMachine.js`, `registry.js`, `actionTypes.js`.
    -   `src/renderers/`: `ArrayRenderer.js`.
    -   `src/algorithms/sorting/bubble/`: Tách `metadata.json` và `generator.js` riêng biệt.
5.  **Thử nghiệm thành công (PoC):** Đã tạo file `poc.html` và `main_poc.js` tích hợp thuật toán Bubble Sort dựa trên mô hình lõi KentoLab 2.0, hỗ trợ Play/Pause/Prev/Next cực kỳ trơn tru.
