import { useState } from "react";
import { Ship, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Operations", href: "/operations" },
    { label: "Warehousing", href: "/warehousing" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <nav className="bg-transparent backdrop-blur-md border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Ship className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">Smeedies Maritime</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            
            <Link href="/contact">
              <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700" data-testid="button-nav-quote">
                Get Quote
              </Button>
            </Link>
          </div>
          
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-slate-900/60 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 w-full" data-testid="button-mobile-quote">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
