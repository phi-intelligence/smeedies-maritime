import TestimonialCard from "./TestimonialCard";
// Testimonial photos removed - using initials instead
import portOperationsImage from '@/assets/images/port_operations_carg_5753cff0.jpg';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Smeedies has been our reliable partner for over 5 years. Their local expertise and 24/7 service is unmatched in West Africa.",
      name: "Captain James Osei",
      company: "Atlantic Shipping Lines"
    },
    {
      quote: "Fast clearance and on-time delivery every time. They understand the complexities of West African trade.",
      name: "Sarah Mensah",
      company: "Ghana Importers Association"
    },
    {
      quote: "Professional service and competitive rates. Their network across Ghana gives us complete coverage.",
      name: "Michael Asante",
      company: "West Africa Freight Forwarders"
    },
    {
      quote: "Excellent handling of our project cargo requirements. They cleared everything on time and within budget.",
      name: "Dr. Ama Boateng",
      company: "Infrastructure Development Corp"
    },
    {
      quote: "Their warehousing services are top-notch. Temperature control and security are exactly what we needed.",
      name: "Kwame Nkrumah",
      company: "Agricultural Exporters Ltd"
    },
    {
      quote: "Smeedies made our intra-African trade operations seamless. Highly recommended for West African logistics.",
      name: "Fatima Diallo",
      company: "Sahel Trading Company"
    }
  ];

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Static Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${portOperationsImage})`
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-heading">
            Trusted by Maritime Industry Leaders
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              company={testimonial.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
