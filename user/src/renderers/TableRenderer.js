// src/renderers/TableRenderer.js

export class TableRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container ${containerId} not found`);
    }
  }

  render(state) {
    if (!this.container || !state) return;

    // Chỉ render nếu có dữ liệu distance
    if (!state.metrics.distance || Object.keys(state.metrics.distance).length === 0) {
      this.container.innerHTML = "";
      return;
    }

    let html = `
      <div class="bg-slate-800 rounded-lg p-3 border border-slate-700 shadow-md">
        <h3 class="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Bảng Khoảng Cách (Distance Table)</h3>
        <div class="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
    `;

    for (const [nodeId, dist] of Object.entries(state.metrics.distance)) {
      const isInfinity = dist === Infinity || dist === "Infinity";
      const displayDist = isInfinity ? "∞" : dist;
      
      // Highlight cột nếu đang visit
      const isVisiting = state.highlights.visiting.includes(nodeId);
      const bgClass = isVisiting ? "bg-fuchsia-600 border-fuchsia-400" : "bg-slate-900 border-slate-700";
      
      html += `
        <div class="flex flex-col items-center min-w-[3rem] border ${bgClass} rounded overflow-hidden transition-colors duration-300">
          <div class="w-full bg-slate-950/50 py-1 text-center text-xs font-bold text-slate-300 border-b border-inherit">
            ${nodeId}
          </div>
          <div class="py-2 text-sm font-mono font-bold text-white">
            ${displayDist}
          </div>
        </div>
      `;
    }

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }
}
