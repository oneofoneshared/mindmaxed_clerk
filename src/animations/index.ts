// Animation utilities ported from legacy animations.js
// These are designed to be used in React effects with refs

import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export function useFadeIn() {
  const reducedMotion = usePrefersReducedMotion();
  return (element: HTMLElement, duration = 800, delay = 0) => {
    if (!element) return;
    if (reducedMotion) {
      element.style.opacity = '1';
      element.style.transition = '';
      return;
    }
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-out ${delay}ms`;
    setTimeout(() => {
      element.style.opacity = '1';
    }, delay);
  };
}

export function useSlideIn() {
  const reducedMotion = usePrefersReducedMotion();
  return (
    element: HTMLElement,
    direction: 'up' | 'down' | 'left' | 'right' = 'up',
    duration = 800,
    delay = 0
  ) => {
    if (!element) return;
    if (reducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.style.transition = '';
      return;
    }
    const distance = 30;
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
    switch (direction) {
      case 'up':
        element.style.transform = `translateY(${distance}px)`;
        break;
      case 'down':
        element.style.transform = `translateY(-${distance}px)`;
        break;
      case 'left':
        element.style.transform = `translateX(${distance}px)`;
        break;
      case 'right':
        element.style.transform = `translateX(-${distance}px)`;
        break;
    }
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0,0)';
    }, delay);
  };
}

export function useScaleIn() {
  const reducedMotion = usePrefersReducedMotion();
  return (element: HTMLElement, duration = 600, delay = 0) => {
    if (!element) return;
    if (reducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.style.transition = '';
      return;
    }
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    }, delay);
  };
}

export function useStaggerChildren() {
  const fadeIn = useFadeIn();
  return (parent: HTMLElement, duration = 600, staggerDelay = 100) => {
    if (!parent) return;
    const children = Array.from(parent.children) as HTMLElement[];
    children.forEach((child, i) => {
      fadeIn(child, duration, i * staggerDelay);
    });
  };
} 