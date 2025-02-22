// gallory of product 
const thumbnails = document.querySelectorAll('.thumbnail');
const mainMedia = document.getElementById('mainMedia');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

function updateMainMedia(index) {
    // Remove active class from all thumbnails
    thumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.toggle('active', i === index);
    });

    const activeThumbnail = thumbnails[index];

    if (activeThumbnail.tagName === 'VIDEO') {
        // If the thumbnail is a video, set it as the main media
        mainMedia.innerHTML = `
            <video 
                src="${activeThumbnail.src}" 
                controls 
                autoplay 
                muted 
                loop 
                style="width: 100%; height: 100%; object-fit: cover;">
            </video>
        `;
    } else {
        // If the thumbnail is an image, set it as the main media
        mainMedia.innerHTML = `
            <img 
                src="${activeThumbnail.src}" 
                alt="Main Media" 
                style="width: 100%; height: 100%; object-fit: cover;">
            </img>
        `;
    }

    ensureVisible(index);
}

function ensureVisible(index) {
    const activeThumbnail = thumbnails[index];
    activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    // const containerRect = thumbnailsContainer.getBoundingClientRect();
    const thumbnailRect = activeThumbnail.getBoundingClientRect();
    // if (thumbnailRect.left < containerRect.left || thumbnailRect.right > containerRect.right) {
    //     activeThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    // }
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentIndex = index;
        updateMainMedia(index);
    });
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainMedia(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    updateMainMedia(currentIndex);
});

// Initialize the gallery with the first item
updateMainMedia(currentIndex);

// =======================================================
// for countty the size 
let selectedColor = null; // المتغير الذي يخزن اللون المختار

// اختيار اللون
function selectColor(color) {
    const cards = document.getElementsByClassName("cards");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("active");
    }

    const selectedCard = Array.from(cards).find((card) => card.querySelector("p").textContent === color);
    if (selectedCard) {
        selectedCard.classList.add("active");
        selectedColor = color;
    }
}

// تحديث الكميات
function updateQuantity(size, change) {
    if (!selectedColor) return; // إذا لم يكن هناك لون مختار، لا نفعل شيئًا

    const quantityElement = document.getElementById(`quantity_${size}`);
    let currentQuantity = parseInt(quantityElement.textContent) || 0;
    const newQuantity = Math.max(0, currentQuantity + change);

    // تحديث الكميات في الجدول
    quantityElement.textContent = newQuantity;

    // تحديث الرقم فوق الصورة
    const badgeId = `badge_${selectedColor}`;
    const badge = document.getElementById(badgeId);
    let badgeValue = parseInt(badge.textContent) || 0;
    badge.textContent = Math.max(0, badgeValue + change);

    // تحديث السعر الإجمالي
    updateTotalPrice();
}

// تحديث السعر الإجمالي
function updateTotalPrice() {
    let totalPrice = 0;
    const pricePerItem = 63.0; // سعر القطعة الواحدة

    // الحصول على جميع الأحجام من HTML
    const sizes = document.querySelectorAll(".size-table tbody tr");
    sizes.forEach((row) => {
        const size = row.cells[0].textContent.trim(); // اسم الحجم
        const quantity = parseInt(document.getElementById(`quantity_${size}`).textContent) || 0;
        totalPrice += quantity * pricePerItem;
    });

    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2); // عرض الإجمالي
}

// تحديد أول لون تلقائيًا عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.getElementsByClassName("cards");
    if (cards.length > 0) {
        const firstCard = cards[0];
        const firstColor = firstCard.querySelector("p").textContent;
        selectColor(firstColor); // اختيار أول لون تلقائيًا
    }
});

// ==========================
// recomdation of the prodcut of slider
function scrollNav(direction) {
const nav = document.querySelector(".rec-product");
const scrollAmount = 200;

if (direction === "left") {
nav.scrollTo({
    left: nav.scrollLeft + scrollAmount,
    behavior: "smooth",
});
} else {
nav.scrollTo({
    left: nav.scrollLeft - scrollAmount,
    behavior: "smooth",
});
}
}

// lemit letter in the title of the product
document.addEventListener("DOMContentLoaded", () => {
const productTitles = document.querySelectorAll(".product-card h5");

productTitles.forEach((title) => {
if (title.textContent.length > 60) {
title.textContent = title.textContent.slice(0, 60) + "...";
}
});
});
// ==========================
// Tab Switching Logic
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
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