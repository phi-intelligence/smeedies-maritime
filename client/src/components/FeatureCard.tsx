import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-blue-500/20" data-testid={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="text-center flex flex-col h-full">
        <div className="w-16 h-16 bg-blue-500/20 rounded-md flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
          <Icon className="w-8 h-8 text-blue-300" />
        </div>
        <h3 className="text-lg font-bold text-white mb-3" data-testid="text-feature-title">{title}</h3>
        <p className="text-blue-100 flex-grow" data-testid="text-feature-description">{description}</p>
      </div>
    </Card>
  );
}
