var app = angular.module("AppAdmin", []);

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
