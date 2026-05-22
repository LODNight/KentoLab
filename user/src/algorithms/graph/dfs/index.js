// src/algorithms/graph/dfs/index.js
import { dfsGenerator } from './generator.js';

export const metadata = {
  id: "dfs",
  name: "Duyệt theo chiều sâu (DFS)",
  categoryId: "graph",
  visualizerType: "GRAPH_2D"
};

export default {
  metadata,
  generator: dfsGenerator
};
