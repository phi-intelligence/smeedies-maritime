import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  image: string;
  category: string;
  title: string;
  content: string;
}

export default function NewsCard({ image, category, title, content }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer" data-testid={`card-news-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <Badge variant="secondary" className="mb-3" data-testid="badge-category">
          {category}
        </Badge>
        <h3 className="text-lg font-bold text-foreground mb-3" data-testid="text-news-title">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground" data-testid="text-news-content">
          {content}
        </p>
      </div>
    </Card>
  );
}
