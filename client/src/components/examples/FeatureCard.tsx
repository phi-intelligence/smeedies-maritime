import FeatureCard from '../FeatureCard';
import { Clock } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <div className="p-8 max-w-xs">
      <FeatureCard
        icon={Clock}
        title="Round-the-Clock Service"
        description="We are available to provide services 24 hours a day, 7 days a week."
      />
    </div>
  );
}
