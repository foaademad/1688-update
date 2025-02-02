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