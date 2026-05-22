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
