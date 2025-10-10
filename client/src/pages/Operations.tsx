import { MapPin, Globe, Users, Clock, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getImageUrl, getVideoUrl } from '@/config/assets';

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
    {
      title: "GCNET Integration",
      description: "Digital customs processing system for streamlined clearance procedures and real-time documentation.",
      type: "Digital Processing",
      metric: "Fast"
    },
    {
      title: "Real-time Tracking",
      description: "Advanced cargo monitoring system providing live updates and location tracking for all shipments.",
      type: "Monitoring",
      metric: "Live"
    },
    {
      title: "Document Management",
      description: "Comprehensive digital documentation system ensuring secure storage and easy access to all records.",
      type: "Documentation",
      metric: "Secure"
    },
    {
      title: "Communication Systems",
      description: "24/7 connectivity solutions ensuring constant communication between ports, vessels, and clients.",
      type: "Connectivity",
      metric: "24/7"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-transparent">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onLoadStart={() => console.log('Operations video loading started')}
            onCanPlay={() => console.log('Operations video can play')}
            onError={(e) => console.error('Operations video error:', e)}
          >
            <source src={getVideoUrl('LOGISTICS_3')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        
        <div className="relative z-20 max-w-full mx-auto w-full">
          <div className="flex flex-col items-center justify-center text-center min-h-[80vh] space-y-8">
            <div className="space-y-8 max-w-6xl mx-auto">
              <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
                Operational Scope
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-lg px-4">
                <span className="text-blue-300">Serving West Africa's</span> Maritime Industry
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-white max-w-4xl mx-auto drop-shadow-md px-4">
                Our core competency is shipping agency services
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-12 text-gray-200 max-w-3xl mx-auto drop-shadow-md px-4">
                All allied activities related to shipping and logistics across West Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Coverage */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${getImageUrl('DISTANT_SHOT_PORT')})`,
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
            
          {/* Country Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center px-4">
            {countries.map((country, index) => (
              <div key={index} className="country-card">
                <div className="card-image">
                  <img 
                    src={index % 4 === 0 ? getImageUrl('GHANA_PORT') : 
                         index % 4 === 1 ? getImageUrl('SHIPPING_CONTAINERS') :
                         index % 4 === 2 ? getImageUrl('PORT_CRANE_OPERATION') : 
                         portCargoImage} 
                    alt={`${country} operations`}
                  />
                </div>
                <div className="card-text">
                  <p className="card-region-type">West Africa</p>
                  <h2 className="card-title">{country}</h2>
                  <p className="card-body">
                    {country === 'Ghana' ? 'Primary hub with major ports of Tema & Takoradi, Kotoka International Airport, and key border crossings.' :
                     country === 'Nigeria' ? 'Major economic partner with extensive port operations and cross-border logistics.' :
                     country === 'Côte d\'Ivoire' ? 'Strategic coastal operations with Abidjan port access and regional connectivity.' :
                     country === 'Togo' ? 'Lomé port operations with efficient transshipment and regional distribution.' :
                     country === 'Burkina Faso' ? 'Landlocked operations with border crossing expertise and inland logistics.' :
                     country === 'Mali' ? 'Inland logistics hub with border operations and regional distribution networks.' :
                     country === 'Niger' ? 'Landlocked operations with specialized border crossing and cargo handling.' :
                     'Regional operations with border crossing expertise and logistics coordination.'}
                  </p>
                </div>
                <div className="card-metric">
                  {country === 'Ghana' ? 'Hub' : 
                   country === 'Nigeria' ? 'Major' : 
                   country === 'Côte d\'Ivoire' ? 'Coastal' : 
                   country === 'Togo' ? 'Port' : 
                   country === 'Burkina Faso' ? 'Inland' : 
                   country === 'Mali' ? 'Logistics' : 
                   country === 'Niger' ? 'Border' : 'Regional'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${getImageUrl('INDUSTRIAL_CONTAINER')})`,
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
              {coreCompetencies.map((competency, index) => (
                <div key={index} className="competency-card-container">
                  <div className={`competency-card competency-card-${index + 1}`}>
                    <div className="competency-card-content">
                      <div className="w-16 h-16 bg-white/20 rounded-md flex items-center justify-center mx-auto mb-4">
                        <competency.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{competency.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">{competency.description}</p>
                    </div>
                  </div>
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
            backgroundImage: `url(${getImageUrl('SHIPPING_CONTAINERS')})`,
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8 justify-items-center">
              {clientBase.map((client, index) => (
                <div 
                  key={index}
                  className="client-card-outline"
                >
                  <div className="client-card-content">
                    <div className="client-card-inner">
                      <div className="w-12 h-12 bg-green-500/20 rounded-md flex items-center justify-center mb-4 border border-green-400/30">
                        <Users className="w-6 h-6 text-green-300" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {client}
                      </h3>
                      <p className="text-sm text-green-100">
                        Professional maritime services tailored to your industry needs
                      </p>
                    </div>
                  </div>
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
            backgroundImage: `url(${getImageUrl('PORT_CRANE_OPERATION')})`,
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 justify-items-center">
              {operationalProcesses.map((process, index) => (
                <div key={index} className="process-card-wrapper">
                  <div className="process-card">
                    <div className="process-card-content">
                      <div className="w-12 h-12 bg-white/20 rounded-md flex items-center justify-center mb-4">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        <span className="enclosed">{process.title.split(' ')[0]}</span>
                        {process.title.split(' ').slice(1).join(' ')}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">{process.description}</p>
                    </div>
                  </div>
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
            backgroundImage: `url(${getImageUrl('CARGO_SHIPS_DOCKED')})`,
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
              {complianceItems.map((item, index) => (
                <div key={index} className="compliance-card">
                  <div className="compliance-imgBox">
                    <div className="w-16 h-16 bg-white/20 rounded-md flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="compliance-contentBox">
                    <h3 className="text-lg font-medium text-white uppercase tracking-wide">
                      {item.split(' - ')[0]}
                    </h3>
                    <h2 className="text-xl text-white font-bold tracking-wide mt-2">
                      {item.split(' - ')[1]}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      {/* Technology & Systems */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${getImageUrl('MARITIME_PORT_HERO')})`,
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
              Technology & Systems
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Advanced technology systems ensuring efficient operations and real-time communication
            </p>
          </div>
            
          {/* Technology Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center px-4">
            {technologySystems.map((system, index) => (
              <div key={index} className="country-card">
                <div className="card-image">
                  <img 
                    src={index % 4 === 0 ? getImageUrl('GHANA_PORT') : 
                         index % 4 === 1 ? getImageUrl('SHIPPING_CONTAINERS') :
                         index % 4 === 2 ? getImageUrl('PORT_CRANE_OPERATION') : 
                         portCargoImage} 
                    alt={`${system.title} technology`}
                  />
                </div>
                <div className="card-text">
                  <p className="card-region-type">{system.type}</p>
                  <h2 className="card-title">{system.title}</h2>
                  <p className="card-body">{system.description}</p>
                </div>
                <div className="card-metric">
                  {system.metric}
                </div>
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
          <source src={getVideoUrl('SHIP')} type="video/mp4" />
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
