
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
