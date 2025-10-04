import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShippingGlobe from "./ShippingGlobe";

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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-800/50 to-slate-900/60" />
      
      {/* Content Container */}
          <div className="relative z-10 max-w-full mx-auto w-full">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content - 60% */}
          <div className="lg:col-span-3 space-y-8 pl-12 lg:pl-20">
            <Badge 
              variant="outline" 
              className="mb-6 bg-white/80 backdrop-blur-sm border-blue-200/50 text-blue-700 hover:bg-blue-50/80"
              data-testid="badge-location"
            >
              <MapPin className="w-3 h-3 mr-1" />
              Tema, Ghana
            </Badge>
            
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gold" data-testid="text-tagline">
                  Prime Maritime Solutions
                </h2>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight" data-testid="text-headline">
                  <span className="text-gold">Smeedies</span> - Deliver Excellence, Navigate Success
                </h1>
            
                <p className="text-xl md:text-2xl mb-4 text-white max-w-2xl" data-testid="text-subtitle">
                  Smeedies - Your reliable local partner for shipping and logistics
                </p>
                
                <p className="text-base md:text-lg mb-12 text-gray-200 max-w-xl" data-testid="text-description">
                  We deliver logistics solutions to our clients — on time, at the right place, in the original condition and quantity, at a low cost.
                </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gold text-primary hover:bg-gold/90 border-gold font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={onGetQuote}
                data-testid="button-get-quote"
              >
                Get Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-blue-200/50 text-blue-700 hover:bg-blue-50/80 font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={onViewServices}
                data-testid="button-view-services"
              >
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
              {/* Right Globe - 40% */}
              <div className="lg:col-span-2 flex justify-center items-center">
                <div className="relative w-full max-w-[1400px] h-[700px] lg:h-[800px]">
              {/* Globe container */}
              <div className="absolute inset-0 animate-float animate-fade-in-scale">
                <ShippingGlobe 
                  className="w-full h-full rounded-full" 
                  showUI={false}
                  glassmorphic={true}
                />
              </div>
              
                  {/* Floating particles removed - clean look */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
