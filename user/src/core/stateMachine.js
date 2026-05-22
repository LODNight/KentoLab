// src/core/stateMachine.js
import { ActionTypes } from './actionTypes.js';

export function createInitialArrayState() {
  return {
    data: [],
    pointers: {},
    highlights: {
      comparing: [],
      sorted: [],
      swapping: []
    },
    metrics: {
      comparisons: 0,
      swaps: 0
    },
    activeLine: null,
    explanation: ''
  };
}

export function arrayReducer(state, action) {
  // Tạo một bản sao deep copy đơn giản của state để đảm bảo tính Immutable
  const newState = JSON.parse(JSON.stringify(state));

  // Cập nhật common fields
  if (action.codeLine !== undefined) newState.activeLine = action.codeLine;
  if (action.desc !== undefined) newState.explanation = action.desc;

  // Reset highlight trạng thái tạm thời mỗi khi có action mới
  newState.highlights.comparing = [];
  newState.highlights.swapping = [];

  switch (action.type) {
    case ActionTypes.INIT:
      newState.data = [...action.payload.data];
      break;

    case ActionTypes.SET_POINTER:
      newState.pointers = { ...newState.pointers, ...action.payload };
      break;

    case ActionTypes.CLEAR_POINTERS:
      newState.pointers = {};
      break;

    case ActionTypes.COMPARE:
      newState.highlights.comparing = action.payload.indices;
      newState.metrics.comparisons += 1;
      break;

    case ActionTypes.SWAP:
      newState.highlights.swapping = [action.payload.idx1, action.payload.idx2];
      newState.data = [...action.payload.data]; // Sử dụng mảng sau khi swap từ payload
      newState.metrics.swaps += 1;
      break;

    case ActionTypes.SET_VALUE:
      newState.data[action.payload.index] = action.payload.value;
      break;

    case ActionTypes.MARK_SORTED:
      if (!newState.highlights.sorted.includes(action.payload.index)) {
        newState.highlights.sorted.push(action.payload.index);
      }
      break;

    case ActionTypes.COMPLETE:
      newState.pointers = {};
      newState.highlights.comparing = [];
      newState.highlights.swapping = [];
      newState.explanation = action.desc || "Hoàn tất thuật toán!";
      break;
  }

  return newState;
}

// ----------------------------------------------------
// GRAPH REDUCER
// ----------------------------------------------------

export function createInitialGraphState() {
  return {
    nodes: [], // { id, x, y, label }
    edges: [], // { source, target, weight }
    highlights: {
      visiting: [],   // Đỉnh đang thăm
      visited: [],    // Đỉnh đã thăm
      edgeActive: []  // Cạnh đang duyệt
    },
    metrics: {
      distance: {},   // Bảng khoảng cách Dijkstra
      queue: [],      // Hàng đợi BFS
      stack: []       // Ngăn xếp DFS
    },
    activeLine: null,
    explanation: ''
  };
}

export function graphReducer(state, action) {
  const newState = JSON.parse(JSON.stringify(state));

  if (action.codeLine !== undefined) newState.activeLine = action.codeLine;
  if (action.desc !== undefined) newState.explanation = action.desc;

  // Reset highlight tạm thời
  newState.highlights.visiting = [];
  newState.highlights.edgeActive = [];

  switch (action.type) {
    case ActionTypes.INIT:
      newState.nodes = [...(action.payload.nodes || [])];
      newState.edges = [...(action.payload.edges || [])];
      newState.metrics.distance = action.payload.distance || {};
      break;

    case ActionTypes.VISIT_NODE:
      newState.highlights.visiting = [action.payload.nodeId];
      if (!newState.highlights.visited.includes(action.payload.nodeId)) {
        newState.highlights.visited.push(action.payload.nodeId);
      }
      break;

    case ActionTypes.UPDATE_EDGE:
      newState.highlights.edgeActive = [
        { source: action.payload.source, target: action.payload.target }
      ];
      break;

    case ActionTypes.ENQUEUE:
      newState.metrics.queue.push(action.payload.nodeId);
      break;

    case ActionTypes.DEQUEUE:
      // Xoá node đầu tiên khớp ID (hoặc xoá phần tử đầu tiên nếu queue có thứ tự)
      const qIdx = newState.metrics.queue.indexOf(action.payload.nodeId);
      if (qIdx > -1) newState.metrics.queue.splice(qIdx, 1);
      break;

    case ActionTypes.PUSH_STACK:
      newState.metrics.stack.push(action.payload.nodeId);
      break;

    case ActionTypes.POP_STACK:
      // Xóa phần tử trên cùng
      const sIdx = newState.metrics.stack.lastIndexOf(action.payload.nodeId);
      if (sIdx > -1) newState.metrics.stack.splice(sIdx, 1);
      break;

    case ActionTypes.UPDATE_TABLE:
      // Cập nhật bảng khoảng cách (distance table)
      newState.metrics.distance[action.payload.nodeId] = action.payload.value;
      break;

    case ActionTypes.COMPLETE:
      newState.explanation = action.desc || "Hoàn tất duyệt đồ thị!";
      break;
  }

  return newState;
}
