import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import OperationalScope from "@/components/OperationalScope";
import OfficeNetworkSection from "@/components/OfficeNetworkSection";
import WarehousingSection from "@/components/WarehousingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import QuoteSection from "@/components/QuoteSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import heroImage from '@assets/generated_images/Maritime_hero_background_image_0cc6412a.png';

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section id="home">
          <Hero 
            backgroundImage={heroImage}
            onGetQuote={() => scrollToSection('contact')}
            onViewServices={() => scrollToSection('services')}
          />
        </section>
        
        <section id="about">
          <AboutSection onLearnMore={() => scrollToSection('services')} />
        </section>
        
        <section id="services">
          <ServicesSection onViewAllServices={() => console.log('View all services')} />
        </section>
        
        <WhyChooseSection />
        
        <section id="operations">
          <OperationalScope />
        </section>
        
        <OfficeNetworkSection />
        
        <section id="warehousing">
          <WarehousingSection />
        </section>
        
        <TestimonialsSection />
        
        <NewsSection onViewAllNews={() => console.log('View all news')} />
        
        <QuoteSection />
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
