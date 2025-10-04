import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface OfficeCardProps {
  name: string;
  location: string;
  services: string;
  digitalAddress: string;
}

export default function OfficeCard({ name, location, services, digitalAddress }: OfficeCardProps) {
  return (
    <Card className="p-6 bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20" data-testid={`card-office-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-500/20 rounded-md flex items-center justify-center flex-shrink-0 border border-blue-400/30">
          <MapPin className="w-5 h-5 text-blue-300" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white" data-testid="text-office-name">{name}</h3>
          <p className="text-sm text-blue-100" data-testid="text-office-location">{location}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <p className="text-xs font-semibold text-white mb-1">Services:</p>
          <p className="text-sm text-blue-100" data-testid="text-office-services">{services}</p>
        </div>
        
        {digitalAddress && (
          <div>
            <p className="text-xs font-semibold text-white mb-1">Digital Address:</p>
            <p className="text-sm font-mono text-blue-200" data-testid="text-digital-address">{digitalAddress}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
