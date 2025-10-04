import logistics2Image from '@/assets/images/logistics-2.jpg';

export default function OperationalScope() {
  const countries = [
    "Ghana", "Togo", "Côte d'Ivoire", "Burkina Faso", 
    "Mali", "Niger", "Benin", "Nigeria"
  ];

  return (
    <section 
      className="py-20 bg-transparent relative overflow-hidden"
      style={{
        backgroundImage: `url(${logistics2Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70" />
      
      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            Operational Scope
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-testid="text-heading">
            Serving West Africa's Maritime Industry
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Core Competency</h3>
              <p className="text-gray-200">
                Our core competency is shipping agency services and all allied activities related to shipping and logistics.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Client Base</h3>
              <p className="text-gray-200">
                We serve ship owners, operators, exporters, importers, shipping lines, freight forwarders, and all connected to the shipping and freight industry.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Locations</h3>
              <p className="text-gray-200">
                Locations served include the Ports of Tema, Takoradi, and Kotoka International Airport.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-900/20 backdrop-blur-sm border-blue-400/30 p-8 rounded-md shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Service Countries</h3>
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
    </section>
  );
}
