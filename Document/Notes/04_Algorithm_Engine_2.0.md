# Mô hình Algorithm Engine 2.0 (Event-Driven Simulation)

Bản thiết kế cốt lõi của KentoLab 2.0 giải quyết toàn bộ các vấn đề nhức nhối ở phiên bản cũ bằng cách áp dụng **Clean Architecture** và chia nhỏ thuật toán thành các Plugin Modules.

## 1. Action Types (Chuẩn Hóa Hành Động)
Thay vì Generator tự sinh ra chuỗi HTML, Generator sẽ phát (yield) ra các đối tượng Action (Hành động).
`src/core/actionTypes.js` chứa các Action cơ bản như:
- `COMPARE`: Đang so sánh 2 phần tử (array).
- `SWAP`: Hoán đổi vị trí.
- `MARK_SORTED`: Đánh dấu phần tử đã được duyệt xong.
- `SET_POINTER`: Chỉnh sửa biến con trỏ (`i`, `j`, `pivot`).

*Lợi ích:* Đóng gói mọi logic của thuật toán thành một ngôn ngữ chung. Bất cứ Renderer nào cũng có thể hiểu và vẽ theo các Action này.

## 2. State Machine & Reducer
`src/core/stateMachine.js` chứa hàm `arrayReducer(state, action)`.
Hàm này tuân theo nguyên tắc Immutability (Bất biến). Khi nhận một State cũ và một Action mới, nó sẽ trả về một Object State hoàn toàn mới (VD: Thay đổi vị trí 2 phần tử nếu gặp Action `SWAP`, Cập nhật mảng highlights nếu gặp Action `COMPARE`).
State chuẩn hoá bao gồm: `data` (mảng/đồ thị), `highlights` (các tập index cần đánh dấu màu), `pointers` (tên và vị trí các con trỏ), và `metrics` (tổng số bước swap, compare).

## 3. Simulation Engine (Cốt lõi Mô phỏng)
Class `SimulationEngine` (`src/core/engine.js`) là "Trái tim" của hệ thống 2.0.
- Nó không chạy thuật toán trực tiếp ở từng Step. Thay vào đó, khi khởi tạo (loadAlgorithm), nó sẽ chạy ngầm Generator **MỘT LẦN DUY NHẤT** từ đầu đến cuối để lấy mảng `Actions`.
- Thông qua `arrayReducer`, nó tính toán trước mọi State tại từng bước và lưu vào biến `historyStates` (Mảng chứa lịch sử các trạng thái).
- **Hệ quả:** Engine chỉ cần tăng/giảm biến `cursor` để thực hiện thao tác Play, Next, hoặc **Undo (Quay lại bước trước)** ngay lập tức mà không cần tính toán lại hay cấp phát vùng nhớ dư thừa.

## 4. Algorithm Registry
Lớp `AlgorithmRegistry` (`src/core/registry.js`) đóng vai trò là danh bạ (Registry Pattern). Các Thuật toán giờ đây là các thư mục độc lập (VD: `src/algorithms/sorting/bubble`). Mỗi Plugin có một file `metadata.json` chứa các thông số: ID, Category, Tên, Tags, Độ khó.
Khi hệ thống cần, nó chỉ việc gọi `registry.get('bubble_sort')` để lấy Generator về chạy. Nếu muốn thêm một thuật toán mới (Quick Sort), Developer chỉ cần nhân bản thư mục `bubble` và đăng ký nó vào Registry mà không cần sửa Core Engine.

## 5. Renderer Layer (Lớp Vẽ Giao Diện)
`ArrayRenderer.js` là một Strategy chuyên vẽ mảng 1D. Engine sẽ đẩy `State` sang Renderer, Renderer sẽ map `state.data` ra các div/canvas cột và tô màu dựa vào `state.highlights`. 
Sự độc lập này giúp Engine có thể chạy ở Backend Node.js để sinh dữ liệu, còn Renderer chỉ lo việc hiển thị. Tương lai, KentoLab dễ dàng có thêm `GraphRenderer` để vẽ Đồ thị bằng Canvas hoặc thư viện D3.js.
