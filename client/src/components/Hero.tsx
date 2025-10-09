import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShippingGlobe from "./ShippingGlobe";
import WebGLErrorBoundary from "./WebGLErrorBoundary";

interface HeroProps {
  backgroundImage?: string;
  backgroundVideo?: string;
  onGetQuote?: () => void;
  onViewServices?: () => void;
}

export default function Hero({ backgroundImage, backgroundVideo, onGetQuote, onViewServices }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Video (same as page background) */}
      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Background Image (fallback if no video) */}
      {backgroundImage && !backgroundVideo && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Enhanced overlay for hero section for better text contrast */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-800/50 to-slate-900/60" /> */}
      
      {/* Content Container */}
          <div className="relative z-10 max-w-full mx-auto w-full">
            <div className="relative w-full h-full">
          {/* Background Globe Animation */}
          <div className="absolute inset-0 flex justify-center items-start -mt-20 md:-mt-20 mt-20">
            <div className="relative w-full max-w-[400px] h-[300px] md:max-w-[800px] md:h-[600px] lg:max-w-[1200px] lg:h-[800px] xl:max-w-[1400px] xl:h-[900px]">
              {/* Globe container */}
              <div className="absolute inset-0 animate-float animate-fade-in-scale z-0">
                <WebGLErrorBoundary>
                  <ShippingGlobe 
                    className="w-full h-full rounded-full" 
                    showUI={false}
                    glassmorphic={true}
                  />
                </WebGLErrorBoundary>
              </div>
            </div>
          </div>
          
          {/* Overlay Content */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center min-h-[80vh] space-y-8">
            <div className="space-y-8 max-w-6xl mx-auto">
              <Badge 
                variant="outline" 
                className="mb-6 bg-white/90 backdrop-blur-sm border-blue-200/50 text-blue-700 hover:bg-blue-50/90"
                data-testid="badge-location"
              >
                <MapPin className="w-3 h-3 mr-1" />
                Tema, Ghana
              </Badge>
              
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 text-blue-300" data-testid="text-tagline">
                Prime Maritime Solutions
              </h2>
              
              <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-lg" data-testid="text-headline">
                <span className="text-blue-300">Smeedies</span> - Deliver Excellence, Navigate Success
              </h1>
          
              <p className="text-lg md:text-xl lg:text-2xl mb-4 text-white max-w-3xl md:max-w-4xl mx-auto drop-shadow-md" data-testid="text-subtitle">
                Smeedies - Your reliable local partner for shipping and logistics
              </p>
              
              <p className="text-sm md:text-base lg:text-lg mb-12 text-gray-200 max-w-2xl md:max-w-3xl mx-auto drop-shadow-md" data-testid="text-description">
                We deliver logistics solutions to our clients — on time, at the right place, in the original condition and quantity, at a low cost.
              </p>
          
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-blue-600 text-white hover:bg-blue-700 border-blue-500 font-semibold text-base md:text-lg px-6 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onGetQuote}
                  data-testid="button-get-quote"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm border-blue-200/50 text-blue-700 hover:bg-blue-50/90 font-semibold text-base md:text-lg px-6 md:px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onViewServices}
                  data-testid="button-view-services"
                >
                  Our Services
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
