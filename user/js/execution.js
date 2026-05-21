/* ==========================================================================
   Kento Lab - Visualizer Simulation Step Generators
   ========================================================================== */

// 1. Hardcoded Algorithm Execution Generators
const algorithmExecutions = {
  "linear": {
    generator: function (arr, target) {
      let steps = [];
      steps.push({ array: [...arr], highlights: {}, line: 1, desc: `Khởi động tìm kiếm tuần tự cho Target = ${target}` });
      let found = false;
      for (let i = 0; i < arr.length; i++) {
        steps.push({ array: [...arr], highlights: { [i]: 'compare' }, line: 2, desc: `Kiểm tra index i = ${i}: arr[i] = ${arr[i]}. So sánh với ${target}` });
        if (arr[i] === target) {
          steps.push({ array: [...arr], highlights: { [i]: 'match' }, line: 3, desc: `Đã tìm thấy Target ${target} khớp tại index ${i}!` });
          found = true;
          break;
        } else {
          let hl = {};
          for (let k = 0; k <= i; k++) hl[k] = 'skipped';
          steps.push({ array: [...arr], highlights: hl, line: 1, desc: `arr[${i}] = ${arr[i]} không khớp. Tăng i lên 1.` });
        }
      }
      if (!found) {
        let hl = {};
        for (let k = 0; k < arr.length; k++) hl[k] = 'compare';
        steps.push({ array: [...arr], highlights: hl, line: 4, desc: "Đã duyệt qua toàn bộ mảng nhưng không tìm thấy Target." });
      }
      return steps;
    }
  },
  "binary": {
    generator: function (arr, target) {
      let sortedArr = [...arr].sort((a, b) => a - b);
      let steps = [];
      steps.push({ array: [...sortedArr], highlights: {}, low: 0, high: sortedArr.length - 1, line: 1, desc: `Sắp xếp mảng để chạy Binary Search cho Target = ${target}` });

      let low = 0, high = sortedArr.length - 1;
      let found = false;

      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let hl = {};
        for (let k = 0; k < sortedArr.length; k++) {
          if (k < low || k > high) hl[k] = 'skipped';
        }
        hl[mid] = 'compare';

        steps.push({ array: [...sortedArr], highlights: { ...hl }, low, high, mid, line: 3, desc: `Đặt ranh giới [Low=${low}, High=${high}]. Tính toán mid = ${mid} (arr[mid] = ${sortedArr[mid]})` });

        if (sortedArr[mid] === target) {
          hl[mid] = 'match';
          steps.push({ array: [...sortedArr], highlights: { ...hl }, low, high, mid, line: 4, desc: `Đã KHỚP! Tìm thấy Target tại vị trí mid = ${mid}.` });
          found = true;
          break;
        } else if (sortedArr[mid] < target) {
          low = mid + 1;
          let postHl = {};
          for (let k = 0; k < sortedArr.length; k++) {
            if (k < low) postHl[k] = 'skipped';
          }
          steps.push({ array: [...sortedArr], highlights: postHl, low, high, line: 5, desc: `Do arr[mid] (${sortedArr[mid]}) < ${target}, thu hẹp tìm kiếm sang nửa phải: low = mid + 1 = ${low}` });
        } else {
          high = mid - 1;
          let postHl = {};
          for (let k = 0; k < sortedArr.length; k++) {
            if (k > high) postHl[k] = 'skipped';
          }
          steps.push({ array: [...sortedArr], highlights: postHl, low, high, line: 6, desc: `Do arr[mid] (${sortedArr[mid]}) > ${target}, thu hẹp tìm kiếm sang nửa trái: high = mid - 1 = ${high}` });
        }
      }
      if (!found) {
        let hl = {};
        for (let k = 0; k < sortedArr.length; k++) hl[k] = 'skipped';
        steps.push({ array: [...sortedArr], highlights: hl, line: 2, desc: "Low > High. Không tìm thấy Target trong mảng." });
      }
      return steps;
    }
  },
  "bubble": {
    generator: function (arr) {
      let steps = [];
      let temp = [...arr];
      let n = temp.length;
      steps.push({ array: [...temp], highlights: {}, line: 1, desc: "Khởi tạo mảng ban đầu, bắt đầu Bubble Sort." });
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          steps.push({ array: [...temp], highlights: { [j]: 'compare', [j + 1]: 'compare' }, line: 3, desc: `So sánh cặp phần tử kề nhau arr[${j}] (${temp[j]}) và arr[${j + 1}] (${temp[j + 1]})` });
          if (temp[j] > temp[j + 1]) {
            let s = temp[j];
            temp[j] = temp[j + 1];
            temp[j + 1] = s;
            steps.push({ array: [...temp], highlights: { [j]: 'swap', [j + 1]: 'swap' }, line: 4, desc: `Vì ${temp[j + 1]} < ${temp[j]}, tiến hành hoán đổi hai số này.` });
          }
        }
        let sorted = {};
        for (let k = n - i - 1; k < n; k++) sorted[k] = 'sorted';
        steps.push({ array: [...temp], highlights: sorted, line: 1, desc: `Phần tử lớn nhất trong phân đoạn quét (${temp[n - i - 1]}) đã cố định chính xác.` });
      }
      let sortedAll = {};
      for (let k = 0; k < n; k++) sortedAll[k] = 'sorted';
      steps.push({ array: [...temp], highlights: sortedAll, line: 1, desc: "Chúc mừng! Toàn bộ mảng đã được sắp xếp hoàn tất." });
      return steps;
    }
  },
  "selection": {
    generator: function (arr) {
      let steps = [];
      let temp = [...arr];
      let n = temp.length;
      steps.push({ array: [...temp], highlights: {}, line: 1, desc: "Khởi động Selection Sort." });
      for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        steps.push({ array: [...temp], highlights: { [i]: 'pivot' }, line: 2, desc: `Giả sử giá trị nhỏ nhất tạm thời nằm ở index i = ${i} (arr[i] = ${temp[i]})` });
        for (let j = i + 1; j < n; j++) {
          steps.push({ array: [...temp], highlights: { [min_idx]: 'pivot', [j]: 'compare' }, line: 4, desc: `So sánh giá trị chưa sắp xếp arr[${j}] (${temp[j]}) với giá trị nhỏ nhất hiện có (${temp[min_idx]})` });
          if (temp[j] < temp[min_idx]) {
            min_idx = j;
            steps.push({ array: [...temp], highlights: { [min_idx]: 'pivot' }, line: 4, desc: `Tìm thấy phần tử nhỏ hơn! Cập nhật min_idx mới là ${min_idx} (arr[min_idx] = ${temp[min_idx]})` });
          }
        }
        if (min_idx !== i) {
          steps.push({ array: [...temp], highlights: { [i]: 'swap', [min_idx]: 'swap' }, line: 5, desc: `Tiến hành đổi chỗ giá trị đầu mảng chưa sắp xếp (${temp[i]}) với phần tử bé nhất tìm được (${temp[min_idx]})` });
          let s = temp[i];
          temp[i] = temp[min_idx];
          temp[min_idx] = s;
        }
        let sorted = {};
        for (let k = 0; k <= i; k++) sorted[k] = 'sorted';
        steps.push({ array: [...temp], highlights: sorted, line: 1, desc: `Phần tử nhỏ nhất thứ ${i + 1} đã được cố định chính xác tại index ${i}.` });
      }
      let sortedAll = {};
      for (let k = 0; k < n; k++) sortedAll[k] = 'sorted';
      steps.push({ array: [...temp], highlights: sortedAll, line: 1, desc: "Mảng đã hoàn toàn được sắp xếp tăng dần!" });
      return steps;
    }
  },
  "sieve_primes": {
    generator: function () {
      let steps = [];
      let n = 50;
      let is_prime = Array(n + 1).fill(true);
      is_prime[0] = is_prime[1] = false;
      steps.push({ consoleOut: "Bắt đầu khởi tạo sàng nguyên tố phạm vi N = 50.\nGiả sử ban đầu tất cả các số [2..50] đều là số nguyên tố.", line: 1 });

      for (let p = 2; p * p <= n; p++) {
        if (is_prime[p]) {
          steps.push({ consoleOut: `Số p = ${p} chưa bị đánh dấu -> Là SỐ NGUYÊN TỐ.\nTiến hành duyệt các bội số của ${p} bắt đầu từ ${p * p}...`, line: 3 });
          for (let i = p * p; i <= n; i += p) {
            if (is_prime[i]) {
              is_prime[i] = false;
              steps.push({ consoleOut: `  Đánh dấu bội số: ${i} = ${p} * ${i / p} là HỢP SỐ (loại bỏ khỏi sàng).`, line: 5 });
            }
          }
        }
      }
      let primes = [];
      for (let k = 2; k <= n; k++) {
        if (is_prime[k]) primes.push(k);
      }
      steps.push({ consoleOut: `Sàng hoàn tất!\nCác số nguyên tố tìm được trong phạm vi [2..50] là:\n>> [ ${primes.join(", ")} ]`, line: 1 });
      return steps;
    }
  }
};

// 2. Simulator Generators for Dynamic Algorithms Families
const dynamicGenerators = {
  // --- SORTING FAMILY ---
  sorting: {
    insertion: function (arr) {
      let steps = [];
      let temp = [...arr];
      let n = temp.length;
      steps.push({ array: [...temp], highlights: {}, line: 1, desc: "Khởi động Sắp xếp chèn (Insertion Sort)." });
      for (let i = 1; i < n; i++) {
        let key = temp[i];
        let j = i - 1;
        steps.push({ array: [...temp], highlights: { [i]: 'pivot' }, line: 2, desc: `Xét phần tử khóa Key = arr[${i}] = ${key}` });
        while (j >= 0 && temp[j] > key) {
          steps.push({ array: [...temp], highlights: { [j]: 'compare', [j + 1]: 'swap' }, line: 3, desc: `So sánh arr[${j}] (${temp[j]}) > Key (${key}). Di chuyển sang phải.` });
          temp[j + 1] = temp[j];
          j = j - 1;
        }
        temp[j + 1] = key;
        let hl = {};
        for (let k = 0; k <= i; k++) hl[k] = 'sorted';
        steps.push({ array: [...temp], highlights: hl, line: 4, desc: `Chèn Key (${key}) vào vị trí arr[${j + 1}]. Phân đoạn [0..${i}] đã tạm sắp xếp.` });
      }
      let hlAll = {};
      for (let k = 0; k < n; k++) hlAll[k] = 'sorted';
      steps.push({ array: [...temp], highlights: hlAll, line: 1, desc: "Mảng đã hoàn thành Sắp xếp chèn!" });
      return steps;
    },
    merge_sort: function (arr) {
      let steps = [];
      let temp = [...arr];
      steps.push({ array: [...temp], highlights: {}, line: 1, desc: "Khởi động Sắp xếp trộn (Merge Sort)." });

      function mergeSortHelper(l, r) {
        if (l >= r) return;
        let mid = Math.floor((l + r) / 2);
        mergeSortHelper(l, mid);
        mergeSortHelper(mid + 1, r);
        merge(l, mid, r);
      }

      function merge(l, mid, r) {
        let leftArr = temp.slice(l, mid + 1);
        let rightArr = temp.slice(mid + 1, r + 1);
        let i = 0, j = 0, k = l;

        steps.push({ array: [...temp], highlights: { [l]: 'pivot', [r]: 'pivot' }, line: 2, desc: `Gộp hai phân đoạn đã sắp xếp: [${l}..${mid}] và [${mid + 1}..${r}]` });

        while (i < leftArr.length && j < rightArr.length) {
          steps.push({ array: [...temp], highlights: { [l + i]: 'compare', [mid + 1 + j]: 'compare' }, line: 3, desc: `So sánh các phần tử đầu phân đoạn: ${leftArr[i]} và ${rightArr[j]}` });
          if (leftArr[i] <= rightArr[j]) {
            temp[k] = leftArr[i];
            i++;
          } else {
            temp[k] = rightArr[j];
            j++;
          }
          steps.push({ array: [...temp], highlights: { [k]: 'swap' }, line: 4, desc: `Ghi nhận phần tử nhỏ hơn vào vị trí ${k}: arr[${k}] = ${temp[k]}` });
          k++;
        }

        while (i < leftArr.length) {
          temp[k] = leftArr[i];
          steps.push({ array: [...temp], highlights: { [k]: 'swap' }, line: 4, desc: `Sao chép phần tử dư bên trái: arr[${k}] = ${temp[k]}` });
          i++;
          k++;
        }

        while (j < rightArr.length) {
          temp[k] = rightArr[j];
          steps.push({ array: [...temp], highlights: { [k]: 'swap' }, line: 4, desc: `Sao chép phần tử dư bên phải: arr[${k}] = ${temp[k]}` });
          j++;
          k++;
        }

        let hl = {};
        for (let m = l; m <= r; m++) hl[m] = 'sorted';
        steps.push({ array: [...temp], highlights: hl, line: 1, desc: `Gộp thành công phân đoạn [${l}..${r}]` });
      }

      mergeSortHelper(0, temp.length - 1);
      let hlAll = {};
      for (let m = 0; m < temp.length; m++) hlAll[m] = 'sorted';
      steps.push({ array: [...temp], highlights: hlAll, line: 1, desc: "Mảng đã hoàn thành Sắp xếp trộn!" });
      return steps;
    },
    quick_sort: function (arr) {
      let steps = [];
      let temp = [...arr];
      steps.push({ array: [...temp], highlights: {}, line: 1, desc: "Khởi động Sắp xếp nhanh (Quick Sort)." });

      function quick(l, r) {
        if (l >= r) {
          if (l >= 0 && l < temp.length) {
            steps.push({ array: [...temp], highlights: { [l]: 'sorted' }, line: 1, desc: `arr[${l}] đã ở đúng vị trí phân hoạch.` });
          }
          return;
        }
        let pivotVal = temp[r];
        steps.push({ array: [...temp], highlights: { [r]: 'pivot' }, line: 2, desc: `Chọn pivot = arr[${r}] = ${pivotVal}` });
        let i = l - 1;
        for (let j = l; j < r; j++) {
          steps.push({ array: [...temp], highlights: { [r]: 'pivot', [j]: 'compare', [Math.max(i, 0)]: 'compare' }, line: 3, desc: `So sánh arr[${j}] (${temp[j]}) với pivot (${pivotVal})` });
          if (temp[j] < pivotVal) {
            i++;
            let s = temp[i];
            temp[i] = temp[j];
            temp[j] = s;
            steps.push({ array: [...temp], highlights: { [r]: 'pivot', [i]: 'swap', [j]: 'swap' }, line: 4, desc: `Phần tử arr[${j}] < pivot. Hoán đổi với arr[${i}].` });
          }
        }
        let s = temp[i + 1];
        temp[i + 1] = temp[r];
        temp[r] = s;
        steps.push({ array: [...temp], highlights: { [i + 1]: 'sorted' }, line: 5, desc: `Đưa pivot về vị trí phân hoạch chính xác: arr[${i + 1}] = ${pivotVal}` });

        let p = i + 1;
        quick(l, p - 1);
        quick(p + 1, r);
      }

      quick(0, temp.length - 1);
      let hlAll = {};
      for (let k = 0; k < temp.length; k++) hlAll[k] = 'sorted';
      steps.push({ array: [...temp], highlights: hlAll, line: 1, desc: "Mảng đã hoàn thành Quick Sort!" });
      return steps;
    },
    counting_sort: function (arr) {
      let steps = [];
      let temp = [...arr];
      let maxVal = Math.max(...temp);
      let minVal = Math.min(...temp);
      let range = maxVal - minVal + 1;
      let count = Array(range).fill(0);
      steps.push({ array: [...temp], highlights: {}, line: 1, desc: "Counting Sort: Khởi tạo mảng đếm tần suất." });

      for (let i = 0; i < temp.length; i++) {
        count[temp[i] - minVal]++;
        steps.push({ array: [...temp], highlights: { [i]: 'compare' }, line: 2, desc: `Đếm: arr[${i}] = ${temp[i]} (Tần suất hiện tại = ${count[temp[i] - minVal]})` });
      }

      let k = 0;
      for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
          temp[k] = i + minVal;
          count[i]--;
          let hl = {};
          hl[k] = 'swap';
          steps.push({ array: [...temp], highlights: hl, line: 3, desc: `Đưa số ${temp[k]} trở lại mảng tại index ${k}` });
          k++;
        }
      }
      let hlAll = {};
      for (let m = 0; m < temp.length; m++) hlAll[m] = 'sorted';
      steps.push({ array: [...temp], highlights: hlAll, line: 1, desc: "Mảng đã được sắp xếp hoàn tất!" });
      return steps;
    }
  },

  // --- SEARCHING FAMILY ---
  searching: {
    jump: function (arr, target) {
      let sortedArr = [...arr].sort((a, b) => a - b);
      let steps = [];
      let n = sortedArr.length;
      let step = Math.floor(Math.sqrt(n));
      let prev = 0;
      steps.push({ array: [...sortedArr], highlights: {}, line: 1, desc: `Jump Search: Mảng được tự động sắp xếp. Bước nhảy step = √${n} = ${step}` });

      while (sortedArr[Math.min(step, n) - 1] < target) {
        let hl = {};
        for (let k = prev; k < Math.min(step, n); k++) hl[k] = 'compare';
        steps.push({ array: [...sortedArr], highlights: hl, line: 2, desc: `Chốt nhảy arr[${Math.min(step, n) - 1}] = ${sortedArr[Math.min(step, n) - 1]} < ${target}. Tiến hành nhảy tiếp.` });
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
          steps.push({ array: [...sortedArr], highlights: {}, line: 3, desc: "Đã vượt quá chiều dài mảng. Không tìm thấy Target." });
          return steps;
        }
      }

      steps.push({ array: [...sortedArr], highlights: { [prev]: 'pivot', [Math.min(step, n) - 1]: 'pivot' }, line: 4, desc: `Tìm thấy khoảng chứa Target: [${prev} .. ${Math.min(step, n) - 1}]. Quét tuyến tính.` });

      let found = false;
      while (sortedArr[prev] < target) {
        steps.push({ array: [...sortedArr], highlights: { [prev]: 'compare' }, line: 5, desc: `Quét tuyến tính: arr[${prev}] = ${sortedArr[prev]} < ${target}` });
        prev++;
        if (prev === Math.min(step, n)) break;
      }
      if (sortedArr[prev] === target) {
        steps.push({ array: [...sortedArr], highlights: { [prev]: 'match' }, line: 6, desc: `Đã tìm thấy Target ${target} tại index ${prev}!` });
      } else {
        steps.push({ array: [...sortedArr], highlights: {}, line: 7, desc: "Không tìm thấy Target trong khoảng đã quét." });
      }
      return steps;
    },
    ternary: function (arr, target) {
      let sortedArr = [...arr].sort((a, b) => a - b);
      let steps = [];
      steps.push({ array: [...sortedArr], highlights: {}, line: 1, desc: `Ternary Search cho Target = ${target}` });

      let low = 0, high = sortedArr.length - 1;
      let found = false;
      while (low <= high) {
        let mid1 = low + Math.floor((high - low) / 3);
        let mid2 = high - Math.floor((high - low) / 3);

        let hl = {};
        for (let k = 0; k < sortedArr.length; k++) {
          if (k < low || k > high) hl[k] = 'skipped';
        }
        hl[mid1] = 'compare';
        hl[mid2] = 'compare';

        steps.push({ array: [...sortedArr], highlights: { ...hl }, low, high, line: 2, desc: `Tính mid1 = ${mid1} (${sortedArr[mid1]}), mid2 = ${mid2} (${sortedArr[mid2]})` });

        if (sortedArr[mid1] === target) {
          hl[mid1] = 'match';
          steps.push({ array: [...sortedArr], highlights: { ...hl }, line: 3, desc: `Tìm thấy Target tại mid1 = ${mid1}!` });
          found = true;
          break;
        }
        if (sortedArr[mid2] === target) {
          hl[mid2] = 'match';
          steps.push({ array: [...sortedArr], highlights: { ...hl }, line: 3, desc: `Tìm thấy Target tại mid2 = ${mid2}!` });
          found = true;
          break;
        }

        if (target < sortedArr[mid1]) {
          high = mid1 - 1;
          steps.push({ array: [...sortedArr], highlights: {}, low, high, line: 4, desc: `Target < arr[mid1]. Thu hẹp sang nửa trái: [Low..mid1-1]` });
        } else if (target > sortedArr[mid2]) {
          low = mid2 + 1;
          steps.push({ array: [...sortedArr], highlights: {}, low, high, line: 5, desc: `Target > arr[mid2]. Thu hẹp sang nửa phải: [mid2+1..High]` });
        } else {
          low = mid1 + 1;
          high = mid2 - 1;
          steps.push({ array: [...sortedArr], highlights: {}, low, high, line: 6, desc: `Target ở giữa: Thu hẹp sang phân đoạn [mid1+1..mid2-1]` });
        }
      }
      if (!found) {
        let hl = {};
        for (let k = 0; k < sortedArr.length; k++) hl[k] = 'skipped';
        steps.push({ array: [...sortedArr], highlights: hl, line: 1, desc: "Không tìm thấy Target trong mảng." });
      }
      return steps;
    }
  },

  // --- DYNAMIC PROGRAMMING FAMILY ---
  dp: {
    fib_dp: function () {
      let n = 10;
      let dpTable = [Array(n + 1).fill(null)];
      let cols = Array(n + 1).fill(0).map((_, idx) => `F(${idx})`);
      let rows = ["Giá trị"];
      let steps = [];

      steps.push({
        dpTable: dpTable.map(r => [...r]),
        dpRows: rows,
        dpCols: cols,
        line: 1,
        desc: "Khởi tạo bảng Quy hoạch động tính Fibonacci thứ 10 (F(10))."
      });

      dpTable[0][0] = 0;
      steps.push({
        dpTable: dpTable.map(r => [...r]),
        dpRows: rows,
        dpCols: cols,
        currentCell: [0, 0],
        line: 2,
        desc: "Trường hợp cơ sở: F(0) = 0"
      });

      dpTable[0][1] = 1;
      steps.push({
        dpTable: dpTable.map(r => [...r]),
        dpRows: rows,
        dpCols: cols,
        currentCell: [0, 1],
        line: 2,
        desc: "Trường hợp cơ sở: F(1) = 1"
      });

      for (let i = 2; i <= n; i++) {
        let hls = {};
        hls[`0,${i - 1}`] = 'compare';
        hls[`0,${i - 2}`] = 'compare';
        dpTable[0][i] = dpTable[0][i - 1] + dpTable[0][i - 2];
        hls[`0,${i - 1}`] = 'active';
        hls[`0,${i - 2}`] = 'active';
        steps.push({
          dpTable: dpTable.map(r => [...r]),
          dpRows: rows,
          dpCols: cols,
          currentCell: [0, i],
          highlights: hls,
          line: 3,
          desc: `Tính toán: F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dpTable[0][i - 1]} + ${dpTable[0][i - 2]} = ${dpTable[0][i]}`
        });
      }

      steps.push({
        dpTable: dpTable.map(r => [...r]),
        dpRows: rows,
        dpCols: cols,
        line: 4,
        desc: `Hoàn tất quy hoạch động! Kết quả F(10) là ${dpTable[0][n]}.`
      });
      return steps;
    },
    lcs_dp: function () {
      let s1 = "STONE";
      let s2 = "LONGEST";
      let m = s1.length;
      let n = s2.length;

      let dpTable = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));
      let steps = [];
      let rows = ["-", ...s1.split("")];
      let cols = ["-", ...s2.split("")];

      steps.push({
        dpTable: dpTable.map(r => [...r]),
        dpRows: rows,
        dpCols: cols,
        line: 1,
        desc: "Quy hoạch động LCS: Khởi tạo bảng với chuỗi A = 'STONE' và B = 'LONGEST'."
      });

      for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
          let hls = {};
          let currentCell = [i, j];

          if (i === 0 || j === 0) {
            dpTable[i][j] = 0;
            steps.push({
              dpTable: dpTable.map(r => [...r]),
              dpRows: rows,
              dpCols: cols,
              currentCell,
              line: 2,
              desc: `Trường hợp cơ sở: Hàng/cột biên đầu tiên. dp[${i}][${j}] = 0`
            });
          } else {
            hls[`${i - 1},${j - 1}`] = 'compare';
            hls[`${i - 1},${j}`] = 'compare';
            hls[`${i},${j - 1}`] = 'compare';

            if (s1[i - 1] === s2[j - 1]) {
              dpTable[i][j] = dpTable[i - 1][j - 1] + 1;
              hls[`${i - 1},${j - 1}`] = 'match';
              steps.push({
                dpTable: dpTable.map(r => [...r]),
                dpRows: rows,
                dpCols: cols,
                currentCell,
                highlights: hls,
                line: 3,
                desc: `Khớp ký tự: '${s1[i - 1]}' === '${s2[j - 1]}'. dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dpTable[i][j]}`
              });
            } else {
              dpTable[i][j] = Math.max(dpTable[i - 1][j], dpTable[i][j - 1]);
              hls[`${i - 1},${j}`] = 'active';
              hls[`${i},${j - 1}`] = 'active';
              steps.push({
                dpTable: dpTable.map(r => [...r]),
                dpRows: rows,
                dpCols: cols,
                currentCell,
                highlights: hls,
                line: 4,
                desc: `Khác ký tự: '${s1[i - 1]}' !== '${s2[j - 1]}'. dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = ${dpTable[i][j]}`
              });
            }
          }
        }
      }

      steps.push({
        dpTable: dpTable.map(r => [...r]),
        dpRows: rows,
        dpCols: cols,
        line: 5,
        desc: `Hoàn tất! LCS của hai chuỗi có độ dài bằng ${dpTable[m][n]}.`
      });

      return steps;
    },
    knapsack_dp: function () {
      let weights = [2, 3, 4, 5];
      let values = [3, 4, 5, 6];
      let W = 5;
      let n = weights.length;
      let dpTable = Array(n + 1).fill(null).map(() => Array(W + 1).fill(null));
      let steps = [];

      let rows = ["-", "Vật 1 (w=2,v=3)", "Vật 2 (w=3,v=4)", "Vật 3 (w=4,v=5)", "Vật 4 (w=5,v=6)"];
      let cols = Array(W + 1).fill(0).map((_, idx) => `W=${idx}`);

      steps.push({
        dpTable: dpTable.map(r => [...r]),
        dpRows: rows,
        dpCols: cols,
        line: 1,
        desc: "Khởi tạo bảng Quy hoạch động Knapsack 0/1. Sức chứa tối đa W = 5."
      });

      for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
          let currentCell = [i, w];
          let hls = {};
          if (i === 0 || w === 0) {
            dpTable[i][w] = 0;
            steps.push({
              dpTable: dpTable.map(r => [...r]),
              dpRows: rows,
              dpCols: cols,
              currentCell,
              line: 2,
              desc: `Trường hợp cơ sở: dp[${i}][${w}] = 0 (Không vật hoặc túi rỗng)`
            });
          } else if (weights[i - 1] <= w) {
            hls[`${i - 1},${w}`] = 'compare';
            hls[`${i - 1},${w - weights[i - 1]}`] = 'compare';

            let valWith = values[i - 1] + dpTable[i - 1][w - weights[i - 1]];
            let valWithout = dpTable[i - 1][w];

            dpTable[i][w] = Math.max(valWith, valWithout);
            hls[`${i - 1},${w}`] = 'active';
            hls[`${i - 1},${w - weights[i - 1]}`] = 'active';
            steps.push({
              dpTable: dpTable.map(r => [...r]),
              dpRows: rows,
              dpCols: cols,
              currentCell,
              highlights: hls,
              line: 3,
              desc: `Vật ${i} vừa túi (w=${weights[i - 1]} <= ${w}). Chọn max(Chọn vật: ${valWith}, Bỏ vật: ${valWithout}) = ${dpTable[i][w]}`
            });
          } else {
            hls[`${i - 1},${w}`] = 'compare';
            dpTable[i][w] = dpTable[i - 1][w];
            hls[`${i - 1},${w}`] = 'active';
            steps.push({
              dpTable: dpTable.map(r => [...r]),
              dpRows: rows,
              dpCols: cols,
              currentCell,
              highlights: hls,
              line: 4,
              desc: `Vật ${i} không túi (w=${weights[i - 1]} > ${w}). Giữ nguyên giá trị tối ưu: dp[${i}][${w}] = dp[${i - 1}][${w}] = ${dpTable[i][w]}`
            });
          }
        }
      }

      steps.push({
        dpTable: dpTable.map(r => [...r]),
        dpRows: rows,
        dpCols: cols,
        line: 5,
        desc: `Quy hoạch động hoàn tất! Giá trị Knapsack lớn nhất thu được là ${dpTable[n][W]}.`
      });
      return steps;
    }
  }
};

// 3. Fallback generator function dispatcher
function getAlgorithmGenerator(algoId, catId) {
  // Check if there is a predefined generator
  if (algorithmExecutions[algoId] && algorithmExecutions[algoId].generator) {
    return algorithmExecutions[algoId].generator;
  }

  // Else construct dynamic fallback generator based on category/id
  return function (arr, target) {
    if (algoId === "euclidean") {
      let a = 48, b = 18;
      let steps = [];
      steps.push({ consoleOut: `Bắt đầu tính GCD của ${a} và ${b} bằng thuật toán Euclidean.`, line: 1 });
      while (b !== 0) {
        let temp = b;
        steps.push({ consoleOut: `Thực hiện chia dư: gcd(${a}, ${b}). Lấy dư: ${a} % ${b} = ${a % b}`, line: 2 });
        a = b;
        b = temp % b;
        steps.push({ consoleOut: `Cập nhật: a = ${a}, b = ${b}`, line: 3 });
      }
      steps.push({ consoleOut: `Hoàn tất! GCD tìm được là ${a}.`, line: 1 });
      return steps;
    }

    if (algoId === "fast_exponentiation") {
      let base = 2, exp = 10;
      let steps = [];
      steps.push({ consoleOut: `Bắt đầu tính lũy thừa nhanh: ${base}^${exp}`, line: 1 });
      let res = 1;
      let b = base;
      let e = exp;
      while (e > 0) {
        if (e % 2 === 1) {
          res = res * b;
          steps.push({ consoleOut: `Số mũ lẻ (${e}). Nhân base vào kết quả: Kết quả hiện tại = ${res}`, line: 2 });
        }
        b = b * b;
        e = Math.floor(e / 2);
        steps.push({ consoleOut: `Bình phương base: base = ${b}, chia đôi số mũ: exp = ${e}`, line: 3 });
      }
      steps.push({ consoleOut: `Hoàn tất! Kết quả: ${res}`, line: 1 });
      return steps;
    }

    if (algoId === "xor_tricks") {
      let steps = [];
      steps.push({ consoleOut: "Bắt đầu trình diễn XOR Tricks để tìm số đơn độc trong mảng trùng lặp đôi.\nVí dụ mảng: [4, 1, 2, 1, 2]", line: 1 });
      let arrTest = [4, 1, 2, 1, 2];
      let val = 0;
      for (let i = 0; i < arrTest.length; i++) {
        let prev = val;
        val ^= arrTest[i];
        steps.push({ consoleOut: `Bước ${i + 1}: Duyệt số ${arrTest[i]}. Phép tính: ${prev} ^ ${arrTest[i]} = ${val} (Nhị phân: ${val.toString(2)})`, line: 2 });
      }
      steps.push({ consoleOut: `Số duy nhất xuất hiện lẻ lần là: ${val}`, line: 3 });
      return steps;
    }

    if (algoId === "naive_string") {
      let text = "ABABDABACD";
      let pat = "ABAC";
      let steps = [];
      steps.push({ consoleOut: `Naive String Match: Khớp chuỗi '${pat}' trong văn bản '${text}'`, line: 1 });
      for (let i = 0; i <= text.length - pat.length; i++) {
        steps.push({ consoleOut: `Kiểm tra dịch chuyển tại index i = ${i}: '${text.substring(i, i + pat.length)}'`, line: 2 });
        let matched = true;
        for (let j = 0; j < pat.length; j++) {
          if (text[i + j] !== pat[j]) {
            steps.push({ consoleOut: `  Không khớp tại vị trí ${j}: '${text[i + j]}' !== '${pat[j]}'`, line: 3 });
            matched = false;
            break;
          }
        }
        if (matched) {
          steps.push({ consoleOut: `>> THÀNH CÔNG! Tìm thấy mẫu '${pat}' khớp hoàn toàn tại vị trí index ${i}!`, line: 4 });
          break;
        }
      }
      return steps;
    }

    // Try finding in specific families
    if (catId === "sorting_comp" || catId === "sorting_noncomp") {
      let handler = dynamicGenerators.sorting[algoId] || dynamicGenerators.sorting.insertion;
      return handler(arr);
    }
    if (catId === "searching") {
      let handler = dynamicGenerators.searching[algoId] || dynamicGenerators.searching.jump;
      return handler(arr, target);
    }
    if (catId === "dp") {
      let handler = dynamicGenerators.dp[algoId] || dynamicGenerators.dp.fib_dp;
      return handler();
    }

    // Default generic console generator
    return [
      { consoleOut: `Khởi chạy Terminal giả lập cho giải thuật: [${algoId}].\nĐang tiền xử lý tham số...`, line: 1 },
      { consoleOut: `Đầu vào dữ liệu mẫu: ${JSON.stringify(arr)}`, line: 2 },
      { consoleOut: "Thực hiện chu trình duyệt vòng lặp chính...", line: 3 },
      { consoleOut: "Kiểm tra tính tương thích bộ nhớ... OK.", line: 3 },
      { consoleOut: `Hoàn tất tiến trình chạy mô phỏng thuật toán thành công!`, line: 1 }
    ];
  };
}
