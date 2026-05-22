// src/core/engine.js
import { arrayReducer, createInitialArrayState } from './stateMachine.js';

export class SimulationEngine {
  constructor(renderer, onStateChangeCallback) {
    this.renderer = renderer;
    this.onStateChange = onStateChangeCallback; // Để update UI ngoài (ví dụ CodeTracker)
    
    this.actions = [];
    this.historyStates = [];
    this.cursor = -1; // Vị trí hiện tại trong mảng actions
    
    this.isPlaying = false;
    this.timer = null;
    this.speedMs = 500;
  }

  // Khởi tạo thuật toán và nạp danh sách hành động
  loadAlgorithm(generatorFn, inputData) {
    this.pause();
    this.actions = [];
    this.historyStates = [];
    
    // Khởi tạo State Machine
    let currentState = createInitialArrayState();

    // Chạy generator một lần duy nhất để lấy toàn bộ danh sách actions
    const generator = generatorFn(inputData);
    for (const action of generator) {
      this.actions.push(action);
      // Tính toán state tại bước này và lưu vào lịch sử
      currentState = arrayReducer(currentState, action);
      this.historyStates.push(currentState);
    }

    this.cursor = 0;
    this.renderCurrentState();
  }

  renderCurrentState() {
    if (this.cursor >= 0 && this.cursor < this.historyStates.length) {
      const state = this.historyStates[this.cursor];
      this.renderer.render(state);
      if (this.onStateChange) {
        this.onStateChange(state);
      }
    }
  }

  nextStep() {
    if (this.cursor < this.historyStates.length - 1) {
      this.cursor++;
      this.renderCurrentState();
    } else {
      this.pause(); // Đã kết thúc
    }
  }

  prevStep() {
    if (this.cursor > 0) {
      this.cursor--;
      this.renderCurrentState();
    }
  }

  play() {
    if (this.isPlaying || this.cursor >= this.historyStates.length - 1) return;
    this.isPlaying = true;
    this.timer = setInterval(() => {
      this.nextStep();
      if (this.cursor >= this.historyStates.length - 1) {
        this.pause();
      }
    }, this.speedMs);
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  setSpeed(ms) {
    this.speedMs = ms;
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }
}
