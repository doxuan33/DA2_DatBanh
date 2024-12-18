var app = angular.module('AppAdmin', []);

app.controller("UserCtrl", function ($scope, $http, $window) {
    var current_url = "https://localhost:44307";

    // Hàm lấy thông tin người dùng từ localStorage
    $scope.loadCurrentUser = function () {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
            $scope.currentUser = user;
            // Populate fields with user data
            $scope.tenDangNhap = user.TenDangNhap;
            $scope.matKhau = user.MatKhau;
            $scope.email = user.Email;
            $scope.quyenHan = user.QuyenHan;
            $scope.imageUrl = user.Anh ? `anh/${user.Anh}` : null;
        } else {
            $scope.currentUser = null; // If not logged in
        }
    };
    // Gọi hàm khi controller được khởi chạy
    $scope.loadCurrentUser();

    // Hàm đăng nhập
    $scope.login = function () {
        if (!$scope.username || !$scope.password) {
            alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
            return;
        }

        var loginData = {
            Username: $scope.username,
            Password: $scope.password
        };

        $http.post(`${current_url}/api/NguoiDung/login`, loginData)
            .then(function (response) {
                var user = response.data;

                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem("currentUser", JSON.stringify(user));

                // Chuyển hướng dựa trên quyền hạn
                if (user.quyenHan === "Admin") {
                    $window.location.href = "ad-sidebar.html";
                } else {
                    $window.location.href = "index.html";
                }
            })
            .catch(function (error) {
                console.error("Đăng nhập thất bại:", error);
                alert("Tên đăng nhập hoặc mật khẩu không đúng!");
            });
    };
    // Hàm lấy thông tin người dùng theo ID
    $scope.loadUserById = function () {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
            $http.get(`${current_url}/api/NguoiDung/get-by-id/${user.user_id}`)
                .then(function (response) {
                    $scope.currentUser = response.data;
                    console.log("Thông tin người dùng", $scope.currentUser);
                })
                .catch(function (error) {
                    console.error("Lỗi khi lấy thông tin người dùng:", error);
                });
        }
    };

    $scope.loadUserById();
    // Hàm đăng xuất
    $scope.logout = function () {
        if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            // Xóa thông tin người dùng khỏi localStorage
            localStorage.removeItem("currentUser");
            // Chuyển hướng về trang đăng nhập
            $window.location.href = "login.html";
        }
    };
    // Reset form
    function ResetFormUser() {
        $scope.nguoiDungID = '';
        $scope.tenDangNhap = '';
        $scope.matKhau = '';
        $scope.email = '';
        $scope.quyenHan = '';
        $scope.anh = null;
        $scope.file = null;
        $scope.imageUrl = null;
        $scope.submit = "Thêm người dùng";
    }
    $scope.ResetFormUser = ResetFormUser;
    // Đóng modal Bootstrap
    function closeBootstrapModal(modalId) {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
    }
    // Chọn file ảnh
    $scope.onFileSelected = function (event) {
        const file = event.target.files[0];
        if (file) {
            $scope.file = file;
            const reader = new FileReader();
            reader.onload = function (e) {
                $scope.$apply(() => {
                    $scope.imageUrl = e.target.result;
                });
            };
            reader.readAsDataURL(file);
        }
    };
    $scope.resetImage = function () {
        $scope.imageUrl = $scope.currentUser.Anh ? `anh/${$scope.currentUser.Anh}` : null;
        $scope.file = null;
    };
    // Thêm người dùng
    $scope.Them = function () {
        if (!$scope.tenDangNhap || !$scope.matKhau || !$scope.email) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        const formData = new FormData();
        formData.append("nguoiDungID", $scope.nguoiDungID || "ND00");
        formData.append("tenDangNhap", $scope.tenDangNhap);
        formData.append("matKhau", $scope.matKhau);
        formData.append("email", $scope.email);
        formData.append("quyenHan", $scope.quyenHan || "");
        if ($scope.file) {
            formData.append("file", $scope.file);
        }
        $http.post(`${current_url}/api/NguoiDung/create-user`, formData, {
            headers: { "Content-Type": undefined }
        }).then(function (response) {
            alert("Thêm người dùng thành công!");
            $scope.listUser.push(response.data); // Chỉ thêm người dùng mới vào danh sách
            ResetFormUser();
            closeBootstrapModal("userModal"); // Đóng modal sau khi thêm
        }).catch(function (error) {
            console.error("Lỗi khi thêm người dùng:", error);
        });
    };
    // Chọn người dùng để sửa
    $scope.selectUser = function (user) {
        $scope.nguoiDungID = user.nguoiDungID;
        $scope.tenDangNhap = user.tenDangNhap;
        $scope.matKhau = user.matKhau;
        $scope.email = user.email;
        $scope.quyenHan = user.quyenHan;
        $scope.anh = user.anh;
        $scope.fileName = user.anh ? user.anh : "Chưa có ảnh"; // Gán tên ảnh nếu tồn tại
        $scope.imageUrl = user.anh ? `anh/${user.anh}` : null;
        $scope.submit = "Cập nhật người dùng";
    };

    // Sửa thông tin người dùng
    $scope.updateUser = function () {
        if (!$scope.tenDangNhap || !$scope.matKhau || !$scope.email) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const formData = new FormData();
        formData.append("NguoiDungID", $scope.currentUser.NguoiDungID);
        formData.append("TenDangNhap", $scope.tenDangNhap);
        formData.append("MatKhau", $scope.matKhau);
        formData.append("Email", $scope.email);
        formData.append("QuyenHan", $scope.quyenHan || "");

        // Append file if selected
        if ($scope.file) {
            formData.append("file", $scope.file);
        }

        // API request to update user
        $http.post(`${current_url}/api/NguoiDung/update-user`, formData, {
            headers: { "Content-Type": undefined }
        }).then(function (response) {
            alert("Cập nhật thông tin người dùng thành công!");
            $scope.currentUser = response.data;
            localStorage.setItem("currentUser", JSON.stringify(response.data));
        }).catch(function (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
        });
    };
    // Xóa người dùng
    $scope.Xoa = function (nguoiDungID) {
        if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

        $http.delete(`${current_url}/api/NguoiDung/delete-user/${nguoiDungID}`)
            .then(function () {
                alert("Xóa người dùng thành công!");
                $scope.listUser = $scope.listUser.filter(user => user.nguoiDungID !== nguoiDungID); // Cập nhật danh sách
            }).catch(function (error) {
                console.error("Lỗi khi xóa người dùng:", error);
            });
    };
});
