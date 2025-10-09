import { ArrowRight, Ship, Truck, Globe, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "./ServiceCard";
import ScrollAnimation from "./ScrollAnimation";
import ParallaxBackground from "./ParallaxBackground";
import logistics3Video from "@/assets/videos/logistics-3.mp4";
import { useEffect, useRef, useState } from "react";

interface ServicesSectionProps {
  onViewAllServices?: () => void;
}

export default function ServicesSection({ onViewAllServices }: ServicesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} className="py-20 relative overflow-hidden prevent-white-flash">
      
      {/* Background Video with Parallax */}
      <ParallaxBackground speed={0.4} direction="up" className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadStart={() => console.log('Services video loading started')}
          onCanPlay={() => console.log('Services video can play')}
          onError={(e) => console.error('Services video error:', e)}
        >
          <source src={logistics3Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </ParallaxBackground>
      
      {/* Dark overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70" style={{ zIndex: 2 }} /> */}
      
      {/* Header content */}
      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 3 }}>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-heading">
            Comprehensive Maritime Solutions
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto" data-testid="text-subtitle">
            Professional shipping and logistics services across West Africa
          </p>
        </div>
      </div>

      {/* Full width cards container */}
      <div className="w-full px-4 mb-12 relative" style={{ zIndex: 3 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`service-card-animated ${isVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 100}ms` : '0ms',
                opacity: isVisible ? 1 : 0,
                transition: isVisible ? 'none' : 'opacity 0.3s ease'
              }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                features={service.features}
                onLearnMore={() => console.log(`Learn more: ${service.title}`)}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 3 }}>
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
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
