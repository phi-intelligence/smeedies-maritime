import OfficeCard from "./OfficeCard";
import ParallaxBackground from "./ParallaxBackground";

export default function OfficeNetworkSection() {

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

  return (
    <section className="py-20 relative overflow-hidden prevent-white-flash">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/src/assets/images/cargo-ship-miami-harbor.jpg')",
          zIndex: 0
        }}
      />
      
      {/* Dark overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/80" style={{ zIndex: 1 }} /> */}
      
      <div className="max-w-full mx-auto px-6 relative" style={{ zIndex: 3 }}>
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 px-4">
          {offices.map((office, index) => (
            <div key={index} className="country-card">
              <div className="card-image">
                <img 
                  src={index % 4 === 0 ? '/src/assets/images/ghana_port_infrastru_7ef9101d.jpg' : 
                       index % 4 === 1 ? '/src/assets/images/shipping_containers__4ae963ed.jpg' :
                       index % 4 === 2 ? '/src/assets/images/port_crane_operation_01b3e60a.jpg' : 
                       '/src/assets/images/shipping_port_cargo__47da743f.jpg'} 
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
    </section>
  );
}
