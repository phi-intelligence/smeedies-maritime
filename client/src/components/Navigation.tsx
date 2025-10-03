import { useState } from "react";
import { Ship, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Operations", href: "#operations" },
    { label: "Warehousing", href: "#warehousing" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Ship className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Smeedies Maritime</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            
            <Button size="sm" className="bg-gold text-primary hover:bg-gold/90" data-testid="button-nav-quote">
              Get Quote
            </Button>
          </div>
          
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}
              <Button size="sm" className="bg-gold text-primary hover:bg-gold/90 w-full" data-testid="button-mobile-quote">
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
