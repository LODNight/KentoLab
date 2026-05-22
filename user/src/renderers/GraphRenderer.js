// src/renderers/GraphRenderer.js

export class GraphRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container ${containerId} not found`);
    }
  }

  render(state) {
    if (!this.container || !state) return;
    
    // Tìm hoặc tạo thẻ SVG
    let svg = this.container.querySelector('svg.renderer-svg');
    if (!svg) {
      this.container.innerHTML = ""; // Clear builder SVG nếu có
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.className = "absolute inset-0 z-0 renderer-svg";
      this.container.appendChild(svg);
    }

    svg.innerHTML = ""; // Xoá cũ vẽ mới (có thể tối ưu bằng delta DOM later)

    const isEdgeActive = (src, tgt) => {
      return state.highlights.edgeActive.some(e => 
        (e.source === src && e.target === tgt) || (e.target === src && e.source === tgt)
      );
    };

    // Vẽ cạnh trước (để nằm dưới node)
    state.edges.forEach(edge => {
      const srcNode = state.nodes.find(n => n.id === edge.source);
      const tgtNode = state.nodes.find(n => n.id === edge.target);
      if(!srcNode || !tgtNode) return;

      const active = isEdgeActive(edge.source, edge.target);
      
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", srcNode.x);
      line.setAttribute("y1", srcNode.y);
      line.setAttribute("x2", tgtNode.x);
      line.setAttribute("y2", tgtNode.y);
      line.setAttribute("stroke", active ? "#f43f5e" : "#475569"); // Red nếu active
      line.setAttribute("stroke-width", active ? "4" : "2");
      if (active) {
        line.classList.add("transition-all", "duration-300");
      }
      svg.appendChild(line);

      // Trọng số
      const cx = (srcNode.x + tgtNode.x) / 2;
      const cy = (srcNode.y + tgtNode.y) / 2;
      
      const textBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      textBg.setAttribute("x", cx - 8);
      textBg.setAttribute("y", cy - 12);
      textBg.setAttribute("width", "16");
      textBg.setAttribute("height", "16");
      textBg.setAttribute("fill", "#0f172a");
      textBg.setAttribute("rx", "4");
      svg.appendChild(textBg);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", cx);
      text.setAttribute("y", cy);
      text.setAttribute("fill", active ? "#f43f5e" : "#94a3b8");
      text.setAttribute("font-size", "12");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("alignment-baseline", "middle");
      text.textContent = edge.weight;
      svg.appendChild(text);
    });

    // Vẽ đỉnh
    state.nodes.forEach(node => {
      const isVisiting = state.highlights.visiting.includes(node.id);
      const isVisited = state.highlights.visited.includes(node.id);
      
      let fillColor = "#1e293b";
      let strokeColor = "#64748b";
      
      if (isVisiting) {
        fillColor = "#f59e0b"; // Orange
        strokeColor = "#fcd34d";
      } else if (isVisited) {
        fillColor = "#10b981"; // Emerald
        strokeColor = "#6ee7b7";
      }
      
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", node.x);
      circle.setAttribute("cy", node.y);
      circle.setAttribute("r", "16");
      circle.setAttribute("fill", fillColor);
      circle.setAttribute("stroke", strokeColor);
      circle.setAttribute("stroke-width", isVisiting ? "4" : "2");
      circle.classList.add("transition-all", "duration-300");
      svg.appendChild(circle);

      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", node.x);
      text.setAttribute("y", node.y + 4);
      text.setAttribute("fill", "#f8fafc");
      text.setAttribute("font-size", "12");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.textContent = node.id;
      svg.appendChild(text);
    });
  }
}
