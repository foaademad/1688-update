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
function showSizeTable(tableId) {
    // إخفاء جميع الجداول
    var tables = document.getElementsByClassName('size-table');
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.display = 'none';
    }

    // إظهار الجدول المحدد
    document.getElementById(tableId).style.display = 'block';

    // إزالة النشاط من جميع الكروت
    var cards = document.getElementsByClassName('cards');
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('active');
    }

    // إضافة النشاط إلى الكرد المحدد
    event.currentTarget.classList.add('active');
}

function updateQuantity(inputId, change, badgeId) {
    var input = document.getElementById(inputId);
    var newValue = parseInt(input.value) + change;
    if (newValue >= 0 && newValue <= parseInt(input.max)) {
        input.value = newValue;
        updateTotalQuantity(badgeId); // تحديث المجموع الكلي
        updateTotalPrice(); // تحديث إجمالي السعر
    }
}

function updateTotalQuantity(badgeId) {
    var badge = document.getElementById(badgeId);
    var inputs = document.querySelectorAll('input[id^="' + badgeId.replace('badge', 'quantity') + '"]');
    var total = 0;
    inputs.forEach(function(input) {
        total += parseInt(input.value);
    });
    badge.textContent = total; // تحديث الرقم فوق الصورة
}

function updateTotalPrice() {
    var totalPrice = 0;
    var inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(function(input) {
        var quantity = parseInt(input.value);
        var price = 63.00; // سعر القطعة الواحدة
        totalPrice += quantity * price;
    });
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2); // عرض الإجمالي
}
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