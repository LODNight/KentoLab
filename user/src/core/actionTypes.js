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
  VISIT_NODE: 'VISIT_NODE',
  UPDATE_EDGE: 'UPDATE_EDGE',
  ENQUEUE: 'ENQUEUE',
  DEQUEUE: 'DEQUEUE',
};
