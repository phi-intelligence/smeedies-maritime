import TestimonialCard from '../TestimonialCard';
// Testimonial photos removed - using initials instead

export default function TestimonialCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <TestimonialCard
        quote="Smeedies has been our reliable partner for over 5 years. Their local expertise and 24/7 service is unmatched in West Africa."
        name="Captain James Osei"
        company="Atlantic Shipping Lines"
      />
    </div>
  );
}
