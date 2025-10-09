import React from 'react';
import { useParallax } from '@/hooks/useParallax';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  style?: React.CSSProperties;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  style = {}
}) => {
  // const [elementRef, offsetY] = useParallax({ speed, direction });

  return (
    <div
      // ref={elementRef as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        ...style,
        // transform: `translateY(${offsetY}px)`,
        // willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxBackground;
