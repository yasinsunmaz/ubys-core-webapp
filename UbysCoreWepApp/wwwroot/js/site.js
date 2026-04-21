// UBYS Core Web App - Modern Interactions

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.ubys-navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // Mobile Menu
    // ============================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.navbar-nav-custom');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', function () {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link-custom').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    // ============================================
    // Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // Animated Counter
    // ============================================
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // ease-out
            const current = Math.floor(start + (target - start) * eased);
            el.textContent = prefix + current.toLocaleString('tr-TR') + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    // ============================================
    // Smooth Page Transitions
    // ============================================
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
            link.addEventListener('click', function (e) {
                // Don't intercept external links or anchors
                if (link.target === '_blank') return;
            });
        }
    });

    // ============================================
    // Form Validation (Contact Page)
    // ============================================
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span class="spinner"></span> Gönderiliyor...';
            btn.disabled = true;

            // Simulate sending
            setTimeout(() => {
                btn.innerHTML = '✓ Mesajınız Gönderildi!';
                btn.style.background = 'linear-gradient(135deg, #00B894, #55EFC4)';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ============================================
    // Parallax effect for hero orbs
    // ============================================
    const orbs = document.querySelectorAll('.gradient-orb');
    if (orbs.length > 0) {
        window.addEventListener('mousemove', function (e) {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 10;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }

    // ============================================
    // Tilt effect for cards
    // ============================================
    document.querySelectorAll('.feature-card, .service-detail-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });
});
