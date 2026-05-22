// src/algorithms/graph/dfs/generator.js
import { ActionTypes } from '../../../core/actionTypes.js';

export function* dfsGenerator(graphData) {
  if (!graphData.nodes || graphData.nodes.length === 0) return;

  yield {
    type: ActionTypes.INIT,
    payload: { nodes: graphData.nodes, edges: graphData.edges },
    desc: "Khởi tạo Đồ thị cho DFS."
  };

  const startNode = graphData.nodes[0].id;
  let visited = new Set();
  
  // Chúng ta sử dụng yield* để uỷ thác (delegate) generator cho hàm đệ quy
  yield* dfsRecursive(startNode, graphData, visited);

  yield { type: ActionTypes.COMPLETE, desc: "Hoàn tất duyệt DFS!" };
}

function* dfsRecursive(u, graphData, visited) {
  visited.add(u);
  
  yield {
    type: ActionTypes.PUSH_STACK,
    payload: { nodeId: u },
    codeLine: 1,
    desc: `Đẩy đỉnh ${u} vào Stack hệ thống.`
  };

  yield {
    type: ActionTypes.VISIT_NODE,
    payload: { nodeId: u },
    codeLine: 2,
    desc: `Đang thăm đỉnh ${u}`
  };

  let adjacentEdges = graphData.edges.filter(e => e.source === u || e.target === u);
  for (let edge of adjacentEdges) {
    let v = edge.source === u ? edge.target : edge.source;
    
    yield {
      type: ActionTypes.UPDATE_EDGE,
      payload: { source: u, target: v },
      codeLine: 3,
      desc: `Kiểm tra cạnh ${u} - ${v}`
    };

    if (!visited.has(v)) {
      yield {
        type: ActionTypes.UPDATE_EDGE,
        payload: { source: u, target: v },
        codeLine: 4,
        desc: `Đỉnh ${v} chưa thăm. Gọi đệ quy DFS(${v})`
      };
      
      yield* dfsRecursive(v, graphData, visited);
      
      // Sau khi đệ quy về, highlight lại cạnh backtracking
      yield {
        type: ActionTypes.UPDATE_EDGE,
        payload: { source: v, target: u },
        codeLine: 5,
        desc: `Quay lui (Backtrack) về đỉnh ${u}`
      };
      yield {
        type: ActionTypes.VISIT_NODE,
        payload: { nodeId: u },
        desc: `Đang ở lại đỉnh ${u}`
      };
    }
  }

  yield {
    type: ActionTypes.POP_STACK,
    payload: { nodeId: u },
    codeLine: 6,
    desc: `Đã duyệt xong mọi nhánh từ ${u}. Xoá ${u} khỏi Stack.`
  };
}
