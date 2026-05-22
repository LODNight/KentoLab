// src/algorithms/graph/bfs/index.js
import { bfsGenerator } from './generator.js';

export const metadata = {
  id: "bfs",
  name: "Duyệt theo chiều rộng (BFS)",
  categoryId: "graph",
  visualizerType: "GRAPH_2D"
};

export default {
  metadata,
  generator: bfsGenerator
};
