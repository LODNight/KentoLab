// src/algorithms/sorting/bubble/index.js
import { bubbleSortGenerator } from './generator.js';

// Thay vì import JSON native bằng require/fetch ở đây, 
// ta export tĩnh metadata (hoặc dùng Webpack loader)
export const metadata = {
  id: "bubble_sort",
  name: "Sắp xếp nổi bọt (Bubble Sort)",
  categoryId: "sorting",
  visualizerType: "ARRAY_1D"
};

export default {
  metadata,
  generator: bubbleSortGenerator
};
