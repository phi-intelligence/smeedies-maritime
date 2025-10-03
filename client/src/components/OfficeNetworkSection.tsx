import OfficeCard from "./OfficeCard";

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
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gold uppercase tracking-wider mb-3" data-testid="text-section-header">
            Office Network
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-heading">
            Strategic Locations Across Ghana
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-subtitle">
            Seven offices strategically positioned for optimal coverage
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((office, index) => (
            <OfficeCard
              key={index}
              name={office.name}
              location={office.location}
              services={office.services}
              digitalAddress={office.digitalAddress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
