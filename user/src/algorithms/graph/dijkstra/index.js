// src/algorithms/graph/dijkstra/index.js
import { dijkstraGenerator } from './generator.js';

export const metadata = {
  id: "dijkstra",
  name: "Đường đi ngắn nhất (Dijkstra)",
  categoryId: "graph",
  visualizerType: "GRAPH_2D"
};

export default {
  metadata,
  generator: dijkstraGenerator
};
