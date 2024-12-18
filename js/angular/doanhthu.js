var app = angular.module('AppAdmin', []);
app.controller("HoaDonCtrl", function ($scope, $http) {
    var current_url = "https://localhost:44307";
    $scope.listHD = [];
    $scope.selectedOrder = null;

    // Load danh sách đơn hàng
    $scope.LoadHD = function () {
        $http({
            method: "GET",
            url: current_url + "/api/DonDatHang/get-all",
        }).then(
            function (response) {
                $scope.listHD = response.data;
                console.log("Danh sách đơn hàng:", $scope.listHD);
            },
            function (error) {
                console.error("Error loading orders: ", error);
            }
        );
    };

    // Hiển thị chi tiết đơn đặt hàng
    $scope.showDetails = function (order) {
        $scope.selectedOrder = order; // Gán order được chọn vào selectedOrder
        console.log("Chi tiết đơn hàng:", order);
    };
    $scope.createOrder = function () {
        $http({
            method: "POST",
            url: current_url + "/api/DonDatHang/create-order",
            data: $scope.newOrder,
        }).then(
            function (response) {
                console.log("Đơn hàng mới đã được tạo:", response.data);
                $scope.newOrder = {}; // Reset đơn hàng mới
                $scope.LoadHD(); // Reload danh sách đơn hàng
            },
            function (error) {
                console.error("Error creating order: ", error);
            }
        );
    };

    // Hiển thị giao diện chỉnh sửa đơn đặt hàng
    $scope.editOrder = function (order) {
        $scope.editingOrder = angular.copy(order);
        console.log("Chỉnh sửa đơn hàng:", order);
    };
    // Cập nhật đơn đặt hàng
    $scope.updateOrder = function () {
        $http({
            method: "PUT",
            url: current_url + "/api/DonDatHang/update-order",
            data: $scope.selectedOrder, // Use selectedOrder to update the order
        }).then(
            function (response) {
                console.log("Đơn hàng đã được cập nhật:", response.data);
                $scope.selectedOrder = null; // Reset selected order
                $scope.LoadHD(); // Reload list of orders
            },
            function (error) {
                console.error("Error updating order: ", error);
            }
        );
    };


    // Xóa đơn đặt hàng
    $scope.deleteOrder = function (orderId) {
        if (confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
            $http({
                method: "DELETE",
                url: current_url + "/api/DonDatHang/delete",
                params: { id: orderId },
            }).then(
                function (response) {
                    console.log("Đơn hàng đã được xóa:", orderId);
                    $scope.LoadHD(); // Reload danh sách đơn hàng
                },
                function (error) {
                    console.error("Error deleting order: ", error);
                }
            );
        }
    };
    $scope.changeTrangThai = function (newStatus) {
        if ($scope.selectedOrder) {
            // Kiểm tra nếu trạng thái hiện tại là "Đã giao" hoặc "Đã hủy"
            if ($scope.selectedOrder.trangThai === "Đã giao" || $scope.selectedOrder.trangThai === "Đã hủy") {
                alert("Không thể thay đổi trạng thái khi đơn hàng đã giao hoặc đã hủy.");
                return; // Dừng không thực hiện thay đổi trạng thái
            }
            $scope.selectedOrder.trangThai = newStatus; // Cập nhật trạng thái mới
            $scope.updateOrder(); // Gửi yêu cầu cập nhật đơn hàng
        }
    };
    // Khởi tạo
    $scope.LoadHD();
    document.addEventListener("DOMContentLoaded", function () {
        const rows = document.querySelectorAll("tbody tr");
        rows.forEach(row => {
            const statusCell = row.querySelector("td:nth-child(6)"); // Cột trạng thái
            if (statusCell) {
                switch (statusCell.textContent.trim()) {
                    case "Chưa giao":
                        statusCell.classList.add("bg-warning text-dark badge");
                        break;
                    case "Đang giao":
                        statusCell.classList.add("bg-primary badge");
                        break;
                    case "Đã giao":
                        statusCell.classList.add("bg-success badge");
                        break;
                    case "Đã hủy":
                        statusCell.classList.add("bg-danger badge");
                        break;
                }
            }
        });
    });
    
});
app.controller("SanPhamCtrl", function ($scope, $http) {
    var current_url = "https://localhost:44307";
    $scope.listHD1; 
    $scope.matHangID = '';
    $scope.tenMatHang = '';
    $scope.moTa = '';
    $scope.gia = 0;
    $scope.danhMucID = '';
    $scope.hinhAnh = null;
    $scope.file = null;
    $scope.imageUrl = null;
    $scope.submit = "Thêm sản phẩm"; // ID danh mục (liên kết với danh mục nếu có)
    $scope.LoadHD1 = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/MatHang/get-all',
        }).then(function (response) {
            $scope.listHD1 = response.data;
            console.log('Danh sách sản phẩm', $scope.listHD1);
        }, function (error) {
            console.error("Error loading item: ", error);
        });
    };
    $scope.LoadHD1();
    // Tạo đối tượng sản phẩm
    function createSanPham() {
        return {
            matHangID: $scope.matHangID,
            tenMatHang: $scope.tenMatHang,
            moTa: $scope.moTa,
            gia: $scope.gia,
            danhMucID: $scope.danhMucID,
            hinhAnh: $scope.hinhAnh
        };
    }
    // Reset dữ liệu form
    function ResetMH() {
        $scope.matHangID = '';
        $scope.tenMatHang = '';
        $scope.moTa = '';
        $scope.gia = 0;
        $scope.danhMucID = '';
        $scope.hinhAnh = null;
        $scope.file = null;
        $scope.imageUrl = null;
        $scope.submit = "Thêm sản phẩm";
    }

     // Thêm sản phẩm
     $scope.ThemMH = function () {
        if (!$scope.tenMatHang || $scope.gia <= 0) {
            alert("Vui lòng nhập đầy đủ thông tin (Tên sản phẩm và giá phải lớn hơn 0).");
            return;
        }

        const formData = new FormData();
        formData.append("matHangID", $scope.matHangID || "MH00");
        formData.append("tenMatHang", $scope.tenMatHang);
        formData.append("moTa", $scope.moTa);
        formData.append("gia", $scope.gia);
        formData.append("danhMucID", $scope.danhMucID);
        if ($scope.file) {
            formData.append("file", $scope.file);
        }

        $http.post(`${current_url}/api/MatHang/create-product`, formData, {
            headers: { "Content-Type": undefined }
        }).then(function () {
            alert("Thêm sản phẩm thành công!");
            $scope.LoadHD1();
            ResetMH();
        }).catch(function (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
        });
    };

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

    // Chọn sản phẩm để sửa
    $scope.selectSanPham = function (sanPham) {
        $scope.matHangID = sanPham.matHangID;
        $scope.tenMatHang = sanPham.tenMatHang;
        $scope.moTa = sanPham.moTa;
        $scope.gia = sanPham.gia;
        $scope.danhMucID = sanPham.danhMucID;
        $scope.hinhAnh = sanPham.hinhAnh;
        $scope.imageUrl = sanPham.hinhAnh ? `anh/${sanPham.hinhAnh}` : null;
        $scope.submit = "Cập nhật sản phẩm";
    };

    // Sửa sản phẩm
    $scope.SuaMH = function () {
        if (!$scope.matHangID || !$scope.tenMatHang || $scope.gia <= 0) {
            alert("Vui lòng nhập đầy đủ thông tin (Tên sản phẩm và giá phải lớn hơn 0).");
            return;
        }

        const formData = new FormData();
        formData.append("matHangID", $scope.matHangID);
        formData.append("tenMatHang", $scope.tenMatHang);
        formData.append("moTa", $scope.moTa);
        formData.append("gia", $scope.gia);
        formData.append("danhMucID", $scope.danhMucID);
        if ($scope.file) {
            formData.append("file", $scope.file);
        }

        $http.put(`${current_url}/api/MatHang/update-product`, formData, {
            headers: { "Content-Type": undefined }
        }).then(function () {
            alert("Cập nhật sản phẩm thành công!");
            $scope.LoadHD1();
            ResetMH();
        }).catch(function (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
        });
    };

    // Xóa sản phẩm
    $scope.XoaMH = function (matHangID) {
        if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

        $http.delete(`${current_url}/api/MatHang/delete-product/${matHangID}`)
            .then(function () {
                alert("Xóa sản phẩm thành công!");
                $scope.LoadHD1();
            }).catch(function (error) {
                console.error("Lỗi khi xóa sản phẩm:", error);
            });
    };

    $scope.ResetMH = ResetMH;

    $scope.listDM = [];    
    $scope.danhMucID = '';
    $scope.tenDanhMuc = '';
    $scope.moTa = '';

    // Load danh sách danh mục
    $scope.LoadCategories = function () {
        $http.get(current_url + '/api/DanhMuc/get-all')
            .then(function (response) {
                console.log(response.data);
                $scope.listDM = response.data;
            }).catch(function (error) {
                console.error("Error loading categories:", error);
            });
    };
    $scope.LoadCategories();

    // Tạo đối tượng danh mục từ thông tin trên form
    function createCategory() {
        return {
            danhMucID: $scope.danhMucID || "DM00",
            tenDanhMuc: $scope.tenDanhMuc,
            moTa: $scope.moTa
        };
    }

    // Xóa dữ liệu trên form
    function resetForm() {
        $scope.danhMucID = '';
        $scope.tenDanhMuc = '';
        $scope.moTa = '';
    }
    $scope.resetForm = resetForm;
    // Thêm danh mục mới vào danh sách tạm
    $scope.Them = function () {
        $scope.listDM.push(createCategory());
    };

    // Lưu danh mục vào API
    $scope.Luu = function () {
        let newCategory = createCategory();
        if (!$scope.tenDanhMuc) {
            alert("Vui lòng điền đầy đủ thông tin trước khi thêm.");
            return;
        }

        $http({
            method: 'POST',
            url: current_url + '/api/DanhMuc/create-category',
            data: JSON.stringify(newCategory),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function () {
            alert('Thêm dữ liệu thành công');
            $scope.listDM.push(newCategory);
            resetForm();
        }).catch(function (error) {
            console.error("Lỗi khi thêm dữ liệu:", error);
        });
    };

    // Chọn danh mục để hiển thị dữ liệu trên form
    $scope.selectItem = function(category) {
        $scope.danhMucID = category.danhMucID;
        $scope.tenDanhMuc = category.tenDanhMuc;
        $scope.moTa = category.moTa;
    };

    // Sửa danh mục
    $scope.SuaDM = function() {
        let updateCategory = createCategory();
        if (!$scope.danhMucID || !$scope.tenDanhMuc) {
            alert("Vui lòng điền đầy đủ thông tin trước khi sửa.");
            return;
        }

        $http({
            method: 'PUT',
            url: current_url + '/api/DanhMuc/update-category',
            data: JSON.stringify(updateCategory),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function () {
            alert('Sửa dữ liệu thành công');
            $scope.LoadCategories();
            let index = $scope.listDM.findIndex(item => item.danhMucID === updateCategory.danhMucID);
            if (index !== -1) {
                $scope.listDM[index] = updateCategory;
            }
            resetForm();
        }).catch(function (error) {
            console.error("Lỗi khi sửa dữ liệu:", error);
        });
    };

    // Xóa danh mục
    $scope.XoaDM = function(danhMucID) {
        if (!danhMucID) {
            console.error("danhMucID không hợp lệ");
            return;
        }

        $http({
            method: 'DELETE',
            url: `${current_url}/api/DanhMuc/delete-category/${danhMucID}`,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function () {
            alert("Xóa dữ liệu thành công");
            $scope.listDM = $scope.listDM.filter(dm => dm.danhMucID !== danhMucID);
            resetForm();
        }).catch(function (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
        });
    };
});
app.controller("UserCtrl", function ($scope, $http) {
    var current_url = "https://localhost:44307";
    // Hàm lấy thông tin người dùng từ localStorage
    $scope.loadCurrentUser = function () {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
            $scope.currentUser = user;
        } else {
            $scope.currentUser = null; // Nếu chưa đăng nhập
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
                    console.log("Thông tin người dùng",$scope.currentUser)
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
    $scope.listUser = [];
    $scope.nguoiDungID = '';
    $scope.tenDangNhap = '';
    $scope.matKhau = '';
    $scope.email = '';
    $scope.quyenHan = '';
    $scope.anh = null;
    $scope.file = null;
    $scope.imageUrl = null;
    $scope.submit = "Thêm người dùng";

    // Hàm tải danh sách người dùng
    $scope.LoadUsers = function () {
        $http.get(`${current_url}/api/NguoiDung/get-all`)
            .then(function (response) {
                console.log("Danh sách người dùng:", response.data);
                $scope.listUser = response.data;
            })
            .catch(function (error) {
                console.error("Lỗi khi tải danh sách người dùng:", error);
            });
    };
    $scope.LoadUsers();

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
    $scope.Sua = function () {
        if (!$scope.nguoiDungID || !$scope.tenDangNhap || !$scope.matKhau || !$scope.email) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        const formData = new FormData();
        formData.append("nguoiDungID", $scope.nguoiDungID);
        formData.append("tenDangNhap", $scope.tenDangNhap);
        formData.append("matKhau", $scope.matKhau);
        formData.append("email", $scope.email);
        formData.append("quyenHan", $scope.quyenHan || "");
        if ($scope.file) {
            formData.append("file", $scope.file);
        }

        $http.put(`${current_url}/api/NguoiDung/update-user`, formData, {
            headers: { "Content-Type": undefined }
        }).then(function (response) {
            alert("Cập nhật người dùng thành công!");
            let index = $scope.listUser.findIndex(u => u.nguoiDungID === response.data.nguoiDungID);
            if (index !== -1) {
                $scope.listUser[index] = response.data; // Cập nhật danh sách mà không tải lại trang
            }
            ResetFormUser();
            closeBootstrapModal("userModal"); // Đóng modal sau khi sửa
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
app.controller("KhuyenMaiCtrl", function ($scope, $http) {
    var current_url = "https://localhost:44307";

    // Khởi tạo danh sách khuyến mãi, chi tiết khuyến mãi và đối tượng khuyến mãi
    $scope.promotions = [];
    $scope.chiTietKhuyenMai = []; // Danh sách chi tiết khuyến mãi
    $scope.promotion = {
        khuyenMaiID: "",
        tenKhuyenMai: "",
        ngayBatDau: "",
        ngayKetThuc: "",
        listjson_chitiet: []
    };
    // Lấy danh sách khuyến mãi
    $scope.getAllPromotions = function () {
        $http.get(current_url + "/api/KhuyenMai/get-all")
            .then(function (response) {
                $scope.promotions = response.data;
                console.log("Danh sách khuyến mãi:", $scope.promotions);
            }, function (error) {
                console.error("Lỗi lấy danh sách:", error);
            });
    };

    // Lấy chi tiết khuyến mãi
    $scope.getChiTietKhuyenMai = function (khuyenMaiID) {
        $http.get(current_url + "/api/ChiTietKhuyenMai/get-by-khuyenmai/" + khuyenMaiID)
            .then(function (response) {
                $scope.chiTietKhuyenMai = response.data;
                console.log("Chi tiết khuyến mãi:", $scope.chiTietKhuyenMai);
            }, function (error) {
                console.error("Lỗi không thể lấy danh sách:", error);
            });
    };
    // Lấy danh sách mặt hàng
    $scope.getAllMatHang = function () {
        $http.get(current_url + "/api/MatHang/get-all")
            .then(function (response) {
                $scope.matHangList = response.data;
            }, function (error) {
                console.error("Lỗi không thể lấy danh sách:", error);
            });
    };
    // Hiển thị khuyến mãi đã chọn
    $scope.selectPro = function (promotion) { 
        $scope.isEditMode = true;
        $scope.promotion = angular.copy(promotion);
        $scope.promotion.ngayBatDau = new Date(promotion.ngayBatDau);
        $scope.promotion.ngayKetThuc = new Date(promotion.ngayKetThuc);
        $scope.chiTietKhuyenMai = angular.copy(promotion.listjson_chitiet); // Load promotion details
    };
    // Thêm mới khuyến mãi
    $scope.createPromotion = function () {
        $scope.promotion.listjson_chitiet = angular.copy($scope.chiTietKhuyenMai);
    
        $http.post(current_url + "/api/KhuyenMai/create-promotion", $scope.promotion)
            .then(function (response) {
                alert("Thêm khuyến mãi thành công!");
                $scope.getAllPromotions(); // Refresh the list
                $scope.resetPromotion(); // Clear form data
            }, function (error) {
                console.error("Lỗi thêm khuyến mãi:", error);
            });
    };
    // Cập nhật khuyến mãi
    $scope.updatePromotion = function () {
        $scope.promotion.listjson_chitiet = angular.copy($scope.chiTietKhuyenMai);
        $http.put(current_url + "/api/KhuyenMai/update-promotion", $scope.promotion)
            .then(function (response) {
                alert("Sửa khuyến mãi thành công!");
                $scope.getAllPromotions(); // Refresh the list
                $scope.resetPromotion(); // Clear form data
            }, function (error) {
                console.error("Lỗi sửa khuyến mãi:", error);
            });
    };
    // Xóa khuyến mãi
    $scope.deletePromotion = function (id) {
        if (confirm("Are you sure you want to delete this promotion?")) {
            $http.delete(current_url + "/api/KhuyenMai/delete?id=" + id)
                .then(function (response) {
                    alert("Promotion deleted successfully!");
                    $scope.getAllPromotions(); // Refresh the list
                }, function (error) {
                    console.error("Error deleting promotion:", error);
                });
        }
    };
    //Hàm thay đổi chức năng thêm sửa
    $scope.savePromotion = function () {
        if ($scope.isEditMode) {
            $scope.updatePromotion(); // Call update function
        } else {
            $scope.createPromotion(); // Call create function
        }
    };
    $scope.addMatHangToChiTiet = function (matHangID) {
        const selectedItem = $scope.matHangList.find(item => item.matHangID === matHangID);
        if (selectedItem) {
            const existingItem = $scope.chiTietKhuyenMai.find(item => item.matHangID === matHangID);
            if (!existingItem) {
                $scope.chiTietKhuyenMai.push({
                    matHangID: selectedItem.matHangID,
                    tenMatHang: selectedItem.tenMatHang,
                    giaKhuyenMai: selectedItem.gia, // Giá cũ làm mặc định
                    status: 1 // Trạng thái thêm mới
                });
            } else {
                alert("Mặt hàng này đã có trong danh sách chi tiết khuyến mãi!");
            }
        }
    };
        
    $scope.getMatHangImage = function (matHangID) {
        const item = $scope.matHangList.find(mh => mh.matHangID === matHangID);
        return item ? item.hinhAnh : 'default-image.png'; // Đường dẫn ảnh mặc định nếu không có
    };

    // Xóa mặt hàng khỏi chi tiết khuyến mãi
    $scope.removeMatHangFromChiTiet = function (index) {
        if ($scope.chiTietKhuyenMai[index].status === 1) {
            // Nếu trạng thái là thêm mới, xóa khỏi danh sách
            $scope.chiTietKhuyenMai.splice(index, 1);
        } else {
            // Nếu không, chuyển trạng thái sang 3 (xóa)
            $scope.chiTietKhuyenMai[index].status = 3;
        }
    };
    // Cập nhật danh sách chi tiết vào đối tượng khuyến mãi
    $scope.updateChiTietKhuyenMai = function (detail) {
        if (detail.status !== 1) {
            detail.status = 2; // Đặt trạng thái cập nhật nếu không phải thêm mới
        }
    };
    // Reset form khuyến mãi
    $scope.resetPromotion = function () {
        $scope.promotion = {
            khuyenMaiID: "",
            tenKhuyenMai: "",
            ngayBatDau: "",
            ngayKetThuc: "",
            listjson_chitiet: []
        };
        $scope.chiTietKhuyenMai = [];
        $scope.updatePromotion(); 
    };

    // Khởi tạo dữ liệu ban đầu
    $scope.getAllPromotions();
    $scope.getAllMatHang();
});
app.controller("NewsCtrl", function ($scope, $http, $window) {
    var current_url = "https://localhost:44307";

    // Hàm lấy thông tin người dùng từ localStorage
    $scope.loadCurrentUser = function () {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
            $scope.currentUser = user;
        } else {
            $scope.currentUser = null; // Nếu chưa đăng nhập
        }
    };

    // Gọi hàm khi controller được khởi chạy
    $scope.loadCurrentUser();

    // Biến dữ liệu và trạng thái
    $scope.newsList = [];
    $scope.tinTucID = '';
    $scope.tieuDe = '';
    $scope.noiDung = '';
    $scope.hinhAnh = null;
    $scope.file = null;
    $scope.imageUrl = null;
    $scope.nguoiDang = '';
    $scope.ngayDang = '';
    $scope.submit = "Thêm tin tức";

    // Load danh sách tin tức
    $scope.loadNews = function () {
        $http.get(current_url + '/api/TinTuc/get-all')
            .then(function (response) {
                $scope.newsList = response.data;
                console.log("Danh sách tin tức:", $scope.newsList);
            }).catch(function (error) {
                console.error("Lỗi khi tải danh sách tin tức:", error);
            });
    };
    $scope.loadNews();

    // Reset form
    function resetForm() {
        $scope.tinTucID = '';
        $scope.tieuDe = '';
        $scope.noiDung = '';
        $scope.hinhAnh = null;
        $scope.file = null;
        $scope.imageUrl = null;
        $scope.nguoiDang = '';
        $scope.ngayDang = '';
        $scope.submit = "Thêm tin tức";
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

    // Thêm tin tức
    $scope.addNews = function () {
        if (!$scope.tieuDe || !$scope.noiDung) {
            alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
            return;
        }

        const formData = new FormData();
        formData.append("tinTucID", $scope.tinTucID || "TT00");
        formData.append("tieuDe", $scope.tieuDe);
        formData.append("noiDung", $scope.noiDung);
        formData.append("nguoiDang", $scope.currentUser?.user_id || "Unknown");
        formData.append("ngayDang", new Date().toISOString()); // Lấy ngày hiện tại
        if ($scope.file) {
            formData.append("file", $scope.file);
        }

        $http.post(`${current_url}/api/TinTuc/create-news`, formData, {
            headers: { "Content-Type": undefined }
        }).then(function () {
            alert("Tin tức đã được thêm mới thành công!");
            $scope.loadNews();
            resetForm();
        }).catch(function (error) {
            console.error("Lỗi khi thêm tin tức:", error);
        });
    };

    // Chọn tin tức để sửa
    $scope.selectNews = function (news) {
        $scope.tinTucID = news.tinTucID;
        $scope.tieuDe = news.tieuDe;
        $scope.noiDung = news.noiDung;
        $scope.nguoiDang = news.nguoiDang;
        $scope.ngayDang = news.ngayDang;
        $scope.hinhAnh = news.hinhAnh;
        $scope.imageUrl = news.hinhAnh ? `anh/${news.hinhAnh}` : null;
        $scope.submit = "Cập nhật tin tức";
    };

    // Sửa tin tức
    $scope.updateNews = function () {
        if (!$scope.tinTucID || !$scope.tieuDe || !$scope.noiDung) {
            alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
            return;
        }

        const formData = new FormData();
        formData.append("tinTucID", $scope.tinTucID);
        formData.append("tieuDe", $scope.tieuDe);
        formData.append("noiDung", $scope.noiDung);
        formData.append("nguoiDang", $scope.currentUser?.user_id || "Unknown");
        formData.append("ngayDang", new Date().toISOString()); // Lấy ngày hiện tại
        if ($scope.file) {
            formData.append("file", $scope.file);
        }

        $http.put(`${current_url}/api/TinTuc/update-news`, formData, {
            headers: { "Content-Type": undefined }
        }).then(function () {
            alert("Tin tức đã được cập nhật thành công!");
            $scope.loadNews();
            resetForm();
        }).catch(function (error) {
            console.error("Lỗi khi cập nhật tin tức:", error);
        });
    };

    // Xóa tin tức
    $scope.deleteNews = function (tinTucID) {
        if (!confirm("Bạn có chắc chắn muốn xóa tin tức này không?")) return;

        $http.delete(`${current_url}/api/TinTuc/delete-news/${tinTucID}`)
            .then(function () {
                alert("Tin tức đã được xóa thành công!");
                $scope.loadNews();
            }).catch(function (error) {
                console.error("Lỗi khi xóa tin tức:", error);
            });
    };

    // Gửi dữ liệu
    $scope.submitNews = function () {
        if ($scope.submit === "Thêm tin tức") {
            $scope.addNews();
        } else {
            $scope.updateNews();
        }
    };

    // Xóa dữ liệu form
    $scope.resetForm = resetForm;
}); 