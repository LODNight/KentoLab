// src/algorithms/graph/bfs/generator.js
import { ActionTypes } from '../../../core/actionTypes.js';

export function* bfsGenerator(graphData) {
  // graphData: { nodes: [], edges: [] }
  if (!graphData.nodes || graphData.nodes.length === 0) return;

  yield {
    type: ActionTypes.INIT,
    payload: { nodes: graphData.nodes, edges: graphData.edges },
    desc: "Khởi tạo Đồ thị cho BFS."
  };

  const startNode = graphData.nodes[0].id; // Lấy node đầu tiên làm điểm bắt đầu
  let queue = [startNode];
  let visited = new Set([startNode]);

  yield {
    type: ActionTypes.ENQUEUE,
    payload: { nodeId: startNode },
    codeLine: 1,
    desc: `Khởi tạo Queue với đỉnh xuất phát: ${startNode}`
  };

  while (queue.length > 0) {
    let u = queue.shift(); // Dequeue
    
    yield {
      type: ActionTypes.DEQUEUE,
      payload: { nodeId: u },
      codeLine: 3,
      desc: `Lấy đỉnh ${u} ra khỏi Queue để duyệt.`
    };

    yield {
      type: ActionTypes.VISIT_NODE,
      payload: { nodeId: u },
      codeLine: 4,
      desc: `Đang thăm đỉnh ${u}`
    };

    // Tìm các đỉnh kề của u
    let adjacentEdges = graphData.edges.filter(e => e.source === u || e.target === u);
    for (let edge of adjacentEdges) {
      let v = edge.source === u ? edge.target : edge.source;
      
      yield {
        type: ActionTypes.UPDATE_EDGE,
        payload: { source: u, target: v },
        codeLine: 5,
        desc: `Xét cạnh nối ${u} - ${v}`
      };

      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
        
        yield {
          type: ActionTypes.ENQUEUE,
          payload: { nodeId: v },
          codeLine: 6,
          desc: `Đỉnh ${v} chưa được thăm. Thêm ${v} vào Queue.`
        };
      } else {
        yield {
          type: ActionTypes.UPDATE_EDGE,
          payload: { source: u, target: v },
          codeLine: 5,
          desc: `Đỉnh ${v} đã được thăm hoặc đang chờ trong Queue, bỏ qua.`
        };
      }
    }
  }

  yield { type: ActionTypes.COMPLETE, desc: "Hoàn tất duyệt BFS!" };
}
