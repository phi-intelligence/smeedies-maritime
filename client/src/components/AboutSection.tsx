import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCounter from "./StatCounter";
import ContainerShipBackground from "./ContainerShipBackground";

interface AboutSectionProps {
  onLearnMore?: () => void;
}

export default function AboutSection({ onLearnMore }: AboutSectionProps) {
  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Container Ship Background Animation */}
      <ContainerShipBackground />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-4xl mx-auto" data-testid="text-heading">
            Discover the expertise behind Smeedies Maritime, your premier shipping agency and logistics partner across West Africa.
          </h2>
        </div>
        
        <div className="bg-primary py-16 rounded-md mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <StatCounter end={40} suffix="+" label="Countries Network Coverage" />
            <StatCounter end={24} suffix="/7" label="Round-the-Clock Availability" />
            <StatCounter end={3} label="Major Ports Served" />
            <StatCounter end={100} suffix="%" label="On-Time Delivery Success" />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-200 mb-8" data-testid="text-description">
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
