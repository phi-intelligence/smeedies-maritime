import { useState } from "react";
import { Ship, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/new-home" },
    { label: "Services", href: "/services" },
    { label: "Operations", href: "/operations" },
    { label: "Warehousing", href: "/warehousing" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <nav className="bg-transparent backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
              <Ship className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <span className="text-base md:text-lg font-bold text-white">Smeedies Maritime</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <li key={index} className="list-none">
                  <Link
                    href={item.href}
                    className="nav-link relative block uppercase text-white font-semibold text-sm px-3 py-2 transition-all duration-500 z-10"
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Company Link - Hidden but accessible */}
              <li className="list-none">
                <Link
                  href="/admin/login"
                  className="nav-link relative block uppercase text-white font-semibold text-sm px-3 py-2 transition-all duration-500 z-10"
                >
                  Company
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-3 bg-slate-900/95 backdrop-blur-md rounded-lg mt-2">
            <div className="flex flex-col items-center space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="nav-link-mobile relative block uppercase text-white font-semibold text-sm px-3 py-2 transition-all duration-500 z-10"
                  onClick={() => setIsOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
