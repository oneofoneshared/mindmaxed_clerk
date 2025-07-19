// Utility functions ported from legacy utils.js

export function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number): T {
  let inThrottle = false;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}

export function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number, immediate = false): T {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (this: unknown, ...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  } as T;
}

export function getElementOffset(element: HTMLElement): number {
  let offsetTop = 0;
  let el: HTMLElement | null = element;
  while (el) {
    offsetTop += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }
  return offsetTop;
}

export function isElementInViewport(element: HTMLElement, offset = 0): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

export function animate(
  element: HTMLElement,
  properties: Record<string, number>,
  duration = 300,
  easing = 'ease'
): Promise<void> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const startValues: Record<string, number> = {};
    for (const prop in properties) {
      const currentValue = getComputedStyle(element)[prop as keyof CSSStyleDeclaration];
      startValues[prop] = parseFloat(currentValue as string) || 0;
    }
    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      for (const prop in properties) {
        // Only assign to valid, mutable style properties
        if (
          Object.prototype.hasOwnProperty.call(element.style, prop) &&
          typeof prop === 'string' &&
          prop !== 'length' &&
          prop !== 'parentRule'
        ) {
          const startValue = startValues[prop];
          const endValue = properties[prop];
          const currentValue = startValue + (endValue - startValue) * easedProgress;
          if (prop === 'opacity') {
            (element.style[prop as keyof CSSStyleDeclaration] as string) = String(currentValue);
          } else {
            (element.style[prop as keyof CSSStyleDeclaration] as string) = currentValue + 'px';
          }
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

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function getQueryParam(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export function setQueryParam(name: string, value: string, replace = true): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  if (replace) {
    window.history.replaceState({}, '', url.toString());
  } else {
    window.history.pushState({}, '', url.toString());
  }
}

export function removeQueryParam(name: string): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.delete(name);
  window.history.replaceState({}, '', url.toString());
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length: number, suffix = '...'): string {
  return str.length > length ? str.slice(0, length) + suffix : str;
}

export function isMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mobi|Android/i.test(navigator.userAgent);
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
}

export function supportsFeature(feature: string): boolean {
  if (typeof document === 'undefined') return false;
  return feature in document.createElement('div');
} 