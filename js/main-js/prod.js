document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filter-btn');
    const filterMenu = document.getElementById('filter-menu');
    const navClose = document.getElementById('btn__close');
    const toolbar = document.querySelector('.toolbar');
    const productContainer = document.querySelector('.product__container');

    if (filterBtn && filterMenu) {
        // Hiển thị filter menu và dịch chuyển toolbar, product khi nhấn "BỘ LỌC"
        filterBtn.addEventListener('click', () => {
            filterMenu.classList.toggle('active'); // Hiện/ẩn menu
            toolbar.classList.toggle('shift-right'); // Dịch toolbar
            productContainer.classList.toggle('shift-right'); // Dịch product
        });
    }

    if (navClose && filterMenu) {
        // Đóng filter menu và trả toolbar, product về vị trí cũ khi nhấn "Đóng"
        navClose.addEventListener('click', () => {
            filterMenu.classList.remove('active'); // Ẩn menu
            toolbar.classList.remove('shift-right'); // Trả toolbar về
            productContainer.classList.remove('shift-right'); // Trả product về
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container-products');
    const products = document.querySelectorAll('.card-product');
    const totalProducts = products.length; // Tổng số phần tử
    const transitionTime = 3000; // Thời gian chuyển slide (ms)
    let currentIndex = 0; // Vị trí hiện tại của slider

    // Lấy số lượng phần tử hiển thị dựa trên kích thước màn hình
    function getVisibleItems() {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1500) return 5;
        if (screenWidth > 1200) return 4; // Desktop lớn
        if (screenWidth > 992) return 3; // Desktop trung bình
        if (screenWidth > 768) return 2; // Tablet
        return 1; // Mobile
    }

    function updateSlider() {
        const visibleItems = getVisibleItems();

        // Nếu đến 4 phần tử cuối cùng, quay lại phần tử đầu tiên
        if (currentIndex >= totalProducts - visibleItems) {
            currentIndex = 0; // Reset về phần tử đầu tiên
            container.style.transition = 'none'; // Tắt hiệu ứng
            container.style.transform = 'translateX(0)'; // Reset vị trí
        } else {
            currentIndex++;
            const movePercentage = (currentIndex * 100) / visibleItems;
            container.style.transition = 'transform 0.5s ease-in-out'; // Hiệu ứng chuyển
            container.style.transform = `translateX(-${movePercentage}%)`;
        }
    }

    function startSlider() {
        // Kiểm tra kích thước màn hình, nếu nhỏ hơn 768px, dừng hiệu ứng
        if (window.innerWidth < 768) {
            return; // Không chạy slider
        }

        setInterval(() => {
            updateSlider();
        }, transitionTime);
    }

    // Xử lý khi resize cửa sổ
    window.addEventListener('resize', () => {
        container.style.transition = 'none'; // Reset hiệu ứng khi thay đổi kích thước
        container.style.transform = 'translateX(0)'; // Reset vị trí về đầu
        currentIndex = 0; // Reset vị trí hiện tại

        // Nếu kích thước màn hình thay đổi nhỏ hơn 768px, dừng slider
        if (window.innerWidth < 768) {
            return; // Không chạy slider
        }
    });

    // Khởi tạo slider
    startSlider();
});
