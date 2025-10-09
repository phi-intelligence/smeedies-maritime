import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsCard from "./NewsCard";
import { useEffect, useRef, useState } from "react";
import portOpsImage from '@assets/generated_images/Port_operations_news_image_24646142.png';
import tugboatsImage from '@assets/generated_images/Tugboats_news_image_1741c7dd.png';
import tradeRoutesImage from '@assets/generated_images/Trade_routes_news_image_3fdbe485.png';
import cargoShipImage from '@/assets/images/cargo-ship-miami-harbor.jpg';

interface NewsSectionProps {
  onViewAllNews?: () => void;
}

export default function NewsSection({ onViewAllNews }: NewsSectionProps) {
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

  const news = [
    {
      image: portOpsImage,
      category: "Updates",
      title: "Port Operations Continue During Restrictions",
      content: "Port users are encouraged to continue clearing goods at Ghana's sea ports, as cargo movement remains exempt from movement restrictions."
    },
    {
      image: tugboatsImage,
      category: "Infrastructure",
      title: "New Tugboats Commissioned at Port of Tema",
      content: "The Ghana Ports and Harbours Authority has commissioned three new tugboats at the Port of Tema to attract larger vessels and improve turnaround times."
    },
    {
      image: tradeRoutesImage,
      category: "Trade",
      title: "Intra-African Trade Growth Opportunities",
      content: "As infrastructure improves across West Africa, intra-African trade will continue to grow with new opportunities emerging."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-transparent relative overflow-hidden">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${cargoShipImage})`
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
            News & Updates
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-heading">
            Latest Maritime Industry News
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {news.map((item, index) => (
            <div 
              key={index} 
              className={`service-card-animated ${isVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
              style={{
                animationDelay: isVisible ? `${(index + 1) * 100}ms` : '0ms',
                opacity: isVisible ? 1 : 0,
                transition: isVisible ? 'none' : 'opacity 0.3s ease'
              }}
            >
              <NewsCard
                image={item.image}
                category={item.category}
                title={item.title}
                content={item.content}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            onClick={onViewAllNews}
            data-testid="button-view-all-news"
          >
            View All News
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
