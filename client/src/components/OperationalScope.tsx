export default function OperationalScope() {
  const countries = [
    "Ghana", "Togo", "Côte d'Ivoire", "Burkina Faso", 
    "Mali", "Niger", "Benin", "Nigeria"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            Operational Scope
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-heading">
            Serving West Africa's Maritime Industry
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Core Competency</h3>
              <p className="text-muted-foreground">
                Our core competency is shipping agency services and all allied activities related to shipping and logistics.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Client Base</h3>
              <p className="text-muted-foreground">
                We serve ship owners, operators, exporters, importers, shipping lines, freight forwarders, and all connected to the shipping and freight industry.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Locations</h3>
              <p className="text-muted-foreground">
                Locations served include the Ports of Tema, Takoradi, and Kotoka International Airport.
              </p>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-md border border-card-border">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Service Countries</h3>
            <div className="grid grid-cols-2 gap-4">
              {countries.map((country, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 text-muted-foreground"
                  data-testid={`country-${country.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span className="w-2 h-2 bg-gold rounded-full"></span>
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
