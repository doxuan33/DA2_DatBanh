var app = angular.module('AppAdmin', []);

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
