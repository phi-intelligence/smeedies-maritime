import NewsCard from '../NewsCard';
import newsImage from '@assets/generated_images/Port_operations_news_image_24646142.png';

export default function NewsCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <NewsCard
        image={newsImage}
        category="Updates"
        title="Port Operations Continue During Restrictions"
        content="Port users are encouraged to continue clearing goods at Ghana's sea ports, as cargo movement remains exempt from movement restrictions."
      />
    </div>
  );
}
