/*
Lantana Café — bilingual (Kurdish / English) site
Based on TemplateMo 595 3d coverflow
https://templatemo.com/tm-595-3d-coverflow
*/

// ---------- Translations ----------
const translations = {
    en: {
        brandName: "Lantana Café",
        navHome: "Home",
        navMenu: "Menu",
        navContact: "Contact",
        heroKicker: "Featured Drinks",
        menuHeading: "Our Menu",
        menuSubtitle: "Pick a category and discover what we're brewing today",
        contactHeading: "Get In Touch",
        contactSubtitle: "We'd love to see you at Lantana Café. Stop by, call, or send us a message online.",
        labelPhone: "Phone",
        labelEmail: "Email",
        labelAddress: "Address",
        labelHours: "Working Hours",
        followUs: "Follow Us",
        footerText: "All rights reserved."
    },
    ku: {
        brandName: "قەهوەخانەی لانتانا",
        navHome: "سەرەکی",
        navMenu: "مینیۆ",
        navContact: "پەیوەندی",
        heroKicker: "خواردنەوە تایبەتەکان",
        menuHeading: "مینیۆی ئێمە",
        menuSubtitle: "بەشێک هەڵبژێرە و بزانە ئەمڕۆ چیمان بۆ ئامادەکردووە",
        contactHeading: "پەیوەندیمان پێوە بکە",
        contactSubtitle: "خۆشحاڵ دەبین لە قەهوەخانەی لانتانا بتبینین. سەردانمان بکە، پەیوەندیمان پێوە بکە، یان نامەیەکمان بۆ بنێرە.",
        labelPhone: "ژمارەی مۆبایل",
        labelEmail: "ئیمەیل",
        labelAddress: "شوێن",
        labelHours: "کاتی کارکردن",
        followUs: "شوێنمان بکەوە",
        footerText: "هەموو مافەکان پارێزراون."
    }
};

let currentLang = 'ku';

function applyTranslations() {
    const dict = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    document.documentElement.lang = currentLang === 'ku' ? 'ckb' : 'en';
    document.documentElement.dir = currentLang === 'ku' ? 'rtl' : 'ltr';

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    renderCoverflowCaption();
}

function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    applyTranslations();
}

// ---------- Coverflow functionality ----------
const items = document.querySelectorAll('.coverflow-item');
const dotsContainer = document.getElementById('dots');
const currentTitle = document.getElementById('current-title');
const currentDescription = document.getElementById('current-description');
const container = document.querySelector('.coverflow-container');
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
let currentIndex = 3;
let isAnimating = false;

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainMenu.classList.toggle('active');
});

// Close mobile menu when clicking on menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        mainMenu.classList.remove('active');
    }
});

// Language toggle buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Featured drink data for the coverflow (bilingual)
// TO CHANGE A PHOTO: paste your image link (or local file path) into the "img" field below.
// A web link looks like: img: "https://example.com/my-photo.jpg"
// A local file looks like: img: "images/spanish-latte.jpg" (put the file inside the images/ folder first)
const imageData = [
    { en: "Spanish Latte", ku: "سپانش لاتێ", img: "https://www.nestleprofessional.in/sites/default/files/2024-09/Spanish%20Latte-420x330_16_11zon.webp" },
    { en: "Iced Caramel Macchiato", ku: "کارامێل ماکیاتۆی سارد", img: "https://athome.starbucks.com/sites/default/files/2024-05/CAH_RecipePLPImage_420x580_%402x_0.jpg" },
    { en: "Classic Cappuccino", ku: "کاپەچینۆی کلاسیک",  img: "https://img.freepik.com/premium-photo/close-up-cup-cappuccino-vintage-style_759575-5696.jpg" },
    { en: "Cold Brew", ku: "کۆڵد برو",  img: "https://www.kaffee-partner.de/files/content/000/magazin/bilder/cold-brew-mit-kaffeebohnen.jpg" },
    { en: "Turkish Coffee", ku: "قاوەی تورکی", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMoobDMLfRBSWbxn0SirU8sywnibKimxYrTNGa09FPv0Nr7iSSw2-Z4v4&s=10" },
    { en: "Matcha Freeze", ku: "ماچا فریز", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtVyKEPXgCgIzgLSwyi1nEJ-3sH-jc8MapJ9RP5Npm0NKlyUGsnOqi3SQ&s=10" },
    { en: "Signature Mocha", ku: "مۆکای تایبەتی لانتانا", img: "https://www.maxx-coffee.com/assets/img/product/MAXX-COFFEE-SIGNATURE-MOCHA.jpg" }
];

// Create dots
items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => goToIndex(index);
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');
let autoplayInterval = null;
let isPlaying = true;
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

function renderCoverflowCaption() {
    const currentData = imageData[currentIndex];
    if (!currentData) return;
    currentTitle.textContent = currentLang === 'ku' ? currentData.ku : currentData.en;
    currentDescription.textContent = currentLang === 'ku' ? currentData.descKu : currentData.descEn;
}

function updateCoverflow() {
    if (isAnimating) return;
    isAnimating = true;

    items.forEach((item, index) => {
        let offset = index - currentIndex;

        if (offset > items.length / 2) {
            offset = offset - items.length;
        }
        else if (offset < -items.length / 2) {
            offset = offset + items.length;
        }

        const absOffset = Math.abs(offset);
        const sign = Math.sign(offset);

        let translateX = offset * 220;
        let translateZ = -absOffset * 200;
        let rotateY = -sign * Math.min(absOffset * 60, 60);
        let opacity = 1 - (absOffset * 0.2);
        let scale = 1 - (absOffset * 0.1);

        if (absOffset > 3) {
            opacity = 0;
            translateX = sign * 800;
        }

        item.style.transform = `
            translateX(${translateX}px) 
            translateZ(${translateZ}px) 
            rotateY(${rotateY}deg)
            scale(${scale})
        `;
        item.style.opacity = opacity;
        item.style.zIndex = 100 - absOffset;

        item.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });

    renderCoverflowCaption();

    currentTitle.style.animation = 'none';
    currentDescription.style.animation = 'none';
    setTimeout(() => {
        currentTitle.style.animation = 'fadeIn 0.6s forwards';
        currentDescription.style.animation = 'fadeIn 0.6s forwards';
    }, 10);

    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

function navigate(direction) {
    if (isAnimating) return;

    currentIndex = currentIndex + direction;

    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    } else if (currentIndex >= items.length) {
        currentIndex = 0;
    }

    updateCoverflow();
}

function goToIndex(index) {
    if (isAnimating || index === currentIndex) return;
    currentIndex = index;
    updateCoverflow();
}

// Keyboard navigation
container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
});

// Click on items to select
items.forEach((item, index) => {
    item.addEventListener('click', () => goToIndex(index));
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let isSwiping = false;

container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    isSwiping = true;
}, { passive: true });

container.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    const currentX = e.changedTouches[0].screenX;
    const diff = currentX - touchStartX;

    if (Math.abs(diff) > 10) {
        e.preventDefault();
    }
}, { passive: false });

container.addEventListener('touchend', (e) => {
    if (!isSwiping) return;

    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
    isSwiping = false;
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 30;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        handleUserInteraction();

        if (diffX > 0) {
            navigate(1);
        } else {
            navigate(-1);
        }
    }
}

// Initialize coverflow images (drink illustrations)
items.forEach((item, index) => {
    const img = item.querySelector('img');
    const reflection = item.querySelector('.reflection');

    img.src = imageData[index].img;

    img.onload = function () {
        this.parentElement.classList.remove('image-loading');
        reflection.style.backgroundImage = `url(${this.src})`;
        reflection.style.backgroundSize = 'cover';
        reflection.style.backgroundPosition = 'center';
    };

    img.onerror = function () {
        this.parentElement.classList.add('image-loading');
    };
});

// Autoplay functionality
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCoverflow();
    }, 4000);
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
}

function toggleAutoplay() {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

function handleUserInteraction() {
    stopAutoplay();
}

items.forEach((item) => {
    item.addEventListener('click', handleUserInteraction);
});

document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);

dots.forEach((dot) => {
    dot.addEventListener('click', handleUserInteraction);
});

container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        handleUserInteraction();
    }
});

// ---------- Menu (categories) ----------
// The menu items now live directly in index.html (look for the .menu-panel
// blocks inside the #menu section) - see the HTML comment right above them
// for how to add or remove categories and items yourself. This script only
// switches which category panel is visible when a tab is clicked.

function showCategory(category) {
    const panel = document.querySelector(`.menu-panel[data-category="${category}"]`);
    if (!panel) return;

    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
    document.querySelectorAll('.menu-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.category === category);
    });
}

document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => showCategory(tab.dataset.category));
});

// ---------- Smooth scrolling and active menu item ----------
const sections = document.querySelectorAll('.section');
const menuItems = document.querySelectorAll('.menu-item');
const header = document.getElementById('header');
const scrollToTopBtn = document.getElementById('scrollToTop');

function updateActiveMenuItem() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            menuItems.forEach(item => item.classList.remove('active'));
            if (menuItems[index]) {
                menuItems[index].classList.add('active');
            }
        }
    });

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

window.addEventListener('scroll', updateActiveMenuItem);

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const targetId = item.getAttribute('href');

        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

document.querySelector('.logo-container').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Initialize ----------
applyTranslations();
updateCoverflow();
container.focus();
startAutoplay();