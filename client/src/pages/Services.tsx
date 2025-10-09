import { ArrowRight, Ship, Truck, Globe, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedWorldMap from "@/components/AnimatedWorldMap";
import cargoShipHarborImage from "@/assets/images/cargo-ship-miami-harbor.jpg";
import portOperationsImage from "@/assets/images/port_operations_carg_5753cff0.jpg";
import cargoShipLoadingImage from "@/assets/images/cargo_ship_loading_v_b9f8b6f4.jpg";
import containerOperationsImage from "@/assets/images/container-cargo-freight-ship-port-twilight.jpg";
import nightPortImage from "@/assets/images/night-time-industrial-port-scene-with-shipping-containers-reflective-surfaces.jpg";
import exportLogisticsImage from "@/assets/images/export-ship-logistics-industrial-trade.jpg";
import cargoShipsDockedImage from "@/assets/images/cargo-ships-docked-port-night.jpg";
import maritimeLogisticsImage from "@/assets/images/maritime_logistics_w_d9957c6e.jpg";
import portCraneOperationImage from "@/assets/images/port_crane_operation_01b3e60a.jpg";
import shippingContainersImage from "@/assets/images/shipping_containers__4ae963ed.jpg";
import warehouseLogisticsImage from "@/assets/images/warehouse_logistics__b8d9236e.jpg";
import logistics5Video from "@/assets/videos/logistics-5.mp4";
import servicesVideo from "@/assets/videos/Services.mp4";
import { useEffect, useRef, useState } from "react";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [currentHusbandrySlide, setCurrentHusbandrySlide] = useState(-1);
  const [currentCargoSlide, setCurrentCargoSlide] = useState(-1);

  const serviceProcess = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "We discuss your requirements, cargo details, and timeline to provide the best solution."
    },
    {
      step: "2",
      title: "Documentation & Preparation",
      description: "Complete all necessary documentation and prepare for cargo handling operations."
    },
    {
      step: "3",
      title: "Execution & Monitoring",
      description: "Execute the service with real-time monitoring and regular updates on progress."
    },
    {
      step: "4",
      title: "Delivery & Follow-up",
      description: "Ensure successful delivery and provide comprehensive follow-up support."
    }
  ];

  const serviceGuarantees = [
    "100% On-Time Delivery",
    "Competitive Pricing",
    "24/7 Customer Support",
    "Full Insurance Coverage"
  ];

  // Accordion slider functions
  const setActiveSlide = (index: number) => {
    if (currentSlide === index) {
      setCurrentSlide(-1);
    } else {
      setCurrentSlide(index);
    }
  };

  // Touch handlers for mobile
  const handleSlideTouch = (index: number) => {
    // Add slight delay to prevent accidental touches
    setTimeout(() => {
      setActiveSlide(index);
    }, 100);
  };

  const nextSlide = () => {
    const nextIndex = currentSlide === -1 ? 0 : (currentSlide + 1) % 4;
    setActiveSlide(nextIndex);
  };

  const previousSlide = () => {
    const prevIndex = currentSlide === -1 ? 3 : (currentSlide - 1 + 4) % 4;
    setActiveSlide(prevIndex);
  };

  // Husbandry Services accordion slider functions
  const setActiveHusbandrySlide = (index: number) => {
    if (currentHusbandrySlide === index) {
      setCurrentHusbandrySlide(-1);
    } else {
      setCurrentHusbandrySlide(index);
    }
  };

  const handleHusbandrySlideTouch = (index: number) => {
    setTimeout(() => {
      setActiveHusbandrySlide(index);
    }, 100);
  };

  const nextHusbandrySlide = () => {
    const nextIndex = currentHusbandrySlide === -1 ? 0 : (currentHusbandrySlide + 1) % 4;
    setActiveHusbandrySlide(nextIndex);
  };

  const previousHusbandrySlide = () => {
    const prevIndex = currentHusbandrySlide === -1 ? 3 : (currentHusbandrySlide - 1 + 4) % 4;
    setActiveHusbandrySlide(prevIndex);
  };

  // Cargo Services accordion slider functions
  const setActiveCargoSlide = (index: number) => {
    if (currentCargoSlide === index) {
      setCurrentCargoSlide(-1);
    } else {
      setCurrentCargoSlide(index);
    }
  };

  const handleCargoSlideTouch = (index: number) => {
    setTimeout(() => {
      setActiveCargoSlide(index);
    }, 100);
  };

  const nextCargoSlide = () => {
    const nextIndex = currentCargoSlide === -1 ? 0 : (currentCargoSlide + 1) % 4;
    setActiveCargoSlide(nextIndex);
  };

  const previousCargoSlide = () => {
    const prevIndex = currentCargoSlide === -1 ? 3 : (currentCargoSlide - 1 + 4) % 4;
    setActiveCargoSlide(prevIndex);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation for accordion slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const services = [
    {
      icon: Ship,
      title: "Agency Services",
      description: "Complete ship agency and husbanding services with competitive pricing and real-time updates.",
      features: ["Port Lineup Service", "Competitive Proforma", "Port Regulations", "Comprehensive Reporting"]
    },
    {
      icon: Truck,
      title: "Husbandry Services", 
      description: "Complete crew handling and vessel support services through a single contact point.",
      features: ["Crew Handling", "Fuel & Bunker", "Ship Spares", "Single Contact"]
    },
    {
      icon: Globe,
      title: "Cargo Services",
      description: "Comprehensive stevedoring and shore handling for all cargo types.",
      features: ["Break Bulk", "Containerized", "Warehouse Storage", "Project Cargo"]
    },
    {
      icon: FileCheck,
      title: "Customs Clearing",
      description: "Fast customs clearance and delivery services with minimum cost solutions.",
      features: ["Fast Clearance", "On-Time Delivery", "Cost Effective", "Reliable Service"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-800 relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-gray-800">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${cargoShipsDockedImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Animated World Map */}
        <AnimatedWorldMap className="z-5" />
        
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" /> */}
        
        <div className="relative z-20 max-w-full mx-auto w-full">
          <div className="flex flex-col items-center justify-center text-center min-h-[80vh] space-y-8">
            <div className="space-y-8 max-w-6xl mx-auto">
              <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3 animate-fade-in-up">
                Our Services
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-lg animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
                <span className="text-blue-300">Comprehensive</span> Maritime Solutions
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.4s' }}>
                Professional ship agency, husbandry, and cargo services across West Africa with competitive pricing and real-time updates
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    const agencySection = document.getElementById('agency-services');
                    if (agencySection) {
                      agencySection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Services Accordion Slider */}
      <section id="agency-services" ref={sectionRef} className={`relative overflow-hidden h-[80vh] bg-gray-800 ${currentSlide !== -1 ? 'section-has-active-slide' : ''}`}>
        <div className="w-full h-full">
          {/* Heading Overlay */}
          <div className="section-heading absolute top-20 left-1/2 transform -translate-x-1/2 z-30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Agency Services
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Professional ship agency services with competitive pricing and real-time updates
            </p>
          </div>
            
          <div className="slider-container">
            <div className="now-showing">Now Available</div>

            <div className="accordion-slider">
              <div 
                className={`slide ${currentSlide === 0 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${portOperationsImage})`}}
                onMouseEnter={() => setActiveSlide(0)}
                onTouchStart={() => handleSlideTouch(0)}
              >
                <div className="slide-content">
                  <div className="slide-number">01</div>
                  <div className="car-brand">Agency Services</div>
                  <div className="car-name">Competitive Proforma Disbursement</div>
                  <div className="car-subtitle">Detailed estimates of port charges and husbanding charges</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Service:</span>
                      <span className="spec-value">Ship Agency & Husbanding</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Coverage:</span>
                      <span className="spec-value">Tema & Takoradi Ports</span>
              </div>
                    <div className="spec-row">
                      <span className="spec-label">Updates:</span>
                      <span className="spec-value">Real-time Cost Estimates</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Support:</span>
                      <span className="spec-value">24/7 Customer Service</span>
                    </div>
                  </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Transparent Pricing</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>No Hidden Fees</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Expert Guidance</span>
                    </div>
                  </div>
                </div>
                <div className="add-button"></div>
              </div>
              
              <div 
                className={`slide ${currentSlide === 1 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${cargoShipLoadingImage})`}}
                onMouseEnter={() => setActiveSlide(1)}
                onTouchStart={() => handleSlideTouch(1)}
              >
                <div className="slide-content">
                  <div className="slide-number">02</div>
                  <div className="car-brand">Real-Time Services</div>
                  <div className="car-name">Port Lineup Service</div>
                  <div className="car-subtitle">Live updates on port status and berth availability</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Service:</span>
                      <span className="spec-value">Real-Time Port Monitoring</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Coverage:</span>
                      <span className="spec-value">Tema & Takoradi Ports</span>
              </div>
                    <div className="spec-row">
                      <span className="spec-label">Updates:</span>
                      <span className="spec-value">Live Port Status</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Tracking:</span>
                      <span className="spec-value">Queue Position Monitoring</span>
                    </div>
                  </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Live Updates</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Berth Tracking</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Queue Monitoring</span>
                    </div>
                  </div>
                </div>
                <div className="add-button"></div>
            </div>
            
              <div 
                className={`slide ${currentSlide === 2 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${containerOperationsImage})`}}
                onMouseEnter={() => setActiveSlide(2)}
                onTouchStart={() => handleSlideTouch(2)}
              >
                <div className="slide-content">
                  <div className="slide-number">03</div>
                  <div className="car-brand">Port Regulations</div>
                  <div className="car-name">Guidance & Compliance</div>
                  <div className="car-subtitle">Expert guidance on local port regulations</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Service:</span>
                      <span className="spec-value">Regulatory Compliance</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Expertise:</span>
                      <span className="spec-value">Local Regulation Knowledge</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Guidance:</span>
                      <span className="spec-value">Berth Restriction Assistance</span>
              </div>
                    <div className="spec-row">
                      <span className="spec-label">Support:</span>
                      <span className="spec-value">Compliance Assistance</span>
            </div>
          </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Local Expertise</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Berth Guidance</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Compliance Help</span>
                    </div>
                  </div>
                </div>
                <div className="add-button"></div>
              </div>

              <div 
                className={`slide ${currentSlide === 3 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${nightPortImage})`}}
                onMouseEnter={() => setActiveSlide(3)}
                onTouchStart={() => handleSlideTouch(3)}
              >
                <div className="slide-content">
                  <div className="slide-number">04</div>
                  <div className="car-brand">Comprehensive Reporting</div>
                  <div className="car-name">Time Tracking & Operations</div>
                  <div className="car-subtitle">Complete reporting and documentation services</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Service:</span>
                      <span className="spec-value">Documentation & Reporting</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Tracking:</span>
                      <span className="spec-value">ETA, ETB, ETC Monitoring</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Reports:</span>
                      <span className="spec-value">Daily Operations Updates</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Documents:</span>
                      <span className="spec-value">Statement of Facts (SOF)</span>
                    </div>
                  </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Time Tracking</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Daily Reports</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Real-time Updates</span>
                    </div>
                  </div>
                </div>
                <div className="add-button"></div>
              </div>
            </div>

            <button className="navigation-arrows nav-prev" onClick={previousSlide}>‹</button>
            <button className="navigation-arrows nav-next" onClick={nextSlide}>›</button>
          </div>
        </div>
      </section>

      {/* Husbandry Services Accordion Slider */}
      <section className={`relative overflow-hidden h-[80vh] bg-gray-800 ${currentHusbandrySlide !== -1 ? 'section-has-active-slide' : ''}`}>
        <div className="w-full h-full">
          {/* Heading Overlay */}
          <div className="section-heading absolute top-20 left-1/2 transform -translate-x-1/2 z-30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Husbandry Services
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Complete crew handling and vessel support services through a single contact point
            </p>
          </div>
            
          <div className="slider-container">
            <div className="now-showing">Now Available</div>

            <div className="accordion-slider">
              <div 
                className={`slide ${currentHusbandrySlide === 0 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${cargoShipLoadingImage})`}}
                onMouseEnter={() => setActiveHusbandrySlide(0)}
                onTouchStart={() => handleHusbandrySlideTouch(0)}
              >
                <div className="slide-content">
                  <div className="slide-number">01</div>
                  <div className="car-brand">Crew Handling Services</div>
                  <div className="car-name">Complete Crew Support</div>
                  <div className="car-subtitle">Professional crew change and travel services through single contact point</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Crew Changes:</span>
                      <span className="spec-value">Professional crew change services</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Meet & Greet:</span>
                      <span className="spec-value">Airport pickup and assistance</span>
                  </div>
                    <div className="spec-row">
                      <span className="spec-label">Travel Arrangements:</span>
                      <span className="spec-value">Flight and transportation booking</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Hotel Accommodations:</span>
                      <span className="spec-value">Quality hotel bookings</span>
                  </div>
                    </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>24/7 Support</span>
                  </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Fast Processing</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Expert Handling</span>
                  </div>
                </div>
                </div>
                <div className="add-button"></div>
              </div>
              
              <div 
                className={`slide ${currentHusbandrySlide === 1 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${maritimeLogisticsImage})`}}
                onMouseEnter={() => setActiveHusbandrySlide(1)}
                onTouchStart={() => handleHusbandrySlideTouch(1)}
              >
                <div className="slide-content">
                  <div className="slide-number">02</div>
                  <div className="car-brand">Vessel Support Services</div>
                  <div className="car-name">Complete Vessel Support</div>
                  <div className="car-subtitle">Comprehensive vessel support including fuel, spares, and provisions</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Fuel (Bunker Supply):</span>
                      <span className="spec-value">Premium grade marine fuel</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Ship Spares:</span>
                      <span className="spec-value">Marine equipment and parts</span>
                  </div>
                    <div className="spec-row">
                      <span className="spec-label">Cash to Master:</span>
                      <span className="spec-value">Financial assistance services</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Provisions & Fresh Water:</span>
                      <span className="spec-value">Food and water supply</span>
                  </div>
                    </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Premium Quality</span>
                  </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Fast Delivery</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Competitive Rates</span>
                  </div>
                </div>
              </div>
                <div className="add-button"></div>
            </div>
            
              <div 
                className={`slide ${currentHusbandrySlide === 2 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${portCraneOperationImage})`}}
                onMouseEnter={() => setActiveHusbandrySlide(2)}
                onTouchStart={() => handleHusbandrySlideTouch(2)}
              >
                <div className="slide-content">
                  <div className="slide-number">03</div>
                  <div className="car-brand">Single Contact</div>
                  <div className="car-name">Single Invoice System</div>
                  <div className="car-subtitle">All husbandry services through one contact point with standard rates</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Fast Turnaround:</span>
                      <span className="spec-value">Speedy and well-coordinated services</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Standard Rates:</span>
                      <span className="spec-value">Transparent pricing, no hidden costs</span>
                  </div>
                    <div className="spec-row">
                      <span className="spec-label">24/7 Support:</span>
                      <span className="spec-value">Round-the-clock assistance</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Optimal Efficiency:</span>
                      <span className="spec-value">Fast vessel turnaround</span>
                  </div>
                    </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>One Contact</span>
                  </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Standard Rates</span>
                </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Fast Turnaround</span>
              </div>
            </div>
          </div>
                <div className="add-button"></div>
              </div>

              <div 
                className={`slide ${currentHusbandrySlide === 3 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${shippingContainersImage})`}}
                onMouseEnter={() => setActiveHusbandrySlide(3)}
                onTouchStart={() => handleHusbandrySlideTouch(3)}
              >
                <div className="slide-content">
                  <div className="slide-number">04</div>
                  <div className="car-brand">Complete Husbandry</div>
                  <div className="car-name">Full Service Package</div>
                  <div className="car-subtitle">Complete crew handling and vessel support services through single contact point</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Crew Services:</span>
                      <span className="spec-value">Changes, Meet & Greet, Travel</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Vessel Support:</span>
                      <span className="spec-value">Fuel, Spares, Cash, Provisions</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Billing:</span>
                      <span className="spec-value">Single Invoice System</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Efficiency:</span>
                      <span className="spec-value">Optimum vessel turnaround</span>
                    </div>
                  </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Complete Package</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Single Contact</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
                <div className="add-button"></div>
              </div>
            </div>

            <button className="navigation-arrows nav-prev" onClick={previousHusbandrySlide}>‹</button>
            <button className="navigation-arrows nav-next" onClick={nextHusbandrySlide}>›</button>
          </div>
        </div>
      </section>

      {/* Cargo Services Accordion Slider */}
      <section className={`relative overflow-hidden h-[80vh] bg-gray-800 ${currentCargoSlide !== -1 ? 'section-has-active-slide' : ''}`}>
        <div className="w-full h-full">
          {/* Heading Overlay */}
          <div className="section-heading absolute top-20 left-1/2 transform -translate-x-1/2 z-30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Cargo Services
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Comprehensive stevedoring and shore handling for all cargo types
            </p>
          </div>
            
          <div className="slider-container">
            <div className="now-showing">Now Available</div>

            <div className="accordion-slider">
              <div 
                className={`slide ${currentCargoSlide === 0 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${containerOperationsImage})`}}
                onMouseEnter={() => setActiveCargoSlide(0)}
                onTouchStart={() => handleCargoSlideTouch(0)}
              >
                <div className="slide-content">
                  <div className="slide-number">01</div>
                  <div className="car-brand">Break Bulk Commodities</div>
                  <div className="car-name">Agricultural & Food Cargo</div>
                  <div className="car-subtitle">Specialized handling for rice, soya bean meal, wheat, maize, sugar and similar cargo types</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Rice Handling:</span>
                      <span className="spec-value">Professional rice cargo handling</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Soya Bean Meal:</span>
                      <span className="spec-value">Specialized soya handling</span>
              </div>
                    <div className="spec-row">
                      <span className="spec-label">Wheat & Maize:</span>
                      <span className="spec-value">Grain cargo expertise</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Sugar Cargo:</span>
                      <span className="spec-value">Sugar handling services</span>
              </div>
                </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Specialized Equipment</span>
              </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Quality Control</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Expert Handling</span>
                    </div>
                  </div>
                </div>
                <div className="add-button"></div>
            </div>
            
              <div 
                className={`slide ${currentCargoSlide === 1 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${warehouseLogisticsImage})`}}
                onMouseEnter={() => setActiveCargoSlide(1)}
                onTouchStart={() => handleCargoSlideTouch(1)}
              >
                <div className="slide-content">
                  <div className="slide-number">02</div>
                  <div className="car-brand">Containerized Cargo</div>
                  <div className="car-name">Professional Container Handling</div>
                  <div className="car-subtitle">Professional handling of containerized cargo with modern equipment and experienced personnel</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Container Handling:</span>
                      <span className="spec-value">Professional container operations</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">General Cargo:</span>
                      <span className="spec-value">Various general cargo types</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Heavy Lift Operations:</span>
                      <span className="spec-value">Specialized heavy cargo handling</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Dry Bulk Commodities:</span>
                      <span className="spec-value">Bulk cargo in containers</span>
                    </div>
                  </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Modern Equipment</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Expert Personnel</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Efficient Operations</span>
                    </div>
                  </div>
                </div>
                <div className="add-button"></div>
              </div>
              
              <div 
                className={`slide ${currentCargoSlide === 2 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${nightPortImage})`}}
                onMouseEnter={() => setActiveCargoSlide(2)}
                onTouchStart={() => handleCargoSlideTouch(2)}
              >
                <div className="slide-content">
                  <div className="slide-number">03</div>
                  <div className="car-brand">Warehouse & Storage</div>
                  <div className="car-name">Comprehensive Storage Solutions</div>
                  <div className="car-subtitle">Comprehensive storage solutions both inside and outside port facilities</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Port Storage Facilities:</span>
                      <span className="spec-value">Inside port storage options</span>
                  </div>
                    <div className="spec-row">
                      <span className="spec-label">External Warehouse Options:</span>
                      <span className="spec-value">Off-site storage solutions</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Temperature Controlled Storage:</span>
                      <span className="spec-value">Climate-controlled facilities</span>
                </div>
                    <div className="spec-row">
                      <span className="spec-label">Security Monitoring:</span>
                      <span className="spec-value">24/7 security surveillance</span>
              </div>
                  </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Secure Storage</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Climate Control</span>
                    </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>24/7 Security</span>
                    </div>
                  </div>
                </div>
                <div className="add-button"></div>
            </div>
            
              <div 
                className={`slide ${currentCargoSlide === 3 ? 'active' : ''}`} 
                style={{backgroundImage: `url(${exportLogisticsImage})`}}
                onMouseEnter={() => setActiveCargoSlide(3)}
                onTouchStart={() => handleCargoSlideTouch(3)}
              >
                <div className="slide-content">
                  <div className="slide-number">04</div>
                  <div className="car-brand">Special Cargo Services</div>
                  <div className="car-name">Project Cargo & Dry Bulk</div>
                  <div className="car-subtitle">Project cargo clearance across 8 countries and specialized dry bulk handling</div>
                  <div className="car-specs">
                    <div className="spec-row">
                      <span className="spec-label">Project Cargo Coverage:</span>
                      <span className="spec-value">Ghana, Togo, Côte d'Ivoire, Burkina Faso, Mali, Niger, Benin, Nigeria</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Dry Bulk Commodities:</span>
                      <span className="spec-value">Clinker, Slag, Gypsum, Coal, Manganese</span>
                  </div>
                    <div className="spec-row">
                      <span className="spec-label">Service Features:</span>
                      <span className="spec-value">Timely clearance, project expertise, cross-border logistics</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Documentation:</span>
                      <span className="spec-value">Complete documentation handling</span>
                  </div>
                    </div>
                  <div className="performance-badges">
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>8 Countries</span>
                  </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Project Expertise</span>
                </div>
                    <div className="badge">
                      <div className="badge-icon"></div>
                      <span>Cross-Border</span>
              </div>
                  </div>
                </div>
                <div className="add-button"></div>
              </div>
            </div>

            <button className="navigation-arrows nav-prev" onClick={previousCargoSlide}>‹</button>
            <button className="navigation-arrows nav-next" onClick={nextCargoSlide}>›</button>
            </div>
          </div>
        </section>

      {/* Service Process */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${nightPortImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" /> */}
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Service Process
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              A streamlined four-step process ensuring efficient and reliable service delivery
            </p>
          </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {serviceProcess.map((step, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <span className="text-2xl font-bold text-blue-300">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-blue-100">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


      {/* Service Request Form */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={logistics5Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" /> */}
        
        <div className="max-w-4xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Request a Service Quote
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Get a detailed quote for your maritime service requirements
            </p>
          </div>
            
            <div className="bg-blue-900/20 backdrop-blur-sm border-blue-400/30 p-8 rounded-md shadow-lg">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:border-blue-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:border-blue-300"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Company</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:border-blue-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Service Required</label>
                    <select className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white focus:outline-none focus:border-blue-300">
                      <option value="">Select a service</option>
                      <option value="agency">Agency Services</option>
                      <option value="husbandry">Husbandry Services</option>
                      <option value="cargo">Cargo Services</option>
                      <option value="customs">Customs Clearing</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Cargo Details</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:border-blue-300"
                    placeholder="Describe your cargo, quantity, destination, and any special requirements"
                  />
                </div>
                
                <div className="text-center">
                  <Button 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Request Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
      {/* Footer */}
        <Footer />
    </div>
  );
}