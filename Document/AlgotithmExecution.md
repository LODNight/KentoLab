# Kế hoạch phát triển KentoLab (Next Steps)

Sau khi đã hoàn thiện cấu trúc Database và tách các luồng xử lý UI (Workspace) sang `js/main.js`, hệ thống đã đạt độ ổn định cao. Trọng tâm tiếp theo sẽ là **phát triển và tích hợp các bộ giả lập (Visualizers)** cho các thuật toán còn lại.

Dưới đây là kế hoạch 5 giai đoạn tiếp theo. Xin vui lòng xem xét và chọn hướng đi mà bạn muốn ưu tiên:

## Giai đoạn 1: Mở rộng nhóm Sắp xếp & Tìm kiếm (Độ khó: Dễ - Trung bình)
*Hiện tại đã có Linear, Binary, Bubble, Selection. Cần mở rộng whitelist.*
- Hoàn thiện Generator cho **Insertion Sort** và **Merge Sort** (code đã có sẵn một nửa trong `execution.js`).
- Xây dựng Generator cho **Quick Sort** (cần xử lý đệ quy chia mảng ảo) và **Heap Sort**.
- Kích hoạt các thuật toán tìm kiếm nâng cao: **Jump Search**, **Interpolation Search**.
- **Kết quả:** Đưa khoảng 6-8 thuật toán nữa vào danh sách `playgroundAlgos`.

## Giai đoạn 2: Hoàn thiện DP Grid Visualizer (Độ khó: Khó)
*Hệ thống đã có sẵn `canvas-dp-grid` nhưng chưa có thuật toán nào được nạp dữ liệu thật.*
- Xây dựng Generator cho **Fibonacci DP** (Mảng 1D).
- Xây dựng Generator cho **0/1 Knapsack** và **Longest Common Subsequence (LCS)** (Bảng 2D).
- Xử lý logic tô màu các ô (vàng: đang xét, xanh: đã lưu trạng thái).
- **Kết quả:** Đưa nhóm Quy hoạch động (DP) vào chế độ tương tác Chạy thử.

## Giai đoạn 3: Nâng cấp Đồ thị (Graph) & Cây (Tree)
*Hiện tại đã có BFS, DFS, Dijkstra có thể vẽ đỉnh và nối cạnh.*
- Thêm thuật toán **Kruskal / Prim** để vẽ Cây khung nhỏ nhất (MST).
- Mở rộng chức năng cho phép chỉnh sửa trọng số trực tiếp trên giao diện SVG thay vì ngẫu nhiên.
- Xây dựng bộ giả lập riêng cho **Cấu trúc dữ liệu Cây (BST, AVL)**.

## Giai đoạn 4: Thuật toán Console/Terminal
*Dành cho các thuật toán khó biểu diễn trực quan (Tham lam, Xử lý chuỗi, Mã hóa).*
- Tích hợp **Sieve of Eratosthenes** (đã có code) vào giao diện Terminal giả lập.
- Xây dựng luồng text console cho **Huffman Coding**, **KMP String Matching**, **MD5/SHA-256 Hashing**.

## User Review Required
> [!IMPORTANT]
> **Vui lòng cho mình biết bạn muốn bắt đầu ưu tiên Giai đoạn nào trước?**
> (Gợi ý: Nếu muốn có ngay kết quả nhanh, chúng ta có thể làm Giai đoạn 1. Nếu muốn thử thách và làm tính năng "Wow" nhất, hãy chọn Giai đoạn 2).

## Verification Plan
1. **Kiểm tra UI Đồ thị hiện tại:** Mình vừa fix xong lỗi thuật toán Graph (BFS, DFS, Dijkstra) bị trắng màn hình. Lúc này bạn f5 và nhấn "Chạy thử" BFS/DFS thì màn hình Vẽ Đồ Thị (Canvas SVG) sẽ hiển thị bình thường.
2. Xác nhận luồng chạy của các thuật toán sẽ được thêm mới trong tương lai để đảm bảo tính đồng bộ với `js/main.js` hiện tại.
