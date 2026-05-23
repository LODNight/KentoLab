// ----------------------------------------------------
// PROFILE MANAGEMENT PANEL
// ----------------------------------------------------

// Populate profile data into the profile.html page DOM elements
function renderProfileData() {
    if (!currentUser) return;

    const avatarEl = document.getElementById("profile-avatar-large");
    if (avatarEl) avatarEl.innerText = currentUser.name.charAt(0).toUpperCase();

    const nameEl = document.getElementById("profile-lbl-name");
    if (nameEl) nameEl.innerText = currentUser.name;

    const emailEl = document.getElementById("profile-lbl-email");
    if (emailEl) emailEl.innerText = currentUser.email;

    const planBadge = document.getElementById("profile-lbl-plan");
    if (planBadge) {
        planBadge.innerText = currentUser.plan === 'Free' ? 'Miễn Phí' : currentUser.plan;
        if (currentUser.plan === 'Free') {
            planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-850 text-slate-400 border border-slate-700";
            document.getElementById("profile-upgrade-btn")?.classList.remove("hidden");
        } else if (currentUser.plan === 'Pro') {
            planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-900/40 text-indigo-300 border border-indigo-500/30";
            document.getElementById("profile-upgrade-btn")?.classList.add("hidden");
        } else {
            planBadge.className = "px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-900/40 text-purple-300 border border-purple-500/30";
            document.getElementById("profile-upgrade-btn")?.classList.add("hidden");
        }
    }

    const nameInput = document.getElementById("profile-input-name");
    if (nameInput) nameInput.value = currentUser.name;
    const emailInput = document.getElementById("profile-input-email");
    if (emailInput) emailInput.value = currentUser.email;
    const oldPassInput = document.getElementById("profile-input-old-pass");
    if (oldPassInput) oldPassInput.value = "";
    const newPassInput = document.getElementById("profile-input-new-pass");
    if (newPassInput) newPassInput.value = "";
}

function openProfilePage() {
    if (!currentUser) {
        showToast("Vui lòng đăng nhập để truy cập trang cá nhân!", "error");
        openAuthModal('login');
        return;
    }

    // If NOT on profile.html, navigate there
    if (!window.location.pathname.endsWith('profile.html')) {
        window.location.href = 'profile.html';
        return;
    }

    // Already on profile.html - just render the data
    if (typeof pausePlayback === 'function') pausePlayback();
    currentView = "profile";

    // Show profile container (it's visible by default in profile.html)
    const profileContainer = document.getElementById("profile-container");
    if (profileContainer) profileContainer.classList.remove("hidden");


    renderProfileData();
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
