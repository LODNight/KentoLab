
"""
DEFINITIVE REBUILD: app.js from template.html
- Clean extraction of pure app logic
- Direct patching of selectAlgorithm, selectMegaGroup, goBackToDashboard for MPA
- Adding init functions for each page
"""
import re

with open('d:/Coding_Design/Web/Mini Project/KentoLab/user/template.html', 'r', encoding='utf-8') as f:
    template = f.read()

script_blocks = re.findall(r'<script>(.*?)</script>', template, re.DOTALL)
main_script = max(script_blocks, key=len)

# Remove window.onload at end
onload_marker = '    // Window onboarding initialization loader'
onload_idx = main_script.rfind(onload_marker)
core_script = main_script[:onload_idx].rstrip() if onload_idx != -1 else main_script.rstrip()

# Extract only the pure app section (skip auth/payment/profile/components at start)
app_start_marker = '    // List of officially supported interactive simulation algorithms'
app_start = core_script.find(app_start_marker)
pure_app = core_script[app_start:]

# Inject DOM Safety Helpers at the top
DOM_HELPERS_JS = '''
    // =============================================================================
    // KENTOLAB DOM SAFETY HELPERS
    // =============================================================================
    function safeAddClass(elementIdOrEl, className) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.classList.add(className);
    }
    function safeRemoveClass(elementIdOrEl, className) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.classList.remove(className);
    }
    function safeSetHTML(elementIdOrEl, html) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.innerHTML = html;
    }
    function safeSetText(elementIdOrEl, text) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.innerText = text;
    }
    function safeSetValue(elementIdOrEl, value) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.value = value;
    }
    function safeSetDisabled(elementIdOrEl, disabled) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.disabled = disabled;
    }
    function safeSetClassName(elementIdOrEl, className) {
      const el = typeof elementIdOrEl === 'string' ? document.getElementById(elementIdOrEl) : elementIdOrEl;
      if (el) el.className = className;
    }

'''
pure_app = DOM_HELPERS_JS + pure_app

# ─── PATCH 1: selectAlgorithm - add MPA redirect & DOM safety helpers ────────
sa_start = pure_app.find('function selectAlgorithm(')
if sa_start != -1:
    sa_end = pure_app.find('function loadDynamicSandboxParameters', sa_start)
    if sa_end != -1:
        func_block = pure_app[sa_start:sa_end]
        last_brace = func_block.rfind('}')
        if last_brace != -1:
            old_sa_full = func_block[:last_brace+1]
            new_sa_full = '''function selectAlgorithm(algoId, catId) {
      // MPA: if not on algorithm.html, navigate there
      if (!window.location.pathname.endsWith('algorithm.html')) {
        window.location.href = 'algorithm.html?algo=' + algoId + '&cat=' + catId;
        return;
      }
      activeAlgoId = algoId;
      activeCategoryId = catId;
      currentView = "workspace";
      pausePlayback();

      // Check premium unlock state
      const isPlayable = hasPlayground(algoId);
      const isUnlocked = isPlayable || (currentUser && currentUser.plan !== 'Free');

      // Mode Switcher Controls
      if (isPlayable) {
        safeSetDisabled("mode-play-btn", false);
        safeSetClassName("mode-play-btn", `flex items-center gap-1.5 px-3 py-1 text-xs font-semibold transition ${currentMode === 'play' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'} rounded`);
        safeSetHTML("mode-play-btn", `<i class="fa-solid fa-flask-vial"></i> <span>Chạy Thử</span>`);
      } else {
        // Disabled style showing lock
        safeSetDisabled("mode-play-btn", true);
        safeSetClassName("mode-play-btn", "flex items-center gap-1.5 px-3 py-1 text-xs font-semibold transition bg-slate-900 text-slate-600 rounded cursor-not-allowed opacity-45");
        safeSetHTML("mode-play-btn", `<i class="fa-solid fa-lock text-[10px] mr-1"></i> <span>Chạy Thử</span>`);
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
          category: catId,
          vType: "console",
          best: "O(log n)", avg: "O(n)", worst: "O(n)", space: "O(1)",
          shortSummary: `Học thuật và trực quan lý thuyết của thuật toán ${algoObj.name}.`,
          concept: `Thuật toán ${algoObj.name} là một giải pháp thiết kế thông minh vượt trội trong lĩnh vực cấu trúc dữ liệu và giải thuật khoa học máy tính này.`,
          conditions: "Đầu vào đồng nhất, cấu trúc lưu trữ tương thích để phát huy tối đa lợi thế tính toán lý thuyết.",
          idea: `Tổ chức logic phân chia, lặp cấu trúc để xử lý tuần tự mà không tạo ra các không gian bộ nhớ thừa thãi.`,
          guide: "Mô hình này hiện chỉ hỗ trợ sổ tay lý thuyết chi tiết để bảo đảm sự tập trung lý thuyết tốt nhất.",
          pseudocode: `procedure ${algoId}(data)\\n  // Phác thảo các bước thực thi mẫu\\n  for each item in data do\\n    process(item)\\nend procedure`,
          codeCpp: `// Phiên bản mã nguồn mẫu chuẩn C++\\n#include <iostream>\\n\\nvoid runAlgorithm() {\\n    std::cout << "Algorithm ${algoObj.name} is running..." << std::endl;\\n}`,
          codePy: `# Phiên bản mã nguồn mẫu chuẩn Python\\ndef run_algorithm():\\n    print("Algorithm ${algoObj.name} is running...")`,
          apps: ["Chuẩn hóa và tối ưu hóa hệ thống dữ liệu liên quan.", "Đóng vai trò nền tảng cho các lớp tính toán nâng cao."],
          exercises: [{ name: `LeetCode - Thử thách học thuật ${algoObj.name}`, diff: "Medium" }],
          codeTrace: [
            { num: 1, text: "Khởi tạo dữ liệu gốc" },
            { num: 2, text: "for each item in list do" },
            { num: 3, text: "  process(item)" }
          ],
          generator: function (arr) {
            return [
              { consoleOut: `Khởi chạy Terminal giả lập cho thuật toán: [${algoObj.name}].\\nĐang tiền xử lý dữ liệu...`, line: 1 },
              { consoleOut: "Phân tích cấu trúc mảng đầu vào:\\n" + JSON.stringify(arr), line: 2 },
              { consoleOut: "Bước 1: Chạy bộ máy tối ưu tính toán...", line: 3 },
              { consoleOut: "Trạng thái máy ảo: Sẵn sàng (OK).", line: 3 },
              { consoleOut: "Cập nhật kết quả thành công hoàn tất dữ liệu mẫu!", line: 1 }
            ];
          }
        };
      }

      currentVisualizerType = profile.vType;

      // Update Top breadcrumb UI
      safeRemoveClass("btn-back-to-dashboard", "hidden");
      safeRemoveClass("breadcrumb-separator", "hidden");
      const catFound = algoCategories.find(c => c.id === catId);
      if (catFound) safeSetText("algo-category-badge", catFound.name);
      safeSetHTML("workspace-title", `<i class="fa-solid fa-cube text-indigo-500 animate-pulse"></i> ` + algoId.toUpperCase().replace("_", " "));
      safeSetText("workspace-subtitle", profile.shortSummary);

      // Mode Switcher display
      safeRemoveClass("mode-switcher-container", "hidden");

      // Handle Sandbox layout swap
      safeAddClass("canvas-array", "hidden");
      safeAddClass("canvas-graph", "hidden");
      safeAddClass("canvas-dp-grid", "hidden");
      safeAddClass("canvas-console", "hidden");

      if (profile.vType === "array") {
        safeRemoveClass("canvas-array", "hidden");
      } else if (profile.vType === "graph") {
        safeRemoveClass("canvas-graph", "hidden");
        drawInteractiveGraph();
      } else if (profile.vType === "dp-grid") {
        safeRemoveClass("canvas-dp-grid", "hidden");
      } else {
        safeRemoveClass("canvas-console", "hidden");
      }

      // Hide or show playback control bar
      if (profile.vType === 'graph') {
        safeAddClass("playback-controls-bar", "hidden");
      } else {
        safeRemoveClass("playback-controls-bar", "hidden");
      }

      // Load Control parameters
      loadDynamicSandboxParameters(profile);

      // Setup timeline steps
      const initialArray = [45, 12, 85, 32, 78, 22, 60, 18, 92, 50];
      if (algoId === "binary") {
        initialArray.sort((a, b) => a - b);
      }
      steps = profile.generator(initialArray, 32);
      currentStepIdx = 0;

      // Populate theory sheet
      populateAcademicTheoryTab(profile, algoId);

      // Render pseudocode lines
      renderCodeTrace(profile.codeTrace);

      // Reset view modes
      switchMode(currentMode);

      // Show workspace view, hide dashboard & profile
      safeAddClass("dashboard-container", "hidden");
      safeAddClass("profile-container", "hidden");
      safeRemoveClass("workspace-container", "hidden");

      // Enable/Disable overlay locks based on membership status
      if (isUnlocked) {
        safeAddClass("academy-lock-overlay", "hidden");
      } else {
        safeRemoveClass("academy-lock-overlay", "hidden");
      }

      updateSandboxUI();
    }'''
            pure_app = pure_app.replace(old_sa_full, new_sa_full)
            print("Patched entire selectAlgorithm with safe helpers and MPA redirect")
        else:
            print("WARNING: selectAlgorithm last brace not found")
    else:
        print("WARNING: selectAlgorithm sa_end not found")
else:
    print("WARNING: selectAlgorithm start not found")

# ─── PATCH 2: selectMegaGroup - add MPA redirect & DOM safety helpers ────────
smg_start = pure_app.find('function selectMegaGroup(')
if smg_start != -1:
    smg_end = pure_app.find('function goBackToDashboard', smg_start)
    if smg_end != -1:
        func_block = pure_app[smg_start:smg_end]
        last_brace = func_block.rfind('}')
        if last_brace != -1:
            old_smg_full = func_block[:last_brace+1]
            new_smg_full = '''function selectMegaGroup(groupId) {
      // MPA: if not on index.html, navigate there
      if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html?mega=' + groupId;
        return;
      }
      activeMegaGroupId = groupId;
      currentView = "dashboard";
      pausePlayback();

      // Update Sidebar UI highlights
      buildSidebarCategories();

      // Render Dashboard Content
      renderMegaGroupDashboard(groupId);

      // Hide workspace & profile, show dashboard
      safeAddClass("workspace-container", "hidden");
      safeAddClass("profile-container", "hidden");
      safeRemoveClass("dashboard-container", "hidden");

      safeAddClass("mode-switcher-container", "hidden");
      safeAddClass("btn-back-to-dashboard", "hidden");
      safeAddClass("breadcrumb-separator", "hidden");

      // Simplified Breadcrumb Header (Removes duplication from screenshot)
      safeSetHTML("workspace-title", `<i class="fa-solid fa-graduation-cap text-indigo-500 mr-1"></i> Không Gian Học Tập`);
      safeSetText("workspace-subtitle", "Lựa chọn một chuyên đề học thuật bên dưới để khám phá phòng thí nghiệm trực quan sinh động.");
      safeSetText("algo-category-badge", "TỔNG QUAN");
    }'''
            pure_app = pure_app.replace(old_smg_full, new_smg_full)
            print("Patched entire selectMegaGroup with safe helpers and MPA redirect")
        else:
            print("WARNING: selectMegaGroup last brace not found")
    else:
        print("WARNING: selectMegaGroup end not found")
else:
    print("WARNING: selectMegaGroup start not found")

# ─── PATCH 3: goBackToDashboard - add MPA redirect ────────────────────────────
OLD_GBD = '''    function goBackToDashboard() {
      selectMegaGroup(activeMegaGroupId);
    }'''

NEW_GBD = '''    function goBackToDashboard() {
      if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html?mega=' + activeMegaGroupId;
        return;
      }
      selectMegaGroup(activeMegaGroupId);
    }'''

if OLD_GBD in pure_app:
    pure_app = pure_app.replace(OLD_GBD, NEW_GBD)
    print("Patched goBackToDashboard with MPA redirect")
else:
    print("WARNING: goBackToDashboard pattern not found exactly")

# ─── PATCH 4: openProfilePage - add MPA redirect & DOM safety helpers ────────
opp_start = pure_app.find('function openProfilePage(')
if opp_start != -1:
    opp_end = pure_app.find('function handleUpdateProfile', opp_start)
    if opp_end != -1:
        func_block = pure_app[opp_start:opp_end]
        last_brace = func_block.rfind('}')
        if last_brace != -1:
            old_opp_full = func_block[:last_brace+1]
            new_opp_full = '''function openProfilePage() {
      if (!currentUser) {
        showToast("Vui lòng đăng nhập để truy cập trang cá nhân!", "error");
        openAuthModal('login');
        return;
      }
      // MPA: if not on profile.html, navigate there
      if (!window.location.pathname.endsWith('profile.html')) {
        window.location.href = 'profile.html';
        return;
      }
      pausePlayback();
      currentView = "profile";

      // Hide dashboards & workspace, show Profile View
      safeAddClass("dashboard-container", "hidden");
      safeAddClass("workspace-container", "hidden");
      safeRemoveClass("profile-container", "hidden");

      safeAddClass("mode-switcher-container", "hidden");
      safeRemoveClass("btn-back-to-dashboard", "hidden");
      safeRemoveClass("breadcrumb-separator", "hidden");

      // Breadcrumbs Update
      safeSetText("algo-category-badge", "TÀI KHOẢN THÀNH VIÊN");
      safeSetHTML("workspace-title", `<i class="fa-solid fa-user-gear text-indigo-500"></i> Quản Trị Tài Khoản`);
      safeSetText("workspace-subtitle", "Tùy biến hồ sơ định danh, theo dõi nâng cấp dịch vụ.");

      // Load values into Profile Page
      safeSetText("profile-avatar-large", currentUser.name.charAt(0).toUpperCase());
      safeSetText("profile-lbl-name", currentUser.name);
      safeSetText("profile-lbl-email", currentUser.email);

      const planBadge = document.getElementById("profile-lbl-plan");
      if (planBadge) {
        planBadge.innerText = currentUser.plan === 'Free' ? 'Miễn Phí' : currentUser.plan;
        if (currentUser.plan === 'Free') {
          planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-850 text-slate-400 border border-slate-700";
          safeRemoveClass("profile-upgrade-btn", "hidden");
        } else if (currentUser.plan === 'Pro') {
          planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-900/40 text-indigo-300 border border-indigo-500/30";
          safeAddClass("profile-upgrade-btn", "hidden");
        } else {
          planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-900/40 text-purple-300 border border-purple-500/30";
          safeAddClass("profile-upgrade-btn", "hidden");
        }
      }

      // Input Prefills
      safeSetValue("profile-input-name", currentUser.name);
      safeSetValue("profile-input-email", currentUser.email);

      // Reset sensitive password forms
      safeSetValue("profile-input-old-pass", "");
      safeSetValue("profile-input-new-pass", "");
    }'''
            pure_app = pure_app.replace(old_opp_full, new_opp_full)
            print("Patched entire openProfilePage with safe helpers and MPA redirect")
        else:
            print("WARNING: openProfilePage last brace not found")
    else:
        print("WARNING: openProfilePage end not found")
else:
    print("WARNING: openProfilePage start not found")

# ─── PATCH 5: buildSidebarCategories - add null guard ──────────────────────────
OLD_BSC = '''    function buildSidebarCategories() {
      const container = document.getElementById("sidebar-nav-container");
      container.innerHTML = "";'''

NEW_BSC = '''    function buildSidebarCategories() {
      const container = document.getElementById("sidebar-nav-container");
      if (!container) return;
      container.innerHTML = "";'''

if OLD_BSC in pure_app:
    pure_app = pure_app.replace(OLD_BSC, NEW_BSC)
    print("Patched buildSidebarCategories with null guard")
else:
    print("WARNING: buildSidebarCategories exact pattern not found")
    # Try alternate (might have been already patched)
    BSC_CHECK = 'function buildSidebarCategories()'
    if BSC_CHECK in pure_app:
        print("  buildSidebarCategories exists but pattern differs")

# ─── PATCH 6: renderMegaGroupDashboard - add null guard ──────────────────────
OLD_RMD_DASH = '''      const dashboard = document.getElementById("dashboard-container");
      dashboard.innerHTML = "";'''

NEW_RMD_DASH = '''      const dashboard = document.getElementById("dashboard-container");
      if (!dashboard) return;
      dashboard.innerHTML = "";'''

if OLD_RMD_DASH in pure_app:
    pure_app = pure_app.replace(OLD_RMD_DASH, NEW_RMD_DASH, 1)
    print("Patched renderMegaGroupDashboard with null guard")
else:
    print("WARNING: renderMegaGroupDashboard dashboard pattern not found")

# ─── PATCH 7: Remove svgGraph top-level const + addEventListener ──────────────
# Replace with lazy getter
SVG_TOPLINE = '    const svgGraph = document.getElementById("visualizer-svg-graph");'
if SVG_TOPLINE in pure_app:
    # Find the whole block including svgGraph.addEventListener
    svg_start = pure_app.find(SVG_TOPLINE)
    # Find end: after the svgGraph.addEventListener block (closing });)
    search_from = svg_start + len(SVG_TOPLINE)
    svg_listener_end = pure_app.find('\n    function drawInteractiveGraph', search_from)
    if svg_listener_end != -1:
        svg_block = pure_app[svg_start:svg_listener_end]
        # Replace with getter only
        pure_app = pure_app.replace(
            svg_block,
            '    function getSvgGraph() { return document.getElementById("visualizer-svg-graph"); }\n\n'
        )
        print("Removed svgGraph top-level block, replaced with getter")
    else:
        print("WARNING: Could not find end of svgGraph block")
else:
    print("svgGraph top-level const not found (may already be fixed)")

# ─── PATCH 8: Remove sidebar top-level DOM refs ───────────────────────────────
OLD_SIDEBAR_BLOCK = '''    const mainSidebar = document.getElementById("main-sidebar");
    const sidebarToggleDesktop = document.getElementById("sidebar-toggle-desktop");
    const sidebarToggleIcon = document.getElementById("sidebar-toggle-icon");
    const sidebarToggleMobile = document.getElementById("sidebar-toggle-mobile");
    const sidebarNavContainer = document.getElementById("sidebar-nav-container");
    const algoSearchInput = document.getElementById("algo-search-input");'''

if OLD_SIDEBAR_BLOCK in pure_app:
    pure_app = pure_app.replace(OLD_SIDEBAR_BLOCK,
        '    // Sidebar DOM refs resolved lazily after loadSharedComponents()')
    print("Removed top-level sidebar DOM refs")
else:
    print("WARNING: Old sidebar block not found (may already be fixed or different)")

print(f"\nFinal pure_app length: {len(pure_app)} chars")

# ─── BUILD FINAL app.js ───────────────────────────────────────────────────────
MPA_ROUTING = '''

// =============================================================================
// KENTOLAB MPA ROUTING - Page-specific initialization
// =============================================================================

// Lazy getters for sidebar DOM elements (injected by loadSharedComponents)
function getMainSidebar() { return document.getElementById("main-sidebar"); }
function getSidebarToggleDesktop() { return document.getElementById("sidebar-toggle-desktop"); }
function getSidebarToggleIcon() { return document.getElementById("sidebar-toggle-icon"); }
function getSidebarToggleMobile() { return document.getElementById("sidebar-toggle-mobile"); }
function getSidebarNavContainer() { return document.getElementById("sidebar-nav-container"); }
function getAlgoSearchInput() { return document.getElementById("algo-search-input"); }

// Wire up sidebar toggle buttons - called AFTER loadSharedComponents()
var _sidebarCollapsed = false;
function initSidebarEvents() {
    var mainSidebar = getMainSidebar();
    var btnDesktop = getSidebarToggleDesktop();
    var btnIcon = getSidebarToggleIcon();
    var btnMobile = getSidebarToggleMobile();
    var navContainer = getSidebarNavContainer();
    var searchInput = getAlgoSearchInput();

    if (btnDesktop) {
        btnDesktop.addEventListener("click", function() {
            _sidebarCollapsed = !_sidebarCollapsed;
            if (mainSidebar) {
                if (_sidebarCollapsed) {
                    mainSidebar.classList.add("sidebar-collapsed");
                    if (btnIcon) btnIcon.className = "fa-solid fa-angles-right text-xs";
                } else {
                    mainSidebar.classList.remove("sidebar-collapsed");
                    if (btnIcon) btnIcon.className = "fa-solid fa-angles-left text-xs";
                }
            }
        });
    }
    if (btnMobile && navContainer) {
        btnMobile.addEventListener("click", function() {
            navContainer.classList.toggle("hidden");
        });
    }
    if (searchInput) {
        searchInput.addEventListener("input", handleAlgoSearch);
    }
}

function handleAlgoSearch(e) {
    var query = e.target.value.toLowerCase().trim();
    if (query === "") {
        selectMegaGroup(activeMegaGroupId);
        return;
    }
    currentView = "dashboard";
    var dashboard = document.getElementById("dashboard-container");
    if (!dashboard) return;
    document.getElementById("workspace-container") && document.getElementById("workspace-container").classList.add("hidden");
    document.getElementById("profile-container") && document.getElementById("profile-container").classList.add("hidden");
    document.getElementById("dashboard-container") && document.getElementById("dashboard-container").classList.remove("hidden");

    dashboard.innerHTML = "";
    var resultsGrid = document.createElement("div");
    resultsGrid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4";
    var matchCount = 0;

    algoCategories.forEach(function(category) {
        category.algos.forEach(function(algo) {
            if (algo.name.toLowerCase().includes(query) || category.name.toLowerCase().includes(query)) {
                matchCount++;
                var isPlayable = hasPlayground(algo.id);
                var isUnlocked = isPlayable || (currentUser && currentUser.plan !== 'Free');
                var diffColor = "bg-emerald-950 text-emerald-400 border-emerald-500/20";
                if (algo.diff === "Medium") diffColor = "bg-amber-950 text-amber-400 border-amber-500/20";
                if (algo.diff === "Hard") diffColor = "bg-rose-950 text-rose-400 border-rose-500/20";

                var card = document.createElement("div");
                card.className = isUnlocked
                    ? "bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/50 transition cursor-pointer flex flex-col justify-between space-y-3 group"
                    : "bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 transition cursor-pointer flex flex-col justify-between space-y-3 group opacity-75";
                card.onclick = function() {
                    if (!isUnlocked) { openPaymentModal(); }
                    else { selectAlgorithm(algo.id, category.id); }
                };
                card.innerHTML = '<div class="space-y-1"><div class="flex items-center justify-between">'
                    + '<span class="px-2 py-0.5 rounded border text-[9px] font-bold ' + diffColor + '">' + algo.diff + '</span></div>'
                    + '<h5 class="text-sm font-bold text-white">' + algo.name + '</h5></div>';
                resultsGrid.appendChild(card);
            }
        });
    });

    if (matchCount > 0) {
        dashboard.appendChild(resultsGrid);
    } else {
        dashboard.innerHTML = '<div class="text-center p-12 bg-slate-900 border border-slate-800 rounded-2xl">'
            + '<i class="fa-solid fa-face-frown text-4xl text-slate-600 mb-3"></i>'
            + '<h4 class="text-sm font-bold text-slate-400">Không tìm thấy thuật toán khớp với từ khóa</h4></div>';
    }
}

// Wire up workspace-specific event listeners - called only on algorithm.html
function initWorkspaceEvents() {
    var btnPlay = document.getElementById("btn-playback-play");
    var btnNext = document.getElementById("btn-playback-next");
    var btnPrev = document.getElementById("btn-playback-prev");
    var btnFirst = document.getElementById("btn-playback-first");
    var btnLast = document.getElementById("btn-playback-last");
    var slider = document.getElementById("slider-step-timeline");
    var modal = document.getElementById("custom-input-modal");
    var btnCancel = document.getElementById("btn-modal-cancel");
    var btnSubmit = document.getElementById("btn-modal-submit");
    var btnAddNode = document.getElementById("btn-graph-add-node");
    var btnConnect = document.getElementById("btn-graph-connect");
    var btnClear = document.getElementById("btn-graph-clear");
    var svgGraph = getSvgGraph();

    if (btnPlay) btnPlay.addEventListener("click", togglePlayback);
    if (btnNext) btnNext.addEventListener("click", function() { pausePlayback(); nextStep(); });
    if (btnPrev) btnPrev.addEventListener("click", function() { pausePlayback(); prevStep(); });
    if (btnFirst) btnFirst.addEventListener("click", function() { pausePlayback(); currentStepIdx = 0; updateSandboxUI(); });
    if (btnLast) btnLast.addEventListener("click", function() { pausePlayback(); currentStepIdx = steps.length - 1; updateSandboxUI(); });
    if (slider) slider.addEventListener("input", function(e) { pausePlayback(); currentStepIdx = parseInt(e.target.value); updateSandboxUI(); });

    if (btnCancel) btnCancel.addEventListener("click", function() { if (modal) modal.classList.add("hidden"); });
    if (btnSubmit) btnSubmit.addEventListener("click", function() {
        var inputEl = document.getElementById("custom-array-input");
        if (!inputEl || !inputEl.value.trim()) return;
        var parsed = inputEl.value.split(",").map(function(x) { return parseInt(x.trim()); }).filter(function(x) { return !isNaN(x); });
        if (parsed.length < 5 || parsed.length > 16) { showToast("Mảng phải từ 5-16 phần tử!", "error"); return; }
        if (modal) modal.classList.add("hidden");
        if (activeAlgoId === "binary") parsed.sort(function(a, b) { return a - b; });
        var profile = algorithmDatabase[activeAlgoId] || algorithmDatabase["linear"];
        steps = profile.generator(parsed, 32);
        currentStepIdx = 0;
        updateSandboxUI();
        showToast("Đã nạp mảng tùy chỉnh!", "success");
    });

    if (btnAddNode) btnAddNode.addEventListener("click", function() {
        isAddingNodeMode = true;
        btnAddNode.classList.add("bg-indigo-600", "text-white");
        if (btnConnect) btnConnect.classList.remove("bg-indigo-600");
        showToast("Nhấp canvas để thêm nút.");
    });
    if (btnConnect) btnConnect.addEventListener("click", function() {
        isConnectingMode = !isConnectingMode;
        if (isConnectingMode) {
            btnConnect.classList.add("bg-indigo-600");
            showToast("Nhấp lần lượt 2 nút để kết nối.");
        } else {
            btnConnect.classList.remove("bg-indigo-600");
        }
    });
    if (btnClear) btnClear.addEventListener("click", function() {
        graphData.nodes = []; graphData.edges = [];
        drawInteractiveGraph(); showToast("Đã xóa sơ đồ.");
    });
    if (svgGraph) svgGraph.addEventListener("click", function(e) {
        if (!isAddingNodeMode) return;
        var rect = svgGraph.getBoundingClientRect();
        var x = e.clientX - rect.left, y = e.clientY - rect.top;
        if (x < 20 || x > rect.width - 20 || y < 20 || y > rect.height - 20) return;
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var chosen = "N";
        for (var i = 0; i < letters.length; i++) {
            if (!graphData.nodes.find(function(n) { return n.id === letters[i]; })) { chosen = letters[i]; break; }
        }
        graphData.nodes.push({ id: chosen, x: x, y: y });
        drawInteractiveGraph();
        showToast("Đã thêm nút '" + chosen + "'!", "success");
        isAddingNodeMode = false;
        if (btnAddNode) btnAddNode.classList.remove("bg-indigo-600", "text-white");
    });
}

// ─── Page init functions ─────────────────────────────────────────────────────

function initDashboard() {
    currentView = 'dashboard';
    loadSharedComponents();
    initSidebarEvents();
    syncAuthUI();
    buildSidebarCategories();
    var params = new URLSearchParams(window.location.search);
    var mega = params.get('mega') || 'core';
    activeMegaGroupId = mega;
    selectMegaGroup(mega);
}

function initAlgorithm() {
    currentView = 'workspace';
    loadSharedComponents();
    initSidebarEvents();
    initWorkspaceEvents();
    syncAuthUI();
    buildSidebarCategories();
    var params = new URLSearchParams(window.location.search);
    var algo = params.get('algo') || 'binary';
    var cat = params.get('cat') || 'searching';
    selectAlgorithm(algo, cat);
}

function initProfile() {
    currentView = 'profile';
    loadSharedComponents();
    initSidebarEvents();
    syncAuthUI();
    buildSidebarCategories();
    if (typeof renderProfileData === 'function') renderProfileData();
    else if (typeof openProfilePage === 'function') openProfilePage();
}
'''

final_app_js = pure_app + MPA_ROUTING

with open('d:/Coding_Design/Web/Mini Project/KentoLab/user/js/app.js', 'w', encoding='utf-8') as f:
    f.write(final_app_js)

print(f"\nWrote app.js: {len(final_app_js)} chars")

# ─── Update HTML pages ────────────────────────────────────────────────────────
# index.html: call initDashboard() (which itself calls loadSharedComponents etc)
INDEX_INLINE = '''  <script src="js/auth.js?v=1.0.1"></script>
  <script src="js/payment.js?v=1.0.1"></script>
  <script src="js/profile.js?v=1.0.1"></script>
  <script src="js/components.js?v=1.0.1"></script>
  <script src="js/app.js?v=1.0.1"></script>
  <script>
    initDashboard();
  </script>
</body>
</html>'''

with open('d:/Coding_Design/Web/Mini Project/KentoLab/user/index.html', 'r', encoding='utf-8') as f:
    idx_html = f.read()

# Replace script section
old_scripts_start = idx_html.find('<script src="js/')
if old_scripts_start != -1:
    # Go back to find the whitespace before the script block
    while old_scripts_start > 0 and idx_html[old_scripts_start-1] in ' \n\r\t':
        old_scripts_start -= 1
    new_idx_html = idx_html[:old_scripts_start] + '\n' + INDEX_INLINE
    with open('d:/Coding_Design/Web/Mini Project/KentoLab/user/index.html', 'w', encoding='utf-8') as f:
        f.write(new_idx_html)
    print("Updated index.html")

# algorithm.html: call initAlgorithm()
with open('d:/Coding_Design/Web/Mini Project/KentoLab/user/algorithm.html', 'r', encoding='utf-8') as f:
    algo_html = f.read()

old_scripts_start = algo_html.find('<script src="js/')
if old_scripts_start != -1:
    while old_scripts_start > 0 and algo_html[old_scripts_start-1] in ' \n\r\t':
        old_scripts_start -= 1
    ALGO_INLINE = '''  <script src="js/auth.js?v=1.0.1"></script>
  <script src="js/payment.js?v=1.0.1"></script>
  <script src="js/profile.js?v=1.0.1"></script>
  <script src="js/components.js?v=1.0.1"></script>
  <script src="js/app.js?v=1.0.1"></script>
  <script>
    initAlgorithm();
  </script>
</body>
</html>'''
    new_algo_html = algo_html[:old_scripts_start] + '\n' + ALGO_INLINE
    with open('d:/Coding_Design/Web/Mini Project/KentoLab/user/algorithm.html', 'w', encoding='utf-8') as f:
        f.write(new_algo_html)
    print("Updated algorithm.html")

# profile.html: call initProfile()
with open('d:/Coding_Design/Web/Mini Project/KentoLab/user/profile.html', 'r', encoding='utf-8') as f:
    profile_html = f.read()

old_scripts_start = profile_html.find('<script src="js/')
if old_scripts_start != -1:
    while old_scripts_start > 0 and profile_html[old_scripts_start-1] in ' \n\r\t':
        old_scripts_start -= 1
    PROFILE_INLINE = '''  <script src="js/auth.js?v=1.0.1"></script>
  <script src="js/payment.js?v=1.0.1"></script>
  <script src="js/profile.js?v=1.0.1"></script>
  <script src="js/components.js?v=1.0.1"></script>
  <script src="js/app.js?v=1.0.1"></script>
  <script>
    initProfile();
  </script>
</body>
</html>'''
    new_profile_html = profile_html[:old_scripts_start] + '\n' + PROFILE_INLINE
    with open('d:/Coding_Design/Web/Mini Project/KentoLab/user/profile.html', 'w', encoding='utf-8') as f:
        f.write(new_profile_html)
    print("Updated profile.html")

print("\nAll done! app.js rebuilt and HTML pages updated.")
