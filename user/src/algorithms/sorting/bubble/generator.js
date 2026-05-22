// src/algorithms/sorting/bubble/generator.js
import { ActionTypes } from '../../../core/actionTypes.js';

export function* bubbleSortGenerator(array) {
  let arr = [...array];
  let n = arr.length;
  
  yield { 
    type: ActionTypes.INIT, 
    payload: { data: arr }, 
    desc: "Khởi tạo mảng cần sắp xếp" 
  };

  let swapped;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      
      yield { 
        type: ActionTypes.SET_POINTER, 
        payload: { j: j, j_next: j + 1 },
        codeLine: 3 
      };

      yield { 
        type: ActionTypes.COMPARE, 
        payload: { indices: [j, j + 1] }, 
        codeLine: 4,
        desc: `So sánh giá trị tại vị trí ${j} (${arr[j]}) và ${j+1} (${arr[j+1]})`
      };

      if (arr[j] > arr[j + 1]) {
        // Hoán đổi
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        
        yield { 
          type: ActionTypes.SWAP, 
          payload: { idx1: j, idx2: j + 1, data: [...arr] }, 
          codeLine: 5,
          desc: `Phát hiện ${temp} > ${arr[j]}, tiến hành hoán đổi hai phần tử.`
        };
      }
    }
    
    // Đánh dấu phần tử cuối cùng của vòng lặp i đã về đúng vị trí
    yield { 
      type: ActionTypes.MARK_SORTED, 
      payload: { index: n - i - 1 }, 
      codeLine: 8,
      desc: `Phần tử lớn nhất trong đoạn chưa sắp xếp đã nổi bọt về vị trí đúng: ${n - i - 1}`
    };
    
    // Tối ưu: Nếu không có lượt hoán đổi nào trong một vòng lặp, mảng đã được sắp xếp
    if (!swapped) {
      break;
    }
  }

  // Đánh dấu phần tử đầu tiên (và tất cả phần tử còn lại) là đã sắp xếp
  for (let i = 0; i < n; i++) {
    yield { type: ActionTypes.MARK_SORTED, payload: { index: i } };
  }

  yield { type: ActionTypes.COMPLETE, desc: "Thuật toán sắp xếp nổi bọt đã hoàn tất!" };
}
