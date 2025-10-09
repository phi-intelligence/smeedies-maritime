import { useEffect, useRef, useState } from 'react';

interface ScrollSection {
  id: string;
  start: number;
  end: number;
  country: string;
  description: string;
}

interface UseScrollDrivenModelOptions {
  sections: ScrollSection[];
  onSectionChange?: (section: ScrollSection) => void;
  onProgressChange?: (progress: number) => void;
}

export const useScrollDrivenModel = (options: UseScrollDrivenModelOptions) => {
  const { sections, onSectionChange, onProgressChange } = options;
  const [currentSection, setCurrentSection] = useState<ScrollSection | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setScrollProgress(progress);
      onProgressChange?.(progress);

      // Find current section based on scroll position
      const currentSectionIndex = sections.findIndex(section => 
        progress >= section.start && progress <= section.end
      );

      if (currentSectionIndex !== -1) {
        const section = sections[currentSectionIndex];
        if (currentSection?.id !== section.id) {
          setCurrentSection(section);
          onSectionChange?.(section);
        }
      }

      // Set scrolling state
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Throttled scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [sections, onSectionChange, onProgressChange, currentSection]);

  return {
    currentSection,
    scrollProgress,
    isScrolling
  };
};

export default useScrollDrivenModel;


