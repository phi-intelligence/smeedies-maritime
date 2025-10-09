import { Warehouse, Thermometer, Shield, Package, Wifi, FileCheck2, Bug, MapPin, Clock, Users, Radio, Globe, BarChart3, Smartphone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import warehouseLogisticsImage from "@/assets/images/warehouse_logistics__b8d9236e.jpg";
import warehouseOperationsImage from "@/assets/images/warehouse_logistics__e80d910e.jpg";
import portOperationsImage from "@/assets/images/port_operations_carg_b8c76e3c.jpg";
import nightPortImage from "@/assets/images/night-time-industrial-port-scene-with-shipping-containers-reflective-surfaces.jpg";
import logistics5Video from "@/assets/videos/logistics-5.mp4";
import specializedCargoImage from "@/assets/images/shipping_port_cargo__c474df47.jpg";
import containerOperationsImage from "@/assets/images/container-cargo-freight-ship-port-twilight.jpg";
import cargoShipHarborImage from "@/assets/images/cargo-ship-miami-harbor.jpg";

export default function Warehousing() {
  // Accordion slider state for warehouse locations
  const [activeWarehouseSlide, setActiveWarehouseSlideState] = useState(-1);

  const setActiveWarehouseSlide = (index: number) => {
    if (activeWarehouseSlide === index) {
      setActiveWarehouseSlideState(-1);
    } else {
      setActiveWarehouseSlideState(index);
    }
  };

  const nextWarehouseSlide = () => {
    const nextIndex = activeWarehouseSlide === -1 ? 0 : (activeWarehouseSlide + 1) % warehouseLocations.length;
    setActiveWarehouseSlideState(nextIndex);
  };

  const previousWarehouseSlide = () => {
    const prevIndex = activeWarehouseSlide === -1 ? warehouseLocations.length - 1 : (activeWarehouseSlide - 1 + warehouseLocations.length) % warehouseLocations.length;
    setActiveWarehouseSlideState(prevIndex);
  };

  // Touch handler for mobile warehouse slides
  const handleWarehouseSlideTouch = (index: number) => {
    setTimeout(() => {
      setActiveWarehouseSlide(index);
    }, 100);
  };
  const warehousingFeatures = [
    { icon: Warehouse, title: "Right Space Provision", description: "Adequate storage capacity for all cargo types" },
    { icon: Thermometer, title: "Temperature Control", description: "Climate-controlled facilities for sensitive cargo" },
    { icon: Shield, title: "24/7 CCTV Security", description: "Round-the-clock monitoring and access control" },
    { icon: Package, title: "Consolidation Services", description: "Cargo consolidation and de-consolidation" },
    { icon: Wifi, title: "GCNET Availability", description: "Digital customs integration and processing" },
    { icon: FileCheck2, title: "Insurance Coverage", description: "Comprehensive indemnity insurance protection" },
    { icon: Bug, title: "Fumigation Services", description: "Professional pest control and treatment services" }
  ];

  const warehouseLocations = [
    {
      title: "Tema Warehouse",
      subtitle: "Strategic Port Location",
      description: "Located near Tema Port with direct access to major shipping routes and container terminals.",
      features: [
        { label: "Port Access", value: "Direct port connectivity" },
        { label: "Container Handling", value: "Full container services" },
        { label: "Bulk Storage", value: "Large capacity facilities" },
        { label: "Capacity", value: "Large facility with 24/7 operations" }
      ],
      badges: ["Port Hub", "24/7 Access"]
    },
    {
      title: "Accra Warehouse", 
      subtitle: "Central Distribution Center",
      description: "Strategic central location in Accra providing excellent connectivity to all major business districts.",
      features: [
        { label: "City Access", value: "Central business district location" },
        { label: "Distribution Hub", value: "Regional distribution center" },
        { label: "Office Integration", value: "Integrated office facilities" },
        { label: "Capacity", value: "Medium facility with modern amenities" }
      ],
      badges: ["City Center", "Modern Facility"]
    },
    {
      title: "Takoradi Warehouse",
      subtitle: "Western Region Operations", 
      description: "Specialized facility in Western Region focusing on regional cargo and export processing.",
      features: [
        { label: "Regional Access", value: "Western Region coverage" },
        { label: "Export Processing", value: "Specialized export services" },
        { label: "Agricultural Storage", value: "Climate-controlled storage" },
        { label: "Capacity", value: "Medium facility with specialized equipment" }
      ],
      badges: ["Export Hub", "Specialized"]
    }
  ];

  const securityMeasures = [
    {
      title: "24/7 CCTV Security",
      description: "Round-the-clock video surveillance with advanced monitoring systems ensuring complete coverage of all warehouse areas.",
      type: "Monitoring",
      metric: "24/7"
    },
    {
      title: "Access Control Systems",
      description: "Restricted access control with biometric authentication and keycard systems for authorized personnel only.",
      type: "Access Control",
      metric: "Secure"
    },
    {
      title: "Fire Safety Systems",
      description: "Comprehensive fire detection and suppression systems with automatic alarms and emergency response protocols.",
      type: "Fire Protection",
      metric: "Protected"
    },
    {
      title: "Insurance Coverage",
      description: "Complete indemnity insurance protection covering all stored cargo with comprehensive coverage policies.",
      type: "Insurance",
      metric: "Covered"
    },
    {
      title: "Security Audits",
      description: "Regular security assessments and compliance audits ensuring continuous improvement of security measures.",
      type: "Compliance",
      metric: "Audited"
    },
    {
      title: "Emergency Response",
      description: "24/7 emergency response procedures with trained personnel and established protocols for any security incidents.",
      type: "Response",
      metric: "Ready"
    }
  ];

  const technologyIntegration = [
    {
      title: "Warehouse Management System (WMS)",
      description: "Advanced WMS software for comprehensive inventory management, order processing, and warehouse optimization",
      icon: Wifi
    },
    {
      title: "Real-time Inventory Tracking",
      description: "Live tracking system with RFID and barcode technology for instant inventory visibility and updates",
      icon: Radio
    },
    {
      title: "Digital Documentation System",
      description: "Paperless documentation with digital forms, electronic signatures, and automated record keeping",
      icon: FileCheck2
    },
    {
      title: "Customs Integration (GCNET)",
      description: "Seamless integration with Ghana's customs network for automated customs processing and clearance",
      icon: Globe
    },
    {
      title: "Automated Reporting",
      description: "Automated generation of reports, analytics, and performance metrics for data-driven decision making",
      icon: BarChart3
    },
    {
      title: "Mobile Access and Updates",
      description: "Mobile application for real-time updates, notifications, and remote access to warehouse operations",
      icon: Smartphone
    }
  ];

  const specializedServices = [
    "Temperature-Controlled Storage - Climate-controlled facilities for pharmaceuticals, food, and sensitive materials",
    "Heavy Lift Storage - Specialized storage for oversized and heavy cargo with appropriate handling equipment",
    "Hazardous Materials - Secure storage for hazardous materials with proper safety protocols and compliance",
    "Documentation Services - Complete cargo documentation, customs processing, and regulatory compliance"
  ];

  const serviceProcess = [
    {
      step: "1",
      title: "Cargo Receipt",
      description: "Professional receipt and inspection of incoming cargo with detailed documentation"
    },
    {
      step: "2",
      title: "Storage Allocation",
      description: "Optimal storage allocation based on cargo type, size, and special requirements"
    },
    {
      step: "3",
      title: "Monitoring & Care",
      description: "Continuous monitoring, security, and maintenance of stored cargo"
    },
    {
      step: "4",
      title: "Retrieval & Dispatch",
      description: "Efficient retrieval and dispatch of cargo with complete documentation"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${warehouseLogisticsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="relative z-20 max-w-full mx-auto w-full">
          <div className="flex flex-col items-center justify-center text-center min-h-[80vh] space-y-8">
            <div className="space-y-8 max-w-6xl mx-auto">
              <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
                Warehousing Services
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-lg px-4">
                <span className="text-blue-300">Complete</span> Storage Solutions
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-white max-w-4xl mx-auto drop-shadow-md px-4">
                Professional warehousing services with state-of-the-art facilities
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-12 text-gray-200 max-w-3xl mx-auto drop-shadow-md px-4">
                Whatever your warehouse needs, we can help with comprehensive security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warehousing Features */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${warehouseOperationsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Warehousing Features
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Seven comprehensive features ensuring optimal storage and security for your cargo
            </p>
          </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
              {warehousingFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="client-card-outline"
                >
                  <div className="client-card-content">
                    <div className="client-card-inner">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-md flex items-center justify-center mb-4 border border-blue-400/30">
                        <feature.icon className="w-6 h-6 text-blue-300" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-blue-100">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Warehouse Locations Accordion Slider */}
      <section className={`relative overflow-hidden h-[80vh] ${activeWarehouseSlide !== -1 ? 'section-has-active-slide' : ''}`}>
        <div className="w-full h-full">
          {/* Heading Overlay */}
          <div className="section-heading absolute top-20 left-1/2 transform -translate-x-1/2 z-30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Warehouse Locations
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Strategic warehouse locations across Ghana for optimal coverage and service delivery
            </p>
          </div>
            
          <div className="slider-container">
            <div className="now-showing">Now Available</div>

            <div className="accordion-slider">
              {warehouseLocations.map((warehouse, index) => (
                <div 
                  key={index}
                  className={`slide ${activeWarehouseSlide === index ? 'active' : ''}`} 
                  style={{
                    backgroundImage: `url(${
                      index === 0 ? warehouseLogisticsImage :
                      index === 1 ? warehouseOperationsImage :
                      portOperationsImage
                    })`
                  }}
                  onMouseEnter={() => setActiveWarehouseSlide(index)}
                  onTouchStart={() => handleWarehouseSlideTouch(index)}
                >
                  <div className="slide-content">
                    <div className="slide-number">0{index + 1}</div>
                    <div className="car-brand">Warehouse</div>
                    <div className="car-name">{warehouse.title}</div>
                    <div className="car-subtitle">{warehouse.subtitle}</div>
                    <div className="car-specs">
                      {warehouse.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="spec-row">
                          <span className="spec-label">{feature.label}:</span>
                          <span className="spec-value">{feature.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="performance-badges">
                      {warehouse.badges.map((badge, badgeIndex) => (
                        <div key={badgeIndex} className="badge">
                          <div className="badge-icon"></div>
                          <span>{badge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="navigation-arrows-container">
              <button className="navigation-arrows nav-prev" onClick={previousWarehouseSlide}>‹</button>
              <button className="navigation-arrows nav-next" onClick={nextWarehouseSlide}>›</button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-20 bg-transparent relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security Measures
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Comprehensive security systems ensuring the safety and protection of your cargo
            </p>
          </div>
            
          {/* Security Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center px-4">
            {securityMeasures.map((measure, index) => (
              <div key={index} className="country-card">
                <div className="card-image">
                  <img 
                    src={index % 4 === 0 ? nightPortImage : 
                         index % 4 === 1 ? warehouseLogisticsImage :
                         index % 4 === 2 ? warehouseOperationsImage : 
                         specializedCargoImage} 
                    alt={`${measure.title} security`}
                  />
                </div>
                <div className="card-text">
                  <p className="card-region-type">{measure.type}</p>
                  <h2 className="card-title">{measure.title}</h2>
                  <p className="card-body">{measure.description}</p>
                </div>
                <div className="card-metric">
                  {measure.metric}
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

      {/* Technology Integration */}
      <section className="py-20 bg-transparent relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technology Integration
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Advanced technology systems for efficient warehouse management and real-time tracking
            </p>
          </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
              {technologyIntegration.map((tech, index) => (
                <div 
                  key={index}
                  className="square-card-outline"
                >
                  <div className="square-card-content">
                    <div className="square-card-inner">
                      <div className="w-12 h-12 bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-400/30">
                        <tech.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {tech.title}
                      </h3>
                      <p className="text-sm text-purple-100">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Specialized Services */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${specializedCargoImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Specialized Services
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Specialized warehousing services for unique cargo requirements and industry needs
            </p>
          </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
              {specializedServices.map((service, index) => (
                <div key={index} className="compliance-card">
                  <div className="compliance-imgBox">
                    <div className="w-16 h-16 bg-white/20 rounded-md flex items-center justify-center">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="compliance-contentBox">
                    <h3 className="text-lg font-medium text-white uppercase tracking-wide">
                      {service.split(' - ')[0]}
                    </h3>
                    <h2 className="text-xl text-white font-bold tracking-wide mt-2">
                      {service.split(' - ')[1]}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Service Process */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${containerOperationsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Service Process
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              A streamlined four-step process ensuring efficient warehousing operations
            </p>
          </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {serviceProcess.map((step, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-cyan-900/20 backdrop-blur-sm border-cyan-400/30 hover:bg-cyan-800/30 hover:border-cyan-300/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                    <span className="text-2xl font-bold text-cyan-300">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-cyan-100">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* CTA Section */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${cargoShipHarborImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-20 text-center">
          <div className="bg-blue-900/20 backdrop-blur-sm border-blue-400/30 p-8 rounded-md shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Warehousing Solutions?
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your warehousing requirements and get a customized storage solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 border-blue-500 font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-blue-200/50 text-blue-700 hover:bg-blue-50/80 font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
