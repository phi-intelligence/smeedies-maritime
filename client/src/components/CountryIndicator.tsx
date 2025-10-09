import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface CountryIndicatorProps {
  currentSection: {
    id: string;
    country: string;
    description: string;
  } | null;
  scrollProgress: number;
  isScrolling: boolean;
}

const CountryIndicator: React.FC<CountryIndicatorProps> = ({ 
  currentSection, 
  scrollProgress, 
  isScrolling 
}) => {
  if (!currentSection) return null;

  return (
    <div className={`fixed top-20 right-6 z-30 transition-all duration-500 ${
      isScrolling ? 'scale-105' : 'scale-100'
    }`}>
      <div className="bg-black/90 backdrop-blur-md rounded-xl p-4 text-white border border-blue-500/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-30"></div>
          </div>
          <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
            Currently Viewing
          </span>
        </div>

        {/* Country Info */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-blue-400" />
            <h3 className="text-lg font-bold text-white">{currentSection.country}</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {currentSection.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Journey Progress</span>
            <span className="text-xs text-blue-400 font-mono">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${scrollProgress * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Navigation Hint */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
          <Navigation className="w-3 h-3" />
          <span>Scroll to explore different ports</span>
        </div>
      </div>
    </div>
  );
};

export default CountryIndicator;


