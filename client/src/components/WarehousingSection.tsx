import { Warehouse, Thermometer, Shield, Package, Wifi, FileCheck2, Bug } from "lucide-react";

export default function WarehousingSection() {
  const features = [
    { icon: Warehouse, title: "Right Space Provision", description: "Adequate storage capacity" },
    { icon: Thermometer, title: "Temperature Control", description: "Climate-controlled facilities" },
    { icon: Shield, title: "24/7 CCTV Security", description: "Round-the-clock monitoring" },
    { icon: Package, title: "Consolidation Services", description: "Cargo consolidation and de-consolidation" },
    { icon: Wifi, title: "GCNET Availability", description: "Digital customs integration" },
    { icon: FileCheck2, title: "Insurance Coverage", description: "Indemnity insurance" },
    { icon: Bug, title: "Fumigation Services", description: "Pest control and treatment" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            Warehousing Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-heading">
            Complete Storage Solutions
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-subtitle">
            Whatever your warehouse needs, we can help
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-md bg-card hover-elevate transition-all duration-300"
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2" data-testid="text-feature-title">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground" data-testid="text-feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
