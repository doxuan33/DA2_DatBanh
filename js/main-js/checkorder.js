$(document).ready(function () {
    // Lấy danh sách tất cả đơn hàng từ localStorage
    const orders = JSON.parse(localStorage.getItem("allOrders")) || [];

    if (orders.length === 0) {
        $(".orderDetails").html("<p>Không có thông tin đơn hàng!</p>");
        return;
    }

    let content = "";
    orders.forEach((order, index) => {
        content += `
            <div class="order-summary" data-index="${index}">
                <h3>Đơn hàng #${index + 1} - Ngày đặt: ${order.orderDate}</h3>
                <div class="summary-info">
                    <div><strong>Tổng số lượng:</strong> ${order.totalQuantity}</div>
                    <div><strong>Tổng tiền:</strong> ${order.totalPrice}</div>
                </div>
                <div class="order-full-details" style="display: none;">
                    <h4>Chi Tiết Đơn Hàng:</h4>
                    <div><strong>Họ và tên:</strong> ${order.name}</div>
                    <div><strong>Số điện thoại:</strong> ${order.phone}</div>
                    <div><strong>Địa chỉ:</strong> ${order.address}</div>
                    <div><strong>Quốc gia:</strong> ${order.country}</div>
                    <div><strong>Thành phố:</strong> ${order.city}</div>
                    <div><strong>Phương thức giao hàng:</strong> ${order.deliveryMethod}</div>
                    <div><strong>Chi nhánh:</strong> ${order.branch}</div>
                </div>
                <div class="order-items">
                    <h4>Sản phẩm:</h4>
                    <!-- Kiểm tra sự tồn tại của order.items[0] -->
                    ${order.items.length > 0 ? `
                        <div class="item">
                            <img src="${order.items[0].photo}" alt="">
                            <div class="info">
                                <div class="name">${order.items[0].name}</div>
                                <div class="price">${order.items[0].price}/1 sản phẩm</div>
                            </div>
                            <div class="quantity">${order.items[0].quantity}</div>
                            <div class="returnPrice">${(parseFloat(order.items[0].price.replace(/[^\d.-]/g,)) * order.items[0].quantity).toLocaleString()}.000đ</div>
                        </div>
                    ` : `<p>Không có sản phẩm trong đơn hàng này</p>`}
                </div>
                <div class="order-full-details" style="display: none;">
                    <div class="order-items">
                        ${order.items.slice(1).map(item => {
                            const price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
                            const itemTotalPrice = (price * item.quantity).toLocaleString() + ".000đ";
                            return `
                                <div class="item">
                                    <img src="${item.photo}" alt="">
                                    <div class="info">
                                        <div class="name">${item.name}</div>
                                        <div class="price">${item.price}/1 sản phẩm</div>
                                    </div>
                                    <div class="quantity">${item.quantity}</div>
                                    <div class="returnPrice">${itemTotalPrice}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div> 
                <button class="delete-order-btn">Xóa đơn hàng</button> <!-- Nút xóa -->
            </div>
            <hr>
        `;
    });
    $(".orderList").html(content);

    // Show/Hide order details on click
    $(".order-summary").click(function() {
        const index = $(this).data("index");
        const orderFullDetails = $(this).find(".order-full-details");
        orderFullDetails.toggle();
    });
    // Xử lý xóa đơn hàng
    $(".delete-order-btn").click(function(event) {
        event.stopPropagation();  // Ngừng sự kiện click truyền lên phần tử cha
        const index = $(this).closest(".order-summary").data("index");  // Lấy index của đơn hàng cần xóa
        const orders = JSON.parse(localStorage.getItem("allOrders")) || [];  // Lấy lại danh sách đơn hàng từ localStorage

        // Xóa đơn hàng khỏi mảng orders
        orders.splice(index, 1);

        // Cập nhật lại localStorage với danh sách đơn hàng đã xóa
        localStorage.setItem("allOrders", JSON.stringify(orders));

        // Cập nhật lại giao diện
        $(this).closest(".order-summary").remove();  // Xóa phần tử giao diện tương ứng
    });
});
