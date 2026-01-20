// Visual Effects Module
export function initEffects() {
    initCustomCursor();
    initParallax();
    initScrollAnimations();
    initParticleEffects();
}

// Custom Cursor (Sword)
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.color = 'var(--color-accent)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.color = 'var(--color-primary)';
        });
    });
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.observe-fade, .observe-scale');
    animatedElements.forEach(el => observer.observe(el));
}

// Particle Effects (Simple)
function initParticleEffects() {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--color-primary);
        border-radius: 50%;
        opacity: 0.3;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(particle);
}

// Utility: Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility: Throttle function
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

