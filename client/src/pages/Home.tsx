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
import ScrollDrivenModelYuka from "@/components/ScrollDrivenModelYuka";
import StatCounter from "@/components/StatCounter";
import ServiceCard from "@/components/ServiceCard";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import { ArrowRight, Ship, Truck, Globe, FileCheck, Clock, CheckCircle2, Compass, Network, Warehouse, Thermometer, Shield, Package, Wifi, FileCheck2, Bug } from "lucide-react";
// Import testimonial images
// Testimonial images are now handled through the asset system
import { getImageUrl, getVideoUrl, getModelUrl } from '@/config/assets';
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isServicesVisible, setIsServicesVisible] = useState(false);
  const [isWhyChooseVisible, setIsWhyChooseVisible] = useState(false);
  const [isWarehousingVisible, setIsWarehousingVisible] = useState(false);
  const [isOfficeNetworkVisible, setIsOfficeNetworkVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const warehousingRef = useRef<HTMLDivElement>(null);
  const officeNetworkRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Ship,
      title: "Agency Services",
      features: [
        "Competitive Proforma Disbursement Account (PDA)",
        "Real-time port line-up service at Tema and Takoradi",
        "Guidance on berth restrictions and regulations",
        "Daily cargo operation updates",
        "Statement of Facts (SOF)"
      ]
    },
    {
      icon: Truck,
      title: "Stevedoring & Shore Handling",
      features: [
        "Dry bulk commodities (clinker, slag, gypsum, coal, manganese)",
        "Break bulk cargo (rice, soya bean meal, wheat, maize, sugar)",
        "Containerised cargo",
        "Heavy lift cargo",
        "Warehousing and storage services"
      ]
    },
    {
      icon: Globe,
      title: "Project Cargo",
      features: [
        "Clearance in 8 countries",
        "Ghana, Togo, Côte d'Ivoire",
        "Burkina Faso, Mali, Niger",
        "Benin, Nigeria"
      ]
    },
    {
      icon: FileCheck,
      title: "Customs Clearing",
      features: [
        "Fast clearance of consignments",
        "On-time delivery guarantee",
        "Minimum cost solutions",
        "Document pre-processing"
      ]
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Round-the-Clock Service",
      description: "We are available to provide services 24 hours a day, 7 days a week."
    },
    {
      icon: CheckCircle2,
      title: "On-Time, On-Budget Delivery",
      description: "Single contact point and standardized billing with speedy coordination enabling fast vessel turnaround."
    },
    {
      icon: Compass,
      title: "Local Knowledge & Experience",
      description: "Leverage our deep understanding of West African ports and regulations."
    },
    {
      icon: Network,
      title: "Extensive Office Network",
      description: "Seven strategic locations across Ghana for optimal coverage and service delivery."
    }
  ];

  const warehousingFeatures = [
    { icon: Warehouse, title: "Right Space Provision", description: "Adequate storage capacity" },
    { icon: Thermometer, title: "Temperature Control", description: "Climate-controlled facilities" },
    { icon: Shield, title: "24/7 CCTV Security", description: "Round-the-clock monitoring" },
    { icon: Package, title: "Consolidation Services", description: "Cargo consolidation and de-consolidation" },
    { icon: Wifi, title: "GCNET Availability", description: "Digital customs integration" },
    { icon: FileCheck2, title: "Insurance Coverage", description: "Indemnity insurance" },
    { icon: Bug, title: "Fumigation Services", description: "Pest control and treatment" }
  ];

  const offices = [
    {
      name: "Accra Office",
      location: "Kotoka International Airport",
      services: "Air cargo handling",
      digitalAddress: "GL-125-6946"
    },
    {
      name: "Kumasi Office",
      location: "Central Ghana",
      services: "Forwarding via truck or air",
      digitalAddress: ""
    },
    {
      name: "Takoradi Office",
      location: "Near seaport",
      services: "Cargo management",
      digitalAddress: ""
    },
    {
      name: "Paga Office",
      location: "Border with Burkina Faso",
      services: "Transit cargo",
      digitalAddress: ""
    },
    {
      name: "Elubo Office",
      location: "Border with Côte d'Ivoire",
      services: "Transit activities",
      digitalAddress: ""
    },
    {
      name: "Akosombo Office",
      location: "Inland water transport",
      services: "Truck/rail/water forwarding",
      digitalAddress: ""
    },
    {
      name: "Aflao Office",
      location: "Border with Togo",
      services: "Transit activities",
      digitalAddress: ""
    }
  ];

  const testimonials = [
    {
      quote: "Smeedies has been our reliable partner for over 5 years. Their local expertise and 24/7 service is unmatched in West Africa.",
      name: "Captain James Osei",
      company: "Atlantic Shipping Lines"
    },
    {
      quote: "Fast clearance and on-time delivery every time. They understand the complexities of West African trade.",
      name: "Sarah Mensah",
      company: "Ghana Importers Association"
    },
    {
      quote: "Professional service and competitive rates. Their network across Ghana gives us complete coverage.",
      name: "Michael Asante",
      company: "West Africa Freight Forwarders"
    },
    {
      quote: "Excellent handling of our project cargo requirements. They cleared everything on time and within budget.",
      name: "Dr. Ama Boateng",
      company: "Infrastructure Development Corp"
    },
    {
      quote: "Their warehousing services are top-notch. Temperature control and security are exactly what we needed.",
      name: "Kwame Nkrumah",
      company: "Agricultural Exporters Ltd"
    },
    {
      quote: "Smeedies made our intra-African trade operations seamless. Highly recommended for West African logistics.",
      name: "Fatima Diallo",
      company: "Sahel Trading Company"
    }
  ];


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true);
        } else {
          setIsServicesVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWhyChooseVisible(true);
        } else {
          setIsWhyChooseVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (whyChooseRef.current) {
      observer.observe(whyChooseRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWarehousingVisible(true);
        } else {
          setIsWarehousingVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (warehousingRef.current) {
      observer.observe(warehousingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsOfficeNetworkVisible(true);
        } else {
          setIsOfficeNetworkVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (officeNetworkRef.current) {
      observer.observe(officeNetworkRef.current);
    }

    // Fallback for mobile devices - ensure cards are visible
    const checkMobileAndShow = () => {
      if (window.innerWidth <= 768) {
        setIsOfficeNetworkVisible(true);
      }
    };

    checkMobileAndShow();
    window.addEventListener('resize', checkMobileAndShow);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobileAndShow);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTestimonialsVisible(true);
        } else {
          setIsTestimonialsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <div className="min-h-screen bg-transparent relative">
      <Navigation />
      
      {/* Scroll-Driven 3D Model Background - GLB Model Only */}
      <div>
                <ScrollDrivenModelYuka 
                  className="fixed inset-0"
                  modelPath={getModelUrl('SMEEDIES_NEW_1')}
                  scale={3.0}
                />
      </div>
      
      <main className="relative z-20">
        {/* Hero Section with Globe Animation - Independent Section */}
        <section id="home" className="relative min-h-screen overflow-hidden">
          <Hero 
            backgroundVideo={getVideoUrl('BACKGROUND_NEW')}
            onGetQuote={() => window.location.href = '/contact'}
            onViewServices={() => window.location.href = '/services'}
          />
        </section>
        
        {/* Clear Section Boundary */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        
        
        {/* Operations Section - Ghana Focus */}
        <section className="relative min-h-screen bg-transparent">
          
          {/* Content Sections - Normal Page Flow */}
          <div className="relative">
              
              
              {/* About Section Content */}
              <div className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative">
                  <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
                      About Us
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-4xl mx-auto" data-testid="text-heading">
                      Discover the expertise behind Smeedies Maritime, your premier shipping agency and logistics partner across West Africa.
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                    <div className="stat-card-container">
                      <div className="stat-card stat-card-1">
                        <div className="stat-card-content">
                          <StatCounter end={40} suffix="+" label="Countries Network Coverage" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="stat-card-container">
                      <div className="stat-card stat-card-2">
                        <div className="stat-card-content">
                          <StatCounter end={24} suffix="/7" label="Round-the-Clock Availability" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="stat-card-container">
                      <div className="stat-card stat-card-3">
                        <div className="stat-card-content">
                          <StatCounter end={3} label="Major Ports Served" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="stat-card-container">
                      <div className="stat-card stat-card-4">
                        <div className="stat-card-content">
                          <StatCounter end={100} suffix="%" label="On-Time Delivery Success" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-gray-200 mb-8" data-testid="text-description">
                      Smeedies Maritime is a shipping agency providing ship agency and logistics services across various ports in West Africa. We help customers and principals add value to their business and assist with all shipping, freight, and logistics requirements.
                    </p>
                    
                    <Button 
                      size="lg"
                      onClick={() => window.location.href = '/services'}
                      data-testid="button-learn-more"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Services Section Content */}
              <div ref={servicesRef} className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative">
                  <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
                      Our Services
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-heading">
                      Comprehensive Maritime Solutions
                    </h2>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto" data-testid="text-subtitle">
                      Professional shipping and logistics services across West Africa
                    </p>
                  </div>
                </div>

                {/* Full width cards container */}
                <div className="w-full px-4 mb-12 relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {services.map((service, index) => (
                      <div 
                        key={index} 
                        className={`service-card-animated ${isServicesVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
                        style={{
                          animationDelay: isServicesVisible ? `${(index + 1) * 100}ms` : '0ms',
                          opacity: isServicesVisible ? 1 : 0,
                          transition: isServicesVisible ? 'none' : 'opacity 0.3s ease'
                        }}
                      >
                        <ServiceCard
                          icon={service.icon}
                          title={service.title}
                          features={service.features}
                          onLearnMore={() => console.log(`Learn more: ${service.title}`)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 relative">
                  <div className="text-center">
                    <Button 
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      onClick={() => window.location.href = '/services'}
                      data-testid="button-view-all-services"
                    >
                      View All Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Operational Scope Section */}
              <div className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative">
                  <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
                      Operational Scope
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-testid="text-heading">
                      Serving West Africa's Maritime Industry
                    </h2>
                  </div>
                </div>

                {/* Full width content container */}
                <div className="w-full px-4 mb-12 relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mx-auto" style={{ maxWidth: '90rem' }}>
                    <div className="space-y-8 p-4">
                      <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-400/30 rounded-lg p-6 animate-fade-in-up">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                          <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
                          Core Competency
                        </h3>
                        <p className="text-gray-200 text-lg leading-relaxed">
                          Our core competency is shipping agency services and all allied activities related to shipping and logistics.
                        </p>
                      </div>
                      
                      <div className="bg-green-900/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                          <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                          Client Base
                        </h3>
                        <p className="text-gray-200 text-lg leading-relaxed">
                          We serve ship owners, operators, exporters, importers, shipping lines, freight forwarders, and all connected to the shipping and freight industry.
                        </p>
                      </div>
                      
                      <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                          <span className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></span>
                          Locations
                        </h3>
                        <p className="text-gray-200 text-lg leading-relaxed">
                          Locations served include the Ports of Tema, Takoradi, and Kotoka International Airport.
                        </p>
                      </div>
                    </div>
                    
                    {/* Service Countries and Map Cards */}
                    <div className="flex flex-col gap-6 lg:gap-8 items-center p-4 min-h-[400px] lg:min-h-[600px]">
                      {/* Service Countries Card */}
                      <div className="operational-stat-card-container animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="operational-stat-card">
                          <div className="operational-stat-card-content">
                            <div className="flex flex-col items-center justify-center text-center h-full">
                              <h3 className="text-xl font-bold text-white mb-6" data-testid="text-service-countries-title">Service Countries</h3>
                              <div className="grid grid-cols-2 gap-4">
                                {["Ghana", "Togo", "Côte d'Ivoire", "Burkina Faso", "Mali", "Niger", "Benin", "Nigeria"].map((country, index) => (
                                  <div 
                                    key={index} 
                                    className="flex items-center gap-2 text-blue-100 animate-fade-in-up"
                                    style={{ animationDelay: `${400 + index * 50}ms` }}
                                    data-testid={`country-${country.toLowerCase().replace(/\s+/g, '-')}`}
                                  >
                                    <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></span>
                                    <span>{country}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* West Africa Region Map Image Card */}
                      <div className="operational-image-card-container animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                        <div className="operational-image-card">
                          <div className="operational-image-card-content">
                            <img 
                              src={getImageUrl('WEST_AFRICA')} 
                              alt="West Africa Region Map" 
                              data-testid="west-africa-image"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warehousing Services Content */}
              <div ref={warehousingRef} className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative">
                  <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
                      Warehousing Services
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-heading">
                      Complete Storage Solutions
                    </h2>
                    <p className="text-lg text-gray-200" data-testid="text-subtitle">
                      Whatever your warehouse needs, we can help
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
                    {warehousingFeatures.map((feature, index) => (
                      <div 
                        key={index} 
                        className={`storage-card-outline ${isWarehousingVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
                        style={{
                          animationDelay: isWarehousingVisible ? `${(index + 1) * 100}ms` : '0ms',
                          opacity: isWarehousingVisible ? 1 : 0,
                          transition: isWarehousingVisible ? 'none' : 'opacity 0.3s ease'
                        }}
                        data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="storage-card-content">
                          <div className="storage-card-inner">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-md flex items-center justify-center mb-4 border border-blue-400/30">
                              <feature.icon className="w-6 h-6 text-blue-300" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2" data-testid="text-feature-title">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-blue-100" data-testid="text-feature-description">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Office Network Section */}
              <div ref={officeNetworkRef} className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative">
                  <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
                      Office Network
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-heading">
                      Strategic Locations Across Ghana
                    </h2>
                    <p className="text-lg text-gray-200" data-testid="text-subtitle">
                      Seven offices strategically positioned for optimal coverage
                    </p>
                  </div>
                  
                  {/* Office cards container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-items-center">
                    {offices.map((office, index) => (
                      <div 
                        key={index} 
                        className={`country-card ${isOfficeNetworkVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
                        style={{
                          animationDelay: isOfficeNetworkVisible ? `${(index + 1) * 100}ms` : '0ms',
                          opacity: isOfficeNetworkVisible ? 1 : 0,
                          transition: isOfficeNetworkVisible ? 'none' : 'opacity 0.3s ease'
                        }}
                      >
                        <div className="card-image">
                          <img 
                            src={index % 4 === 0 ? getImageUrl('GHANA_PORT') : 
                                 index % 4 === 1 ? getImageUrl('SHIPPING_CONTAINERS') :
                                 index % 4 === 2 ? getImageUrl('PORT_CRANE_OPERATION') : 
                                 getImageUrl('SHIPPING_PORT_47DA')} 
                            alt={`${office.name} operations`}
                          />
                        </div>
                        <div className="card-text">
                          <p className="card-region-type">Ghana Office</p>
                          <h2 className="card-title">{office.name}</h2>
                          <p className="card-body">
                            {office.location && `${office.location}. `}
                            {office.services && `Services: ${office.services}.`}
                            {office.digitalAddress && ` Digital Address: ${office.digitalAddress}.`}
                          </p>
                        </div>
                        <div className="card-metric">
                          {office.name === 'Accra Office' ? 'Air' : 
                           office.name === 'Kumasi Office' ? 'Central' : 
                           office.name === 'Takoradi Office' ? 'Port' : 
                           office.name === 'Paga Office' ? 'Border' : 
                           office.name === 'Elubo Office' ? 'Border' : 
                           office.name === 'Akosombo Office' ? 'Water' : 
                           'Border'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Why Choose Us Content */}
              <div ref={whyChooseRef} className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative">
                  <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
                      Why Choose Us?
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-heading">
                      Excellence in Every Port, Every Time
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                      <div 
                        key={index} 
                        className={`service-card-animated ${isWhyChooseVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
                        style={{
                          animationDelay: isWhyChooseVisible ? `${(index + 1) * 100}ms` : '0ms',
                          opacity: isWhyChooseVisible ? 1 : 0,
                          transition: isWhyChooseVisible ? 'none' : 'opacity 0.3s ease'
                        }}
                      >
                        <FeatureCard
                          icon={feature.icon}
                          title={feature.title}
                          description={feature.description}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Testimonials Section */}
              <div ref={testimonialsRef} className="py-20 bg-transparent relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-20">
                  <div className="text-center mb-12">
                    <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
                      Testimonials
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-heading">
                      Trusted by Maritime Industry Leaders
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className={`${isTestimonialsVisible ? 'animate-fade-in-up animate-delay-' + (index + 1) * 100 : ''}`}
                        style={{
                          animationDelay: isTestimonialsVisible ? `${(index + 1) * 100}ms` : '0ms',
                          opacity: isTestimonialsVisible ? 1 : 0,
                          transition: isTestimonialsVisible ? 'none' : 'opacity 0.3s ease'
                        }}
                      >
                        <TestimonialCard
                          quote={testimonial.quote}
                          name={testimonial.name}
                          company={testimonial.company}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              
              
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
