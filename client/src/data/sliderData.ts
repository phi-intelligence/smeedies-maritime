import { getImageUrl } from '@/config/assets';

// Using S3 images from generated_images folder
const heroImage = getImageUrl('MARITIME_HERO_BACKGROUND');
const portImage = getImageUrl('PORT_OPERATIONS_NEWS');
const tradeImage = getImageUrl('TRADE_ROUTES_NEWS');

// Hero Services Slider Data
export const heroServicesSlider = [
  {
    id: 'maritime-excellence',
    title: 'Smeedies Maritime',
    subtitle: 'Chapter I, page XV',
    description: 'Prime maritime solutions by Smeedies! Your reliable local partner for shipping and logistics. We deliver excellence and navigate success across West Africa and beyond.',
    leftImage: heroImage,
    emphasis: 'Maritime'
  },
  {
    id: 'global-shipping',
    title: 'Global Shipping Excellence',
    subtitle: 'Chapter II, page VII',
    description: 'Our comprehensive shipping services connect continents. From port operations to logistics management, we ensure your cargo reaches its destination safely and on time.',
    leftImage: portImage,
    rightImage: tradeImage,
    emphasis: 'Excellence'
  },
  {
    id: 'industry-leaders',
    title: 'Trusted by Industry Leaders',
    subtitle: 'Chapter III, page XI',
    description: 'Join thousands of satisfied clients who trust Smeedies for their maritime needs. Our 24/7 service, 40+ country network, and 100% on-time delivery record speak for themselves.',
    emphasis: 'Leaders'
  }
];

// About Company Slider Data
export const aboutCompanySlider = [
  {
    id: 'company-history',
    title: 'Our Maritime Heritage',
    subtitle: 'Established 1995',
    description: 'For over three decades, Smeedies has been the cornerstone of maritime excellence in West Africa. Built on a foundation of trust, reliability, and unwavering commitment to our clients.',
    leftImage: portImage,
    emphasis: 'Heritage'
  },
  {
    id: 'mission-vision',
    title: 'Mission & Vision',
    subtitle: 'Driving Excellence',
    description: 'Our mission is to provide seamless maritime solutions that connect West Africa to the world. We envision becoming the leading maritime agency that sets industry standards for service excellence.',
    emphasis: 'Excellence'
  },
  {
    id: 'company-values',
    title: 'Core Values',
    subtitle: 'Our Foundation',
    description: 'Integrity, reliability, and customer-centricity form the bedrock of our operations. We believe in building lasting partnerships through transparent communication and exceptional service delivery.',
    leftImage: tradeImage,
    rightImage: heroImage,
    emphasis: 'Values'
  }
];

// Services Portfolio Slider Data
export const servicesPortfolioSlider = [
  {
    id: 'ship-agency',
    title: 'Ship Agency Services',
    subtitle: 'Port Operations',
    description: 'Comprehensive ship agency services including port clearance, customs documentation, crew assistance, and vessel coordination. We ensure smooth operations from arrival to departure.',
    leftImage: portImage,
    emphasis: 'Agency'
  },
  {
    id: 'logistics-management',
    title: 'Logistics Management',
    subtitle: 'Supply Chain Excellence',
    description: 'End-to-end logistics solutions including cargo handling, warehousing, transportation, and distribution. Our integrated approach ensures efficient movement of goods across all touchpoints.',
    leftImage: tradeImage,
    emphasis: 'Logistics'
  },
  {
    id: 'freight-forwarding',
    title: 'Freight Forwarding',
    subtitle: 'Global Connections',
    description: 'Expert freight forwarding services connecting West Africa to global markets. We handle air, sea, and land freight with precision, ensuring your cargo reaches its destination on time.',
    rightImage: heroImage,
    emphasis: 'Forwarding'
  }
];

// Testimonials Success Slider Data
export const testimonialsSuccessSlider = [
  {
    id: 'client-success',
    title: 'Client Success Stories',
    subtitle: 'Proven Results',
    description: 'Our clients consistently achieve their business objectives through our maritime solutions. From small enterprises to multinational corporations, we deliver results that exceed expectations.',
    emphasis: 'Success'
  },
  {
    id: 'industry-recognition',
    title: 'Industry Recognition',
    subtitle: 'Award-Winning Service',
    description: 'Recognized by industry leaders and trade associations for our outstanding service delivery. Our commitment to excellence has earned us prestigious awards and certifications.',
    rightImage: portImage,
    emphasis: 'Recognition'
  },
  {
    id: 'partnership-growth',
    title: 'Partnership Growth',
    subtitle: 'Building Together',
    description: 'Long-term partnerships built on trust and mutual success. We grow with our clients, adapting our services to meet evolving business needs and market demands.',
    leftImage: tradeImage,
    rightImage: heroImage,
    emphasis: 'Partnership'
  }
];

// Default export for backward compatibility
export const sliderData = heroServicesSlider;

export default sliderData;
