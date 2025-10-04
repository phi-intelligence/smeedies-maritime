import React from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeInScale';
  delay?: number;
  className?: string;
  threshold?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
  threshold = 0.1
}) => {
  const { elementRef, isVisible, hasAnimated, setHasAnimated } = useScrollAnimation({ threshold });

  const getAnimationClass = () => {
    if (!isVisible) {
      // Reset animation state when element goes out of view
      if (hasAnimated) {
        setHasAnimated(false);
      }
      return 'animate-on-scroll';
    }
    
    // Trigger animation every time element comes into view
    if (!hasAnimated) {
      setHasAnimated(true);
    }
    
    const baseClass = `animate-${animation}`;
    const delayClass = delay > 0 ? `animate-delay-${delay}` : '';
    
    return `${baseClass} ${delayClass}`.trim();
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
