// ----------------------------------------------------
// PROFILE MANAGEMENT PANEL
// ----------------------------------------------------
function openProfilePage() {
    if (!currentUser) {
        showToast("Vui lòng đăng nhập để truy cập trang cá nhân!", "error");
        openAuthModal('login');
        return;
    }
    if (typeof pausePlayback === 'function') pausePlayback();
    currentView = "profile";

    // Hide dashboards & workspace, show Profile View
    document.getElementById("dashboard-container").classList.add("hidden");
    document.getElementById("workspace-container").classList.add("hidden");
    document.getElementById("profile-container").classList.remove("hidden");

    document.getElementById("mode-switcher-container").classList.add("hidden");
    document.getElementById("btn-back-to-dashboard").classList.remove("hidden");
    document.getElementById("breadcrumb-separator").classList.remove("hidden");

    // Breadcrumbs Update
    document.getElementById("algo-category-badge").innerText = "TÀI KHOẢN THÀNH VIÊN";
    document.getElementById("workspace-title").innerHTML = `<i class="fa-solid fa-user-gear text-indigo-500"></i> Quản Trị Tài Khoản`;
    document.getElementById("workspace-subtitle").innerText = "Tùy biến hồ sơ định danh, theo dõi nâng cấp dịch vụ.";

    // Load values into Profile Page
    document.getElementById("profile-avatar-large").innerText = currentUser.name.charAt(0).toUpperCase();
    document.getElementById("profile-lbl-name").innerText = currentUser.name;
    document.getElementById("profile-lbl-email").innerText = currentUser.email;

    const planBadge = document.getElementById("profile-lbl-plan");
    planBadge.innerText = currentUser.plan === 'Free' ? 'Miễn Phí' : currentUser.plan;
    if (currentUser.plan === 'Free') {
        planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-850 text-slate-400 border border-slate-700";
        document.getElementById("profile-upgrade-btn").classList.remove("hidden");
    } else if (currentUser.plan === 'Pro') {
        planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-900/40 text-indigo-300 border border-indigo-500/30";
        document.getElementById("profile-upgrade-btn").classList.add("hidden");
    } else {
        planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-900/40 text-purple-300 border border-purple-500/30";
        document.getElementById("profile-upgrade-btn").classList.add("hidden");
    }

    // Input Prefills
    document.getElementById("profile-input-name").value = currentUser.name;
    document.getElementById("profile-input-email").value = currentUser.email;

    // Reset sensitive password forms
    document.getElementById("profile-input-old-pass").value = "";
    document.getElementById("profile-input-new-pass").value = "";
}

function handleUpdateProfile(e) {
    e.preventDefault();
    if (!currentUser) return;

    const newName = document.getElementById("profile-input-name").value.trim();
    if (!newName) return;

    currentUser.name = newName;
    localStorage.setItem('current_user', JSON.stringify(currentUser));

    const idx = usersDb.findIndex(u => u.email === currentUser.email);
    if (idx !== -1) {
        usersDb[idx].name = newName;
        localStorage.setItem('users_db', JSON.stringify(usersDb));
    }

    syncAuthUI();
    openProfilePage();
    showToast("Cập nhật thông tin họ tên thành công!", "success");
}

function handleUpdateEmail(e) {
    e.preventDefault();
    if (!currentUser) return;

    const newEmail = document.getElementById("profile-input-email").value.trim().toLowerCase();
    if (!newEmail) return;

    if (newEmail === currentUser.email) {
        showToast("Địa chỉ email trùng lặp với email hiện tại của tài khoản!", "error");
        return;
    }

    if (usersDb.some(u => u.email === newEmail)) {
        showToast("Địa chỉ email mới đã tồn tại trên một tài khoản khác!", "error");
        return;
    }

    const oldEmail = currentUser.email;
    currentUser.email = newEmail;
    localStorage.setItem('current_user', JSON.stringify(currentUser));

    const idx = usersDb.findIndex(u => u.email === oldEmail);
    if (idx !== -1) {
        usersDb[idx].email = newEmail;
        localStorage.setItem('users_db', JSON.stringify(usersDb));
    }

    syncAuthUI();
    openProfilePage();
    showToast("Thay đổi địa chỉ email liên hệ thành công!", "success");
}

function handleUpdatePassword(e) {
    e.preventDefault();
    if (!currentUser) return;

    const oldPass = document.getElementById("profile-input-old-pass").value;
    const newPass = document.getElementById("profile-input-new-pass").value;

    if (oldPass !== currentUser.password) {
        showToast("Xác thực thất bại: Mật khẩu hiện tại không chính xác!", "error");
        return;
    }

    if (newPass.length < 6) {
        showToast("Mật khẩu bảo mật mới phải tối thiểu từ 6 ký tự trở lên!", "error");
        return;
    }

    currentUser.password = newPass;
    localStorage.setItem('current_user', JSON.stringify(currentUser));

    const idx = usersDb.findIndex(u => u.email === currentUser.email);
    if (idx !== -1) {
        usersDb[idx].password = newPass;
        localStorage.setItem('users_db', JSON.stringify(usersDb));
    }

    openProfilePage();
    showToast("Đổi mật khẩu tài khoản thành công!", "success");
}
