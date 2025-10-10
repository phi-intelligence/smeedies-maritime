import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WarehousingSection from "@/components/WarehousingSection";
import OperationalScope from "@/components/OperationalScope";
import OfficeNetworkSection from "@/components/OfficeNetworkSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";
import ScrollAnimation from "@/components/ScrollAnimation";
import { getImageUrl, getVideoUrl } from '@/config/assets';

export default function Home() {

  return (
    <div className="min-h-screen bg-transparent relative prevent-white-flash">
      <Navigation />
      
      <main>
        {/* Hero Section with Globe Animation */}
        <section id="home">
          <Hero 
            backgroundVideo={getVideoUrl('BACKGROUND_NEW')}
            onGetQuote={() => window.location.href = '/contact'}
            onViewServices={() => window.location.href = '/services'}
          />
        </section>
        
        {/* Content Sections */}
        <ScrollAnimation animation="fadeInUp">
          <section id="about">
            <AboutSection onLearnMore={() => window.location.href = '/services'} />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInUp" delay={100}>
          <section id="services">
            <ServicesSection onViewAllServices={() => window.location.href = '/services'} />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <section id="warehousing">
            <WarehousingSection />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInLeft" delay={100}>
          <section id="operations">
            <OperationalScope />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInRight" delay={200}>
          <section id="office-network">
            <OfficeNetworkSection />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInScale" delay={100}>
          <section id="why-choose">
            <WhyChooseSection />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInScale" delay={100}>
          <section id="testimonials">
            <TestimonialsSection />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInUp" delay={100}>
          <section id="news">
            <NewsSection onViewAllNews={() => console.log('View all news')} />
          </section>
        </ScrollAnimation>
      </main>
      
      <Footer />
    </div>
  );
}