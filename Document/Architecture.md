# KentoLab 2.0: Platform Architecture Design

Đây là bản thiết kế hệ thống KentoLab hướng tới chuẩn Production-level Educational Platform. Kiến trúc được thiết kế dựa trên nguyên lý **Clean Architecture**, **Plugin Pattern**, và **Event-Driven Simulation**.

---

# 1. Vấn đề của architecture hiện tại

Dựa trên cấu trúc file `database.js` và `execution.js`, hệ thống hiện tại đang gặp các vấn đề (Technical Debts) rất nghiêm trọng:

*   **God Object & High Coupling (Sự phụ thuộc cao):** `database.js` chứa toàn bộ data, `execution.js` chứa toàn bộ generator. Hai file này biến thành "God Object" dài hàng ngàn dòng. Mỗi khi thêm/sửa một thuật toán, developer phải can thiệp trực tiếp vào file lõi, gây nguy cơ bug lây lan (Regression Bug).
*   **Ad-hoc Step Object (Thiếu chuẩn hoá Dữ liệu Bước):** `execution.js` trả về step dạng `{ array, highlights, line, desc, ... }`. Generator đang phải tự "quyết định" giao diện (highlights class, chuỗi string HTML hiển thị). Generator đang bị dính chặt với Renderer.
*   **Trạng thái (State) bị phân mảnh:** Không có một State Machine rõ ràng. Các biến trạng thái được lưu rải rác. Nếu muốn "Undo" (Step Back), bắt buộc phải lưu toàn bộ snapshot của mảng ở mỗi bước, gây tràn RAM với array lớn.
*   **Khó mở rộng (Low Scalability):** Để thêm Grid Visualization (Pathfinding) hay Tree Visualization, bạn sẽ phải viết thêm hàng loạt lệnh `if/else` vào chung một file `main.js` hoặc `execution.js`. Hệ thống không có cơ chế Plugin để mở rộng.

---

# 2. Architecture mới đề xuất

Kiến trúc **KentoLab 2.0** sẽ được chia làm 4 lớp (Layers) tách biệt hoàn toàn:

1.  **Algorithm Layer (Plugin System):** Mỗi thuật toán là một module độc lập (chứa Metadata, Generator, Code Snippets).
2.  **Simulation Engine Layer:** Core xử lý Generator, quản lý State Machine, nhận Action từ Generator để tính toán State hiện tại, quản lý lịch sử (Forward/Backward). **Tuyệt đối không chứa logic UI**.
3.  **Renderer Layer (Strategy Pattern):** Đóng vai trò "Người vẽ". Nó nhận một `SimulationState` chuẩn và vẽ ra Canvas/DOM. Renderer không cần biết nó đang vẽ cho thuật toán nào, nó chỉ biết vẽ theo định dạng dữ liệu (`ArrayState`, `GraphState`).
4.  **UI / Controller Layer:** Xử lý sự kiện người dùng (Play/Pause, Slider, Tabs, Themes).

---

# 3. Folder structure

Sử dụng cấu trúc thư mục theo hướng Domain-Driven Design và Feature-Sliced Design:

```text
src/
├── core/                       # Core Simulation Engine
│   ├── engine.js               # Quản lý vòng đời chạy step (Play/Pause/Step)
│   ├── stateMachine.js         # Reducer xử lý Actions thành State
│   └── registry.js             # Algorithm Registry (Quản lý danh sách plugin)
│
├── renderers/                  # Chịu trách nhiệm hiển thị State ra UI
│   ├── ArrayRenderer.js
│   ├── GraphRenderer.js
│   ├── DPTableRenderer.js
│   └── utils/                  # Helper vẽ canvas/svg
│
├── algorithms/                 # Nơi chứa TẤT CẢ các plugin thuật toán
│   ├── sorting/
│   │   ├── bubble/
│   │   │   ├── index.js        # Entry point của plugin
│   │   │   ├── metadata.json   # ID, tags, complexity, description
│   │   │   ├── generator.js    # Logic thuật toán thuần (yield Actions)
│   │   │   ├── pseudocode.json # Dữ liệu pseudocode
│   │   │   └── snippets/       # Thư mục mã nguồn đa ngôn ngữ
│   │   │       ├── cpp.txt
│   │   │       └── python.txt
│   │   └── quick/
│   ├── graph/
│   │   └── dijkstra/
│
├── data/                       # Dữ liệu tĩnh chung của nền tảng
│   ├── categories.json         # Phân cấp MegaGroup -> Category
│   └── tags.json               # Dictionary của các tags
│
└── ui/                         # UI Components (React/Vue hoặc Vanilla Modules)
    ├── PlayerControls.js
    ├── CodeTracker.js
    └── Dashboard.js
```

---

# 4. Step Engine Design

Thay vì yield ra một object chứa `{ array: [...], line: 2, highlights: [1,2] }`, **Generator sẽ chỉ đóng vai trò phát ra CÁC HÀNH ĐỘNG (Actions/Events)**. 

Mọi thuật toán đều giao tiếp với Engine thông qua chuẩn `ActionObject`.

**Chuẩn Action/Event System:**
```typescript
interface SimulationAction {
  type: string;               // Hành động: 'COMPARE', 'SWAP', 'OVERWRITE', 'POINTER_MOVE'
  payload: any;               // Dữ liệu tuỳ biến theo type
  codeLine?: number;          // Dòng code đang thực thi (tuỳ chọn)
  desc?: string;              // Giải thích học thuật (tuỳ chọn)
}
```

**Các type phổ biến:**
*   **Array:** `COMPARE_ELEMENTS`, `SWAP_ELEMENTS`, `SET_VALUE`, `MARK_SORTED`, `SET_POINTER`
*   **Graph:** `VISIT_NODE`, `UPDATE_EDGE_WEIGHT`, `ENQUEUE`, `DEQUEUE`
*   **Tree:** `TRAVERSE_LEFT`, `TRAVERSE_RIGHT`, `VISIT_ROOT`

> [!TIP]
> **Tại sao dùng Action?** Vì Engine có thể dễ dàng viết hàm tính toán ngược (Inverse Action) cho `SWAP_ELEMENTS` để thực hiện "Step Backward" (Lùi lại) mà KHÔNG cần phải lưu lại toàn bộ Array snapshot vào bộ nhớ.

---

# 5. Simulation State Design

Simulation State là một "Snapshot" chuẩn hoá của cấu trúc dữ liệu tại một thời điểm. Nó được tạo ra bởi **State Machine** (đọc chuỗi Actions và áp dụng lên Initial State).

**Chuẩn Simulation State (VD cho Array):**
```typescript
interface ArraySimulationState {
  data: number[];                   // Mảng dữ liệu hiện tại
  pointers: Record<string, number>; // { "i": 0, "j": 1, "pivot": 4 }
  highlights: {
    comparing: number[];            // Indices đang so sánh: [0, 1]
    sorted: number[];               // Indices đã chốt: [4, 5]
    swapping: number[];             // Indices đang đổi chỗ
  };
  metrics: {                        // Thống kê realtime
    comparisons: number;
    swaps: number;
  };
  activeLine: number;               // Dòng code highlight
  explanation: string;              // Text giải thích
}
```
**Renderer** chỉ việc nhận vào cục State này, duyệt qua `pointers` để vẽ mũi tên, duyệt `comparing` để tô màu đỏ, duyệt `data` để vẽ cột.

---

# 6. Registry Pattern

Để thuật toán dễ lazy-load và dễ quản lý, sử dụng **Algorithm Registry**. Engine không import trực tiếp BubbleSort. 

```javascript
// core/registry.js
class AlgorithmRegistry {
  constructor() {
    this.algorithms = new Map();
  }

  register(algoModule) {
    this.algorithms.set(algoModule.metadata.id, algoModule);
  }

  get(id) {
    return this.algorithms.get(id);
  }
}

export const registry = new AlgorithmRegistry();

// algorithms/sorting/bubble/index.js
import metadata from './metadata.json';
import { bubbleSortGenerator } from './generator';
export default { metadata, generator: bubbleSortGenerator };

// auto-loader (chạy lúc init app)
registry.register(BubbleSortPlugin);
registry.register(DijkstraPlugin);
```

---

# 7. Renderer System

Áp dụng **Strategy Pattern** cho Renderer. Thuật toán BubbleSort quy định trong metadata: `visualizerType: "ARRAY_1D"`. Engine sẽ tự động chọn `ArrayRenderer`.

```javascript
// renderers/ArrayRenderer.js
class ArrayRenderer {
  constructor(canvasContext) {
    this.ctx = canvasContext;
  }

  // Phương thức duy nhất Engine gọi
  render(state) {
    this.clear();
    this.drawBars(state.data, state.highlights);
    this.drawPointers(state.pointers);
    this.updateMetrics(state.metrics);
  }
}
```

---

# 8. Data Schema

Thay vì hardcode trong `database.js`, chia dữ liệu thành cấu trúc quan hệ.

**Metadata Schema (`metadata.json` của mỗi algorithm):**
```json
{
  "id": "algo_bubble_sort",
  "categoryId": "cat_sorting",
  "name": "Bubble Sort",
  "visualizerType": "ARRAY_1D",
  "difficulty": "Easy",
  "tags": ["sorting", "in-place", "stable"],
  "complexity": {
    "time": { "best": "O(N)", "average": "O(N^2)", "worst": "O(N^2)" },
    "space": { "worst": "O(1)" }
  },
  "prerequisites": ["algo_array_basics"]
}
```
Việc này cho phép bạn xây dựng hệ thống **Recommendation**, **Filter theo Tag**, **Lọc theo độ khó** cực kỳ dễ dàng.

---

# 9. Migration Plan (Chiến lược Chuyển đổi)

Vì code hiện tại đang rất to, bạn cần migrate theo từng bước để không làm sập hệ thống (Strangler Fig Pattern):

1.  **Phase 1: Architecture Skeleton.** Tạo cấu trúc thư mục mới (`core/`, `renderers/`, `algorithms/`). Viết Core Engine hỗ trợ Action/State cơ bản.
2.  **Phase 2: PoC Migration.** Chuyển đổi **duy nhất 1 thuật toán** (ví dụ: Bubble Sort). Viết `ArrayRenderer` và `BubbleSortGenerator` theo chuẩn mới. Chạy song song KentoLab cũ và trang BubbleSort mới để test.
3.  **Phase 3: Renderer Factory.** Viết các Renderer còn lại (Tree, Graph) và migrate dần các thuật toán tương ứng. Cứ chuyển xong 1 nhóm, xoá chúng bên `execution.js` cũ.
4.  **Phase 4: Database Refactoring.** Viết script NodeJS để bóc tách `database.js` cũ thành hàng trăm file `metadata.json` ở các folder con.
5.  **Phase 5: Cut-off.** Xoá bỏ hoàn toàn `database.js` và `execution.js` cũ.

---

# 10. Scale Strategy (Chiến lược Mở rộng 100+ Algorithms)

*   **Lazy Loading (Code Splitting):** Dùng `import()` động của ES6. Không load toàn bộ `generators` ngay từ đầu. Khi user click vào thuật toán nào, mới fetch module thuật toán đó.
*   **Web Worker:** Với các input lớn (ví dụ mảng 1000 phần tử), Generator chạy trong Web Worker để build ra mảng `Actions` nền, tránh đứng trình duyệt. 
*   **Internationalization (i18n):** Tách file `pseudocode.json` ra thành `pseudocode_vi.json` và `pseudocode_en.json`. ID của step map với file locale.

---

# 11. Ví dụ Code Mẫu (Generator)

```javascript
// algorithms/sorting/bubble/generator.js
export function* bubbleSortGenerator(array) {
  let arr = [...array];
  let n = arr.length;
  
  yield { type: 'INIT', payload: { data: arr }, desc: "Khởi tạo mảng" };

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { 
        type: 'SET_POINTERS', 
        payload: { j: j, j_plus: j + 1 },
        codeLine: 3 
      };

      yield { 
        type: 'COMPARE', 
        payload: { indices: [j, j + 1] }, 
        codeLine: 4,
        desc: `So sánh ${arr[j]} và ${arr[j+1]}`
      };

      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        
        yield { 
          type: 'SWAP', 
          payload: { idx1: j, idx2: j + 1, data: [...arr] }, 
          codeLine: 5,
          desc: `Hoán đổi do ${arr[j+1]} > ${arr[j]}`
        };
      }
    }
    yield { type: 'MARK_SORTED', payload: { index: n - i - 1 }, codeLine: 8 };
  }
  yield { type: 'MARK_SORTED', payload: { index: 0 }, desc: "Hoàn tất" };
}
```

---

# 12. Best Practices

1.  **Pure Generators:** Generator không bao giờ được phép `document.getElementById()`. Mọi tương tác UI bị cấm hoàn toàn trong Generator.
2.  **Single Source of Truth:** `metadata.json` là nơi duy nhất cấu hình về thuật toán đó. Mọi logic lấy tên, mô tả, độ phức tạp phải lấy từ file này.
3.  **Hạn chế Snapshot, Khuyến khích Action-Delta:** Ở quy mô nhỏ, có thể gửi snapshot mảng ở mỗi yield. Ở quy mô lớn (Graph), bắt buộc chỉ yield Delta (sự thay đổi) để tiết kiệm RAM.

---

# 13. Những lỗi cần tránh (Common Pitfalls)

1.  **Gộp chung Playback và Execution:** Rất hay gặp lỗi `setInterval` chạy generator. Generator nên chỉ chạy 1 lần từ đầu đến cuối và lưu ra 1 mảng các Actions. Engine lúc này chỉ việc duyệt qua mảng Actions đó bằng `requestAnimationFrame` (hoặc index cursor), cho phép kéo Timeline Slider cực kỳ mượt mà.
2.  **Nesting quá sâu:** Tạo cấu trúc kế thừa (Inheritance) cho Renderer. Thay vào đó hãy dùng Composition (Kết hợp). Một thuật toán Pathfinding cần vẽ cả Grid và Graph, hãy kết hợp 2 lớp Renderer thay vì cố tạo một `PathfindingRenderer`.
