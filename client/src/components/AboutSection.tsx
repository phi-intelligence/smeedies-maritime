import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCounter from "./StatCounter";
import ParallaxBackground from "./ParallaxBackground";

interface AboutSectionProps {
  onLearnMore?: () => void;
}

export default function AboutSection({ onLearnMore }: AboutSectionProps) {
  return (
    <section className="py-20 relative overflow-hidden prevent-white-flash">
      
      {/* Background Image with Parallax */}
      <ParallaxBackground speed={0.3} direction="up" className="absolute inset-0 w-full h-full">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/src/assets/images/Tema_Port_aerial_view_2afebff1.png')` }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </ParallaxBackground>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-4xl mx-auto" data-testid="text-heading">
            Discover the expertise behind Smeedies Maritime, your premier shipping agency and logistics partner across West Africa.
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          <div className="stat-card-container">
            <div className="stat-card stat-card-1">
              <div className="stat-card-content">
                <StatCounter end={40} suffix="+" label="Countries Network Coverage" />
              </div>
            </div>
          </div>
          
          <div className="stat-card-container">
            <div className="stat-card stat-card-2">
              <div className="stat-card-content">
                <StatCounter end={24} suffix="/7" label="Round-the-Clock Availability" />
              </div>
            </div>
          </div>
          
          <div className="stat-card-container">
            <div className="stat-card stat-card-3">
              <div className="stat-card-content">
                <StatCounter end={3} label="Major Ports Served" />
              </div>
            </div>
          </div>
          
          <div className="stat-card-container">
            <div className="stat-card stat-card-4">
              <div className="stat-card-content">
                <StatCounter end={100} suffix="%" label="On-Time Delivery Success" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-200 mb-8 mt-4" data-testid="text-description">
            Smeedies Maritime is a shipping agency providing ship agency and logistics services across various ports in West Africa. We help customers and principals add value to their business and assist with all shipping, freight, and logistics requirements.
          </p>
          
          <Button 
            size="lg"
            onClick={onLearnMore}
            data-testid="button-learn-more"
          >
            Learn More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
