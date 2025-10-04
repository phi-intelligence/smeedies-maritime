import { Warehouse, Thermometer, Shield, Package, Wifi, FileCheck2, Bug, MapPin, Clock, Users } from "lucide-react";
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
      name: "Tema Warehouse",
      location: "Near Tema Port",
      services: "Port cargo handling and storage",
      capacity: "Large capacity facility",
      features: ["Port access", "Container handling", "Bulk storage"]
    },
    {
      name: "Accra Warehouse",
      location: "Central Accra",
      services: "General cargo and distribution",
      capacity: "Medium capacity facility",
      features: ["City access", "Distribution hub", "Office integration"]
    },
    {
      name: "Takoradi Warehouse",
      location: "Western Region",
      services: "Regional cargo and exports",
      capacity: "Medium capacity facility",
      features: ["Regional access", "Export processing", "Agricultural storage"]
    }
  ];

  const securityMeasures = [
    "24/7 CCTV Security Monitoring",
    "Restricted Access Control Systems",
    "Fire Safety and Protection Systems",
    "Comprehensive Insurance Coverage",
    "Regular Security Audits",
    "Emergency Response Procedures"
  ];

  const technologyIntegration = [
    "Warehouse Management System (WMS)",
    "Real-time Inventory Tracking",
    "Digital Documentation System",
    "Customs Integration (GCNET)",
    "Automated Reporting",
    "Mobile Access and Updates"
  ];

  const specializedServices = [
    {
      title: "Temperature-Controlled Storage",
      description: "Climate-controlled facilities for pharmaceuticals, food, and sensitive materials",
      icon: Thermometer
    },
    {
      title: "Heavy Lift Storage",
      description: "Specialized storage for oversized and heavy cargo with appropriate handling equipment",
      icon: Package
    },
    {
      title: "Hazardous Materials",
      description: "Secure storage for hazardous materials with proper safety protocols and compliance",
      icon: Shield
    },
    {
      title: "Documentation Services",
      description: "Complete cargo documentation, customs processing, and regulatory compliance",
      icon: FileCheck2
    }
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
    <div className="min-h-screen bg-background relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-transparent relative overflow-hidden">
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
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
              Warehousing Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete Storage Solutions
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Whatever your warehouse needs, we can help. Professional warehousing services with state-of-the-art facilities and comprehensive security.
            </p>
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
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {warehousingFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-6 rounded-md bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-md flex items-center justify-center mb-4 border border-blue-400/30">
                    <feature.icon className="w-6 h-6 text-blue-300" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-blue-100">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Warehouse Locations */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${portOperationsImage})`,
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
              Warehouse Locations
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Strategic warehouse locations across Ghana for optimal coverage and service delivery
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {warehouseLocations.map((warehouse, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-md bg-green-900/20 backdrop-blur-sm border-green-400/30 hover:bg-green-800/30 hover:border-green-300/50 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-md flex items-center justify-center flex-shrink-0 border border-green-400/30">
                      <MapPin className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{warehouse.name}</h3>
                      <p className="text-sm text-green-100">{warehouse.location}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-white mb-1">Services:</p>
                      <p className="text-sm text-green-100">{warehouse.services}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-semibold text-white mb-1">Capacity:</p>
                      <p className="text-sm text-green-100">{warehouse.capacity}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-semibold text-white mb-2">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {warehouse.features.map((feature, featureIndex) => (
                          <span 
                            key={featureIndex}
                            className="text-xs bg-green-500/20 text-green-200 px-2 py-1 rounded border border-green-400/30"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityMeasures.map((measure, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-md bg-red-900/20 backdrop-blur-sm border-red-400/30 hover:bg-red-800/30 hover:border-red-300/50 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                >
                  <div className="w-10 h-10 bg-red-500/20 rounded-md flex items-center justify-center border border-red-400/30">
                    <Shield className="w-5 h-5 text-red-300" />
                  </div>
                  <p className="text-red-100 font-medium">{measure}</p>
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologyIntegration.map((tech, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-md bg-purple-900/20 backdrop-blur-sm border-purple-400/30 hover:bg-purple-800/30 hover:border-purple-300/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="w-10 h-10 bg-purple-500/20 rounded-md flex items-center justify-center border border-purple-400/30">
                    <Wifi className="w-5 h-5 text-purple-300" />
                  </div>
                  <p className="text-purple-100 font-medium">{tech}</p>
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specializedServices.map((service, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-orange-900/20 backdrop-blur-sm border-orange-400/30 hover:bg-orange-800/30 hover:border-orange-300/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                >
                  <div className="w-16 h-16 bg-orange-500/20 rounded-md flex items-center justify-center mx-auto mb-4 border border-orange-400/30">
                    <service.icon className="w-8 h-8 text-orange-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-orange-100 text-sm">{service.description}</p>
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
