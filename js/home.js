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


// ==============================================================
// swiper

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 2000, // تأخير بين كل انتقال (3 ثوانٍ)
        disableOnInteraction: false, // استمر في التشغيل التلقائي حتى عند التفاعل
    },
    loop: true, // تشغيل اللوب حتى لا يتوقف عند آخر سلايد
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        },
    },
});



// ===================================================
//  add cart to fav 
document.addEventListener('DOMContentLoaded', function () {
    const wishlistCount = document.querySelector('.wishlist-count');
    const cartCount = document.querySelector('.cart-count');

    // تحميل العدد المحفوظ من localStorage أو البدء من 0 إذا لم يكن موجودًا
    let wishlistCounter = parseInt(localStorage.getItem('wishlistCount')) || 0;
    let cartCounter = parseInt(localStorage.getItem('cartCount')) || 0;
    wishlistCount.textContent = wishlistCounter;
    cartCount.textContent = cartCounter;

    // تحميل حالة كل زر قلب وزر سلة من localStorage
    document.querySelectorAll('.heart-button, .cart-button').forEach((button, index) => {
        const isClicked = localStorage.getItem(`${button.classList.contains('heart-button') ? 'heartButton' : 'cartButton'}${index}`) === 'true';

        if (isClicked) {
            button.classList.add('active'); // تطبيق اللون إذا تم النقر من قبل
            button.setAttribute('data-clicked', 'true');
        }

        // إضافة حدث النقر على زر القلب أو زر السلة
        button.addEventListener('click', function () {
            const isClicked = button.getAttribute('data-clicked') === 'true';
            const isHeartButton = button.classList.contains('heart-button');

            if (!isClicked) {
                // إذا لم يتم النقر من قبل
                button.setAttribute('data-clicked', 'true');
                button.classList.add('active'); // تغيير اللون
                if (isHeartButton) {
                    wishlistCounter++; // زيادة العدد في القائمة المفضلة
                } else {
                    cartCounter++; // زيادة العدد في السلة
                }
            } else {
                // إذا تم النقر من قبل
                button.setAttribute('data-clicked', 'false');
                button.classList.remove('active'); // إعادة اللون إلى الطبيعي
                if (isHeartButton) {
                    wishlistCounter--; // تقليل العدد في القائمة المفضلة
                } else {
                    cartCounter--; // تقليل العدد في السلة
                }
            }

            // تحديث العدد في الناف بار
            wishlistCount.textContent = wishlistCounter;
            cartCount.textContent = cartCounter;

            // حفظ العدد وحالة الزر في localStorage
            localStorage.setItem('wishlistCount', wishlistCounter);
            localStorage.setItem('cartCount', cartCounter);
            localStorage.setItem(`${isHeartButton ? 'heartButton' : 'cartButton'}${index}`, button.getAttribute('data-clicked'));
        });
    });
});