// src/main_poc.js
import { registry } from './core/registry.js';
import bubbleSortPlugin from './algorithms/sorting/bubble/index.js';
import { ArrayRenderer } from './renderers/ArrayRenderer.js';
import { SimulationEngine } from './core/engine.js';

// 1. Đăng ký plugin thuật toán
registry.register(bubbleSortPlugin);

// Khởi tạo app khi DOM load xong
document.addEventListener("DOMContentLoaded", () => {
  
  // 2. Cấu hình UI và Renderer
  const containerId = "visualizer-container";
  const renderer = new ArrayRenderer(containerId);
  
  // 3. Cấu hình Engine
  const engine = new SimulationEngine(renderer, (state) => {
    // Callback khi state thay đổi, dùng để update text mô tả
    document.getElementById("step-desc").innerText = state.explanation || "...";
  });

  // 4. Lấy plugin và load
  const algoModule = registry.get("bubble_sort");
  if (algoModule) {
    document.getElementById("algo-name").innerText = algoModule.metadata.name;
    const inputData = [45, 20, 60, 10, 80, 30]; // Dữ liệu test mẫu
    engine.loadAlgorithm(algoModule.generator, inputData);
  }

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
    const speed = 1000 - parseInt(e.target.value); // 1000ms -> 100ms
    engine.setSpeed(speed);
  });
});
