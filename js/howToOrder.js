// show slide bar 
function toggleMenu() {
    let menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener("click", function(event) {
    let menu = document.getElementById("dropdownMenu");
    let icon = document.querySelector(".menu-icon");

    if (!menu.contains(event.target) && !icon.contains(event.target)) {
        menu.style.display = "none";
    }
});

// show active section 
function showContent(sectionId, sectionName, clickedElement) {
    // إخفاء جميع الأقسام
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // إظهار القسم المختار
    document.getElementById(sectionId).classList.add('active');

    // تحديث الـ breadcrumb في الـ nav
    document.getElementById('breadcrumb').textContent = sectionName;

    // إزالة الكلاس النشط من جميع الروابط
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.classList.remove('active-link');
    });

    // إضافة الكلاس النشط للعنصر الذي تم النقر عليه
    clickedElement.classList.add('active-link');
}
