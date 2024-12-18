document.getElementById("createAccountBtn").addEventListener("click", function() {
    document.getElementById("registerModal").classList.add("active");
});

document.getElementById("registerModal").addEventListener("click", function(e) {
    if (e.target === this) {
        this.classList.remove("active");
    }
});
document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const eyeIcon = this.querySelector("i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Hiển thị mật khẩu
        eyeIcon.classList.remove("ri-eye-line"); // Đổi biểu tượng
        eyeIcon.classList.add("ri-eye-off-line");
    } else {
        passwordInput.type = "password"; // Ẩn mật khẩu
        eyeIcon.classList.remove("ri-eye-off-line"); // Đổi biểu tượng về ban đầu
        eyeIcon.classList.add("ri-eye-line");
    }
});
