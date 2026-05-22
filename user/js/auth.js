// ----------------------------------------------------
// LOCAL STORAGE / MOCK DATABASE FOR MEMBERSHIP & USER PROFILE
// ----------------------------------------------------
let usersDb = JSON.parse(localStorage.getItem('users_db')) || [
    { email: 'demo@example.com', password: '123456', name: 'Master Algo', plan: 'Free' },
    { email: 'admin', password: '123', name: 'Admin Master', plan: 'Enterprise' }
];

// Đảm bảo tài khoản admin luôn tồn tại trong DB kiểm thử
if (!usersDb.some(u => u.email === 'admin')) {
    usersDb.push({ email: 'admin', password: '123', name: 'Admin Master', plan: 'Enterprise' });
    localStorage.setItem('users_db', JSON.stringify(usersDb));
}

let currentUser = JSON.parse(localStorage.getItem('current_user')) || null;

// ----------------------------------------------------
// AUTHENTICATION LOGIC & INTERFACE CONTROLS
// ----------------------------------------------------
function syncAuthUI() {
    const loggedOutBox = document.getElementById("sidebar-auth-logged-out");
    const loggedInBox = document.getElementById("sidebar-auth-logged-in");

    if (currentUser) {
        loggedOutBox.classList.add("hidden");
        loggedInBox.classList.remove("hidden");

        document.getElementById("sidebar-user-name").innerText = currentUser.name;
        document.getElementById("sidebar-user-avatar-placeholder").innerText = currentUser.name.charAt(0).toUpperCase();

        const badge = document.getElementById("sidebar-user-badge");
        badge.innerText = currentUser.plan === 'Free' ? 'Miễn Phí' : currentUser.plan;

        if (currentUser.plan === 'Free') {
            badge.className = "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700";
        } else if (currentUser.plan === 'Pro') {
            badge.className = "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 shadow-sm";
        } else {
            badge.className = "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-purple-900/40 text-purple-300 border border-purple-500/30 shadow-sm animate-pulse";
        }
    } else {
        loggedOutBox.classList.remove("hidden");
        loggedInBox.classList.add("hidden");
    }
}

function openAuthModal(tab = 'login') {
    document.getElementById("auth-modal").classList.remove("hidden");
    toggleAuthTab(tab);
}

function closeAuthModal() {
    document.getElementById("auth-modal").classList.add("hidden");
}

function toggleAuthTab(tab) {
    const loginTabBtn = document.getElementById("auth-tab-login");
    const registerTabBtn = document.getElementById("auth-tab-register");
    const loginForm = document.getElementById("auth-form-login");
    const registerForm = document.getElementById("auth-form-register");

    if (tab === 'login') {
        loginTabBtn.className = "flex-grow pb-3 text-center text-xs font-bold border-b-2 border-indigo-500 text-indigo-400";
        registerTabBtn.className = "flex-grow pb-3 text-center text-xs font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200";
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
    } else {
        loginTabBtn.className = "flex-grow pb-3 text-center text-xs font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200";
        registerTabBtn.className = "flex-grow pb-3 text-center text-xs font-bold border-b-2 border-indigo-500 text-indigo-400";
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
    }
}

function submitLogin(e) {
    e.preventDefault();
    const email = document.getElementById("login-input-email").value.trim().toLowerCase();
    const pass = document.getElementById("login-input-password").value;

    const matchedUser = usersDb.find(u => u.email === email && u.password === pass);
    if (matchedUser) {
        currentUser = matchedUser;
        localStorage.setItem('current_user', JSON.stringify(currentUser));
        syncAuthUI();
        closeAuthModal();
        showToast(`Chào mừng bạn quay lại, ${currentUser.name}!`, "success");
        // Reload dashboard to update locks representation
        if (currentView === "dashboard") {
            renderMegaGroupDashboard(activeMegaGroupId);
        } else if (currentView === "workspace") {
            selectAlgorithm(activeAlgoId, activeCategoryId);
        }
    } else {
        showToast("Sai địa chỉ email hoặc mật khẩu bảo mật!", "error");
    }
}

function submitRegister(e) {
    e.preventDefault();
    const name = document.getElementById("register-input-name").value.trim();
    const email = document.getElementById("register-input-email").value.trim().toLowerCase();
    const pass = document.getElementById("register-input-password").value;

    if (pass.length < 6) {
        showToast("Mật khẩu bảo mật phải có độ dài tối thiểu 6 ký tự!", "error");
        return;
    }

    if (usersDb.some(u => u.email === email)) {
        showToast("Địa chỉ email này đã tồn tại trên hệ thống!", "error");
        return;
    }

    const newUser = { email, password: pass, name, plan: 'Free' };
    usersDb.push(newUser);
    localStorage.setItem('users_db', JSON.stringify(usersDb));

    currentUser = newUser;
    localStorage.setItem('current_user', JSON.stringify(currentUser));

    syncAuthUI();
    closeAuthModal();
    showToast("Đăng ký tài khoản thành công! Khởi tạo gói miễn phí.", "success");

    if (currentView === "dashboard") {
        renderMegaGroupDashboard(activeMegaGroupId);
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('current_user');
    syncAuthUI();
    showToast("Đã đăng xuất tài khoản an toàn.");
    if (currentView === "profile") {
        selectMegaGroup("core");
    } else if (currentView === "dashboard") {
        renderMegaGroupDashboard(activeMegaGroupId);
    } else if (currentView === "workspace") {
        selectAlgorithm(activeAlgoId, activeCategoryId);
    }
}
