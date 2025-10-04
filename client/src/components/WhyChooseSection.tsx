import { Clock, CheckCircle2, Compass, Network } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { useEffect, useRef, useState } from "react";
import logisticsImage from "@/assets/images/logistics.jpg";

export default function WhyChooseSection() {
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

  const features = [
    {
      icon: Clock,
      title: "Round-the-Clock Service",
      description: "We are available to provide services 24 hours a day, 7 days a week."
    },
    {
      icon: CheckCircle2,
      title: "On-Time, On-Budget Delivery",
      description: "Single contact point and standardized billing with speedy coordination enabling fast vessel turnaround."
    },
    {
      icon: Compass,
      title: "Local Knowledge & Experience",
      description: "Leverage our deep understanding of West African ports and regulations."
    },
    {
      icon: Network,
      title: "Extensive Office Network",
      description: "Seven strategic locations across Ghana for optimal coverage and service delivery."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-transparent relative overflow-hidden"
      style={{
        backgroundImage: `url(${logisticsImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70" />
      
      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
            Why Choose Us?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-heading">
            Excellence in Every Port, Every Time
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`service-card-animated ${isVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 100}ms` : '0ms',
                opacity: isVisible ? 1 : 0,
                transition: isVisible ? 'none' : 'opacity 0.3s ease'
              }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
