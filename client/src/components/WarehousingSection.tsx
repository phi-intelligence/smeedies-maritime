import { Warehouse, Thermometer, Shield, Package, Wifi, FileCheck2, Bug } from "lucide-react";
import logistics5Video from "@/assets/videos/logistics-5.mp4";

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
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      >
        <source src={logistics5Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70" style={{ zIndex: 0 }} />
      
      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            Warehousing Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-heading">
            Complete Storage Solutions
          </h2>
          <p className="text-lg text-gray-200" data-testid="text-subtitle">
            Whatever your warehouse needs, we can help
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-md bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-md flex items-center justify-center mb-4 border border-blue-400/30">
                <feature.icon className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2" data-testid="text-feature-title">
                {feature.title}
              </h3>
              <p className="text-xs text-blue-100" data-testid="text-feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
