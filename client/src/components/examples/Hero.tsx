import Hero from '../Hero';
import heroImage from '@assets/generated_images/Maritime_hero_background_image_0cc6412a.png';

export default function HeroExample() {
  return (
    <Hero 
      backgroundImage={heroImage}
      onGetQuote={() => console.log('Get Quote clicked')}
      onViewServices={() => console.log('View Services clicked')}
    />
  );
}
