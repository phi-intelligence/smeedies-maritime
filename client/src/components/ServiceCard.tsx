import { ArrowRight, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  features: string[];
  onLearnMore?: () => void;
}

export default function ServiceCard({ icon: Icon, title, features, onLearnMore }: ServiceCardProps) {
  return (
    <Card className="p-6 bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-blue-500/20" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="mb-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-md flex items-center justify-center mb-4 border border-blue-400/30">
          <Icon className="w-6 h-6 text-blue-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4" data-testid="text-service-title">{title}</h3>
      </div>
      
      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-blue-100">
            <span className="text-blue-300 mr-2 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant="outline" 
        className="w-full justify-between group border-blue-400/50 text-blue-200 hover:bg-blue-500/20 hover:border-blue-300 hover:text-white"
        onClick={onLearnMore}
        data-testid="button-learn-more"
      >
        Learn More
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
}
