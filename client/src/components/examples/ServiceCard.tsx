import ServiceCard from '../ServiceCard';
import { Ship } from 'lucide-react';

export default function ServiceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ServiceCard
        icon={Ship}
        title="Agency Services"
        features={[
          "Competitive Proforma Disbursement Account (PDA)",
          "Real-time port line-up service at Tema and Takoradi",
          "Guidance on berth restrictions and regulations",
          "Daily cargo operation updates",
          "Statement of Facts (SOF)"
        ]}
        onLearnMore={() => console.log('Learn more clicked')}
      />
    </div>
  );
}
