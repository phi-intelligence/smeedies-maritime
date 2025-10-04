import OfficeCard from "./OfficeCard";
import { useEffect, useRef, useState } from "react";
import tema2Video from "@/assets/videos/tem2.mp4";

export default function OfficeNetworkSection() {
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

  const offices = [
    {
      name: "Accra Office",
      location: "Kotoka International Airport",
      services: "Air cargo handling",
      digitalAddress: "GL-125-6946"
    },
    {
      name: "Kumasi Office",
      location: "Central Ghana",
      services: "Forwarding via truck or air",
      digitalAddress: ""
    },
    {
      name: "Takoradi Office",
      location: "Near seaport",
      services: "Cargo management",
      digitalAddress: ""
    },
    {
      name: "Paga Office",
      location: "Border with Burkina Faso",
      services: "Transit cargo",
      digitalAddress: ""
    },
    {
      name: "Elubo Office",
      location: "Border with Côte d'Ivoire",
      services: "Transit activities",
      digitalAddress: ""
    },
    {
      name: "Akosombo Office",
      location: "Inland water transport",
      services: "Truck/rail/water forwarding",
      digitalAddress: ""
    },
    {
      name: "Aflao Office",
      location: "Border with Togo",
      services: "Transit activities",
      digitalAddress: ""
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      >
        <source src={tema2Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70" style={{ zIndex: 0 }} />
      
      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
            Office Network
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-heading">
            Strategic Locations Across Ghana
          </h2>
          <p className="text-lg text-gray-200" data-testid="text-subtitle">
            Seven offices strategically positioned for optimal coverage
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office, index) => (
            <div 
              key={index} 
              className={`service-card-animated ${isVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 100}ms` : '0ms',
                opacity: isVisible ? 1 : 0,
                transition: isVisible ? 'none' : 'opacity 0.3s ease'
              }}
            >
              <OfficeCard
                name={office.name}
                location={office.location}
                services={office.services}
                digitalAddress={office.digitalAddress}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
