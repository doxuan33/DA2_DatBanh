var app = angular.module("AppAdmin", []);

app.controller("HoaDonCtrl", function ($scope, $http) {
    var current_url = "https://localhost:44307";
    $scope.listHD = [];
    $scope.selectedOrder = null;
    $scope.newOrder = {}; // Biến để lưu đơn hàng mới
    $scope.editingOrder = {}; 
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
        $scope.selectedOrder = angular.copy(order); // Gán order được chọn vào selectedOrder
        console.log("Chi tiết đơn hàng:", order);
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
    // Change order status
    $scope.changeTrangThai = function (newStatus) {
        if ($scope.selectedOrder) {
            $scope.selectedOrder.trangThai = newStatus; // Update status locally
            $scope.updateOrder(); // Call the update order function to save the change
        }
    };
    
    // Khởi tạo
    $scope.LoadHD();
});
