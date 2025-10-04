import TestimonialCard from "./TestimonialCard";
import captainPhoto from '@assets/generated_images/Captain_testimonial_photo_b5983bf6.png';
import femaleExecPhoto from '@assets/generated_images/Female_executive_testimonial_photo_aec506e9.png';
import maleProfPhoto from '@assets/generated_images/Male_professional_testimonial_photo_15922d3a.png';

export default function TestimonialsSection() {
  const testimonials = [
    {
      photo: captainPhoto,
      quote: "Smeedies has been our reliable partner for over 5 years. Their local expertise and 24/7 service is unmatched in West Africa.",
      name: "Captain James Osei",
      company: "Atlantic Shipping Lines"
    },
    {
      photo: femaleExecPhoto,
      quote: "Fast clearance and on-time delivery every time. They understand the complexities of West African trade.",
      name: "Sarah Mensah",
      company: "Ghana Importers Association"
    },
    {
      photo: maleProfPhoto,
      quote: "Professional service and competitive rates. Their network across Ghana gives us complete coverage.",
      name: "Michael Asante",
      company: "West Africa Freight Forwarders"
    },
    {
      photo: femaleExecPhoto,
      quote: "Excellent handling of our project cargo requirements. They cleared everything on time and within budget.",
      name: "Dr. Ama Boateng",
      company: "Infrastructure Development Corp"
    },
    {
      photo: maleProfPhoto,
      quote: "Their warehousing services are top-notch. Temperature control and security are exactly what we needed.",
      name: "Kwame Nkrumah",
      company: "Agricultural Exporters Ltd"
    },
    {
      photo: femaleExecPhoto,
      quote: "Smeedies made our intra-African trade operations seamless. Highly recommended for West African logistics.",
      name: "Fatima Diallo",
      company: "Sahel Trading Company"
    }
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
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
              photo={testimonial.photo}
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
