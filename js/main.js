/* 
   Benin Organics SA - Main JavaScript
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Benin Organics SA - System Ready');

    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    initMobileMenu();
    initGoogleTranslate();
    initGoogleTranslate();
    initScrollAnimations();
    initContactForm();
    initHeroSlider();
});

/* Hero Slider Logic */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const titleEl = document.getElementById('heroTitle');
    const subtitleEl = document.getElementById('heroSubtitle');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    setInterval(() => {
        // Prepare next slide index
        const nextSlide = (currentSlide + 1) % slides.length;

        // 1. Text Fade Out
        if (titleEl) {
            titleEl.style.opacity = '0';
            titleEl.style.transition = 'opacity 0.5s ease';
        }
        if (subtitleEl) {
            subtitleEl.style.opacity = '0';
            subtitleEl.style.transition = 'opacity 0.5s ease';
        }

        // 2. Change Image & Text Content (after fade out)
        setTimeout(() => {
            slides[currentSlide].classList.remove('active');
            slides[nextSlide].classList.add('active');

            // Validate availability of data before updating
            if (slides[nextSlide].dataset.title && titleEl) titleEl.innerText = slides[nextSlide].dataset.title;
            if (slides[nextSlide].dataset.subtitle && subtitleEl) subtitleEl.innerText = slides[nextSlide].dataset.subtitle;

            // 3. Text Fade In
            if (titleEl) titleEl.style.opacity = '1';
            if (subtitleEl) subtitleEl.style.opacity = '1';

            currentSlide = nextSlide;
        }, 500); // Wait for fade out
    }, slideInterval);
}

/* Contact Form Logic */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            // Loading State
            btn.innerText = 'Envoi en cours...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                // Success State
                btn.innerText = 'Envoyé !';
                btn.style.backgroundColor = 'var(--color-secondary)';

                feedback.style.display = 'block';
                feedback.style.backgroundColor = '#d4edda';
                feedback.style.color = '#155724';
                feedback.innerText = 'Merci ! Votre demande a été transmise à notre équipe commerciale.';

                form.reset();

                // Reset Button after delay
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    feedback.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
}

/* Mobile Menu Logic */
function initMobileMenu() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

/* Scroll Animations */
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.section-title, .product-card, .stat-item, .hero-content, .about-text, .about-image');

    // Add initial class to elements we want to animate
    reveals.forEach(el => el.classList.add('reveal'));

    const observeElements = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach((el) => observeElements.observe(el));
}

/* Google Translate Custom Logic */
function initGoogleTranslate() {
    // Set FR as active by default if no cookie
    const btns = document.querySelectorAll('.lang-btn');
    const savedLang = getCookie('googtrans');

    btns.forEach(btn => {
        // Set initial active state based on text content (FR, EN, HI)
        if (!savedLang && btn.innerText === 'FR') {
            btn.classList.add('active');
        } else if (savedLang && savedLang.endsWith(btn.innerText.toLowerCase())) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', function () {
            // Remove active from all
            btns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            this.classList.add('active');
        });
    });

    // This will be connected to the specific buttons
    window.triggerGoogleTranslate = function (lang) {
        if (lang === 'fr') {
            // Clear cookies to reset to default
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + document.domain;
            location.reload();
        } else {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = lang;
                select.dispatchEvent(new Event('change'));
            } else {
                console.warn('Google Translate element not found');
            }
        }
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
