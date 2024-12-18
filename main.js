/*=============== HIỂN THỊ MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== HIỂN THỊ MENU =====*/
/* Kiểm tra xem phần tử tồn tại không */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}
/*===== ẨN MENU =====*/
/* Kiểm tra xem phần tử tồn tại không */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}
/*=============== XÓA MENU TRÊN DI ĐỘNG ===============*/
const navLink = document.querySelectorAll('.nav__link')
function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // Khi chúng ta nhấn vào mỗi nav__link, ta sẽ xóa class show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== THAY ĐỔI NỀN HEADER KHI CUỘN ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // Khi cuộn xuống hơn 80 chiều cao của viewport, thêm class scroll-header vào thẻ header
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== CÂU HỎI DẠNG ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})


/*=============== TĂNG VÀ GIẢM SỐ LƯỢNG SẢN PHẨM ===============*/
function increaseAmount(id)
{
    var a = document.getElementById(id).value;
    document.getElementById(id).value = Number(a) + 1;
}
function descreaAmount(id)
{
    var a = document.getElementById(id).value;
    if(Number(a)>1)
        document.getElementById(id).value = Number(a) - 1;
}

/*=============== PHẦN NÀY ĐỂ ĐIỀU KHIỂN CHUYỂN ĐỔI CÁC NỘI DUNG ACCORDION ===============*/
const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }
}

const navLinks = document.querySelectorAll('.nav__link');

// Kiểm tra xem có liên kết đã được lưu trong localStorage không
const activeLink = localStorage.getItem('activeLink');

if (activeLink) {
    navLinks.forEach(link => {
        if (link.getAttribute('href') === activeLink) {
            link.classList.add('active-link');
        }
    });
}

navLinks.forEach(link => {
    // Tạo sự kiện khi di chuột qua
    link.addEventListener('mouseover', function() {
        this.classList.add('active-link');
    });

    // Tạo sự kiện khi chuột rời khỏi
    link.addEventListener('mouseout', function() {
        if (this.getAttribute('href') !== activeLink) {
            this.classList.remove('active-link');
        }
    });

    // Tạo sự kiện khi nhấp chuột
    link.addEventListener('click', function() {
        // Xóa active-link khỏi tất cả các liên kết
        navLinks.forEach(nav => nav.classList.remove('active-link'));
        // Thêm active-link vào liên kết đã nhấp
        this.classList.add('active-link');
        
        // Lưu liên kết hiện tại vào localStorage
        localStorage.setItem('activeLink', this.getAttribute('href'));
        
    });
});

// Sự kiện cuộn có thể được thêm ở đây nếu bạn cần
// window.addEventListener('scroll', scrollActive);

/*=============== HIỂN THỊ NÚT CUỘN LÊN ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // Khi cuộn lên hơn 400 chiều cao viewport, thêm class show-scroll vào thẻ a có class scroll-top
    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== CHỦ ĐỀ TỐI SÁNG ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Chủ đề được chọn trước đó (nếu người dùng đã chọn)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Lấy chủ đề hiện tại mà giao diện có bằng cách kiểm tra class dark-theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// Kiểm tra xem người dùng đã chọn chủ đề trước đó chưa
if (selectedTheme) {
  // Nếu đã chọn, kiểm tra để kích hoạt hoặc hủy kích hoạt chế độ tối
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}
// Kích hoạt / hủy kích hoạt chủ đề thủ công bằng nút
themeButton.addEventListener('click', () => {
    // Thêm hoặc xóa chủ đề tối / biểu tượng
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // Lưu chủ đề và biểu tượng hiện tại mà người dùng đã chọn
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== HIỆU ỨNG CUỘN REVEAL ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})
sr.reveal(`.home__data`)
sr.reveal(`.home__img`, { rotate: {z:-30}, distance: 0})
sr.reveal(`.home__social`, {delay: 600})
sr.reveal(`.about__img, .contact__box`,{origin: 'left'})
sr.reveal(`.about__data, .contact__form`,{origin: 'right'})
sr.reveal(`.steps__card, .questions__group, .footer`,{interval: 100})
sr.reveal(`.new__card:nth-child(1) img`, { rotate: {z:-30}, distance: 0})
sr.reveal(`.new__card:nth-child(2) img`, { rotate: {z: 15}, distance: 0, delay: 600})
sr.reveal(`.new__card:nth-child(3) img`, { rotate: {z: -30}, distance: 0, delay: 900})

const productLink = document.getElementById('productLink');
const dropdownMenu = document.getElementById('dropdownMenu');

document.querySelectorAll('.menuproduct__img-wrapper').forEach(function(wrapper) {
    wrapper.addEventListener('click', function() {
        window.location.href = 'prod.html';
    });
});

document.querySelectorAll('.menuproduct__img-wrapper').forEach(function(wrapper) {
    wrapper.addEventListener('click', function() {
        window.location.href = 'prod.html';
    });
});
function increaseAmount(id)
{
    var a = document.getElementById(id).value;
    document.getElementById(id).value = Number(a) + 1;
}
function descreaAmount(id)
{
    var a = document.getElementById(id).value;
    if(Number(a)>1)
        document.getElementById(id).value = Number(a) - 1;
}
$(document).ready(function () { 
    // Lấy chi tiết đơn hàng từ localStorage và đảm bảo nó là một mảng hợp lệ
    var orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (!Array.isArray(orderDetails)) {
        orderDetails = [];  // Nếu không phải mảng, khởi tạo lại nó là mảng rỗng
    }
    var count = orderDetails.reduce((acc, cur) => acc + cur.quantity, 0); // Tính tổng số lượng sản phẩm

    // Cập nhật số lượng giỏ hàng khi trang tải
    $("#cart").find(".num").text(count);

    // Lắng nghe sự kiện click vào nút "Add to Cart"
    $(document).on("click", ".product__button, .add-cart, .add", function () {
        // Lấy thông tin sản phẩm từ gần thẻ button
        const item = $(this).closest(".product__card, .card-product"); // Lựa chọn đúng phần tử cha
        const name = item.find(".product__title").text().trim();
        const price = item.find(".product__price, .price").contents().first().text().trim(); // Lấy giá chính xác
        const photo = item.find("img.product__img").attr("src");

        // Tìm sản phẩm đã tồn tại trong giỏ hàng
        const existingOrder = orderDetails.find(order => order.name === name);
        if (existingOrder) {
            existingOrder.quantity += 1; // Nếu sản phẩm đã tồn tại thì tăng số lượng
        } else {
            // Nếu chưa có sản phẩm trong giỏ hàng thì thêm mới
            orderDetails.push({ name, price, photo, quantity: 1 });
        }

        // Lưu lại danh sách đơn hàng vào localStorage
        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

        // Cập nhật lại số lượng giỏ hàng
        const totalQuantity = orderDetails.reduce((acc, item) => acc + item.quantity, 0);
        $("#cart .num").text(totalQuantity);
    });    
});
$(document).ready(function () {
    $(".product__card").find(".product__img").click(function () {
        let item = $(this).closest(".product__card");

        let order = {
            name: item.find(".product__title").text(),
            price: item.find(".product__price").text(),
            photo: item.find(".product__img").attr("src"),
            photo1: item.find(".pro__img-1").attr("src"),
            photo2: item.find(".pro__img-2").attr("src"),
            header: item.find(".prod__title").text(),
        };

        localStorage.setItem("orderDetails", JSON.stringify(order));
        window.location.href = "favorite.html"; // Redirect to details page
    });
});
