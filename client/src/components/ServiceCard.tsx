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
    <div 
      className="service-card-outline"
      data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="service-card-content">
        <div className="mb-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-md flex items-center justify-center mb-4 border border-blue-400/30">
            <Icon className="w-6 h-6 text-blue-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4" data-testid="text-service-title">{title}</h3>
        </div>
        
        <ul className="space-y-2 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-blue-100">
              <span className="text-blue-300 mr-2 mt-0.5">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
