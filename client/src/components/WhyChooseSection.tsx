import { Clock, CheckCircle2, Compass, Network } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function WhyChooseSection() {
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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            Why Choose Us?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-heading">
            Excellence in Every Port, Every Time
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
