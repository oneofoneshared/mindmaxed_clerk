/**
 * MindMaxED AI Coaching - Utility Functions
 * Common utility functions used throughout the application
 */

class Utils {
    /**
     * Throttle function execution
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @param {boolean} immediate - Execute immediately
     * @returns {Function} Debounced function
     */
    static debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /**
     * Get element offset from top of page
     * @param {Element} element - DOM element
     * @returns {number} Offset from top
     */
    static getElementOffset(element) {
        let offsetTop = 0;
        while (element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offsetTop;
    }

    /**
     * Check if element is in viewport
     * @param {Element} element - DOM element to check
     * @param {number} offset - Offset from viewport edge
     * @returns {boolean} True if element is in viewport
     */
    static isElementInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
        );
    }

    /**
     * Animate element with CSS properties
     * @param {Element} element - DOM element to animate
     * @param {Object} properties - CSS properties to animate
     * @param {number} duration - Animation duration in milliseconds
     * @param {string} easing - Easing function
     * @returns {Promise} Promise that resolves when animation completes
     */
    static animate(element, properties, duration = 300, easing = 'ease') {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const startValues = {};
            
            // Get initial values
            for (const prop in properties) {
                const currentValue = getComputedStyle(element)[prop];
                startValues[prop] = parseFloat(currentValue) || 0;
            }
            
            function step(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Apply easing
                const easedProgress = Utils.easeInOutCubic(progress);
                
                // Update properties
                for (const prop in properties) {
                    const startValue = startValues[prop];
                    const endValue = properties[prop];
                    const currentValue = startValue + (endValue - startValue) * easedProgress;
                    
                    if (prop === 'opacity') {
                        element.style[prop] = currentValue;
                    } else {
                        element.style[prop] = currentValue + 'px';
                    }
                }
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    resolve();
                }
            }
            
            requestAnimationFrame(step);
        });
    }

    /**
     * Cubic bezier easing function
     * @param {number} t - Time progress (0-1)
     * @returns {number} Eased value
     */
    static easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    /**
     * Format number with commas
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    static formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Format currency
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code
     * @returns {string} Formatted currency
     */
    static formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Get query parameter from URL
     * @param {string} name - Parameter name
     * @returns {string|null} Parameter value
     */
    static getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    /**
     * Set query parameter in URL
     * @param {string} name - Parameter name
     * @param {string} value - Parameter value
     * @param {boolean} replace - Replace current state or push new state
     */
    static setQueryParam(name, value, replace = true) {
        const url = new URL(window.location);
        url.searchParams.set(name, value);
        
        if (replace) {
            window.history.replaceState({}, '', url);
        } else {
            window.history.pushState({}, '', url);
        }
    }

    /**
     * Remove query parameter from URL
     * @param {string} name - Parameter name
     */
    static removeQueryParam(name) {
        const url = new URL(window.location);
        url.searchParams.delete(name);
        window.history.replaceState({}, '', url);
    }

    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        if (obj instanceof Array) {
            return obj.map(item => Utils.deepClone(item));
        }
        
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = Utils.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }

    /**
     * Generate unique ID
     * @param {string} prefix - Optional prefix
     * @returns {string} Unique ID
     */
    static generateId(prefix = 'id') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Convert string to slug
     * @param {string} str - String to convert
     * @returns {string} Slug
     */
    static toSlug(str) {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    /**
     * Capitalize first letter of string
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Truncate string to specified length
     * @param {string} str - String to truncate
     * @param {number} length - Maximum length
     * @param {string} suffix - Suffix to add
     * @returns {string} Truncated string
     */
    static truncate(str, length, suffix = '...') {
        if (str.length <= length) return str;
        return str.substring(0, length) + suffix;
    }

    /**
     * Check if device is mobile
     * @returns {boolean} True if mobile device
     */
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Check if device is touch enabled
     * @returns {boolean} True if touch enabled
     */
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    /**
     * Get device pixel ratio
     * @returns {number} Device pixel ratio
     */
    static getDevicePixelRatio() {
        return window.devicePixelRatio || 1;
    }

    /**
     * Check if browser supports feature
     * @param {string} feature - Feature to check
     * @returns {boolean} True if supported
     */
    static supportsFeature(feature) {
        const features = {
            webp: () => {
                const canvas = document.createElement('canvas');
                return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            },
            intersectionObserver: () => 'IntersectionObserver' in window,
            serviceWorker: () => 'serviceWorker' in navigator,
            localStorage: () => {
                try {
                    localStorage.setItem('test', 'test');
                    localStorage.removeItem('test');
                    return true;
                } catch (e) {
                    return false;
                }
            },
            css: (property) => property in document.body.style
        };

        return features[feature] ? features[feature]() : false;
    }

    /**
     * Load script dynamically
     * @param {string} src - Script source URL
     * @param {Object} options - Script options
     * @returns {Promise} Promise that resolves when script loads
     */
    static loadScript(src, options = {}) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            
            script.src = src;
            script.async = options.async !== false;
            script.defer = options.defer || false;
            
            if (options.id) script.id = options.id;
            if (options.attributes) {
                Object.keys(options.attributes).forEach(attr => {
                    script.setAttribute(attr, options.attributes[attr]);
                });
            }

            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);
        });
    }

    /**
     * Load CSS dynamically
     * @param {string} href - CSS file URL
     * @param {Object} options - CSS options
     * @returns {Promise} Promise that resolves when CSS loads
     */
    static loadCSS(href, options = {}) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            
            link.rel = 'stylesheet';
            link.href = href;
            
            if (options.id) link.id = options.id;
            if (options.media) link.media = options.media;

            link.onload = resolve;
            link.onerror = reject;

            document.head.appendChild(link);
        });
    }

    /**
     * Preload resource
     * @param {string} href - Resource URL
     * @param {string} as - Resource type
     * @param {Object} options - Preload options
     */
    static preloadResource(href, as, options = {}) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        
        if (options.type) link.type = options.type;
        if (options.crossorigin) link.crossOrigin = options.crossorigin;
        
        document.head.appendChild(link);
    }

    /**
     * Get cookie value
     * @param {string} name - Cookie name
     * @returns {string|null} Cookie value
     */
    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    }

    /**
     * Set cookie
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {number} days - Expiration in days
     * @param {Object} options - Cookie options
     */
    static setCookie(name, value, days = 30, options = {}) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        
        let cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=${options.path || '/'}`;
        
        if (options.domain) cookieString += `; domain=${options.domain}`;
        if (options.secure) cookieString += '; secure';
        if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;
        
        document.cookie = cookieString;
    }

    /**
     * Delete cookie
     * @param {string} name - Cookie name
     * @param {Object} options - Cookie options
     */
    static deleteCookie(name, options = {}) {
        Utils.setCookie(name, '', -1, options);
    }

    /**
     * Store data in localStorage with expiration
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @param {number} ttl - Time to live in milliseconds
     */
    static setStorageWithTTL(key, value, ttl) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    /**
     * Get data from localStorage with expiration check
     * @param {string} key - Storage key
     * @returns {*} Stored value or null if expired
     */
    static getStorageWithTTL(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;

        try {
            const item = JSON.parse(itemStr);
            const now = new Date();
            
            if (now.getTime() > item.expiry) {
                localStorage.removeItem(key);
                return null;
            }
            
            return item.value;
        } catch (e) {
            localStorage.removeItem(key);
            return null;
        }
    }

    /**
     * Format date
     * @param {Date|string} date - Date to format
     * @param {Object} options - Formatting options
     * @returns {string} Formatted date
     */
    static formatDate(date, options = {}) {
        const dateObj = new Date(date);
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        
        return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
    }

    /**
     * Get relative time string
     * @param {Date|string} date - Date to compare
     * @returns {string} Relative time string
     */
    static getRelativeTime(date) {
        const now = new Date();
        const dateObj = new Date(date);
        const diffInSeconds = Math.floor((now - dateObj) / 1000);

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);
            if (count >= 1) {
                return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
            }
        }

        return 'just now';
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone number format
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if valid phone
     */
    static isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    /**
     * Sanitize HTML string
     * @param {string} html - HTML to sanitize
     * @returns {string} Sanitized HTML
     */
    static sanitizeHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }

    /**
     * Escape HTML entities
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    static escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Generate random string
     * @param {number} length - String length
     * @param {string} charset - Character set to use
     * @returns {string} Random string
     */
    static randomString(length = 8, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
    }

    /**
     * Calculate reading time for text
     * @param {string} text - Text to analyze
     * @param {number} wpm - Words per minute (default: 200)
     * @returns {number} Reading time in minutes
     */
    static calculateReadingTime(text, wpm = 200) {
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wpm);
    }

    /**
     * Check if user prefers reduced motion
     * @returns {boolean} True if reduced motion preferred
     */
    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Check if user prefers dark theme
     * @returns {boolean} True if dark theme preferred
     */
    static prefersDarkTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    /**
     * Get connection type
     * @returns {string} Connection type
     */
    static getConnectionType() {
        if ('connection' in navigator) {
            return navigator.connection.effectiveType || 'unknown';
        }
        return 'unknown';
    }

    /**
     * Check if connection is slow
     * @returns {boolean} True if slow connection
     */
    static isSlowConnection() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return connection.effectiveType === 'slow-2g' || 
                   connection.effectiveType === '2g' ||
                   connection.saveData;
        }
        return false;
    }

    /**
     * Retry function with exponential backoff
     * @param {Function} fn - Function to retry
     * @param {number} maxRetries - Maximum retry attempts
     * @param {number} delay - Initial delay in milliseconds
     * @returns {Promise} Promise that resolves when function succeeds
     */
    static async retry(fn, maxRetries = 3, delay = 1000) {
        let lastError;
        
        for (let i = 0; i <= maxRetries; i++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                
                if (i === maxRetries) {
                    throw lastError;
                }
                
                // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
            }
        }
    }

    /**
     * Create promise with timeout
     * @param {Promise} promise - Promise to wrap
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise} Promise that rejects on timeout
     */
    static withTimeout(promise, timeout) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Operation timed out')), timeout);
        });
        
        return Promise.race([promise, timeoutPromise]);
    }

    /**
     * Batch promises with concurrency limit
     * @param {Array} items - Items to process
     * @param {Function} fn - Function to apply to each item
     * @param {number} concurrency - Maximum concurrent operations
     * @returns {Promise} Promise that resolves with all results
     */
    static async batchPromises(items, fn, concurrency = 3) {
        const results = [];
        const executing = [];
        
        for (const item of items) {
            const promise = fn(item).then(result => {
                executing.splice(executing.indexOf(promise), 1);
                return result;
            });
            
            results.push(promise);
            
            if (items.length >= concurrency) {
                executing.push(promise);
                
                if (executing.length >= concurrency) {
                    await Promise.race(executing);
                }
            }
        }
        
        return Promise.all(results);
    }

    /**
     * Measure function execution time
     * @param {Function} fn - Function to measure
     * @param {...*} args - Function arguments
     * @returns {Object} Result and execution time
     */
    static async measurePerformance(fn, ...args) {
        const start = performance.now();
        const result = await fn(...args);
        const end = performance.now();
        
        return {
            result,
            duration: end - start
        };
    }

    /**
     * Log performance metric
     * @param {string} name - Metric name
     * @param {number} value - Metric value
     * @param {Object} metadata - Additional metadata
     */
    static logPerformance(name, value, metadata = {}) {
        console.log(`Performance: ${name}`, {
            value: `${value.toFixed(2)}ms`,
            ...metadata,
            timestamp: new Date().toISOString()
        });
        
        // Send to analytics if configured
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metric', {
                metric_name: name,
                metric_value: Math.round(value),
                ...metadata
            });
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

// Make available globally
window.Utils = Utils;