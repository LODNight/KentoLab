// src/renderers/ArrayRenderer.js

export class ArrayRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container ${containerId} not found`);
    }
  }

  render(state) {
    if (!this.container || !state) return;

    this.container.innerHTML = "";
    
    // Tìm max value để tính chiều cao cột
    const maxVal = Math.max(...state.data, 1);

    state.data.forEach((val, idx) => {
      // Xác định trạng thái màu sắc dựa trên highlights
      let bgClass = "bg-slate-700 text-slate-300"; // Mặc định
      let borderClass = "border-slate-600";
      
      if (state.highlights.comparing.includes(idx)) {
        bgClass = "bg-orange-500 text-white";
        borderClass = "border-orange-400";
      } else if (state.highlights.swapping.includes(idx)) {
        bgClass = "bg-red-500 text-white";
        borderClass = "border-red-400";
      } else if (state.highlights.sorted.includes(idx)) {
        bgClass = "bg-emerald-500 text-white";
        borderClass = "border-emerald-400";
      }

      // Xác định pointers chĩa vào cột này
      let pointerLabels = [];
      for (const [key, pIdx] of Object.entries(state.pointers)) {
        if (pIdx === idx) {
          pointerLabels.push(key);
        }
      }

      // Tạo Node Element
      const nodeEl = document.createElement("div");
      nodeEl.className = "flex flex-col items-center justify-end group transition-all duration-300";
      nodeEl.style.width = "40px";

      // Tính chiều cao
      const heightPercent = Math.max((val / maxVal) * 100, 10);

      // Nhãn Pointer ở trên
      const pointerHtml = pointerLabels.length > 0 
        ? `<div class="mb-2 flex flex-col items-center gap-1">
             ${pointerLabels.map(p => `<span class="bg-indigo-600 text-white text-[10px] px-1 rounded-sm shadow-sm font-bold">${p}</span>`).join('')}
             <i class="fa-solid fa-chevron-down text-indigo-400 text-[10px] animate-bounce"></i>
           </div>`
        : `<div class="h-6"></div>`; // spacer

      // Cột chính
      const barHtml = `
        <div class="w-full flex items-center justify-center rounded-t-md border-t border-l border-r shadow-lg ${bgClass} ${borderClass} transition-all duration-300" style="height: ${heightPercent}px;">
          <span class="text-xs font-black font-mono shadow-sm pointer-events-none">${val}</span>
        </div>
        <div class="mt-2 text-slate-500 text-[10px] font-mono">${idx}</div>
      `;

      nodeEl.innerHTML = pointerHtml + barHtml;
      this.container.appendChild(nodeEl);
    });
  }
}
