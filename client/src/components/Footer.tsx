import { ArrowRight, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Ship className="w-8 h-8 text-gold" />
              <span className="text-2xl font-bold">Smeedies</span>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-6">
              Your reliable local partner for shipping and logistics across West Africa.
            </p>
            <Button 
              className="bg-gold text-primary hover:bg-gold/90 border-gold"
              data-testid="button-footer-quote"
            >
              Get Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Main Pages</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-home">Home</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-about">About</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-services">Services</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-operations">Operations</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-warehousing">Warehousing</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-contact">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-agency-services">Agency Services</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-stevedoring">Stevedoring</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-project-cargo">Project Cargo</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-customs">Customs Clearing</a></li>
              <li><a href="#" className="hover:text-gold transition-colors" data-testid="link-warehouse">Warehousing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact & Accreditations</h3>
            <div className="space-y-3 text-sm text-primary-foreground/80 mb-6">
              <p>Digital Address: GT-020-5930</p>
              <p>Email: info@smeediesmaritime.com</p>
            </div>
            <div className="space-y-2 text-xs text-primary-foreground/70">
              <p>• Licensed by Ghana Ports & Harbours Authority (GPHA)</p>
              <p>• Member of World Wide Shipagencies Association (WWSA)</p>
              <p>• Ghana representative of WWSA with 40+ independent agents</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
          <p>&copy; {new Date().getFullYear()} Smeedies Maritime. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
