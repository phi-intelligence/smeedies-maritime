import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  backgroundImage: string;
  onGetQuote?: () => void;
  onViewServices?: () => void;
}

export default function Hero({ backgroundImage, onGetQuote, onViewServices }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <Badge 
          variant="outline" 
          className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          data-testid="badge-location"
        >
          <MapPin className="w-3 h-3 mr-1" />
          Tema, Ghana
        </Badge>
        
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gold" data-testid="text-tagline">
          Prime Maritime Solutions by Smeedies!
        </h2>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto" data-testid="text-headline">
          Deliver Excellence, Navigate Success
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto" data-testid="text-subtitle">
          Your reliable local partner for shipping and logistics
        </p>
        
        <p className="text-base md:text-lg mb-12 text-white/80 max-w-2xl mx-auto" data-testid="text-description">
          We deliver logistics solutions to our clients — on time, at the right place, in the original condition and quantity, at a low cost.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gold text-primary hover:bg-gold/90 border-gold font-semibold text-lg px-8"
            onClick={onGetQuote}
            data-testid="button-get-quote"
          >
            Get Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8"
            onClick={onViewServices}
            data-testid="button-view-services"
          >
            Our Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
