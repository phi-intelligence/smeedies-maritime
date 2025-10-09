import ParallaxBackground from './ParallaxBackground';
import logistics2Image from '@/assets/images/logistics-2.jpg';
import westAfricaImage from '@/assets/images/westafrica.jpg';

export default function OperationalScope() {
  const countries = [
    "Ghana", "Togo", "Côte d'Ivoire", "Burkina Faso", 
    "Mali", "Niger", "Benin", "Nigeria"
  ];

  return (
    <section 
      className="py-20 relative overflow-hidden prevent-white-flash"
    >
      {/* Background Image with Parallax */}
      <ParallaxBackground 
        speed={0.7} 
        direction="up" 
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          backgroundImage: `url(${logistics2Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}
      />
      
      {/* Fallback dark background */}
      <div className="absolute inset-0 bg-slate-900" style={{ zIndex: 0 }} />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70" style={{ zIndex: 2 }} />
      
      {/* Header content */}
      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 3 }}>
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
      <div className="w-full px-4 mb-12 relative" style={{ zIndex: 3 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-start mx-auto" style={{ maxWidth: '90rem' }}>
          <div className="space-y-8 p-4">
            <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-400/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                Core Competency
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed">
                Our core competency is shipping agency services and all allied activities related to shipping and logistics.
              </p>
            </div>
            
            <div className="bg-green-900/20 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                Client Base
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed">
                We serve ship owners, operators, exporters, importers, shipping lines, freight forwarders, and all connected to the shipping and freight industry.
              </p>
            </div>
            
            <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-400/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
                Locations
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed">
                Locations served include the Ports of Tema, Takoradi, and Kotoka International Airport.
              </p>
            </div>
          </div>
          
          {/* Cards container moved to the right */}
          <div className="flex flex-col gap-8 items-center p-4 min-h-[600px]">
            {/* Service Countries Text Card */}
            <div className="operational-stat-card-container">
              <div className="operational-stat-card">
                <div className="operational-stat-card-content">
                  <div className="flex flex-col items-center justify-center text-center h-full">
                    <h3 className="text-xl font-bold text-white mb-6" data-testid="text-service-countries-title">Service Countries</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {countries.map((country, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-2 text-blue-100"
                          data-testid={`country-${country.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                          <span>{country}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Port Operations Image Card */}
            <div className="operational-image-card-container">
              <div className="operational-image-card">
                <div className="operational-image-card-content">
                  <img 
                    src={westAfricaImage} 
                    alt="West Africa Region Map" 
                    data-testid="west-africa-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
