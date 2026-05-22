// src/core/actionTypes.js

export const ActionTypes = {
  // Common Actions
  INIT: 'INIT',                     // Khởi tạo trạng thái ban đầu
  COMPLETE: 'COMPLETE',             // Hoàn tất thuật toán
  
  // Array Actions
  COMPARE: 'COMPARE',               // Đang so sánh 2 phần tử
  SWAP: 'SWAP',                     // Đổi chỗ 2 phần tử
  SET_VALUE: 'SET_VALUE',           // Ghi đè giá trị (vd: Insertion Sort)
  MARK_SORTED: 'MARK_SORTED',       // Đánh dấu phần tử đã đúng vị trí
  SET_POINTER: 'SET_POINTER',       // Di chuyển con trỏ (i, j, pivot, left, right)
  CLEAR_POINTERS: 'CLEAR_POINTERS', // Xoá con trỏ
  
  // Graph Actions
  VISIT_NODE: 'VISIT_NODE',         // Duyệt 1 đỉnh
  UPDATE_EDGE: 'UPDATE_EDGE',       // Đi qua/Cập nhật trạng thái 1 cạnh
  ENQUEUE: 'ENQUEUE',               // Thêm vào Queue (BFS)
  DEQUEUE: 'DEQUEUE',               // Lấy khỏi Queue (BFS)
  PUSH_STACK: 'PUSH_STACK',         // Thêm vào Stack (DFS)
  POP_STACK: 'POP_STACK',           // Lấy khỏi Stack (DFS)
  
  // Table / Metadata Actions
  UPDATE_TABLE: 'UPDATE_TABLE',     // Cập nhật giá trị vào bảng (Dijkstra/DP)
};
