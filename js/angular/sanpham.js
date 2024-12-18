var app = angular.module('AppAdmin', []);

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
                console.log('Danh sách danh mục', $scope.listDM);
            }).catch(function (error) {
                console.error("Error loading categories:", error);
            });
    };
    $scope.LoadCategories();

    // Tạo đối tượng danh mục từ thông tin trên form
    function createCategory() {
        return {
            danhMucID: $scope.danhMucID,
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