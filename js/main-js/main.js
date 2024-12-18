const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});
// TOGGLE SIDEBAR
const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})
const searchButton = document.querySelector('.content nav form .form-input button');
const searchButtonIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})
if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}
window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})
const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
//Mở các sidebar
document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll("#sidebar a[data-target]");
    const mainContainer = document.getElementById("main-container");

    const appElement = document.querySelector('[ng-app="AppAdmin"]');
    const appScope = angular.element(appElement).scope();
    const $injector = angular.element(appElement).injector();
    const $compile = $injector.get('$compile');

    async function loadPage(targetURL) {
        try {
            const response = await fetch(targetURL);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();

            const contentContainer = document.getElementById("content");
            if (!contentContainer) throw new Error("Không tìm thấy thẻ #content trong DOM.");

            contentContainer.innerHTML = html;

            const scripts = Array.from(contentContainer.querySelectorAll("script[src]")).map(script => script.src);
            contentContainer.querySelectorAll("script[src]").forEach(script => script.remove());

            await loadScriptsSequentially(scripts);

            const contentScope = appScope.$new(); // Tạo scope mới
            $compile(contentContainer)(contentScope); // Compile nội dung với Angular
            contentScope.$apply(); // Áp dụng thay đổi
        } catch (error) {
            console.error("Lỗi tải trang:", error);
            mainContainer.innerHTML = "<p>Không thể tải nội dung. Vui lòng thử lại.</p>";
        }
    }

    function loadScriptsSequentially(scripts) {
        return scripts.reduce((promise, scriptUrl) => {
            return promise.then(() => {
                return new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src = scriptUrl;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            });
        }, Promise.resolve());
    }

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetPage = link.getAttribute("data-target");
            const targetURL = `${targetPage}.html`;
            loadPage(targetURL);
        });
    });

    // Tải trang mặc định
    loadPage("content.html");
});

