// ================================+++++++++++++=========================
// for form in  calculate 

document.getElementById("shippingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // منع التحقق الافتراضي للنموذج

    let isValid = true;

    // التحقق من الوزن
    let weightInput = document.getElementById("weight");
    if (weightInput.value.trim() === "" || parseFloat(weightInput.value) <= 0) {
        weightInput.classList.add("is-invalid");
        isValid = false;
    } else {
        weightInput.classList.remove("is-invalid");
    }

    // التحقق من الدولة
    let countrySelect = document.getElementById("country");
    if (countrySelect.value === "") {
        countrySelect.classList.add("is-invalid");
        isValid = false;
    } else {
        countrySelect.classList.remove("is-invalid");
    }

    // إذا كان كل شيء صحيح، يمكنك تنفيذ عملية الحساب هنا
    if (isValid) {
        // alert("Form submitted successfully! 🚀");
    }
});

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
