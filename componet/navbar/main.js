// captcha code & regestration 
function generateCaptcha() {
    let chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("captchaText").textContent = captcha;
}

document.getElementById("refreshCaptcha").addEventListener("click", generateCaptcha);

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // منع الإرسال الافتراضي

    let isValid = true;
    let name = document.getElementById("registerName").value.trim();
    let email = document.getElementById("registerEmail").value.trim();
    let password = document.getElementById("registerPassword").value.trim();
    let captchaInput = document.getElementById("registerCaptcha").value.trim();
    let captchaText = document.getElementById("captchaText").textContent.trim();
    let termsChecked = document.getElementById("agreeTerms").checked;

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // التحقق من الاسم
    if (name === "") {
        document.getElementById("errorName").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorName").style.display = "none";
    }

    // التحقق من البريد الإلكتروني
    if (!emailRegex.test(email)) {
        document.getElementById("errorEmail").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorEmail").style.display = "none";
    }

    // التحقق من كلمة المرور
    if (password === "") {
        document.getElementById("errorPassword").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorPassword").style.display = "none";
    }

    // التحقق من الكابتشا
    if (captchaInput !== captchaText) {
        document.getElementById("errorCaptcha").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorCaptcha").style.display = "none";
    }

    // التحقق من الموافقة على الشروط
    if (!termsChecked) {
        document.getElementById("errorTerms").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("errorTerms").style.display = "none";
    }

    
});

// توليد الكابتشا عند تحميل الصفحة
generateCaptcha();



// for login 
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // منع الإرسال الافتراضي

    let isValid = true;
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function showError(id, condition, message) {
        let errorElement = document.getElementById(id);
        if (condition) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
            isValid = false;
        } else {
            errorElement.style.display = "none";
        }
    }

    // التحقق من الحقول
    showError("errorLoginEmail", !emailRegex.test(email), "Invalid email format.");
    showError("errorLoginPassword", password === "", "Password is required.");

});




// change direction of website 


const translations = {
    en: {

    },
    ar: {
       


    },

};

function setLanguage(language) {
    const textElements = translations[language];

    // العثور على جميع العناصر التي تحتوي على خاصية data-translate
    const translateElements = document.querySelectorAll("[data-translate]");

    translateElements.forEach((element) => {
        const keyOfLanguage = element.getAttribute("data-translate"); // الحصول على المفتاح
        if (textElements[keyOfLanguage]) {
            element.textContent = textElements[keyOfLanguage]; // تعيين النص بناءً على المفتاح
        }
    });
    currentLanguage = language; // Update the current language
    localStorage.setItem("language", language); // تخزين اللغة المختارة في localStorage

    const dropdowns = document.querySelectorAll(".dropdown-menu");

    if (language === "ar") {
        document.documentElement.setAttribute("lang", "ar");
        document.body.dir = "rtl";
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("dropdown-menu-lg-end");
            dropdown.classList.add("dropdown-menu-lg-start");
        });
    } else {
        document.documentElement.setAttribute("lang", "en");
        document.body.dir = "ltr";
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("dropdown-menu-lg-start");
            dropdown.classList.add("dropdown-menu-lg-end");
        });
    }
}


// استعادة اللغة المخزنة عند تحميل الصفحة
window.onload = function () {
    const savedLanguage = localStorage.getItem("language") || "en"; // استخدام اللغة المحفوظة أو الافتراضية (en)
    setLanguage(savedLanguage);

    
};