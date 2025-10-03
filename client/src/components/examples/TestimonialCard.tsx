import TestimonialCard from '../TestimonialCard';
import captainPhoto from '@assets/generated_images/Captain_testimonial_photo_b5983bf6.png';

export default function TestimonialCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <TestimonialCard
        photo={captainPhoto}
        quote="Smeedies has been our reliable partner for over 5 years. Their local expertise and 24/7 service is unmatched in West Africa."
        name="Captain James Osei"
        company="Atlantic Shipping Lines"
      />
    </div>
  );
}
