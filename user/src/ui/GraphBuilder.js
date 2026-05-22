// src/ui/GraphBuilder.js

export class GraphBuilder {
  constructor(containerId, onGraphChange) {
    this.container = document.getElementById(containerId);
    this.onGraphChange = onGraphChange;
    
    this.nodes = [];
    this.edges = [];
    this.nextNodeId = 1;

    this.mode = 'ADD_NODE'; // 'ADD_NODE', 'ADD_EDGE'
    this.selectedNode = null;

    this.initUI();
    this.attachEvents();
  }

  initUI() {
    // Tạo bảng công cụ (Toolbar)
    this.toolbar = document.createElement('div');
    this.toolbar.className = "absolute top-2 left-2 bg-slate-800 p-2 rounded-lg flex gap-2 border border-slate-700 shadow-lg z-10";
    
    this.btnNode = this.createBtn('Thêm Node (N)', 'fa-circle-dot', () => this.setMode('ADD_NODE'));
    this.btnEdge = this.createBtn('Nối Cạnh (E)', 'fa-draw-polygon', () => this.setMode('ADD_EDGE'));
    this.btnClear = this.createBtn('Xoá hết', 'fa-trash', () => this.clearGraph());

    this.btnNode.classList.add('bg-indigo-600'); // Mặc định active

    this.toolbar.appendChild(this.btnNode);
    this.toolbar.appendChild(this.btnEdge);
    this.toolbar.appendChild(this.btnClear);

    // Tạo SVG layer để vẽ Preview đồ thị
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    this.svg.style.cursor = "crosshair";
    this.svg.className = "absolute inset-0 z-0";

    this.container.appendChild(this.toolbar);
    this.container.appendChild(this.svg);
  }

  createBtn(text, iconClass, onClick) {
    const btn = document.createElement('button');
    btn.className = "px-3 py-1.5 text-xs font-semibold rounded bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center gap-2 transition";
    btn.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${text}`;
    btn.onclick = onClick;
    return btn;
  }

  setMode(mode) {
    this.mode = mode;
    this.selectedNode = null;
    
    this.btnNode.classList.remove('bg-indigo-600');
    this.btnEdge.classList.remove('bg-indigo-600');

    if (mode === 'ADD_NODE') this.btnNode.classList.add('bg-indigo-600');
    if (mode === 'ADD_EDGE') this.btnEdge.classList.add('bg-indigo-600');
  }

  clearGraph() {
    this.nodes = [];
    this.edges = [];
    this.nextNodeId = 1;
    this.selectedNode = null;
    this.drawPreview();
    this.triggerChange();
  }

  attachEvents() {
    // Phím tắt
    document.addEventListener('keydown', (e) => {
      if (e.key === 'n' || e.key === 'N') this.setMode('ADD_NODE');
      if (e.key === 'e' || e.key === 'E') this.setMode('ADD_EDGE');
      if (e.key === 'Escape') this.selectedNode = null;
    });

    this.svg.addEventListener('click', (e) => {
      const rect = this.svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Tìm node bị click
      let clickedNode = null;
      for (let node of this.nodes) {
        const dx = node.x - x;
        const dy = node.y - y;
        if (dx*dx + dy*dy <= 400) { // Bán kính click = 20
          clickedNode = node;
          break;
        }
      }

      if (this.mode === 'ADD_NODE') {
        if (!clickedNode) {
          this.nodes.push({ id: String(this.nextNodeId++), x, y });
          this.drawPreview();
          this.triggerChange();
        }
      } else if (this.mode === 'ADD_EDGE') {
        if (clickedNode) {
          if (!this.selectedNode) {
            this.selectedNode = clickedNode; // Chọn điểm đầu
          } else if (this.selectedNode.id !== clickedNode.id) {
            // Nhập trọng số
            const weight = prompt("Nhập trọng số (mặc định: 1):", "1");
            if (weight !== null) {
              const w = parseInt(weight) || 1;
              // Tránh trùng cạnh
              const exists = this.edges.find(edge => 
                (edge.source === this.selectedNode.id && edge.target === clickedNode.id) ||
                (edge.target === this.selectedNode.id && edge.source === clickedNode.id)
              );
              
              if (!exists) {
                this.edges.push({ source: this.selectedNode.id, target: clickedNode.id, weight: w });
                this.triggerChange();
              }
            }
            this.selectedNode = null; // Reset
          }
          this.drawPreview();
        }
      }
    });
  }

  drawPreview() {
    this.svg.innerHTML = '';
    
    // Vẽ cạnh
    this.edges.forEach(edge => {
      const srcNode = this.nodes.find(n => n.id === edge.source);
      const tgtNode = this.nodes.find(n => n.id === edge.target);
      if(!srcNode || !tgtNode) return;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", srcNode.x);
      line.setAttribute("y1", srcNode.y);
      line.setAttribute("x2", tgtNode.x);
      line.setAttribute("y2", tgtNode.y);
      line.setAttribute("stroke", "#475569");
      line.setAttribute("stroke-width", "2");
      this.svg.appendChild(line);

      // Trọng số
      const cx = (srcNode.x + tgtNode.x) / 2;
      const cy = (srcNode.y + tgtNode.y) / 2;
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", cx);
      text.setAttribute("y", cy - 5);
      text.setAttribute("fill", "#94a3b8");
      text.setAttribute("font-size", "12");
      text.setAttribute("text-anchor", "middle");
      text.textContent = edge.weight;
      this.svg.appendChild(text);
    });

    // Vẽ đỉnh
    this.nodes.forEach(node => {
      const isSelected = this.selectedNode && this.selectedNode.id === node.id;
      
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "16");
      circle.setAttribute("fill", isSelected ? "#4f46e5" : "#1e293b"); // Indigo nếu được chọn
      circle.setAttribute("stroke", isSelected ? "#c7d2fe" : "#64748b");
      circle.setAttribute("stroke-width", "2");
      this.svg.appendChild(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", node.x);
      text.setAttribute("y", node.y + 4);
      text.setAttribute("fill", "#f8fafc");
      text.setAttribute("font-size", "12");
      text.setAttribute("text-anchor", "middle");
      text.textContent = node.id;
      text.style.pointerEvents = "none";
      this.svg.appendChild(text);
    });
  }

  triggerChange() {
    if (this.onGraphChange) {
      // Clone array to prevent mutation issues
      this.onGraphChange({
        nodes: JSON.parse(JSON.stringify(this.nodes)),
        edges: JSON.parse(JSON.stringify(this.edges))
      });
    }
  }

  // Cho phép khởi tạo mẫu
  loadData(graphData) {
    this.nodes = JSON.parse(JSON.stringify(graphData.nodes));
    this.edges = JSON.parse(JSON.stringify(graphData.edges));
    // Cập nhật nextNodeId để không bị trùng lặp
    let maxId = 0;
    this.nodes.forEach(n => {
      const numId = parseInt(n.id);
      if(!isNaN(numId) && numId > maxId) maxId = numId;
    });
    this.nextNodeId = maxId + 1;
    this.drawPreview();
    this.triggerChange();
  }

  hide() {
    this.toolbar.style.display = 'none';
  }

  show() {
    this.toolbar.style.display = 'flex';
  }
}
