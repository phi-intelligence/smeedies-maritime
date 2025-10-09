import { useEffect, useState, useRef } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  offset?: number;
  throttle?: number;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up', offset = 0, throttle = 16 } = options;
  const [offsetY, setOffsetY] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const calculateParallax = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate if element is in viewport
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      
      if (!isInViewport) {
        setOffsetY(0);
        ticking = false;
        return;
      }

      // Calculate parallax offset based on scroll position
      const scrolled = window.pageYOffset;
      const elementTop = rect.top + scrolled;
      const elementCenter = elementTop + elementHeight / 2;
      const viewportCenter = scrolled + windowHeight / 2;
      
      const distanceFromCenter = elementCenter - viewportCenter;
      const parallaxSpeed = direction === 'up' ? -speed : speed;
      const parallaxOffset = distanceFromCenter * parallaxSpeed + offset;
      
      setOffsetY(parallaxOffset);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(calculateParallax);
        ticking = true;
      }
    };

    // Initial calculation
    calculateParallax();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [speed, direction, offset, throttle]);

  return [elementRef, offsetY] as const;
}

export default useParallax;
