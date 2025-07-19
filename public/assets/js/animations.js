/**
 * MindMaxED AI Coaching - Animation System
 * Advanced animation utilities and effects
 */

class AnimationSystem {
    constructor() {
        this.activeAnimations = new Map();
        this.observers = new Map();
        this.isReducedMotion = Utils.prefersReducedMotion();
        
        this.init();
    }

    /**
     * Initialize animation system
     */
    init() {
        this.setupReducedMotionListener();
        this.setupIntersectionObservers();
        this.initScrollTriggeredAnimations();
        this.initParticleSystem();
        this.initMorphingEffects();
    }

    /**
     * Setup reduced motion preference listener
     */
    setupReducedMotionListener() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            this.handleReducedMotionChange();
        });
    }

    /**
     * Handle reduced motion preference change
     */
    handleReducedMotionChange() {
        if (this.isReducedMotion) {
            this.pauseAllAnimations();
        } else {
            this.resumeAllAnimations();
        }
    }

    /**
     * Setup intersection observers for scroll animations
     */
    setupIntersectionObservers() {
        // Fade in animation observer
        this.observers.set('fadeIn', new IntersectionObserver(
            this.handleFadeInIntersection.bind(this),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        ));

        // Slide in animation observer
        this.observers.set('slideIn', new IntersectionObserver(
            this.handleSlideInIntersection.bind(this),
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        ));

        // Scale in animation observer
        this.observers.set('scaleIn', new IntersectionObserver(
            this.handleScaleInIntersection.bind(this),
            { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
        ));

        // Stagger animation observer
        this.observers.set('stagger', new IntersectionObserver(
            this.handleStaggerIntersection.bind(this),
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        ));
    }

    /**
     * Handle fade in intersection
     */
    handleFadeInIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.fadeIn(entry.target);
                this.observers.get('fadeIn').unobserve(entry.target);
            }
        });
    }

    /**
     * Handle slide in intersection
     */
    handleSlideInIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const direction = entry.target.dataset.slideDirection || 'up';
                this.slideIn(entry.target, direction);
                this.observers.get('slideIn').unobserve(entry.target);
            }
        });
    }

    /**
     * Handle scale in intersection
     */
    handleScaleInIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.scaleIn(entry.target);
                this.observers.get('scaleIn').unobserve(entry.target);
            }
        });
    }

    /**
     * Handle stagger animation intersection
     */
    handleStaggerIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.staggerChildren(entry.target);
                this.observers.get('stagger').unobserve(entry.target);
            }
        });
    }

    /**
     * Initialize scroll-triggered animations
     */
    initScrollTriggeredAnimations() {
        // Observe elements with animation attributes
        document.querySelectorAll('[data-animate="fade-in"]').forEach(el => {
            this.prepareForFadeIn(el);
            this.observers.get('fadeIn').observe(el);
        });

        document.querySelectorAll('[data-animate="slide-in"]').forEach(el => {
            this.prepareForSlideIn(el);
            this.observers.get('slideIn').observe(el);
        });

        document.querySelectorAll('[data-animate="scale-in"]').forEach(el => {
            this.prepareForScaleIn(el);
            this.observers.get('scaleIn').observe(el);
        });

        document.querySelectorAll('[data-animate="stagger"]').forEach(el => {
            this.prepareForStagger(el);
            this.observers.get('stagger').observe(el);
        });
    }

    /**
     * Prepare element for fade in animation
     */
    prepareForFadeIn(element) {
        if (this.isReducedMotion) return;
        
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease-out';
    }

    /**
     * Prepare element for slide in animation
     */
    prepareForSlideIn(element) {
        if (this.isReducedMotion) return;
        
        const direction = element.dataset.slideDirection || 'up';
        const distance = element.dataset.slideDistance || '30px';
        
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        switch (direction) {
            case 'up':
                element.style.transform = `translateY(${distance})`;
                break;
            case 'down':
                element.style.transform = `translateY(-${distance})`;
                break;
            case 'left':
                element.style.transform = `translateX(${distance})`;
                break;
            case 'right':
                element.style.transform = `translateX(-${distance})`;
                break;
        }
    }

    /**
     * Prepare element for scale in animation
     */
    prepareForScaleIn(element) {
        if (this.isReducedMotion) return;
        
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }

    /**
     * Prepare element for stagger animation
     */
    prepareForStagger(element) {
        if (this.isReducedMotion) return;
        
        const children = element.children;
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        });
    }

    /**
     * Fade in animation
     */
    fadeIn(element, duration = 800, delay = 0) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return Promise.resolve();
        }

        return new Promise(resolve => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.addEventListener('transitionend', resolve, { once: true });
            }, delay);
        });
    }

    /**
     * Slide in animation
     */
    slideIn(element, direction = 'up', duration = 800, delay = 0) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return Promise.resolve();
        }

        return new Promise(resolve => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0) translateY(0)';
                element.addEventListener('transitionend', resolve, { once: true });
            }, delay);
        });
    }

    /**
     * Scale in animation
     */
    scaleIn(element, duration = 600, delay = 0) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            return Promise.resolve();
        }

        return new Promise(resolve => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
                element.addEventListener('transitionend', resolve, { once: true });
            }, delay);
        });
    }

    /**
     * Stagger children animation
     */
    staggerChildren(element, duration = 600, staggerDelay = 100) {
        if (this.isReducedMotion) {
            Array.from(element.children).forEach(child => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            });
            return Promise.resolve();
        }

        const children = Array.from(element.children);
        const promises = children.map((child, index) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                    child.addEventListener('transitionend', resolve, { once: true });
                }, index * staggerDelay);
            });
        });

        return Promise.all(promises);
    }

    /**
     * Typewriter animation
     */
    typewriter(element, text, speed = 50, cursor = true) {
        if (this.isReducedMotion) {
            element.textContent = text;
            return Promise.resolve();
        }

        return new Promise(resolve => {
            element.textContent = '';
            
            if (cursor) {
                element.style.borderRight = '2px solid';
                element.style.animation = 'blink 1s infinite';
            }

            let i = 0;
            const timer = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;

                if (i >= text.length) {
                    clearInterval(timer);
                    if (cursor) {
                        setTimeout(() => {
                            element.style.borderRight = 'none';
                            element.style.animation = 'none';
                        }, 1000);
                    }
                    resolve();
                }
            }, speed);

            this.activeAnimations.set(`typewriter-${element.id || Date.now()}`, timer);
        });
    }

    /**
     * Counter animation
     */
    counter(element, start = 0, end, duration = 2000, easing = 'easeOutCubic') {
        if (this.isReducedMotion) {
            element.textContent = end.toLocaleString();
            return Promise.resolve();
        }

        return new Promise(resolve => {
            const startTime = performance.now();
            const originalText = element.textContent;
            const suffix = originalText.replace(/[\d,]/g, '');

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easedProgress = this.easing[easing](progress);
                const current = start + (end - start) * easedProgress;
                
                element.textContent = Math.floor(current).toLocaleString() + suffix;

                if (progress < 1) {
                    const animationId = requestAnimationFrame(animate);
                    this.activeAnimations.set(`counter-${element.id || Date.now()}`, animationId);
                } else {
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * Pulse animation
     */
    pulse(element, intensity = 1.1, duration = 1000) {
        if (this.isReducedMotion) return Promise.resolve();

        return new Promise(resolve => {
            const originalTransform = element.style.transform;
            
            element.style.transition = `transform ${duration / 2}ms ease-in-out`;
            element.style.transform = `scale(${intensity})`;

            setTimeout(() => {
                element.style.transform = originalTransform;
                setTimeout(resolve, duration / 2);
            }, duration / 2);
        });
    }

    /**
     * Shake animation
     */
    shake(element, intensity = 10, duration = 500) {
        if (this.isReducedMotion) return Promise.resolve();

        return new Promise(resolve => {
            const originalTransform = element.style.transform;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = elapsed / duration;

    shake(element, intensity = 10, duration = 500) {
        if (this.isReducedMotion) return Promise.resolve();

        return new Promise(resolve => {
            const originalTransform = element.style.transform;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = elapsed / duration;

                if (progress < 1) {
                    const displacement = Math.sin(progress * Math.PI * 8) * intensity * (1 - progress);
                    element.style.transform = `translateX(${displacement}px)`;
                    requestAnimationFrame(animate);
                } else {
                    element.style.transform = originalTransform;
                    resolve();
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * Morphing background effect
     */
    initMorphingEffects() {
        const morphElements = document.querySelectorAll('[data-morph="background"]');
        
        morphElements.forEach(element => {
            this.createMorphingBackground(element);
        });
    }

    /**
     * Create morphing background
     */
    createMorphingBackground(element) {
        if (this.isReducedMotion) return;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');

        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.zIndex = '-1';

        linearGradient.setAttribute('id', 'morphGradient');
        linearGradient.innerHTML = `
            <stop offset="0%" style="stop-color:rgba(99,102,241,0.1);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgba(139,92,246,0.1);stop-opacity:1" />
        `;

        gradient.appendChild(linearGradient);
        svg.appendChild(gradient);

        path.setAttribute('fill', 'url(#morphGradient)');
        svg.appendChild(path);

        element.style.position = 'relative';
        element.appendChild(svg);

        this.animateMorphingPath(path);
    }

    /**
     * Animate morphing path
     */
    animateMorphingPath(path) {
        const morphStates = [
            'M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20',
            'M25,15 Q55,5 85,25 Q95,55 85,85 Q55,95 25,85 Q5,55 25,15',
            'M15,25 Q45,15 75,25 Q85,55 75,85 Q45,95 15,85 Q5,55 15,25',
            'M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20'
        ];

        let currentState = 0;
        
        const animateToNextState = () => {
            if (this.isReducedMotion) return;
            
            path.style.transition = 'd 3s ease-in-out';
            path.setAttribute('d', morphStates[currentState]);
            
            currentState = (currentState + 1) % morphStates.length;
            setTimeout(animateToNextState, 3000);
        };

        animateToNextState();
    }

    /**
     * Initialize particle system
     */
    initParticleSystem() {
        const particleContainers = document.querySelectorAll('[data-particles]');
        
        particleContainers.forEach(container => {
            const particleCount = parseInt(container.dataset.particles) || 50;
            this.createParticleSystem(container, particleCount);
        });
    }

    /**
     * Create particle system
     */
    createParticleSystem(container, particleCount) {
        if (this.isReducedMotion || Utils.isSlowConnection()) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        container.style.position = 'relative';
        container.appendChild(canvas);

        const particles = [];
        const mouse = { x: 0, y: 0 };

        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.vx -= dx * 0.0001;
                    this.vy -= dy * 0.0001;
                }

                // Boundary check
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Keep particles in bounds
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Mouse tracking
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${(100 - distance) / 1000})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    /**
     * Parallax scroll effect
     */
    initParallaxScroll() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (this.isReducedMotion) return;

        const handleScroll = Utils.throttle(() => {
            const scrollTop = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);

        window.addEventListener('scroll', handleScroll);
    }

    /**
     * Reveal text animation
     */
    revealText(element, direction = 'up', duration = 1000) {
        if (this.isReducedMotion) {
            element.style.opacity = '1';
            return Promise.resolve();
        }

        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = direction === 'up' ? 'translateY(20px)' : 'translateY(-20px)';
            span.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            element.appendChild(span);
        });

        return new Promise(resolve => {
            setTimeout(() => {
                words.forEach((_, index) => {
                    setTimeout(() => {
                        const span = element.children[index];
                        if (span) {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }
                        
                        if (index === words.length - 1) {
                            setTimeout(resolve, 600);
                        }
                    }, index * 100);
                });
            }, 100);
        });
    }

    /**
     * Loading animation
     */
    createLoadingAnimation(container, type = 'spinner') {
        const loadingElement = document.createElement('div');
        loadingElement.className = `loading-animation loading-${type}`;

        switch (type) {
            case 'spinner':
                loadingElement.innerHTML = '<div class="spinner"></div>';
                break;
            case 'dots':
                loadingElement.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
                break;
            case 'pulse':
                loadingElement.innerHTML = '<div class="pulse"></div>';
                break;
        }

        container.appendChild(loadingElement);
        return loadingElement;
    }

    /**
     * Progress bar animation
     */
    animateProgressBar(element, targetPercent, duration = 1000) {
        if (this.isReducedMotion) {
            element.style.width = `${targetPercent}%`;
            return Promise.resolve();
        }

        return new Promise(resolve => {
            let currentPercent = 0;
            const increment = targetPercent / (duration / 16);
            
            const animate = () => {
                currentPercent += increment;
                
                if (currentPercent >= targetPercent) {
                    currentPercent = targetPercent;
                    element.style.width = `${currentPercent}%`;
                    resolve();
                } else {
                    element.style.width = `${currentPercent}%`;
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        });
    }

    /**
     * Easing functions
     */
    easing = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (--t) * t * t + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        easeInQuart: t => t * t * t * t,
        easeOutQuart: t => 1 - (--t) * t * t * t,
        easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
        easeInQuint: t => t * t * t * t * t,
        easeOutQuint: t => 1 + (--t) * t * t * t * t,
        easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    };

    /**
     * Pause all animations
     */
    pauseAllAnimations() {
        this.activeAnimations.forEach((animation, key) => {
            if (typeof animation === 'number') {
                cancelAnimationFrame(animation);
            } else {
                clearInterval(animation);
            }
        });
    }

    /**
     * Resume all animations
     */
    resumeAllAnimations() {
        // Re-initialize animations based on current state
        this.initScrollTriggeredAnimations();
    }

    /**
     * Clean up animation system
     */
    destroy() {
        this.pauseAllAnimations();
        this.observers.forEach(observer => observer.disconnect());
        this.activeAnimations.clear();
        this.observers.clear();
    }
}

// Initialize animation system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationSystem = new AnimationSystem();
});

// CSS for animations (injected dynamically)
const animationCSS = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: currentColor; }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.7; }
    }

    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
        40%, 43% { transform: translateY(-20px); }
        70% { transform: translateY(-10px); }
        90% { transform: translateY(-4px); }
    }

    .loading-animation {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .loading-spinner .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(99, 102, 241, 0.2);
        border-left: 4px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    .loading-dots {
        display: flex;
        gap: 8px;
    }

    .loading-dots .dot {
        width: 10px;
        height: 10px;
        background: #6366f1;
        border-radius: 50%;
        animation: bounce 1.4s ease-in-out infinite both;
    }

    .loading-dots .dot:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots .dot:nth-child(2) { animation-delay: -0.16s; }

    .loading-pulse .pulse {
        width: 40px;
        height: 40px;
        background: #6366f1;
        border-radius: 50%;
        animation: pulse 1.5s ease-in-out infinite;
    }

    /* Reduced motion styles */
    @media (prefers-reduced-motion: reduce) {
        .loading-animation * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
        }
    }
`;

// Inject animation CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationSystem;
}