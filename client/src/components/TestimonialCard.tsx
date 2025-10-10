import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCardProps {
  photo?: string;
  quote: string;
  name: string;
  company: string;
}

export default function TestimonialCard({ photo, quote, name, company }: TestimonialCardProps) {
  return (
    <Card className="p-6 h-full flex flex-col" data-testid={`card-testimonial-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-16 h-16">
          {photo && <AvatarImage src={photo} alt={name} />}
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-foreground" data-testid="text-testimonial-name">{name}</p>
          <p className="text-sm text-muted-foreground" data-testid="text-testimonial-company">{company}</p>
        </div>
      </div>
      
      <p className="text-muted-foreground italic flex-grow" data-testid="text-testimonial-quote">
        "{quote}"
      </p>
    </Card>
  );
}
