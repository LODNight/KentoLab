// ----------------------------------------------------
// PAYMENT GATEWAY & SIMULATION SYSTEM
// ----------------------------------------------------
let pendingUpgradePlanName = "Pro";

// Cho phép click nâng cấp xem thông tin ngay, không bắt buộc đăng nhập
function openPaymentModal() {
    document.getElementById("payment-modal").classList.remove("hidden");
    cancelPaymentFlow();
}

function closePaymentModal() {
    document.getElementById("payment-modal").classList.add("hidden");
}

function simulatePlanPayment(planName) {
    pendingUpgradePlanName = planName;
    const flowBox = document.getElementById("simulated-payment-flow");
    flowBox.classList.remove("hidden");

    document.getElementById("payment-flow-plan").innerText = planName;
    document.getElementById("payment-flow-price").innerText = planName === 'Pro' ? '129.000đ' : '399.000đ';

    // Auto scroll inside modal
    const modalBox = document.getElementById("payment-modal").firstElementChild;
    modalBox.scrollTop = modalBox.scrollHeight;
}

function cancelPaymentFlow() {
    document.getElementById("simulated-payment-flow").classList.add("hidden");
}

// Tự động khởi tạo tài khoản Khách VIP nếu khách chưa có tài khoản
function confirmSimulatedPayment() {
    if (!currentUser) {
        // Tự động sinh tài khoản khách mới, giảm ma sát cho trải nghiệm tối ưu
        const guestId = Math.floor(1000 + Math.random() * 9000);
        const guestEmail = `guest_${guestId}`;
        const guestPass = "123456";
        const guestName = `Học Viên VIP #${guestId}`;

        currentUser = { email: guestEmail, password: guestPass, name: guestName, plan: pendingUpgradePlanName };
        usersDb.push(currentUser);
        localStorage.setItem('users_db', JSON.stringify(usersDb));
        localStorage.setItem('current_user', JSON.stringify(currentUser));

        syncAuthUI();
        closePaymentModal();
        showToast(`Thanh toán thành công! Đã tự tạo tài khoản Khách VIP: [ ${guestEmail} ] - Mật khẩu: 123456`, "success");
    } else {
        // Nâng cấp trực tiếp trên tài khoản đang đăng nhập
        currentUser.plan = pendingUpgradePlanName;
        localStorage.setItem('current_user', JSON.stringify(currentUser));

        const idx = usersDb.findIndex(u => u.email === currentUser.email);
        if (idx !== -1) {
            usersDb[idx].plan = pendingUpgradePlanName;
            localStorage.setItem('users_db', JSON.stringify(usersDb));
        }

        syncAuthUI();
        closePaymentModal();
        showToast(`Chúc mừng! Gói thành viên của bạn đã được nâng cấp lên hạng [${pendingUpgradePlanName}]!`, "success");
    }

    // Phát âm thanh chúc mừng nâng cấp thành công
    if (isSoundOn && typeof audioCtx !== 'undefined' && audioCtx) {
        playAudioTone(100, 100);
        setTimeout(() => playAudioTone(150, 100), 120);
    }

    // Làm mới lại giao diện hiển thị
    setTimeout(() => window.location.reload(), 1500);
}
