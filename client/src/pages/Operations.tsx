import { MapPin, Globe, Users, Clock, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ghanaPortImage from "@/assets/images/ghana_port_infrastru_7ef9101d.jpg";
import maritimeLogisticsImage from "@/assets/images/maritime_logistics_w_d9957c6e.jpg";
import industrialLogisticsImage from "@/assets/images/industrial-container-cargo-freight-ship-habor-logistic-import-export.jpg";
import containerOperationsImage from "@/assets/images/shipping_containers__4ae963ed.jpg";
import craneOperationsImage from "@/assets/images/port_crane_operation_01b3e60a.jpg";
import nightPortImage from "@/assets/images/cargo-ships-docked-port-night.jpg";
import portCargoImage from "@/assets/images/shipping_port_cargo__47da743f.jpg";
import backgroundNewVideo from "@/assets/videos/background-new.mp4";
import shipVideo from "@/assets/videos/Ship.mp4";

export default function Operations() {
  const countries = [
    "Ghana", "Togo", "Côte d'Ivoire", "Burkina Faso", 
    "Mali", "Niger", "Benin", "Nigeria"
  ];

  const coreCompetencies = [
    {
      icon: Globe,
      title: "Shipping Agency Services",
      description: "Complete port operations including vessel coordination, berth allocation, and cargo handling."
    },
    {
      icon: Users,
      title: "Logistics Management",
      description: "End-to-end supply chain solutions with real-time tracking and monitoring."
    },
    {
      icon: Shield,
      title: "Customs Clearance",
      description: "Fast and efficient customs processing with full regulatory compliance."
    },
    {
      icon: TrendingUp,
      title: "Cargo Handling",
      description: "Professional handling of all cargo types with specialized equipment and expertise."
    }
  ];

  const clientBase = [
    "Ship Owners",
    "Operators", 
    "Exporters",
    "Importers",
    "Shipping Lines",
    "Freight Forwarders"
  ];

  const operationalProcesses = [
    {
      title: "Port Operations",
      description: "Berth allocation, cargo handling, and vessel coordination"
    },
    {
      title: "Documentation",
      description: "Customs, shipping, and regulatory documentation processing"
    },
    {
      title: "Coordination",
      description: "Multi-modal transport coordination and logistics management"
    },
    {
      title: "Monitoring",
      description: "Real-time tracking and updates throughout the process"
    }
  ];

  const complianceItems = [
    "Ghana Ports & Harbours Authority - Full compliance",
    "Customs Regulations - Up-to-date knowledge",
    "International Standards - IMO, ILO compliance",
    "Safety Standards - ISPS, ISM compliance"
  ];

  const performanceMetrics = [
    { metric: "Vessel Turnaround Time", value: "Industry-leading performance" },
    { metric: "Cargo Clearance Time", value: "Fast processing" },
    { metric: "Customer Satisfaction", value: "100% on-time delivery" },
    { metric: "Cost Efficiency", value: "Competitive pricing" }
  ];

  const technologySystems = [
    "GCNET Integration - Digital customs processing",
    "Real-time Tracking - Cargo monitoring",
    "Document Management - Digital documentation",
    "Communication Systems - 24/7 connectivity"
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
            backgroundImage: `url(${ghanaPortImage})`,
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
              Operational Scope
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Serving West Africa's Maritime Industry
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Our core competency is shipping agency services and all allied activities related to shipping and logistics across West Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Geographic Coverage */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${maritimeLogisticsImage})`,
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
              Geographic Coverage
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Eight countries across West Africa with strategic port and border operations
            </p>
          </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Service Countries</h3>
                  <p className="text-gray-200 mb-4">
                    We provide comprehensive maritime services across eight West African countries, 
                    ensuring seamless logistics and cargo handling throughout the region.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {countries.map((country, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 text-blue-100 p-3 rounded-md bg-blue-900/20 backdrop-blur-sm border-blue-400/30"
                    >
                      <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                      <span className="font-medium">{country}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-900/20 backdrop-blur-sm border-blue-400/30 p-8 rounded-md shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Key Locations</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-300" />
                    <div>
                      <p className="font-semibold text-white">Ports of Tema & Takoradi</p>
                      <p className="text-sm text-blue-100">Major seaports in Ghana</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-300" />
                    <div>
                      <p className="font-semibold text-white">Kotoka International Airport</p>
                      <p className="text-sm text-blue-100">Air cargo operations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-300" />
                    <div>
                      <p className="font-semibold text-white">Border Crossings</p>
                      <p className="text-sm text-blue-100">Paga, Elubo, Aflao</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Core Competencies */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${industrialLogisticsImage})`,
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
              Core Competencies
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Four key areas of expertise driving our operational excellence
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreCompetencies.map((competency, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="w-16 h-16 bg-blue-500/20 rounded-md flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <competency.icon className="w-8 h-8 text-blue-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{competency.title}</h3>
                  <p className="text-blue-100 text-sm">{competency.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Client Base */}
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
              Client Base
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              We serve a diverse range of clients across the maritime and logistics industry
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientBase.map((client, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-green-900/20 backdrop-blur-sm border-green-400/30 hover:bg-green-800/30 hover:border-green-300/50 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-md flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                    <Users className="w-6 h-6 text-green-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{client}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Operational Processes */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${craneOperationsImage})`,
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
              Operational Processes
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Streamlined processes ensuring efficient and reliable service delivery
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {operationalProcesses.map((process, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-purple-900/20 backdrop-blur-sm border-purple-400/30 hover:bg-purple-800/30 hover:border-purple-300/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-md flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
                    <Clock className="w-6 h-6 text-purple-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{process.title}</h3>
                  <p className="text-purple-100 text-sm">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Compliance & Regulations */}
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
              Compliance & Regulations
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Full compliance with all regulatory requirements and industry standards
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {complianceItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-md bg-orange-900/20 backdrop-blur-sm border-orange-400/30 hover:bg-orange-800/30 hover:border-orange-300/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                >
                  <div className="w-10 h-10 bg-orange-500/20 rounded-md flex items-center justify-center border border-orange-400/30">
                    <Shield className="w-5 h-5 text-orange-300" />
                  </div>
                  <p className="text-orange-100 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Performance Metrics */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${portCargoImage})`,
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
              Performance Metrics
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Industry-leading performance across all key operational metrics
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {performanceMetrics.map((metric, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-cyan-900/20 backdrop-blur-sm border-cyan-400/30 hover:bg-cyan-800/30 hover:border-cyan-300/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-md flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                    <TrendingUp className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{metric.metric}</h3>
                  <p className="text-cyan-100 text-sm">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Technology & Systems */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundNewVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technology & Systems
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Advanced technology systems ensuring efficient operations and real-time communication
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {technologySystems.map((system, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-6 rounded-md bg-indigo-900/20 backdrop-blur-sm border-indigo-400/30 hover:bg-indigo-800/30 hover:border-indigo-300/50 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
                >
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-md flex items-center justify-center border border-indigo-400/30">
                    <Globe className="w-5 h-5 text-indigo-300" />
                  </div>
                  <p className="text-indigo-100 font-medium">{system}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* CTA Section */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={shipVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-20 text-center">
          <div className="bg-blue-900/20 backdrop-blur-sm border-blue-400/30 p-8 rounded-md shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Our Operations?
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your maritime and logistics requirements across West Africa.
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
