// ACCESSIBILITY: FONT SIZE & CONTRAST
// =================================================================
function initAccessibility() {
    const incBtn = document.getElementById('fontInc');
    const decBtn = document.getElementById('fontDec');
    const contrastBtn = document.getElementById('contrastToggle');
    let fontSize = parseInt(localStorage.getItem('fontSize') || 16);
    function setFontSize(size) {
        fontSize = Math.max(12, Math.min(24, size));
        document.documentElement.style.fontSize = fontSize + 'px';
        localStorage.setItem('fontSize', fontSize);
    }
    setFontSize(fontSize);
    if (incBtn) incBtn.onclick = () => setFontSize(fontSize + 2);
    if (decBtn) decBtn.onclick = () => setFontSize(fontSize - 2);
    // High contrast
    if (contrastBtn) {
        let isContrast = localStorage.getItem('contrast') === '1';
        function setContrast(on) {
            if (on) document.documentElement.classList.add('high-contrast');
            else document.documentElement.classList.remove('high-contrast');
            localStorage.setItem('contrast', on ? '1' : '0');
        }
        setContrast(isContrast);
        contrastBtn.onclick = () => {
            isContrast = !isContrast;
            setContrast(isContrast);
        };
    }
}
// LANGUAGE TOGGLE (AR/EN) PLACEHOLDER
// =================================================================
function initLangToggle() {
    const btn = document.getElementById('langToggle');
    if (!btn) return;
    let isAr = localStorage.getItem('lang') === 'ar';
    function setLang(ar) {
        btn.textContent = ar ? 'EN' : 'AR';
        localStorage.setItem('lang', ar ? 'ar' : 'en');
    }
    setLang(isAr);
    btn.addEventListener('click', function() {
        isAr = !isAr;
        setLang(isAr);
        // Placeholder: هنا يمكن إضافة كود الترجمة لاحقًا
        alert(isAr ? 'سيتم دعم اللغة العربية قريبًا' : 'English language active');
    });
}
            // LAZY LOAD IMAGES
            // =================================================================
            function initLazyImages() {
                if (!('IntersectionObserver' in window)) return;
                const imgs = document.querySelectorAll('img[data-src]');
                if (!imgs.length) return;
                const observer = new IntersectionObserver(function(entries, obs) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.getAttribute('data-src');
                            img.removeAttribute('data-src');
                            obs.unobserve(img);
                        }
                    });
                }, { rootMargin: '0px 0px 200px 0px', threshold: 0.01 });
                imgs.forEach(function(img) { observer.observe(img); });
            }
        // TYPEWRITER EFFECT FOR HERO TITLE
        // =================================================================
        function initTypewriter() {
            const el = document.getElementById('typewriterTitle');
            if (!el) return;
            const phrases = [
                'Cybersecurity-Oriented Software Engineer',
                'CTF Player & Problem Solver',
                'AI & Data Engineering Enthusiast',
                'Technical Community Lead'
            ];
            // Prevent layout shift: set min-height to the tallest phrase (pixel-perfect)
            let maxPhrase = phrases.reduce((a, b) => a.length > b.length ? a : b, '');
            const measure = document.createElement('span');
            const cs = window.getComputedStyle(el);
            measure.style.visibility = 'hidden';
            measure.style.position = 'absolute';
            measure.style.whiteSpace = 'nowrap';
            measure.style.font = cs.font;
            measure.style.fontSize = cs.fontSize;
            measure.style.fontWeight = cs.fontWeight;
            measure.style.lineHeight = cs.lineHeight;
            measure.style.letterSpacing = cs.letterSpacing;
            measure.style.padding = cs.padding;
            measure.style.margin = cs.margin;
            measure.style.border = cs.border;
            measure.textContent = maxPhrase;
            document.body.appendChild(measure);
            el.style.minHeight = (measure.offsetHeight + 20) + 'px'; // هامش صغير احتياطي
            el.style.display = 'inline-block';
            el.style.transition = 'min-height 0.25s cubic-bezier(.4,1.3,.6,1)';
            measure.remove();
            let phraseIdx = 0;
            let charIdx = 0;
            let isDeleting = false;
            let delay = 80;
            function type() {
                const phrase = phrases[phraseIdx];
                if (isDeleting) {
                    charIdx--;
                } else {
                    charIdx++;
                }
                el.textContent = phrase.substring(0, charIdx);
                if (!isDeleting && charIdx === phrase.length) {
                    isDeleting = true;
                    delay = 1200;
                } else if (isDeleting && charIdx === 0) {
                    isDeleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    delay = 400;
                } else {
                    delay = isDeleting ? 40 : 80;
                }
                setTimeout(type, delay);
            }
            type();
        }
    // CV MODAL
    // =================================================================
    function initCvModal() {
        const btn = document.getElementById('cvModalBtn');
        const modal = document.getElementById('cvModal');
        const closeBtn = document.getElementById('closeCvModal');
        if (!btn || !modal || !closeBtn) return;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
/**
 * PORTFOLIO JAVASCRIPT
 * Vanilla JS for interactions and animations
 * No dependencies, GitHub Pages compatible
 */

(function() {
    'use strict';

    // =================================================================
    // ANIMATED BACKGROUND: PARTICLES & ATOMS
    // =================================================================
    function initAnimatedBackground() {
        const canvas = document.getElementById('animatedBg');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let dpr = window.devicePixelRatio || 1;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles = [];
        const PARTICLE_COUNT = 60;
        function resize() {
            dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(1,0,0,1,0,0);
            ctx.scale(dpr, dpr);
        }
        window.addEventListener('resize', resize);
        resize();
        // Particle system
        function randomParticle() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                r: 1.5 + Math.random() * 2.5,
                dx: -0.3 + Math.random() * 0.6,
                dy: -0.3 + Math.random() * 0.6,
                alpha: 0.3 + Math.random() * 0.5
            };
        }
        particles = Array.from({length: PARTICLE_COUNT}, randomParticle);
        function draw() {
            ctx.clearRect(0, 0, width, height);
            // Draw particles
            for (let p of particles) {
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
                ctx.fillStyle = '#00d9ff';
                ctx.shadowColor = '#00d9ff';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
            }
            // Draw lines between close particles
            for (let i=0; i<particles.length; ++i) {
                for (let j=i+1; j<particles.length; ++j) {
                    const a = particles[i], b = particles[j];
                    const dist = Math.hypot(a.x-b.x, a.y-b.y);
                    if (dist < 90) {
                        ctx.save();
                        ctx.globalAlpha = 0.08;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = '#00d9ff';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
            // Animate particles
            for (let p of particles) {
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > width) p.dx *= -1;
                if (p.y < 0 || p.y > height) p.dy *= -1;
            }
            // ...removed atoms/cursor-following effect...
            requestAnimationFrame(draw);
        }
        draw();
    }
    // INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
    // =================================================================
    
    /**
     * Initialize intersection observer for scroll animations
     * Adds fade-in class to elements as they enter viewport
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections except hero
        const sections = document.querySelectorAll('.section');
        sections.forEach(function(section) {
            observer.observe(section);
        });

        // Observe cards within sections
        const cards = document.querySelectorAll('.focus-card, .project-card, .training-item, .leadership-item');
        cards.forEach(function(card) {
            observer.observe(card);
        });
    }

    // =================================================================
    // SMOOTH SCROLL ENHANCEMENT
    // =================================================================
    
    /**
     * Enhanced smooth scrolling for internal links
     * Handles anchor links with smooth behavior
     */
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // =================================================================
    // EXTERNAL LINK SECURITY
    // =================================================================
    
    /**
     * Add security attributes to external links
     * Prevents window.opener vulnerabilities
     */
    function secureExternalLinks() {
        const links = document.querySelectorAll('a[target="_blank"]');
        
        links.forEach(function(link) {
            // Ensure rel attributes are set for security
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            } else {
                const rel = link.getAttribute('rel');
                if (rel.indexOf('noopener') === -1) {
                    link.setAttribute('rel', rel + ' noopener noreferrer');
                }
            }
        });
    }

    // =================================================================
    // KEYBOARD NAVIGATION ENHANCEMENT
    // =================================================================
    
    /**
     * Improve keyboard navigation accessibility
     * Ensures focus states are visible and navigation is logical
     */
    function enhanceKeyboardNav() {
        // Track keyboard usage
        let isUsingKeyboard = false;

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                isUsingKeyboard = true;
                document.body.classList.add('using-keyboard');
            }
        });

        document.addEventListener('mousedown', function() {
            isUsingKeyboard = false;
            document.body.classList.remove('using-keyboard');
        });
    }

    // =================================================================
    // PERFORMANCE OPTIMIZATION
    // =================================================================
    
    /**
     * Debounce function for scroll/resize events
     * Reduces frequency of function calls for better performance
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Lazy load optimization for performance
     * Can be extended for future image/content lazy loading
     */
    function initLazyLoad() {
        // Placeholder for future lazy loading implementation
        // Currently not needed as portfolio has no heavy images
        // Can be extended when adding portfolio images or media
    }

    // =================================================================
    // SCROLL PROGRESS INDICATOR (Enabled)
    // =================================================================
    /**
     * Add scroll progress indicator
     */
    function initScrollProgress() {
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
        }
        const updateProgress = debounce(function() {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        }, 10);
        window.addEventListener('scroll', updateProgress);
        // Initial update
        updateProgress();
    }

    // =================================================================
    // ANALYTICS PLACEHOLDER
    // =================================================================
    
    /**
     * Track important user interactions
     * Replace console.log with actual analytics when ready
     */
    function trackInteraction(action, label) {
        // Placeholder for analytics
        // Example: Google Analytics, Plausible, or custom solution
        // console.log('Track:', action, label);
        
        // When adding analytics, implement here:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, { 'event_label': label });
        // }
    }

    /**
     * Track link clicks for analytics
     */
    function initLinkTracking() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        
        externalLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                const url = this.getAttribute('href');
                trackInteraction('external_link_click', url);
            });
        });
    }

    // =================================================================
    // CONSOLE SIGNATURE
    // =================================================================
    
    /**
     * Developer console signature
     * Easter egg for curious developers
     */
    function consoleSignature() {
        const styles = [
            'color: #00d9ff',
            'font-size: 14px',
            'font-weight: bold',
            'font-family: monospace'
        ].join(';');

        console.log('%c👋 Hello, fellow developer!', styles);
        console.log('%cInterested in the code? Check out the repo:', styles);
        console.log('%chttps://github.com/vdtafury', 'color: #a0a0a0; font-family: monospace;');
    }

    // =================================================================
    // BACK TO TOP BUTTON
    // =================================================================
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // THEME TOGGLE (DARK/LIGHT MODE)
    // =================================================================
function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const darkIcon = '🌙';
    const lightIcon = '☀️';
    function setTheme(dark) {
        if (dark) {
            document.documentElement.classList.add('dark-mode');
            btn.textContent = darkIcon;
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-mode');
            btn.textContent = lightIcon;
            localStorage.setItem('theme', 'light');
        }
    }
    // Load preference
    let themePref = localStorage.getItem('theme');
    let isDark;
    if (themePref === null) {
        // Auto-detect from system
        isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
        isDark = themePref === 'dark';
    }
    setTheme(isDark);
    // تأكد من تحديث الأيقونة عند كل تبديل
    btn.addEventListener('click', function() {
        isDark = !document.documentElement.classList.contains('dark-mode');
        setTheme(isDark);
    });
}

    // PAGE LOADER ANIMATION
    // =================================================================
    function hidePageLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hide');
            setTimeout(() => loader.remove(), 600);
        }
    }
    // INITIALIZATION
    // =================================================================
    /**
     * Initialize all features when DOM is ready
     */
    function init() {
        // Core features
        initAnimatedBackground();
        initScrollAnimations();
        initSmoothScroll();
        secureExternalLinks();
        enhanceKeyboardNav();
        // Optional features
        initLinkTracking();
        consoleSignature();
        // Enable scroll progress indicator
        initScrollProgress();
        // Enable back to top button
        initBackToTop();
        // Enable theme toggle
        initThemeToggle();
        // Enable CV modal
        initCvModal();
        // Enable typewriter effect
        initTypewriter();
        // Enable lazy load for images
        initLazyImages();
        // Enable language toggle (placeholder)
        initLangToggle();
        // Enable accessibility controls
        initAccessibility();
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            window.addEventListener('load', hidePageLoader);
        });
    } else {
        // DOM is already loaded
        init();
        window.addEventListener('load', hidePageLoader);
    }

    // =================================================================
    // EXPORT FOR TESTING (Optional)
    // =================================================================
    
    // Expose functions for testing if needed
    window.portfolioUtils = {
        trackInteraction: trackInteraction,
        debounce: debounce
    };

})();