// src/main_poc.js
import { registry } from './core/registry.js';
import bubbleSortPlugin from './algorithms/sorting/bubble/index.js';
import bfsPlugin from './algorithms/graph/bfs/index.js';
import dfsPlugin from './algorithms/graph/dfs/index.js';
import dijkstraPlugin from './algorithms/graph/dijkstra/index.js';

import { ArrayRenderer } from './renderers/ArrayRenderer.js';
import { GraphRenderer } from './renderers/GraphRenderer.js';
import { TableRenderer } from './renderers/TableRenderer.js';
import { GraphBuilder } from './ui/GraphBuilder.js';

import { SimulationEngine } from './core/engine.js';
import { arrayReducer, createInitialArrayState, graphReducer, createInitialGraphState } from './core/stateMachine.js';

// 1. Đăng ký plugins
registry.register(bubbleSortPlugin);
registry.register(bfsPlugin);
registry.register(dfsPlugin);
registry.register(dijkstraPlugin);

document.addEventListener("DOMContentLoaded", () => {
  // 2. Khởi tạo UI Components
  const arrayContainer = document.getElementById("visualizer-container");
  const graphContainer = document.getElementById("graph-container");
  const tableContainer = document.getElementById("table-container");
  const algoSelect = document.getElementById("algo-select");

  const arrayRenderer = new ArrayRenderer("visualizer-container");
  const graphRenderer = new GraphRenderer("graph-container");
  const tableRenderer = new TableRenderer("table-container");

  let currentGraphData = {
    nodes: [
      { id: "A", x: 100, y: 150 },
      { id: "B", x: 250, y: 50 },
      { id: "C", x: 250, y: 250 },
      { id: "D", x: 400, y: 150 }
    ],
    edges: [
      { source: "A", target: "B", weight: 2 },
      { source: "A", target: "C", weight: 5 },
      { source: "B", target: "C", weight: 1 },
      { source: "B", target: "D", weight: 4 },
      { source: "C", target: "D", weight: 3 }
    ]
  };

  // Khởi tạo Graph Builder
  const graphBuilder = new GraphBuilder("graph-container", (newData) => {
    currentGraphData = newData;
    reloadCurrentAlgorithm();
  });
  
  // Nạp dữ liệu mẫu ban đầu cho Builder
  graphBuilder.loadData(currentGraphData);

  // 3. Khởi tạo Engine
  const engine = new SimulationEngine(
    // Renderer proxy
    {
      render: (state) => {
        const type = registry.get(algoSelect.value)?.metadata.visualizerType;
        if (type === "ARRAY_1D") {
          arrayRenderer.render(state);
        } else if (type === "GRAPH_2D") {
          graphRenderer.render(state);
          // Ẩn GraphBuilder khi đang chạy (hoặc có state)
          graphBuilder.hide();
          
          if (algoSelect.value === 'dijkstra') {
            tableRenderer.render(state);
          }
        }
      }
    },
    (state) => {
      document.getElementById("step-desc").innerText = state.explanation || "...";
    }
  );

  // 4. Hàm Reload Thuật toán
  function reloadCurrentAlgorithm() {
    engine.pause();
    const algoId = algoSelect.value;
    const algoModule = registry.get(algoId);
    
    if (!algoModule) return;
    document.getElementById("algo-name").innerText = algoModule.metadata.name;

    // Hiển thị/Ẩn Container tương ứng
    if (algoModule.metadata.visualizerType === "ARRAY_1D") {
      arrayContainer.classList.remove("hidden");
      graphContainer.classList.add("hidden");
      tableContainer.classList.add("hidden");
      
      const inputData = [45, 20, 60, 10, 80, 30]; // Dữ liệu test mẫu Array
      engine.loadAlgorithm(algoModule.generator, inputData, arrayReducer, createInitialArrayState);
      
    } else if (algoModule.metadata.visualizerType === "GRAPH_2D") {
      arrayContainer.classList.add("hidden");
      graphContainer.classList.remove("hidden");
      tableContainer.classList.toggle("hidden", algoId !== "dijkstra");

      // Cập nhật Engine với GraphReducer
      engine.loadAlgorithm(algoModule.generator, currentGraphData, graphReducer, createInitialGraphState);
      
      // Hiển thị lại Builder tools sau khi reload
      graphBuilder.show();
    }
  }

  // Khởi chạy lần đầu
  reloadCurrentAlgorithm();

  // Đổi thuật toán
  algoSelect.addEventListener("change", () => {
    reloadCurrentAlgorithm();
  });

  // 5. Gắn sự kiện các nút điều khiển
  document.getElementById("btn-play").addEventListener("click", () => {
    engine.play();
  });
  
  document.getElementById("btn-pause").addEventListener("click", () => {
    engine.pause();
  });
  
  document.getElementById("btn-next").addEventListener("click", () => {
    engine.pause();
    engine.nextStep();
  });
  
  document.getElementById("btn-prev").addEventListener("click", () => {
    engine.pause();
    engine.prevStep();
  });

  document.getElementById("speed-slider").addEventListener("input", (e) => {
    const speed = 1000 - parseInt(e.target.value);
    engine.setSpeed(speed);
  });
});
