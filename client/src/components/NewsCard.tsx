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
    <Card className="overflow-hidden bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/20" data-testid={`card-news-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <Badge variant="outline" className="mb-3 border-blue-400/50 text-blue-200 bg-blue-500/10" data-testid="badge-category">
          {category}
        </Badge>
        <h3 className="text-lg font-bold text-white mb-3" data-testid="text-news-title">
          {title}
        </h3>
        <p className="text-sm text-blue-100" data-testid="text-news-content">
          {content}
        </p>
      </div>
    </Card>
  );
}
