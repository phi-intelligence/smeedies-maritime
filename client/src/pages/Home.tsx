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
import ScrollAnimation from "@/components/ScrollAnimation";
import heroImage from '@assets/generated_images/Maritime_hero_background_image_0cc6412a.png';
import heroVideo from '@/assets/videos/underwater.mp4';

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Full Page Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability across entire page */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
      
      {/* Content with higher z-index */}
      <div className="relative z-20">
        <Navigation />
        
        <main>
        {/* Hero Section with Globe Animation */}
        <section id="home">
          <Hero 
            backgroundImage={heroImage}
            backgroundVideo={heroVideo}
            onGetQuote={() => scrollToSection('contact')}
            onViewServices={() => scrollToSection('services')}
          />
        </section>
        
        {/* Content Sections */}
        <ScrollAnimation animation="fadeInUp">
          <section id="about">
            <AboutSection onLearnMore={() => scrollToSection('services')} />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInUp" delay={100}>
          <section id="services">
            <ServicesSection onViewAllServices={() => console.log('View all services')} />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInScale" delay={200}>
          <WhyChooseSection />
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInLeft" delay={100}>
          <section id="operations">
            <OperationalScope />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInRight" delay={200}>
          <OfficeNetworkSection />
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInUp" delay={100}>
          <section id="warehousing">
            <WarehousingSection />
          </section>
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInScale" delay={200}>
          <TestimonialsSection />
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInUp" delay={100}>
          <NewsSection onViewAllNews={() => console.log('View all news')} />
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <QuoteSection />
        </ScrollAnimation>
        
        <ScrollAnimation animation="fadeInUp" delay={100}>
          <section id="contact">
            <ContactSection />
          </section>
        </ScrollAnimation>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
