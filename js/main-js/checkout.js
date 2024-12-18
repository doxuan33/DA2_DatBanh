const locations = {
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Tây Hồ", "Cầu Giấy", "Đống Đa", "Hai Bà Trưng", "Thanh Xuân", "Hà Đông", "Long Biên", "Nam Từ Liêm", "Bắc Từ Liêm", "Gia Lâm", "Hoài Đức", "Đông Anh", "Sóc Sơn", "Thanh Trì", "Thường Tín", "Phúc Thọ", "Ứng Hòa"],
    "Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 5", "Quận 7", "Quận 10", "Quận 11", "Tân Bình", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Thủ Đức", "Bình Tân", "Hóc Môn", "Củ Chi", "Bình Chánh", "Nhà Bè", "Cần Giờ"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Cẩm Lệ", "Hòa Vang", "Hoàng Sa"],
    "Bình Dương": ["Thủ Dầu Một", "Dĩ An", "Thuận An", "Tân Uyên", "Bến Cát", "Bắc Tân Uyên", "Phú Giáo", "Dầu Tiếng"],
    "Cần Thơ": ["Ninh Kiều", "Cái Răng", "Bình Thủy", "Ô Môn", "Thốt Nốt", "Phong Điền", "Cờ Đỏ", "Vĩnh Thạnh"],
    "Hải Phòng": ["Hồng Bàng", "Lê Chân", "Ngô Quyền", "Kiến An", "Dương Kinh", "Thủy Nguyên", "An Dương", "An Lão", "Cát Hải"],
    "An Giang": ["Long Xuyên", "Châu Đốc", "An Phú", "Châu Phú", "Tịnh Biên", "Tri Tôn", "Châu Thành", "Thoại Sơn", "Phú Tân"],
    "Bà Rịa - Vũng Tàu": ["Vũng Tàu", "Bà Rịa", "Phú Mỹ", "Châu Đức", "Xuyên Mộc", "Côn Đảo", "Long Điền", "Đất Đỏ"],
    "Bạc Liêu": ["Bạc Liêu", "Hồng Dân", "Phước Long", "Vĩnh Lợi", "Giá Rai", "Đông Hải"],
    "Bắc Giang": ["Bắc Giang", "Yên Dũng", "Việt Yên", "Tân Yên", "Hiệp Hòa", "Lục Nam", "Lục Ngạn", "Sơn Động"],
    "Bắc Kạn": ["Bắc Kạn", "Ba Bể", "Bạch Thông", "Chợ Đồn", "Chợ Mới", "Ngân Sơn", "Na Rì"],
    "Bắc Ninh": ["Bắc Ninh", "Từ Sơn", "Yên Phong", "Quế Võ", "Thuận Thành", "Lương Tài"],
    "Bến Tre": ["Bến Tre", "Châu Thành", "Giồng Trôm", "Ba Tri", "Bình Đại", "Thạnh Phú", "Mỏ Cày Nam"],
    "Bình Định": ["Quy Nhơn", "An Nhơn", "Hoài Nhơn", "Phù Mỹ", "Hoài Ân", "Tuy Phước", "Tây Sơn", "Vân Canh"],
    "Bình Phước": ["Đồng Xoài", "Chơn Thành", "Đồng Phú", "Phước Long", "Bù Đăng", "Bù Đốp", "Lộc Ninh"],
    "Bình Thuận": ["Phan Thiết", "La Gi", "Bắc Bình", "Hàm Thuận Bắc", "Hàm Thuận Nam", "Tuy Phong", "Hàm Tân"],
    "Cà Mau": ["Cà Mau", "Năm Căn", "U Minh", "Đầm Dơi", "Trần Văn Thời", "Thới Bình"],
    "Cao Bằng": ["Cao Bằng", "Trùng Khánh", "Hạ Lang", "Quảng Hòa", "Bảo Lâm", "Thông Nông"],
    "Đắk Lắk": ["Buôn Ma Thuột", "Buôn Hồ", "Ea Kar", "Krông Ana", "Krông Bông", "Krông Pắc", "Cư M'gar"],
    "Đắk Nông": ["Gia Nghĩa", "Đắk R'lấp", "Đắk Song", "Cư Jút", "Krông Nô", "Tuy Đức"],
    "Điện Biên": ["Điện Biên Phủ", "Mường Lay", "Mường Chà", "Mường Nhé", "Tủa Chùa"],
    "Đồng Nai": ["Biên Hòa", "Long Khánh", "Vĩnh Cửu", "Thống Nhất", "Xuân Lộc", "Trảng Bom", "Cẩm Mỹ"],
    "Đồng Tháp": ["Cao Lãnh", "Sa Đéc", "Hồng Ngự", "Tân Hồng", "Thanh Bình", "Tháp Mười"],
    "Gia Lai": ["Pleiku", "An Khê", "Ayun Pa", "Đắk Đoa", "Đức Cơ", "Chư Păh", "Phú Thiện"],
    "Hà Giang": ["Hà Giang", "Đồng Văn", "Mèo Vạc", "Yên Minh", "Quản Bạ", "Hoàng Su Phì", "Vị Xuyên"],
    "Hà Nam": ["Phủ Lý", "Duy Tiên", "Kim Bảng", "Thanh Liêm"],
    "Hà Tĩnh": ["Hà Tĩnh", "Hồng Lĩnh", "Kỳ Anh", "Nghi Xuân", "Lộc Hà", "Can Lộc"],
    "Hậu Giang": ["Vị Thanh", "Ngã Bảy", "Châu Thành A", "Châu Thành", "Phụng Hiệp"],
    "Hòa Bình": ["Hòa Bình", "Mai Châu", "Lương Sơn", "Kim Bôi", "Tân Lạc"],
    "Hưng Yên": ["Hưng Yên", "Khoái Châu", "Kim Động", "Ân Thi", "Phù Cừ"],
    "Khánh Hòa": ["Nha Trang", "Cam Ranh", "Ninh Hòa", "Diên Khánh"],
    "Kiên Giang": ["Rạch Giá", "Hà Tiên", "Phú Quốc", "An Biên"],
    "Kon Tum": ["Kon Tum", "Đắk Hà", "Đắk Tô", "Ngọc Hồi"],
    "Lai Châu": ["Lai Châu", "Phong Thổ", "Tam Đường", "Tân Uyên"],
    "Lâm Đồng": ["Đà Lạt", "Bảo Lộc", "Di Linh", "Đức Trọng"],
    "Lạng Sơn": ["Lạng Sơn", "Hữu Lũng"],
    "Lào Cai": ["Lào Cai", "Sa Pa"],
    "Long An": ["Tân An", "Bến Lức", "Đức Hòa"],
    "Nam Định": ["Nam Định", "Mỹ Lộc"],
    "Nghệ An": ["Vinh", "Cửa Lò"],
    "Ninh Bình": ["Ninh Bình"],
    "Ninh Thuận": ["Phan Rang"],
    "Phú Thọ": ["Việt Trì"],
    "Phú Yên": ["Tuy Hòa"],
    "Quảng Bình": ["Đồng Hới"],
    "Quảng Nam": ["Tam Kỳ"],
    "Quảng Ngãi": ["Quảng Ngãi"],
    "Quảng Ninh": ["Hạ Long"],
    "Quảng Trị": ["Đông Hà"],
    "Sóc Trăng": ["Sóc Trăng"],
    "Sơn La": ["Sơn La"],
    "Tây Ninh": ["Tây Ninh"],
    "Thái Bình": ["Thái Bình"],
    "Thái Nguyên": ["Thái Nguyên"],
    "Thanh Hóa": ["Thanh Hóa"],
    "Thừa Thiên Huế": ["Huế"],
    "Tiền Giang": ["Mỹ Tho"],
    "Trà Vinh": ["Trà Vinh"],
    "Tuyên Quang": ["Tuyên Quang"],
    "Vĩnh Long": ["Vĩnh Long"],
    "Vĩnh Phúc": ["Vĩnh Yên"],
    "Yên Bái": ["Yên Bái"]
};

document.addEventListener("DOMContentLoaded", function () {
    const countrySelect = document.getElementById("country");
    const citySelect = document.getElementById("city");

    // Load danh sách tỉnh/thành phố
    Object.keys(locations).forEach(province => {
        const option = document.createElement("option");
        option.value = province;
        option.textContent = province;
        countrySelect.appendChild(option);
    });

    // Khi chọn tỉnh/thành phố
    countrySelect.addEventListener("change", function () {
        const selectedProvince = this.value;

        // Xóa danh sách quận/huyện cũ
        citySelect.innerHTML = '<option value="">Chọn quận (Huyện)</option>';

        // Kiểm tra nếu có quận/huyện tương ứng
        if (selectedProvince && locations[selectedProvince]) {
            locations[selectedProvince].forEach(district => {
                const option = document.createElement("option");
                option.value = district;
                option.textContent = district;
                citySelect.appendChild(option);
            });
        }
    });
    
});
$(document).ready(function () {
    const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    const totalPrice = localStorage.getItem("checkoutTotalPrice") || "0.000đ";
    const totalQuantity = localStorage.getItem("checkoutTotalQuantity") || "0";

    function renderCheckoutItems() {
        let content = "";
        checkoutItems.forEach((item) => {
            const price = parseFloat(item.price.replace(/[^\d.-]/g, "")); // Xử lý giá
            const itemTotalPrice = (price * item.quantity).toLocaleString() + ".000đ";

            content += `
                <div class="item">
                    <img src="${item.photo}" alt="">
                    <div class="info">
                        <div class="name">${item.name}</div>
                        <div class="price">${item.price}/1 sản phẩm</div>
                    </div>
                    <div class="quantity">${item.quantity}</div>
                    <div class="returnPrice">${itemTotalPrice}</div>
                </div>`;
        });
        $(".list").html(content);
    }

    renderCheckoutItems();

    $(".totalPrice").text(totalPrice);
    $(".totalQuantity").text(totalQuantity);

    $(".buttonCheckout").click(function () {
        const orderDetails = {
            name: $("#name").val(),
            phone: $("#phone").val(),
            address: $("#address").val(),
            country: $("#country").val(),
            city: $("#city").val(),
            deliveryMethod: $("input[name='delivery-method']:checked").val(),
            branch: $("input[name='branch']:checked").val(),
            items: checkoutItems,
            totalQuantity: totalQuantity,
            totalPrice: totalPrice,
            orderDate: new Date().toLocaleString() // Thêm ngày giờ đặt hàng
        };
    
        let allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
        allOrders.push(orderDetails); // Thêm đơn hàng mới vào danh sách
        localStorage.setItem("allOrders", JSON.stringify(allOrders)); // Lưu lại vào localStorage
    
        // Xóa các mục giỏ hàng sau khi đơn hàng được lưu
        localStorage.removeItem("checkoutItems");
        localStorage.removeItem("checkoutTotalPrice");
        localStorage.removeItem("checkoutTotalQuantity");
    
        // Kiểm tra lại xem đã xóa được chưa
        console.log(localStorage.getItem("checkoutItems"));  // Kiểm tra mục "checkoutItems"
        console.log(localStorage.getItem("checkoutTotalPrice"));  // Kiểm tra mục "checkoutTotalPrice"
        console.log(localStorage.getItem("checkoutTotalQuantity"));  // Kiểm tra mục "checkoutTotalQuantity"
    
        alert("Đặt hàng thành công!");
    
        // Tự động chuyển đến trang checkorder.html
        window.location.href = "checkorder.html"; // Điều hướng đến trang checkorder.html
    });
    
});
