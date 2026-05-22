// src/algorithms/graph/dijkstra/generator.js
import { ActionTypes } from '../../../core/actionTypes.js';

export function* dijkstraGenerator(graphData) {
  if (!graphData.nodes || graphData.nodes.length === 0) return;

  const startNode = graphData.nodes[0].id;
  let dist = {};
  let visited = new Set();
  
  // Khởi tạo bảng distance
  for (let node of graphData.nodes) {
    dist[node.id] = Infinity;
  }
  dist[startNode] = 0;

  yield {
    type: ActionTypes.INIT,
    payload: { nodes: graphData.nodes, edges: graphData.edges, distance: dist },
    desc: "Khởi tạo bảng khoảng cách (Distance Table) với vô cực. Đỉnh nguồn = 0."
  };

  while (visited.size < graphData.nodes.length) {
    // Tìm đỉnh có khoảng cách nhỏ nhất chưa duyệt (Greedy)
    let u = null;
    let minDist = Infinity;
    for (let node of graphData.nodes) {
      if (!visited.has(node.id) && dist[node.id] <= minDist) {
        minDist = dist[node.id];
        u = node.id;
      }
    }

    if (u === null || minDist === Infinity) break; // Đồ thị không liên thông

    visited.add(u);
    
    yield {
      type: ActionTypes.VISIT_NODE,
      payload: { nodeId: u },
      codeLine: 2,
      desc: `Chọn đỉnh ${u} có khoảng cách nhỏ nhất (${minDist}) để duyệt.`
    };

    // Duyệt các cạnh kề
    let adjacentEdges = graphData.edges.filter(e => e.source === u || e.target === u);
    for (let edge of adjacentEdges) {
      let v = edge.source === u ? edge.target : edge.source;
      
      yield {
        type: ActionTypes.UPDATE_EDGE,
        payload: { source: u, target: v },
        codeLine: 4,
        desc: `Xét cạnh ${u} - ${v} (Trọng số: ${edge.weight})`
      };

      if (!visited.has(v)) {
        let newDist = dist[u] + edge.weight;
        if (newDist < dist[v]) {
          dist[v] = newDist;
          yield {
            type: ActionTypes.UPDATE_TABLE,
            payload: { nodeId: v, value: newDist },
            codeLine: 5,
            desc: `Cập nhật khoảng cách đỉnh ${v} = ${newDist} (do ${dist[u]} + ${edge.weight} < ${dist[v]})`
          };
        } else {
          yield {
            type: ActionTypes.UPDATE_EDGE,
            payload: { source: u, target: v },
            codeLine: 6,
            desc: `Không cập nhật khoảng cách ${v} vì ${newDist} >= ${dist[v]}`
          };
        }
      }
    }
  }

  yield { type: ActionTypes.COMPLETE, desc: "Hoàn tất thuật toán Dijkstra!" };
}
