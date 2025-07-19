/**
 * MindMaxED AI Coaching - Main JavaScript
 * Handles core functionality, navigation, and user interactions
 */

class MindMaxEDApp {
    constructor() {
        this.isLoading = false;
        this.mobileMenuOpen = false;
        this.scrollPosition = 0;
        this.lastScrollTop = 0;
        
        this.init();
    }

    /**
     * Submit form data (replace with actual API integration)
     */
    async submitForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // TODO: Replace with actual form submission logic
        console.log('Form submitted:', data);
        
        // Example API call:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // 
        // if (!response.ok) {
        //     throw new Error('Form submission failed');
        // }
        
        return { success: true };
    }

    /**
     * Set form loading state
     */
    setFormLoading(form, isLoading) {
        this.isLoading = isLoading;
        const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
        
        if (submitButton) {
            submitButton.disabled = isLoading;
            
            if (isLoading) {
                submitButton.dataset.originalText = submitButton.textContent;
                submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
            } else {
                submitButton.textContent = submitButton.dataset.originalText || 'Send Message';
            }
        }
    }

    /**
     * Initialize pricing cards functionality
     */
    initPricingCards() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            // Add hover effects
            card.addEventListener('mouseenter', this.handlePricingCardHover.bind(this));
            card.addEventListener('mouseleave', this.handlePricingCardLeave.bind(this));
            
            // Handle CTA clicks
            const ctaButton = card.querySelector('.pricing-cta');
            if (ctaButton) {
                ctaButton.addEventListener('click', this.handlePricingCTAClick.bind(this));
            }
        });
        
        // Handle pricing plan selection from URL
        this.handlePricingPlanFromURL();
    }

    /**
     * Handle pricing card hover
     */
    handlePricingCardHover(e) {
        const card = e.currentTarget;
        const price = card.querySelector('.pricing-price');
        
        if (price) {
            price.style.transform = 'scale(1.05)';
        }
    }

    /**
     * Handle pricing card leave
     */
    handlePricingCardLeave(e) {
        const card = e.currentTarget;
        const price = card.querySelector('.pricing-price');
        
        if (price) {
            price.style.transform = 'scale(1)';
        }
    }

    /**
     * Handle pricing CTA click
     */
    handlePricingCTAClick(e) {
        const button = e.currentTarget;
        const card = button.closest('.pricing-card');
        const planName = card.querySelector('h3')?.textContent;
        
        // Track analytics event
        this.trackEvent('pricing_cta_click', {
            plan: planName,
            price: card.querySelector('.amount')?.textContent
        });
        
        // Add selection animation
        card.classList.add('selected');
        setTimeout(() => card.classList.remove('selected'), 300);
    }

    /**
     * Handle pricing plan selection from URL parameters
     */
    handlePricingPlanFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedPlan = urlParams.get('plan');
        
        if (selectedPlan) {
            const planCard = document.querySelector(`[data-plan="${selectedPlan}"]`);
            if (planCard) {
                planCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                planCard.classList.add('highlighted');
                setTimeout(() => planCard.classList.remove('highlighted'), 2000);
            }
        }
    }

    /**
     * Initialize testimonial carousel
     */
    initTestimonialCarousel() {
        const carousel = document.querySelector('.testimonials-carousel');
        if (!carousel) return;
        
        const testimonials = carousel.querySelectorAll('.testimonial-mini');
        if (testimonials.length <= 1) return;
        
        let currentIndex = 0;
        const autoPlayInterval = 4000;
        
        const showTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.opacity = i === index ? '1' : '0.7';
                testimonial.style.transform = i === index ? 'translateX(0)' : 'translateX(10px)';
            });
        };
        
        const nextTestimonial = () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        };
        
        // Auto-play carousel
        let carouselTimer = setInterval(nextTestimonial, autoPlayInterval);
        
        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselTimer);
        });
        
        carousel.addEventListener('mouseleave', () => {
            carouselTimer = setInterval(nextTestimonial, autoPlayInterval);
        });
        
        // Initialize first testimonial
        showTestimonial(0);
    }

    /**
     * Initialize accessibility features
     */
    initAccessibility() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
        this.setupReducedMotion();
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        }
        
        // Tab trap for mobile menu
        const mobileMenu = document.querySelector('.mobile-nav-menu');
        if (mobileMenu) {
            mobileMenu.addEventListener('keydown', this.handleMobileMenuKeydown.bind(this));
        }
    }

    /**
     * Handle mobile menu keyboard navigation
     */
    handleMobileMenuKeydown(e) {
        const focusableElements = e.currentTarget.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
        
        if (e.key === 'Escape') {
            this.toggleMobileMenu();
        }
    }

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Focus indicators for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Focus trap for modals
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.addEventListener('keydown', this.handleModalKeydown.bind(this));
        });
    }

    /**
     * Handle modal keyboard navigation
     */
    handleModalKeydown(e) {
        if (e.key === 'Escape') {
            this.closeModal(e.currentTarget);
        }
        
        if (e.key === 'Tab') {
            const focusableElements = e.currentTarget.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    /**
     * Setup screen reader support
     */
    setupScreenReaderSupport() {
        // Add aria-labels to interactive elements without text
        const interactiveElements = document.querySelectorAll(
            'button:not([aria-label]):not([aria-labelledby]), a:not([aria-label]):not([aria-labelledby])'
        );
        
        interactiveElements.forEach(element => {
            if (!element.textContent.trim()) {
                const context = this.getElementContext(element);
                if (context) {
                    element.setAttribute('aria-label', context);
                }
            }
        });
        
        // Live region for dynamic content updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
        
        this.liveRegion = liveRegion;
    }

    /**
     * Get context for element (for aria-label)
     */
    getElementContext(element) {
        const parent = element.closest('section, article, .card, .feature');
        const heading = parent?.querySelector('h1, h2, h3, h4, h5, h6');
        return heading?.textContent || null;
    }

    /**
     * Announce to screen readers
     */
    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    /**
     * Setup reduced motion preferences
     */
    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            this.disableAnimations();
        }
        
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                this.disableAnimations();
            } else {
                this.enableAnimations();
            }
        });
    }

    /**
     * Disable animations for reduced motion
     */
    disableAnimations() {
        document.documentElement.classList.add('reduced-motion');
        
        // Stop auto-playing carousels
        if (this.carouselTimer) {
            clearInterval(this.carouselTimer);
        }
    }

    /**
     * Enable animations
     */
    enableAnimations() {
        document.documentElement.classList.remove('reduced-motion');
    }

    /**
     * Initialize lazy loading
     */
    initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    /**
     * Initialize performance optimizations
     */
    initPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize images
        this.optimizeImages();
        
        // Setup service worker (if available)
        this.setupServiceWorker();
    }

    /**
     * Preload critical resources
     */
    preloadCriticalResources() {
        const criticalResources = [
            { href: 'assets/css/main.css', as: 'style' },
            { href: 'assets/js/utils.js', as: 'script' },
            { href: 'assets/images/logo/mindmaxed-logo.svg', as: 'image' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    /**
     * Optimize images based on connection
     */
    optimizeImages() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const slowConnection = connection.effectiveType === 'slow-2g' || 
                                 connection.effectiveType === '2g' ||
                                 connection.saveData;
            
            if (slowConnection) {
                document.documentElement.classList.add('slow-connection');
            }
        }
    }

    /**
     * Setup service worker for caching
     */
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Update mobile menu state
        if (window.innerWidth > 991 && this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
        
        // Update parallax elements
        this.updateParallaxEffects();
        
        // Recalculate element positions for animations
        if (this.observeElements) {
            this.observeElements.forEach(el => {
                el.style.transition = 'none';
                setTimeout(() => {
                    el.style.transition = 'all 0.8s ease-out';
                }, 100);
            });
        }
    }

    /**
     * Handle window load
     */
    handleWindowLoad() {
        // Remove loading states
        document.body.classList.add('loaded');
        
        // Initialize performance monitoring
        this.initPerformanceMonitoring();
        
        // Setup error handling
        this.setupErrorHandling();
    }

    /**
     * Handle connection change
     */
    handleConnectionChange() {
        const connection = navigator.connection;
        const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                               connection.effectiveType === '2g' ||
                               connection.saveData;
        
        document.documentElement.classList.toggle('slow-connection', isSlowConnection);
        
        if (isSlowConnection) {
            this.showToast('Slow connection detected. Some features may be limited.', 'warning');
        }
    }

    /**
     * Handle document click (for closing dropdowns, etc.)
     */
    handleDocumentClick(e) {
        // Close mobile menu if clicking outside
        if (this.mobileMenuOpen && !e.target.closest('.mobile-nav-menu, .mobile-menu-toggle')) {
            this.toggleMobileMenu();
        }
        
        // Close dropdowns
        const openDropdowns = document.querySelectorAll('.dropdown.active');
        openDropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    /**
     * Handle global keydown events
     */
    handleKeyDown(e) {
        // Escape key handling
        if (e.key === 'Escape') {
            if (this.mobileMenuOpen) {
                this.toggleMobileMenu();
            }
            
            const openModals = document.querySelectorAll('.modal-overlay.active');
            openModals.forEach(modal => this.closeModal(modal));
        }
    }

    /**
     * Handle form submit events
     */
    handleFormSubmit(e) {
        const form = e.target;
        if (form.hasAttribute('data-contact-form')) {
            // Already handled in setupFormSubmission
            return;
        }
        
        // Handle other forms (newsletter, etc.)
        if (form.classList.contains('newsletter-form')) {
            e.preventDefault();
            this.handleNewsletterSubmit(form);
        }
    }

    /**
     * Handle newsletter submission
     */
    async handleNewsletterSubmit(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput?.value;
        
        if (!email || !this.validateEmail(email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }
        
        this.setFormLoading(form, true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showToast('Thank you for subscribing to our newsletter!', 'success');
            form.reset();
            
            // Track subscription
            this.trackEvent('newsletter_signup', { email });
            
        } catch (error) {
            this.showToast('Failed to subscribe. Please try again.', 'error');
        } finally {
            this.setFormLoading(form, false);
        }
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${iconMap[type] || iconMap.info}</div>
                <div class="toast-message">${message}</div>
                <button class="toast-close" aria-label="Close notification">×</button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto-hide toast
        const hideTimer = setTimeout(() => this.hideToast(toast), duration);
        
        // Manual close
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn?.addEventListener('click', () => {
            clearTimeout(hideTimer);
            this.hideToast(toast);
        });
        
        // Announce to screen readers
        this.announceToScreenReader(message);
    }

    /**
     * Hide toast notification
     */
    hideToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    /**
     * Show content with animation
     */
    showContent() {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('section-visible');
            }, index * 100);
        });
    }

    /**
     * Add loading states to interactive elements
     */
    addLoadingStates() {
        const buttons = document.querySelectorAll('.cta-button, .secondary-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('loading')) {
                    button.classList.add('loading');
                    setTimeout(() => button.classList.remove('loading'), 1000);
                }
            });
        });
    }

    /**
     * Close modal
     */
    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to trigger element
        const triggerElement = modal.dataset.triggerElement;
        if (triggerElement) {
            const element = document.querySelector(triggerElement);
            element?.focus();
        }
    }

    /**
     * Track analytics events
     */
    trackEvent(eventName, eventData = {}) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        
        // Custom analytics tracking
        console.log('Analytics Event:', eventName, eventData);
        
        // You can integrate with other analytics platforms here
    }

    /**
     * Initialize performance monitoring
     */
    initPerformanceMonitoring() {
        // Performance Observer for monitoring performance metrics
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    // Log performance metrics
                    console.log('Performance:', entry.name, entry.duration);
                });
            });
            
            observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
        }
        
        // Monitor Core Web Vitals
        this.monitorCoreWebVitals();
    }

    /**
     * Monitor Core Web Vitals
     */
    monitorCoreWebVitals() {
        // LCP (Largest Contentful Paint)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        
        // FID (First Input Delay)
        new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ type: 'first-input', buffered: true });
        
        // CLS (Cumulative Layout Shift)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('CLS:', clsValue);
                }
            });
        }).observe({ type: 'layout-shift', buffered: true });
    }

    /**
     * Setup error handling
     */
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            this.trackEvent('javascript_error', {
                message: e.error?.message,
                filename: e.filename,
                lineno: e.lineno
            });
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            this.trackEvent('promise_rejection', {
                reason: e.reason?.toString()
            });
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.mindMaxEDApp = new MindMaxEDApp();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MindMaxEDApp;
}

    /**
     * Initialize the application
     */
    init() {
        this.bindEvents();
        this.initNavigation();
        this.initScrollEffects();
        this.initAnimations();
        this.initContactForms();
        this.initPricingCards();
        this.initTestimonialCarousel();
        this.initAccessibility();
        
        // Initialize after DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.onDOMReady();
            });
        } else {
            this.onDOMReady();
        }
    }

    /**
     * DOM ready handler
     */
    onDOMReady() {
        this.addLoadingStates();
        this.initLazyLoading();
        this.initPerformanceOptimizations();
        
        // Remove loading class from body
        document.body.classList.remove('loading');
        
        // Show content with animation
        this.showContent();
    }

    /**
     * Bind global event listeners
     */
    bindEvents() {
        // Window events
        window.addEventListener('scroll', Utils.throttle(this.handleScroll.bind(this), 16));
        window.addEventListener('resize', Utils.debounce(this.handleResize.bind(this), 250));
        window.addEventListener('load', this.handleWindowLoad.bind(this));
        
        // Document events
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        // Form events
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Performance events
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', this.handleConnectionChange.bind(this));
        }
    }

    /**
     * Initialize navigation functionality
     */
    initNavigation() {
        const nav = document.getElementById('main-nav');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        
        if (!nav) return;

        // Mobile menu toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Smooth scrolling for anchor links
        navLinks.forEach(link => {
            if (link.getAttribute('href')?.startsWith('#')) {
                link.addEventListener('click', this.handleAnchorClick.bind(this));
            }
        });

        // Active navigation highlighting
        this.updateActiveNavigation();
    }

    /**
     * Toggle mobile navigation menu
     */
    toggleMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-nav-menu');
        
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (mobileToggle) {
            mobileToggle.classList.toggle('active', this.mobileMenuOpen);
            mobileToggle.setAttribute('aria-expanded', this.mobileMenuOpen);
        }
        
        if (mobileMenu) {
            mobileMenu.classList.toggle('active', this.mobileMenuOpen);
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
        
        // Focus management
        if (this.mobileMenuOpen) {
            const firstLink = mobileMenu?.querySelector('a');
            firstLink?.focus();
        } else {
            mobileToggle?.focus();
        }
    }

    /**
     * Handle anchor link clicks with smooth scrolling
     */
    handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href?.startsWith('#')) return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (this.mobileMenuOpen) {
                this.toggleMobileMenu();
            }
            
            // Smooth scroll to target
            const navHeight = document.getElementById('main-nav')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            this.smoothScrollTo(targetPosition);
            
            // Update URL
            history.pushState(null, '', href);
            
            // Update active navigation
            setTimeout(() => this.updateActiveNavigation(), 100);
        }
    }

    /**
     * Smooth scroll to position
     */
    smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 800);
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function (ease-in-out)
            const ease = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /**
     * Initialize scroll effects
     */
    initScrollEffects() {
        this.createScrollProgressIndicator();
        this.initParallaxEffects();
        this.initScrollRevealAnimations();
    }

    /**
     * Create scroll progress indicator
     */
    createScrollProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-indicator';
        progressBar.innerHTML = '<div class="scroll-progress"></div>';
        document.body.appendChild(progressBar);
        
        this.scrollProgress = progressBar.querySelector('.scroll-progress');
    }

    /**
     * Update scroll progress indicator
     */
    updateScrollProgress() {
        if (!this.scrollProgress) return;
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        
        this.scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        this.scrollPosition = window.pageYOffset;
        
        // Update scroll progress
        this.updateScrollProgress();
        
        // Navigation background opacity
        this.updateNavigationBackground();
        
        // Show/hide navigation on scroll
        this.handleNavigationVisibility();
        
        // Update active navigation
        this.updateActiveNavigation();
        
        // Parallax effects
        this.updateParallaxEffects();
        
        // Reveal animations
        this.handleScrollRevealAnimations();
        
        this.lastScrollTop = this.scrollPosition;
    }

    /**
     * Update navigation background based on scroll
     */
    updateNavigationBackground() {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        
        const opacity = Math.min(this.scrollPosition / 100, 0.98);
        nav.style.background = `rgba(10, 10, 10, ${0.95 + (opacity * 0.03)})`;
    }

    /**
     * Handle navigation visibility on scroll
     */
    handleNavigationVisibility() {
        const nav = document.getElementById('main-nav');
        if (!nav || this.mobileMenuOpen) return;
        
        const scrollDelta = this.scrollPosition - this.lastScrollTop;
        const scrollThreshold = 5;
        
        if (this.scrollPosition < 100) {
            nav.style.transform = 'translateY(0)';
        } else if (scrollDelta > scrollThreshold) {
            // Scrolling down - hide nav
            nav.style.transform = 'translateY(-100%)';
        } else if (scrollDelta < -scrollThreshold) {
            // Scrolling up - show nav
            nav.style.transform = 'translateY(0)';
        }
    }

    /**
     * Update active navigation based on scroll position
     */
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav-links a[href^="#"]');
        
        let currentSection = '';
        const navHeight = document.getElementById('main-nav')?.offsetHeight || 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (this.scrollPosition >= sectionTop && 
                this.scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Initialize parallax effects
     */
    initParallaxEffects() {
        this.parallaxElements = document.querySelectorAll('.hero-background, .grid-pattern');
    }

    /**
     * Update parallax effects
     */
    updateParallaxEffects() {
        if (!this.parallaxElements?.length) return;
        
        const scrolled = this.scrollPosition;
        
        this.parallaxElements.forEach(element => {
            const speed = element.dataset.parallaxSpeed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    /**
     * Initialize scroll reveal animations
     */
    initScrollRevealAnimations() {
        this.observeElements = document.querySelectorAll(
            '.feature-card, .coach-card, .pricing-card, .testimonial-card, [data-aos]'
        );
        
        // Intersection Observer for reveal animations
        this.intersectionObserver = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        this.observeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            this.intersectionObserver.observe(el);
        });
    }

    /**
     * Handle intersection observer entries
     */
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }, delay);
                
                this.intersectionObserver.unobserve(entry.target);
            }
        });
    }

    /**
     * Handle scroll reveal animations manually (fallback)
     */
    handleScrollRevealAnimations() {
        if (this.intersectionObserver) return; // Use IntersectionObserver if available
        
        this.observeElements?.forEach(el => {
            const elementTop = el.offsetTop;
            const elementHeight = el.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (this.scrollPosition > elementTop - windowHeight + elementHeight / 4) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.classList.add('animate-in');
            }
        });
    }

    /**
     * Initialize animations
     */
    initAnimations() {
        this.initCounterAnimations();
        this.initTypewriterEffects();
        this.initFloatingElements();
    }

    /**
     * Initialize counter animations for statistics
     */
    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const displayValue = Math.floor(current);
                const originalText = counter.textContent;
                const suffix = originalText.replace(/[\d,]/g, '');
                
                counter.textContent = displayValue.toLocaleString() + suffix;
            }, 16);
        };
        
        // Animate counters when they come into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    /**
     * Initialize typewriter effects
     */
    initTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.dataset.typewriter;
            const speed = parseInt(element.dataset.typewriterSpeed) || 50;
            
            element.textContent = '';
            
            const typeWriter = (i = 0) => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    setTimeout(() => typeWriter(i + 1), speed);
                }
            };
            
            // Start typewriter when element is in view
            const typewriterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        typewriterObserver.unobserve(entry.target);
                    }
                });
            });
            
            typewriterObserver.observe(element);
        });
    }

    /**
     * Initialize floating elements
     */
    initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    /**
     * Initialize contact forms
     */
    initContactForms() {
        const forms = document.querySelectorAll('form[data-contact-form]');
        
        forms.forEach(form => {
            this.setupFormValidation(form);
            this.setupFormSubmission(form);
        });
    }

    /**
     * Setup form validation
     */
    setupFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    /**
     * Validate individual form field
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    /**
     * Show field validation state
     */
    showFieldValidation(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        const existingError = formGroup.querySelector('.form-error');
        const existingSuccess = formGroup.querySelector('.form-success');
        
        // Remove existing validation messages
        if (existingError) existingError.remove();
        if (existingSuccess) existingSuccess.remove();
        
        // Add validation styling
        field.classList.remove('error', 'success');
        field.classList.add(isValid ? 'success' : 'error');
        
        // Add validation message
        if (!isValid && errorMessage) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.textContent = errorMessage;
            formGroup.appendChild(errorDiv);
        }
    }

    /**
     * Clear field error state
     */
    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorDiv = formGroup?.querySelector('.form-error');
        
        if (errorDiv) {
            errorDiv.remove();
            field.classList.remove('error');
        }
    }

    /**
     * Setup form submission
     */
    setupFormSubmission(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    }

    /**
     * Handle form submission
     */
    async handleFormSubmission(form) {
        if (this.isLoading) return;
        
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showToast('Please correct the errors above', 'error');
            return;
        }
        
        // Show loading state
        this.setFormLoading(form, true);
        
        try {
            // Simulate form submission (replace with actual API call)
            await this.submitForm(form);
            
            this.showToast('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showToast('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            this.setFormLoading(form, false);
        }