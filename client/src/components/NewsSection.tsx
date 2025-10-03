import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsCard from "./NewsCard";
import portOpsImage from '@assets/generated_images/Port_operations_news_image_24646142.png';
import tugboatsImage from '@assets/generated_images/Tugboats_news_image_1741c7dd.png';
import tradeRoutesImage from '@assets/generated_images/Trade_routes_news_image_3fdbe485.png';

interface NewsSectionProps {
  onViewAllNews?: () => void;
}

export default function NewsSection({ onViewAllNews }: NewsSectionProps) {
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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            News & Updates
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-heading">
            Latest Maritime Industry News
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {news.map((item, index) => (
            <NewsCard
              key={index}
              image={item.image}
              category={item.category}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
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
