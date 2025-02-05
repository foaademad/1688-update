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
