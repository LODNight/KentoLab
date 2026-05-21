/* ==========================================================================
   Kento Lab - Main Logical Controller & Visualizers Engine
   ========================================================================== */

// algoCategories defined in js/database.js;
// megaGroups defined in js/database.js;

let activeMegaGroupId = "core";
let activeAlgoId = "binary";
let activeCategoryId = "searching";
let currentMode = "play"; // 'play' (Playground) or 'learn' (Theory)
let currentView = "dashboard"; // 'dashboard' (shows grid cards) or 'workspace' (shows live playground)

// List of officially supported interactive simulation algorithms
const playgroundAlgos = ["linear", "binary", "bubble", "selection", "bfs", "dfs", "dijkstra_graph", "sieve_primes"];

function hasPlayground(algoId) {
  return playgroundAlgos.includes(algoId);
}

// Audio State variables
let audioCtx = null;
let isSoundOn = false;

// Simulation playback variables
let steps = [];
let currentStepIdx = 0;
let playTimer = null;
let playSpeed = 600; // ms
let currentVisualizerType = 'array';

const mainSidebar = document.getElementById("main-sidebar");
const sidebarToggleDesktop = document.getElementById("sidebar-toggle-desktop");
const sidebarToggleIcon = document.getElementById("sidebar-toggle-icon");
const sidebarToggleMobile = document.getElementById("sidebar-toggle-mobile");
const sidebarNavContainer = document.getElementById("sidebar-nav-container");
const algoSearchInput = document.getElementById("algo-search-input");

let isCollapsed = false;

sidebarToggleDesktop.addEventListener("click", () => {
  isCollapsed = !isCollapsed;
  if (isCollapsed) {
    mainSidebar.classList.add("sidebar-collapsed");
    sidebarToggleIcon.className = "fa-solid fa-angles-right text-xs";
  } else {
    mainSidebar.classList.remove("sidebar-collapsed");
    sidebarToggleIcon.className = "fa-solid fa-angles-left text-xs";
  }
});

sidebarToggleMobile.addEventListener("click", () => {
  sidebarNavContainer.classList.toggle("hidden");
});

function playAudioTone(val, maxVal = 100) {
  if (!isSoundOn) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const minFreq = 180;
    const maxFreq = 900;
    const freq = minFreq + (val / maxVal) * (maxFreq - minFreq);

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.16);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.16);
  } catch (err) {
    console.warn("Audio Context blocked or failed to initialize:", err);
  }
}
// algorithmDatabase defined in js/database.js;
// graphData defined in js/database.js;

let isAddingNodeMode = false;
let isConnectingMode = false;
let firstSelectedNode = null;

function buildSidebarCategories() {
  const container = document.getElementById("sidebar-nav-container");
  container.innerHTML = "";

  megaGroups.forEach(group => {
    const isSelected = group.id === activeMegaGroupId;
    const btn = document.createElement("button");
    btn.className = `nav-btn w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-xs font-semibold transition duration-200 ${isSelected
      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-lg"
      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
      }`;

    btn.onclick = () => {
      selectMegaGroup(group.id);
    };

    btn.innerHTML = `
          <div class="p-1.5 rounded bg-slate-950/40 text-slate-400 shrink-0">
            <i class="fa-solid ${group.icon} w-4 h-4 text-center"></i>
          </div>
          <span class="btn-text text-left flex-grow">${group.name}</span>
          <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
        `;
    container.appendChild(btn);
  });
}

// Render Dashboard Grid showing subcategories and their algorithms (UPGRADED UI STYLING FOR SUB-GROUPS)
function renderMegaGroupDashboard(groupId) {
  const group = megaGroups.find(g => g.id === groupId);
  if (!group) return;

  const dashboard = document.getElementById("dashboard-container");
  dashboard.innerHTML = "";

  // Group introduction header Card (Học phần lớn)
  const introCard = document.createElement("div");
  introCard.className = `bg-gradient-to-r ${group.color} ${group.shadow} p-6 rounded-2xl shadow-xl flex items-center justify-between border border-white/10`;
  introCard.innerHTML = `
        <div class="space-y-2">
          <span class="px-2.5 py-1 bg-white/20 text-white rounded-md text-[9px] font-black uppercase tracking-wider">Học phần lớn</span>
          <h3 class="text-xl font-extrabold text-white flex items-center gap-2">
            <i class="fa-solid ${group.icon}"></i> ${group.name}
          </h3>
          <p class="text-xs text-indigo-100 max-w-2xl leading-relaxed">${group.desc}</p>
        </div>
        <i class="hidden lg:block fa-solid ${group.icon} text-6xl text-white/10 shrink-0"></i>
      `;
  dashboard.appendChild(introCard);

  // Render Categories
  group.categoryIds.forEach(catId => {
    const category = algoCategories.find(c => c.id === catId);
    if (!category) return;

    const catSection = document.createElement("div");
    catSection.className = "space-y-4 pt-4";

    // Count total algorithms in this category
    const algoCount = category.algos.length;

    // Upgraded header styling to emphasize categories
    catSection.innerHTML = `
          <div class="flex items-center justify-between bg-slate-900/60 border-l-4 border-indigo-500 pl-4 pr-3 py-2.5 rounded-r-xl border border-y border-r border-slate-800/80 shadow-md">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <i class="fa-solid ${category.icon} text-sm"></i>
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-100 uppercase tracking-wider">${category.name}</h4>
                <p class="text-[10px] text-slate-500">Chuyên đề con thuộc phân nhóm chính</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-950/40 text-indigo-300 border border-indigo-500/20 shadow-inner">
              ${algoCount} giải thuật
            </span>
          </div>
        `;

    const cardsGrid = document.createElement("div");
    cardsGrid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3";

    category.algos.forEach(algo => {
      const isPlayable = hasPlayground(algo.id);
      let difficultyColor = "bg-emerald-950 text-emerald-400 border-emerald-500/20";
      if (algo.diff === "Medium") difficultyColor = "bg-amber-950 text-amber-400 border-amber-500/20";
      if (algo.diff === "Hard") difficultyColor = "bg-rose-950 text-rose-400 border-rose-500/20";

      const card = document.createElement("div");
      
      if (isPlayable) {
        card.className = "bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition cursor-pointer flex flex-col justify-between space-y-3 group";
      } else {
        // Semi-transparent lock style
        card.className = "bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group opacity-75 hover:opacity-100";
      }

      const statusBadge = isPlayable 
        ? `<span class="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-flask-vial mr-1 animate-pulse"></i>Chạy thử</span>`
        : `<span class="px-1.5 py-0.5 rounded bg-slate-850 text-slate-500 border border-slate-850 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-book mr-1"></i>Lý thuyết</span>`;

      card.onclick = () => selectAlgorithm(algo.id, category.id);
      card.innerHTML = `
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded border text-[9px] font-bold ${difficultyColor}">${algo.diff}</span>
                ${statusBadge}
              </div>
              <h5 class="text-sm font-bold text-white group-hover:text-indigo-400 transition flex items-center gap-1.5">
                ${!isPlayable ? '<i class="fa-solid fa-lock text-slate-500 text-[10px]"></i>' : ''}
                <span>${algo.name}</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-0 group-hover:opacity-100 transition"></i>
              </h5>
            </div>
            <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
              ${algorithmDatabase[algo.id] ? algorithmDatabase[algo.id].details.shortSummary : "Khám phá phòng thí nghiệm học thuật chuyên sâu và lý thuyết của thuật toán này."}
            </p>
          `;
      cardsGrid.appendChild(card);
    });

    catSection.appendChild(cardsGrid);
    dashboard.appendChild(catSection);
  });
}

// Trigger state changes when selecting sidebar mega-group
function selectMegaGroup(groupId) {
  activeMegaGroupId = groupId;
  currentView = "dashboard";
  pausePlayback();

  // Update Sidebar UI highlights
  buildSidebarCategories();

  // Render Dashboard Content
  renderMegaGroupDashboard(groupId);

  // Hide workspace, show dashboard
  document.getElementById("workspace-container").classList.add("hidden");
  document.getElementById("dashboard-container").classList.remove("hidden");
  document.getElementById("mode-switcher-container").classList.add("hidden");
  document.getElementById("btn-back-to-dashboard").classList.add("hidden");
  document.getElementById("breadcrumb-separator").classList.add("hidden");

  // Simplified Breadcrumb Header (Removes duplication from screenshot)
  document.getElementById("workspace-title").innerHTML = `<i class="fa-solid fa-graduation-cap text-indigo-500 mr-1"></i> Không Gian Học Tập`;
  document.getElementById("workspace-subtitle").innerText = "Lựa chọn một chuyên đề học thuật bên dưới để khám phá phòng thí nghiệm trực quan sinh động.";
  document.getElementById("algo-category-badge").innerText = "TỔNG QUAN";
}

function goBackToDashboard() {
  selectMegaGroup(activeMegaGroupId);
}

function renderCodeTrace(traceLines) {
  const view = document.getElementById("code-trace-viewport");
  view.innerHTML = "";
  if (!traceLines) {
    view.innerHTML = `<div class="text-slate-500 italic text-center p-4">Không có mã giả cho giải thuật này</div>`;
    return;
  }
  traceLines.forEach(line => {
    const lineDiv = document.createElement("div");
    lineDiv.id = `code-line-${line.num}`;
    lineDiv.className = "py-0.5 px-2 rounded flex items-start gap-2.5 transition-colors duration-150 hover:bg-slate-900";
    lineDiv.innerHTML = `
          <span class="text-slate-600 select-none w-4 text-right">${line.num}</span>
          <span class="whitespace-pre-wrap leading-relaxed">${line.text}</span>
        `;
    view.appendChild(lineDiv);
  });
}

const svgGraph = document.getElementById("visualizer-svg-graph");

svgGraph.addEventListener("click", function (e) {
  if (!isAddingNodeMode) return;

  const rect = svgGraph.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x < 20 || x > rect.width - 20 || y < 20 || y > rect.height - 20) return;

  const nodeLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let chosenLetter = "N";
  for (let i = 0; i < nodeLetters.length; i++) {
    let letter = nodeLetters[i];
    if (!graphData.nodes.find(n => n.id === letter)) {
      chosenLetter = letter;
      break;
    }
  }

  graphData.nodes.push({ id: chosenLetter, x, y });
  drawInteractiveGraph();
  showToast(`Đã thêm nút '${chosenLetter}' mới trên canvas!`, "success");
  isAddingNodeMode = false;
  document.getElementById("btn-graph-add-node").classList.remove("bg-indigo-600");
});

function drawInteractiveGraph(highlightNodeId = null, highlightColorClass = "fill-indigo-600 stroke-indigo-400") {
  svgGraph.innerHTML = "";
  if (graphData.nodes.length === 0) {
    svgGraph.innerHTML = `<text x="50%" y="50%" fill="#475569" font-size="11" font-weight="bold" text-anchor="middle">Click "+ Nút" và click khoảng trống trên canvas để vẽ.</text>`;
    return;
  }

  // 1. Draw connecting Lines (Edges)
  graphData.edges.forEach(edge => {
    const uNode = graphData.nodes.find(n => n.id === edge.u);
    const vNode = graphData.nodes.find(n => n.id === edge.v);
    if (uNode && vNode) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", uNode.x);
      line.setAttribute("y1", uNode.y);
      line.setAttribute("x2", vNode.x);
      line.setAttribute("y2", vNode.y);
      line.setAttribute("stroke", "#334155");
      line.setAttribute("stroke-width", "2");
      line.className.baseVal = "tree-edge";
      svgGraph.appendChild(line);

      // Weight indicator Text
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", (uNode.x + vNode.x) / 2);
      text.setAttribute("y", (uNode.y + vNode.y) / 2 - 5);
      text.setAttribute("fill", "#64748b");
      text.setAttribute("font-size", "9");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.textContent = edge.weight;
      svgGraph.appendChild(text);
    }
  });

  // 2. Draw Nodes Circles
  graphData.nodes.forEach(node => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "cursor-pointer");

    group.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isConnectingMode) {
        if (!firstSelectedNode) {
          firstSelectedNode = node.id;
          showToast(`Đã chọn '${firstSelectedNode}'. Hãy chọn tiếp nút thứ 2 để kết nối.`, "info");
        } else if (firstSelectedNode !== node.id) {
          const edgeExists = graphData.edges.some(edge =>
            (edge.u === firstSelectedNode && edge.v === node.id) ||
            (edge.u === node.id && edge.v === firstSelectedNode)
          );
          if (!edgeExists) {
            const w = Math.floor(Math.random() * 9) + 1;
            graphData.edges.push({ u: firstSelectedNode, v: node.id, weight: w });
            drawInteractiveGraph();
            showToast(`Kết nối thành công ${firstSelectedNode} ⟷ ${node.id} (Trọng số: ${w})!`, "success");
          }
          isConnectingMode = false;
          firstSelectedNode = null;
          document.getElementById("btn-graph-connect").classList.remove("bg-indigo-600");
        }
      } else {
        runGraphTraversalSimulation(node.id);
      }
    });

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", "14");

    let fill = "fill-slate-900";
    let stroke = "stroke-slate-700";
    let strokeW = "2";

    if (node.id === highlightNodeId) {
      fill = highlightColorClass.split(" ")[0];
      stroke = highlightColorClass.split(" ")[1];
      strokeW = "3";
    }

    circle.setAttribute("class", `tree-node-circle ${fill} ${stroke}`);
    circle.setAttribute("stroke-width", strokeW);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y + 4);
    text.setAttribute("fill", "#f8fafc");
    text.setAttribute("font-size", "10");
    text.setAttribute("font-weight", "bold");
    text.setAttribute("text-anchor", "middle");
    text.textContent = node.id;

    group.appendChild(circle);
    group.appendChild(text);
    svgGraph.appendChild(group);
  });
}

function runGraphTraversalSimulation(startNodeId) {
  if (activeAlgoId !== "bfs" && activeAlgoId !== "dfs" && activeAlgoId !== "dijkstra_graph") {
    showToast("Chọn thuật toán BFS/DFS hoặc Dijkstra để chạy mô phỏng đồ thị này!", "info");
    return;
  }

  pausePlayback();
  showToast(`Khởi chạy mô phỏng đồ thị từ nút xuất phát: '${startNodeId}'`, "success");

  let pathSteps = [];
  if (activeAlgoId === "bfs") {
    let visited = new Set();
    let queue = [startNodeId];
    visited.add(startNodeId);

    pathSteps.push({ node: startNodeId, type: 'start', desc: `BFS: Bắt đầu duyệt từ đỉnh xuất phát '${startNodeId}'` });

    while (queue.length > 0) {
      let u = queue.shift();
      pathSteps.push({ node: u, type: 'visit', desc: `BFS: Rút đỉnh '${u}' ra khỏi Queue và tiến hành duyệt.` });

      let neighbors = [];
      graphData.edges.forEach(edge => {
        if (edge.u === u && !visited.has(edge.v)) neighbors.push(edge.v);
        if (edge.v === u && !visited.has(edge.u)) neighbors.push(edge.u);
      });

      neighbors.sort().forEach(v => {
        visited.add(v);
        queue.push(v);
        pathSteps.push({ node: v, type: 'enqueue', desc: `BFS: Phát hiện đỉnh lân cận '${v}' chưa duyệt. Đưa vào Queue.` });
      });
    }
  } else if (activeAlgoId === "dfs") {
    let visited = new Set();
    function dfsHelper(u) {
      visited.add(u);
      pathSteps.push({ node: u, type: 'visit', desc: `DFS: Đi tới duyệt đỉnh '${u}'` });

      let neighbors = [];
      graphData.edges.forEach(edge => {
        if (edge.u === u && !visited.has(edge.v)) neighbors.push(edge.v);
        if (edge.v === u && !visited.has(edge.u)) neighbors.push(edge.u);
      });

      neighbors.sort().forEach(v => {
        pathSteps.push({ node: v, type: 'go-deep', desc: `DFS: Rẽ nhánh đi sâu sang đỉnh lân cận '${v}'` });
        dfsHelper(v);
      });
    }
    dfsHelper(startNodeId);
  } else {
    let dist = {};
    let parent = {};
    let visited = new Set();
    graphData.nodes.forEach(n => dist[n.id] = Infinity);
    dist[startNodeId] = 0;

    pathSteps.push({ node: startNodeId, type: 'start', desc: `Dijkstra: Khởi tạo khoảng cách xuất phát từ đỉnh '${startNodeId}' = 0` });

    for (let i = 0; i < graphData.nodes.length; i++) {
      let u = null;
      graphData.nodes.forEach(n => {
        if (!visited.has(n.id)) {
          if (u === null || dist[n.id] < dist[u]) u = n.id;
        }
      });

      if (u === null || dist[u] === Infinity) break;
      visited.add(u);
      pathSteps.push({ node: u, type: 'visit', desc: `Dijkstra: Đỉnh có khoảng cách ngắn nhất chưa xét là '${u}' (khoảng cách = ${dist[u]}). Cố định nhãn.` });

      graphData.edges.forEach(edge => {
        let v = null;
        if (edge.u === u) v = edge.v;
        if (edge.v === u) v = edge.u;

        if (v !== null && !visited.has(v)) {
          let alt = dist[u] + edge.weight;
          if (alt < dist[v]) {
            dist[v] = alt;
            parent[v] = u;
            pathSteps.push({ node: v, type: 'relax', desc: `Dijkstra: Cập nhật đường đi ngắn nhất đến '${v}' qua '${u}': Mới = ${alt}` });
          }
        }
      });
    }
  }

  let stepIndex = 0;
  function nextStepAnimate() {
    if (stepIndex >= pathSteps.length) {
      drawInteractiveGraph();
      showToast("Mô phỏng đồ thị đã chạy hoàn thành!", "success");
      return;
    }
    let item = pathSteps[stepIndex];
    let colorClass = "fill-amber-600 stroke-amber-400";
    if (item.type === 'visit') colorClass = "fill-emerald-600 stroke-emerald-400";
    if (item.type === 'start') colorClass = "fill-indigo-600 stroke-indigo-400";

    drawInteractiveGraph(item.node, colorClass);
    document.getElementById("step-description-text").innerHTML = `<i class="fa-solid fa-play text-amber-500 mr-2"></i> ${item.desc}`;
    stepIndex++;
    setTimeout(nextStepAnimate, 900);
  }
  nextStepAnimate();
}

// Select specific algorithm, loading the visualizer and academic sheet
function selectAlgorithm(algoId, catId) {
  activeAlgoId = algoId;
  activeCategoryId = catId;
  currentView = "workspace";
  pausePlayback();

  const isPlayable = hasPlayground(algoId);

  // Mode Switcher Controls
  const modePlayBtn = document.getElementById("mode-play-btn");
  if (isPlayable) {
    modePlayBtn.disabled = false;
    modePlayBtn.className = `flex items-center gap-1.5 px-3 py-1 text-xs font-semibold transition ${currentMode === 'play' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'} rounded`;
    modePlayBtn.innerHTML = `<i class="fa-solid fa-flask-vial"></i> <span>Chạy Thử</span>`;
  } else {
    // Disabled style showing lock
    modePlayBtn.disabled = true;
    modePlayBtn.className = "flex items-center gap-1.5 px-3 py-1 text-xs font-semibold transition bg-slate-900 text-slate-600 rounded cursor-not-allowed opacity-45";
    modePlayBtn.innerHTML = `<i class="fa-solid fa-lock text-[10px] mr-1"></i> <span>Chạy Thử</span>`;
    // Force learn mode directly
    currentMode = 'learn';
  }

  // Locate profile from DB
  let profile = algorithmDatabase[algoId];
  if (!profile) {
    let catObj = algoCategories.find(c => c.id === catId);
    let algoObj = catObj ? catObj.algos.find(a => a.id === algoId) : { name: algoId };

    // Fallback auto generator ensuring 100% database coverage
    profile = {
      name: algoObj.name,
      details: {
        category: catId,
        vType: "console",
        complexity: {
          best: "O(log n)", avg: "O(n)", worst: "O(n)", space: "O(1)",
        },
        shortSummary: `Học thuật và trực quan hóa các chu kỳ của thuật toán ${algoObj.name}.`,
        concept: `${algoObj.name} là một thuật toán hiệu quả cao thuộc chuyên đề khoa học máy tính này.`,
        conditions: "Yêu cầu cấu trúc dữ liệu tương thích, định dạng đầu vào đồng nhất để đạt hiệu suất tối đa.",
        idea: `Tổ chức vòng lặp tối ưu để phân tách dữ liệu gốc thành các bài toán thành phần có tính kế thừa.`,
        guide: "Mô phỏng nhật ký dòng lệnh terminal phía dưới hiển thị tuần tự các chu kỳ xử lý lý thuyết của thuật toán.",
        pseudocode: `procedure ${algoId}(data)\n  // Khởi tạo các biến lặp\n  for each item in data do\n    process(item)\nend procedure`,
        sourceCode: {
          cpp: `// Phiên bản mã nguồn mẫu hoàn chỉnh C++\n#include <iostream>\n\nvoid runAlgorithm() {\n    std::cout << "Algorithm ${algoObj.name} is running..." << std::endl;\n}`,
          python: `# Phiên bản mã nguồn mẫu hoàn chỉnh Python\ndef run_algorithm():\n    print("Algorithm ${algoObj.name} is running...")`
        },
        apps: ["Tối ưu hiệu năng ứng dụng.", "Chuẩn hóa quy trình lọc dữ liệu trong cơ sở dữ liệu.", "Làm module thành phần trong hệ thống tính toán phân tán."],
        exercises: [{ name: `LeetCode - Bài tập liên quan ${algoObj.name}`, diff: "Medium", url: "#" }],
        codeTrace: [
          { num: 1, text: "Khởi tạo dữ liệu gốc" },
          { num: 2, text: "for each item in list do" },
          { num: 3, text: "  process(item)" }
        ]
      },
      execution: {
        generator: function (arr) {
          return [
            { consoleOut: `Khởi chạy Terminal giả lập cho thuật toán: [${algoObj.name}].\nĐang tiền xử lý dữ liệu...`, line: 1 },
            { consoleOut: "Phân tích cấu trúc mảng đầu vào:\n" + JSON.stringify(arr), line: 2 },
            { consoleOut: "Bước 1: Chạy bộ máy tối ưu tính toán...", line: 3 },
            { consoleOut: "Trạng thái máy ảo: Sẵn sàng (OK).", line: 3 },
            { consoleOut: "Cập nhật kết quả thành công hoàn tất dữ liệu mẫu!", line: 1 }
          ];
        }
      }
    };
  }

  currentVisualizerType = profile.details.vType;

  // Update Top breadcrumb UI
  document.getElementById("btn-back-to-dashboard").classList.remove("hidden");
  document.getElementById("breadcrumb-separator").classList.remove("hidden");
  document.getElementById("algo-category-badge").innerText = algoCategories.find(c => c.id === catId).name;
  document.getElementById("workspace-title").innerHTML = `<i class="fa-solid fa-cube text-indigo-500 animate-pulse"></i> ${algoId.toUpperCase().replace("_", " ")}`;
  document.getElementById("workspace-subtitle").innerText = profile.details.shortSummary;

  // Mode Switcher display
  document.getElementById("mode-switcher-container").classList.remove("hidden");

  // Handle Sandbox layout swap
  document.getElementById("canvas-array").classList.add("hidden");
  document.getElementById("canvas-graph").classList.add("hidden");
  document.getElementById("canvas-dp-grid").classList.add("hidden");
  document.getElementById("canvas-console").classList.add("hidden");

  if (profile.details.vType === "array") {
    document.getElementById("canvas-array").classList.remove("hidden");
  } else if (profile.details.vType === "graph") {
    document.getElementById("canvas-graph").classList.remove("hidden");
    drawInteractiveGraph();
  } else if (profile.details.vType === "dp-grid") {
    document.getElementById("canvas-dp-grid").classList.remove("hidden");
  } else {
    document.getElementById("canvas-console").classList.remove("hidden");
  }

  // Hide or show playback control bar
  const playbackBar = document.getElementById("playback-controls-bar");
  if (profile.details.vType === 'graph') {
    playbackBar.classList.add("hidden");
  } else {
    playbackBar.classList.remove("hidden");
  }

  // Load Control parameters
  loadDynamicSandboxParameters(profile);

  // Setup timeline steps
  const initialArray = [45, 12, 85, 32, 78, 22, 60, 18, 92, 50];
  if (algoId === "binary") {
    initialArray.sort((a, b) => a - b);
  }
  steps = profile.execution.generator(initialArray, 32);
  currentStepIdx = 0;

  // Populate theory sheet
  populateAcademicTheoryTab(profile, algoId);

  // Render pseudocode lines
  renderCodeTrace(profile.details.codeTrace);

  // Reset view modes
  switchMode(currentMode);

  // Show workspace view, hide dashboard
  document.getElementById("dashboard-container").classList.add("hidden");
  document.getElementById("workspace-container").classList.remove("hidden");

  updateSandboxUI();
}

function loadDynamicSandboxParameters(profile) {
  const parent = document.getElementById("dynamic-controls");
  parent.innerHTML = "";

  if (profile.details.vType === "array") {
    parent.innerHTML = `
          <div class="space-y-3">
            <div>
              <span class="block font-medium text-slate-400 mb-2">Tạo dữ liệu mảng</span>
              <div class="grid grid-cols-2 gap-2">
                <button onclick="regenerateRandomArray()" class="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-100 transition flex items-center justify-center gap-1">
                  <i class="fa-solid fa-dice"></i> Ngẫu nhiên
                </button>
                <button onclick="openCustomInputModal()" class="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-100 transition flex items-center justify-center gap-1">
                  <i class="fa-solid fa-keyboard"></i> Nhập tay
                </button>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="text-slate-400">Tốc độ chạy tự động:</span>
                <span id="lbl-playground-speed" class="text-indigo-400 font-bold">600ms</span>
              </div>
              <input type="range" id="slider-playground-speed" min="100" max="2000" step="100" value="600" oninput="changePlaySpeed(this.value)" class="w-full accent-indigo-500 cursor-pointer">
            </div>

            <div class="flex items-center justify-between border-t border-slate-800 pt-3">
              <div class="flex flex-col">
                <span class="font-medium text-slate-300">Âm thanh phản hồi</span>
                <span class="text-[9px] text-slate-500">Tần số theo chiều cao cột</span>
              </div>
              <button id="btn-sound-toggle" onclick="toggleSoundEngine()" class="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full font-bold text-rose-400 hover:border-rose-900 transition flex items-center gap-1">
                <i class="fa-solid fa-volume-xmark"></i> <span>Tắt</span>
              </button>
            </div>
          </div>
        `;
  } else if (profile.details.vType === "graph") {
    parent.innerHTML = `
          <div class="space-y-3">
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Bạn đang ở môi trường cấu trúc Đồ thị/Cây. Bạn có thể tự do thêm nút, nối các cạnh và click trực tiếp vào một đỉnh tròn bất kỳ để chạy mô phỏng BFS / DFS / Dijkstra xuất phát từ đỉnh đó.
            </p>
          </div>
        `;
  } else {
    parent.innerHTML = `
          <div class="space-y-3">
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Nhấn nút Play để nạp và chạy quy trình dòng lệnh / xử lý bit / mô phỏng mã hóa thời gian thực tại màn hình terminal bên cạnh.
            </p>
          </div>
        `;
  }

  document.getElementById("lbl-complexity-time").innerText = profile.details.complexity.best;
  document.getElementById("lbl-complexity-space").innerText = profile.details.complexity.space;
  document.getElementById("algo-short-summary").innerText = profile.details.shortSummary;
}

// Populate academic dictionary sheet (Theory View)
function populateAcademicTheoryTab(profile, algoId) {
  document.getElementById("theory-title").innerHTML = `<i class="fa-solid fa-graduation-cap text-indigo-500"></i> Sổ Tay Học Thuật: ${algoId.toUpperCase().replace("_", " ")}`;
  document.getElementById("theory-subtitle").innerText = `Đầy đủ 10 tiêu chí học thuật tiêu chuẩn của giải thuật này.`;

  document.getElementById("theory-desc-concept").innerHTML = profile.details.concept;
  document.getElementById("theory-desc-conditions").innerHTML = profile.details.conditions;
  document.getElementById("theory-desc-idea").innerHTML = profile.details.idea;
  document.getElementById("theory-desc-guide").innerHTML = profile.details.guide;
  document.getElementById("theory-pseudocode").innerText = profile.details.pseudocode;

  document.getElementById("theory-code-cpp").value = profile.details.sourceCode.cpp;
  document.getElementById("theory-code-py").value = profile.details.sourceCode.python;
  document.getElementById("theory-rendered-code").innerText = profile.details.sourceCode.cpp;

  document.getElementById("theory-time-best").innerText = profile.details.complexity.best;
  document.getElementById("theory-time-avg").innerText = profile.details.complexity.avg;
  document.getElementById("theory-time-worst").innerText = profile.details.complexity.worst;
  document.getElementById("theory-space-complexity").innerText = profile.details.complexity.space;

  const appsContainer = document.getElementById("theory-apps-list");
  appsContainer.innerHTML = "";
  profile.details.apps.forEach(app => {
    const item = document.createElement("div");
    item.className = "flex gap-2 items-start";
    item.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-500 mt-1 text-[10px]"></i> <p>${app}</p>`;
    appsContainer.appendChild(item);
  });

  const exContainer = document.getElementById("theory-exercises-list");
  exContainer.innerHTML = "";
  profile.details.exercises.forEach(ex => {
    let diffColor = "bg-emerald-950 text-emerald-400 border-emerald-500/20";
    if (ex.diff === "Medium") diffColor = "bg-amber-950 text-amber-400 border-amber-500/20";
    if (ex.diff === "Hard") diffColor = "bg-rose-950 text-rose-400 border-rose-500/20";

    const row = document.createElement("div");
    row.className = "flex items-center justify-between p-2 bg-slate-900 border border-slate-850 rounded-lg text-xs";
    row.innerHTML = `
          <span class="font-semibold text-slate-200">${ex.name}</span>
          <span class="px-2 py-0.5 rounded border text-[9px] font-bold ${diffColor}">${ex.diff}</span>
        `;
    exContainer.appendChild(row);
  });
}

function updateSandboxUI() {
  if (steps.length === 0) return;
  const step = steps[currentStepIdx];

  // 1. Array Visualizer Rendering
  if (currentVisualizerType === "array") {
    const parent = document.getElementById("canvas-array");
    parent.innerHTML = "";
    const maxVal = Math.max(...steps[0].array);

    step.array.forEach((val, idx) => {
      const barWrapper = document.createElement("div");
      barWrapper.className = "flex flex-col items-center flex-grow max-w-[28px] transition-all duration-200";

      let barColor = "bg-indigo-500 shadow-md";
      const highlightRole = step.highlights[idx];

      if (highlightRole === "compare") {
        barColor = "bg-amber-500 scale-105 animate-pulse shadow-lg shadow-amber-500/10";
      } else if (highlightRole === "swap") {
        barColor = "bg-rose-500 shadow-lg shadow-rose-500/15";
      } else if (highlightRole === "sorted" || highlightRole === "match") {
        barColor = "bg-emerald-500 shadow-md";
      } else if (highlightRole === "skipped") {
        barColor = "bg-slate-950 border border-slate-850 text-slate-700 border-dashed opacity-40";
      } else if (highlightRole === "pivot") {
        barColor = "bg-purple-500 shadow-lg shadow-purple-500/15";
      }

      const pct = (val / maxVal) * 80;
      barWrapper.innerHTML = `
            <span class="text-[9px] font-bold text-slate-400 mb-1 select-none">${val}</span>
            <div class="w-full rounded-t-sm ${barColor} transition-all duration-200" style="height: ${pct}px; min-height: 4px;"></div>
          `;
      parent.appendChild(barWrapper);
    });

    if (step.highlights && Object.keys(step.highlights).length > 0) {
      const firstKey = Object.keys(step.highlights)[0];
      playAudioTone(step.array[firstKey], maxVal);
    }
  }
  // 2. DP Grid Visualizer Rendering
  else if (currentVisualizerType === "dp-grid") {
    const parent = document.getElementById("canvas-dp-grid");
    parent.innerHTML = "";
    if (step.dpTable) {
      const container = document.createElement("div");
      container.className = "flex flex-col items-center justify-center p-4 bg-slate-900 border border-slate-800 rounded-xl max-w-full overflow-auto space-y-2";

      const table = document.createElement("table");
      table.className = "border-collapse border border-slate-700 text-xs text-slate-300 mx-auto";

      if (step.dpCols) {
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const cornerCell = document.createElement("th");
        cornerCell.className = "border border-slate-700 p-2 bg-slate-950 font-bold text-slate-400";
        cornerCell.innerText = "";
        headerRow.appendChild(cornerCell);

        step.dpCols.forEach(col => {
          const th = document.createElement("th");
          th.className = "border border-slate-700 p-2 bg-slate-950 font-bold text-slate-400 min-w-[40px] text-center";
          th.innerText = col;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
      }

      const tbody = document.createElement("tbody");
      step.dpTable.forEach((row, rIdx) => {
        const tr = document.createElement("tr");

        if (step.dpRows) {
          const th = document.createElement("th");
          th.className = "border border-slate-700 p-2 bg-slate-950 font-bold text-slate-400 text-right min-w-[40px]";
          th.innerText = step.dpRows[rIdx];
          tr.appendChild(th);
        }

        row.forEach((val, cIdx) => {
          const td = document.createElement("td");
          td.className = "border border-slate-700 p-2 text-center font-semibold min-w-[40px] transition-all duration-150";
          td.innerText = val !== null ? val : "-";

          if (step.currentCell && step.currentCell[0] === rIdx && step.currentCell[1] === cIdx) {
            td.className += " bg-amber-500 text-slate-950 scale-105 animate-pulse shadow-md shadow-amber-500/20";
          } else if (step.highlights && step.highlights[`${rIdx},${cIdx}`]) {
            const hlType = step.highlights[`${rIdx},${cIdx}`];
            if (hlType === 'active') {
              td.className += " bg-indigo-600 text-white";
            } else if (hlType === 'match') {
              td.className += " bg-emerald-600 text-white";
            } else if (hlType === 'compare') {
              td.className += " bg-purple-600 text-white";
            }
          } else if (val !== null) {
            td.className += " bg-slate-800 text-emerald-400";
          }
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      container.appendChild(table);
      parent.appendChild(container);
    } else {
      parent.innerHTML = `<p class="text-slate-500 italic">Bản đồ quy hoạch động 2D đã sẵn sàng khởi tạo.</p>`;
    }
  }
  // 3. Logic Terminal Console Rendering
  else {
    const parent = document.getElementById("canvas-console");
    parent.innerHTML = `<pre class="whitespace-pre-wrap leading-relaxed">${step.consoleOut}</pre>`;
  }

  // Code trace line highlight sync
  const activeLines = document.getElementById("code-trace-viewport").querySelectorAll(".bg-indigo-600\\/30");
  activeLines.forEach(line => {
    line.classList.remove("bg-indigo-600/30", "border-l-2", "border-indigo-500", "text-white");
  });

  const currentActiveLine = document.getElementById(`code-line-${step.line}`);
  if (currentActiveLine) {
    currentActiveLine.classList.add("bg-indigo-600/30", "border-l-2", "border-indigo-500", "text-white");
  }

  // Step action narrative
  document.getElementById("step-description-text").innerHTML = `<i class="fa-solid fa-angles-right text-amber-500 mr-2 animate-bounce"></i> ${step.desc || "Tiến hành chu kỳ tính toán tiếp theo..."}`;

  // Navigation playback indices sync
  document.getElementById("lbl-step-current-num").innerText = currentStepIdx + 1;
  document.getElementById("lbl-step-total-num").innerText = steps.length;
  document.getElementById("slider-step-timeline").max = steps.length - 1;
  document.getElementById("slider-step-timeline").value = currentStepIdx;

  const pctProgress = Math.round(((currentStepIdx + 1) / steps.length) * 100);
  document.getElementById("lbl-step-progress-percent").innerText = `${pctProgress}%`;
}

function nextStep() {
  if (currentStepIdx < steps.length - 1) {
    currentStepIdx++;
    updateSandboxUI();
  } else {
    pausePlayback();
    showToast("Thuật toán đã giả lập hoàn thành!", "success");
  }
}

function prevStep() {
  if (currentStepIdx > 0) {
    currentStepIdx--;
    updateSandboxUI();
  }
}

function startPlayback() {
  if (playTimer) return;
  if (currentStepIdx >= steps.length - 1) currentStepIdx = 0;

  document.getElementById("playback-play-icon").className = "fa-solid fa-pause text-sm";
  const btn = document.getElementById("btn-playback-play");
  btn.classList.replace("bg-indigo-600", "bg-rose-600");
  btn.classList.replace("hover:bg-indigo-500", "hover:bg-rose-500");

  playTimer = setInterval(nextStep, playSpeed);
}

function pausePlayback() {
  if (!playTimer) return;
  clearInterval(playTimer);
  playTimer = null;

  document.getElementById("playback-play-icon").className = "fa-solid fa-play text-sm ml-0.5";
  const btn = document.getElementById("btn-playback-play");
  btn.classList.replace("bg-rose-600", "bg-indigo-600");
  btn.classList.replace("hover:bg-rose-500", "hover:bg-indigo-500");
}

function togglePlayback() {
  if (playTimer) pausePlayback();
  else startPlayback();
}

document.getElementById("btn-playback-play").addEventListener("click", togglePlayback);
document.getElementById("btn-playback-next").addEventListener("click", () => { pausePlayback(); nextStep(); });
document.getElementById("btn-playback-prev").addEventListener("click", () => { pausePlayback(); prevStep(); });
document.getElementById("btn-playback-first").addEventListener("click", () => { pausePlayback(); currentStepIdx = 0; updateSandboxUI(); });
document.getElementById("btn-playback-last").addEventListener("click", () => { pausePlayback(); currentStepIdx = steps.length - 1; updateSandboxUI(); });
document.getElementById("slider-step-timeline").addEventListener("input", (e) => { pausePlayback(); currentStepIdx = parseInt(e.target.value); updateSandboxUI(); });

function changePlaySpeed(val) {
  playSpeed = parseInt(val);
  document.getElementById("lbl-playground-speed").innerText = `${playSpeed}ms`;
  if (playTimer) { pausePlayback(); startPlayback(); }
}

function toggleSoundEngine() {
  isSoundOn = !isSoundOn;
  const btn = document.getElementById("btn-sound-toggle");
  if (isSoundOn) {
    btn.className = "px-3 py-1 bg-slate-950 border border-emerald-800 rounded-full font-bold text-emerald-400 hover:border-emerald-600 transition flex items-center gap-1";
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Bật</span>';
    showToast("Đã kích hoạt tần số âm thanh phản hồi!", "success");
  } else {
    btn.className = "px-3 py-1 bg-slate-950 border border-slate-800 rounded-full font-bold text-rose-400 hover:border-rose-900 transition flex items-center gap-1";
    btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>Tắt</span>';
    showToast("Đã tắt âm thanh phản hồi.");
  }
}

// Switch view modes: Playground (play) vs Theory (learn)
function switchMode(mode) {
  if (mode === 'play' && !hasPlayground(activeAlgoId)) {
    showToast("Thuật toán này hiện chỉ hỗ trợ tài liệu học thuật (Lý thuyết)!", "error");
    return;
  }

  currentMode = mode;
  const playBtn = document.getElementById("mode-play-btn");
  const learnBtn = document.getElementById("mode-learn-btn");

  const sandboxDiv = document.getElementById("sandbox-container");
  const learnDiv = document.getElementById("learn-container");

  if (mode === "play") {
    if (hasPlayground(activeAlgoId)) {
      playBtn.className = "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition bg-indigo-600 text-white shadow";
    }
    learnBtn.className = "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition text-slate-400 hover:text-slate-200";
    sandboxDiv.classList.remove("hidden");
    learnDiv.classList.add("hidden");
  } else {
    if (hasPlayground(activeAlgoId)) {
      playBtn.className = "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition text-slate-400 hover:text-slate-200";
    }
    learnBtn.className = "flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold transition bg-indigo-600 text-white shadow";
    sandboxDiv.classList.add("hidden");
    learnDiv.classList.remove("hidden");
    pausePlayback();
  }
}

// Array custom manipulation helpers
function regenerateRandomArray() {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 85) + 12);
  }
  if (activeAlgoId === "binary") {
    arr.sort((a, b) => a - b);
  }
  const profile = algorithmDatabase[activeAlgoId] || algorithmDatabase["linear"];
  steps = profile.execution.generator(arr, 32);
  currentStepIdx = 0;
  updateSandboxUI();
  showToast("Đã khởi tạo mảng ngẫu nhiên mới thành công!");
}

const modal = document.getElementById("custom-input-modal");
function openCustomInputModal() { modal.classList.remove("hidden"); }
document.getElementById("btn-modal-cancel").addEventListener("click", () => modal.classList.add("hidden"));

document.getElementById("btn-modal-submit").addEventListener("click", () => {
  const input = document.getElementById("custom-array-input").value;
  if (!input.trim()) return;
  const parsed = input.split(",").map(x => parseInt(x.trim())).filter(x => !isNaN(x));
  if (parsed.length < 5 || parsed.length > 16) {
    showToast("Chiều dài mảng phải nằm trong khoảng từ 5 đến 16 phần tử!", "error");
    return;
  }
  modal.classList.add("hidden");
  if (activeAlgoId === "binary") {
    parsed.sort((a, b) => a - b);
  }
  const profile = algorithmDatabase[activeAlgoId] || algorithmDatabase["linear"];
  steps = profile.execution.generator(parsed, 32);
  currentStepIdx = 0;
  updateSandboxUI();
  showToast("Đã áp dụng dữ liệu mảng tùy chọn thành công!", "success");
});

// Graph interactions controls
document.getElementById("btn-graph-add-node").addEventListener("click", () => {
  isAddingNodeMode = !isAddingNodeMode;
  isConnectingMode = false;
  document.getElementById("btn-graph-connect").classList.remove("bg-indigo-600");
  if (isAddingNodeMode) {
    document.getElementById("btn-graph-add-node").classList.add("bg-indigo-600");
    showToast("Hãy click vào vùng trống canvas để thả nút mới.", "info");
  } else {
    document.getElementById("btn-graph-add-node").classList.remove("bg-indigo-600");
  }
});

document.getElementById("btn-graph-connect").addEventListener("click", () => {
  isConnectingMode = !isConnectingMode;
  isAddingNodeMode = false;
  document.getElementById("btn-graph-add-node").classList.remove("bg-indigo-600");
  if (isConnectingMode) {
    document.getElementById("btn-graph-connect").classList.add("bg-indigo-600");
    showToast("Hãy bấm lần lượt vào 2 đỉnh trên sơ đồ để nối cạnh.", "info");
  } else {
    document.getElementById("btn-graph-connect").classList.remove("bg-indigo-600");
  }
});

document.getElementById("btn-graph-clear").addEventListener("click", () => {
  graphData.nodes = [];
  graphData.edges = [];
  drawInteractiveGraph();
  showToast("Đã xóa trắng toàn bộ sơ đồ.");
});

algoSearchInput.addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase().trim();

  // If there is no search query, restore regular dashboard of active mega group
  if (query === "") {
    selectMegaGroup(activeMegaGroupId);
    return;
  }

  // Override view to show all search matches across all categories
  currentView = "dashboard";
  document.getElementById("workspace-container").classList.add("hidden");
  document.getElementById("dashboard-container").classList.remove("hidden");
  document.getElementById("mode-switcher-container").classList.add("hidden");
  document.getElementById("btn-back-to-dashboard").classList.add("hidden");
  document.getElementById("breadcrumb-separator").classList.add("hidden");

  document.getElementById("workspace-title").innerHTML = `<i class="fa-solid fa-magnifying-glass text-indigo-500"></i> Kết quả tìm kiếm`;
  document.getElementById("workspace-subtitle").innerText = `Tìm kiếm tất cả giải thuật khớp với từ khóa: "${query}"`;
  document.getElementById("algo-category-badge").innerText = "TÌM KIẾM";

  const dashboard = document.getElementById("dashboard-container");
  dashboard.innerHTML = "";

  const resultsGrid = document.createElement("div");
  resultsGrid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4";
  let matchCount = 0;

  algoCategories.forEach(category => {
    category.algos.forEach(algo => {
      if (algo.name.toLowerCase().includes(query) || category.name.toLowerCase().includes(query)) {
        matchCount++;
        const isPlayable = hasPlayground(algo.id);
        let difficultyColor = "bg-emerald-950 text-emerald-400 border-emerald-500/20";
        if (algo.diff === "Medium") difficultyColor = "bg-amber-950 text-amber-400 border-amber-500/20";
        if (algo.diff === "Hard") difficultyColor = "bg-rose-950 text-rose-400 border-rose-500/20";

        const card = document.createElement("div");
        if (isPlayable) {
          card.className = "bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 transition cursor-pointer flex flex-col justify-between space-y-3 group";
        } else {
          card.className = "bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 hover:border-slate-700 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group opacity-75 hover:opacity-100";
        }

        const statusBadge = isPlayable 
          ? `<span class="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-flask-vial mr-1"></i>Chạy thử</span>`
          : `<span class="px-1.5 py-0.5 rounded bg-slate-850 text-slate-500 border border-slate-850 text-[8px] font-extrabold uppercase tracking-wider"><i class="fa-solid fa-book mr-1"></i>Lý thuyết</span>`;

        card.onclick = () => selectAlgorithm(algo.id, category.id);
        card.innerHTML = `
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded border text-[9px] font-bold ${difficultyColor}">${algo.diff}</span>
                  ${statusBadge}
                </div>
                <h5 class="text-sm font-bold text-white group-hover:text-indigo-400 transition flex items-center gap-1.5">
                  ${!isPlayable ? '<i class="fa-solid fa-lock text-slate-500 text-[10px]"></i>' : ''}
                  <span>${algo.name}</span>
                  <i class="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-0 group-hover:opacity-100 transition"></i>
                </h5>
              </div>
              <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                ${algorithmDatabase[algo.id] ? algorithmDatabase[algo.id].details.shortSummary : "Khám phá phòng thí nghiệm học thuật chuyên sâu và lý thuyết của thuật toán này."}
              </p>
            `;
        resultsGrid.appendChild(card);
      }
    });
  });

  if (matchCount > 0) {
    dashboard.appendChild(resultsGrid);
  } else {
    dashboard.innerHTML = `
          <div class="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl">
            <i class="fa-solid fa-face-frown text-4xl text-slate-600 mb-3"></i>
            <h4 class="text-sm font-bold text-slate-400">Không tìm thấy thuật toán nào khớp với từ khóa</h4>
            <p class="text-xs text-slate-500 mt-1">Hãy thử tìm với các từ khóa phổ biến khác như: Sort, Search, DP, Tree...</p>
          </div>
        `;
  }
});

function copyToClipboard(id) {
  const text = document.getElementById(id).value;
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  showToast("Đã sao chép mã nguồn mẫu thành công!", "success");
}

// Global Toast alert system
function showToast(msg, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg shadow-2xl border text-white transition duration-300 transform translate-y-2 opacity-0 pointer-events-auto`;

  if (type === "success") toast.className += " bg-emerald-950 border-emerald-500/30 text-emerald-300";
  else if (type === "error") toast.className += " bg-rose-950 border-rose-500/30 text-rose-300";
  else toast.className += " bg-indigo-950 border-indigo-500/30 text-indigo-300";

  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.remove("translate-y-2", "opacity-0"), 40);
  setTimeout(() => {
    toast.classList.add("translate-y-2", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Keyboard Shortcuts binding
document.addEventListener("keydown", (e) => {
  if (document.activeElement.tagName === "INPUT") return;
  if (currentView === "workspace") {
    if (e.code === "Space") {
      e.preventDefault();
      togglePlayback();
    } else if (e.code === "ArrowRight") {
      pausePlayback();
      nextStep();
    } else if (e.code === "ArrowLeft") {
      pausePlayback();
      prevStep();
    }
  }
});

// Window onboarding initialization loader
window.onload = function () {
  buildSidebarCategories();
  selectMegaGroup("core");
}
