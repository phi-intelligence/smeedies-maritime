import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center" data-testid={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3" data-testid="text-feature-title">{title}</h3>
      <p className="text-muted-foreground" data-testid="text-feature-description">{description}</p>
    </div>
  );
}
