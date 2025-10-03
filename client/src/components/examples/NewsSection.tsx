import NewsSection from '../NewsSection';

export default function NewsSectionExample() {
  return <NewsSection onViewAllNews={() => console.log('View All News clicked')} />;
}
