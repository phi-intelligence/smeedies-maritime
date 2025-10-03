import { ArrowRight, Ship, Truck, Globe, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";

interface ServicesSectionProps {
  onViewAllServices?: () => void;
}

export default function ServicesSection({ onViewAllServices }: ServicesSectionProps) {
  const services = [
    {
      icon: Ship,
      title: "Agency Services",
      features: [
        "Competitive Proforma Disbursement Account (PDA)",
        "Real-time port line-up service at Tema and Takoradi",
        "Guidance on berth restrictions and regulations",
        "Daily cargo operation updates",
        "Statement of Facts (SOF)"
      ]
    },
    {
      icon: Truck,
      title: "Stevedoring & Shore Handling",
      features: [
        "Dry bulk commodities (clinker, slag, gypsum, coal, manganese)",
        "Break bulk cargo (rice, soya bean meal, wheat, maize, sugar)",
        "Containerised cargo",
        "Heavy lift cargo",
        "Warehousing and storage services"
      ]
    },
    {
      icon: Globe,
      title: "Project Cargo",
      features: [
        "Clearance in 8 countries",
        "Ghana, Togo, Côte d'Ivoire",
        "Burkina Faso, Mali, Niger",
        "Benin, Nigeria"
      ]
    },
    {
      icon: FileCheck,
      title: "Customs Clearing",
      features: [
        "Fast clearance of consignments",
        "On-time delivery guarantee",
        "Minimum cost solutions",
        "Document pre-processing"
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-heading">
            Comprehensive Maritime Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-subtitle">
            Professional shipping and logistics services across West Africa
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              features={service.features}
              onLearnMore={() => console.log(`Learn more: ${service.title}`)}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            onClick={onViewAllServices}
            data-testid="button-view-all-services"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
