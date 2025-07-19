import { useEffect, useRef, useState } from 'react';

export function useLazyImage() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (loaded) return;
    if ('IntersectionObserver' in window) {
      const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.disconnect();
          }
        });
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    } else {
      // Fallback for browsers without IntersectionObserver
      setLoaded(true);
    }
  }, [loaded]);

  return { ref, loaded };
} 