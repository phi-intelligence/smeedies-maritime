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
    <Card className="p-6 hover-elevate transition-all duration-300 h-full flex flex-col" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-4" data-testid="text-service-title">{title}</h3>
      </div>
      
      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-muted-foreground">
            <span className="text-chart-3 mr-2 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        variant="ghost" 
        className="w-full justify-between group"
        onClick={onLearnMore}
        data-testid="button-learn-more"
      >
        Learn More
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Card>
  );
}
