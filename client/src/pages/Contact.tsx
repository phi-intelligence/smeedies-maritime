import { useState } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteSection from "@/components/QuoteSection";
import shipVideo from "@/assets/videos/Ship.mp4";
import nightPortImage from "@/assets/images/cargo-ships-docked-port-night.jpg";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", company: "", service: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const departments = [
    {
      name: "Management",
      location: "Head Office",
      digitalAddress: "",
      services: "Executive leadership and strategic planning",
      phone: "+233 (54) 167-1660",
      email: "management@smeediesmaritime.com",
      icon: "👔"
    },
    {
      name: "Accounting",
      location: "Finance Department",
      digitalAddress: "",
      services: "Financial management and billing",
      phone: "+233 (54) 944-3126",
      email: "accounting@smeediesmaritime.com",
      icon: "💰"
    },
    {
      name: "Marketing/Sales",
      location: "Business Development",
      digitalAddress: "",
      services: "Business development and client relations",
      phone: "+1 (240) 495-8068",
      email: "marketing@smeediesmaritime.com",
      icon: "📈",
      secondaryPhone: "+233 (24) 650-5158"
    },
    {
      name: "Operations",
      location: "Operations Center",
      digitalAddress: "",
      services: "Port operations and logistics coordination",
      phone: "+233 (24) 458-2071",
      email: "operations@smeediesmaritime.com",
      icon: "⚙️"
    }
  ];

  const offices = [
    {
      name: "Port of Tema",
      location: "Tema, Community 5, GT020",
      digitalAddress: "GT-020-5930",
      services: "Main port operations and cargo handling",
      phone: "+233 (303) 321-5401",
      email: "operations@smeediesmaritime.com",
      coordinates: "5.639914, -0.006311"
    },
    {
      name: "Kotoka International Airport",
      location: "Accra, Ghana",
      digitalAddress: "GL-125-6946",
      services: "Air cargo and international operations",
      phone: "+233 (24) 458-2071",
      email: "operations@smeediesmaritime.com"
    },
    {
      name: "Port of Takoradi",
      location: "Takoradi, Western Region",
      digitalAddress: "WS-407-0198",
      services: "Regional port operations",
      phone: "+233 (24) 458-2071",
      email: "operations@smeediesmaritime.com"
    }
  ];


  return (
    <div className="min-h-screen bg-transparent relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={shipVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" /> */}
        
        <div className="relative z-20 max-w-full mx-auto w-full">
          <div className="flex flex-col items-center justify-center text-center min-h-[80vh] space-y-8">
            <div className="space-y-8 max-w-6xl mx-auto">
              <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
                Contact Us
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-lg px-4">
                <span className="text-blue-300">Get in Touch</span> with Our Team
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-white max-w-4xl mx-auto drop-shadow-md px-4">
                We are available 24 hours a day, 7 days a week
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-12 text-gray-200 max-w-3xl mx-auto drop-shadow-md px-4">
                Contact us for all your maritime and logistics needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Information */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${nightPortImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" /> */}
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Send us a Message</h2>
                  <p className="text-gray-200">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>
                
                <div className="bg-blue-900/40 backdrop-blur-md rounded-xl p-8 border border-blue-400/30 shadow-2xl">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-white font-semibold text-base">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="mt-2 bg-blue-800/60 border-blue-400/50 text-white placeholder-blue-200 focus:border-blue-300 focus:bg-blue-800/80 transition-all duration-300 h-12 text-base"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-white font-semibold text-base">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-2 bg-blue-800/60 border-blue-400/50 text-white placeholder-blue-200 focus:border-blue-300 focus:bg-blue-800/80 transition-all duration-300 h-12 text-base"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company" className="text-white font-semibold text-base">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="mt-2 bg-blue-800/60 border-blue-400/50 text-white placeholder-blue-200 focus:border-blue-300 focus:bg-blue-800/80 transition-all duration-300 h-12 text-base"
                          placeholder="Your company name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="service" className="text-white font-semibold text-base">Service Required</Label>
                        <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                          <SelectTrigger className="mt-2 bg-blue-800/60 border-blue-400/50 text-white focus:border-blue-300 focus:bg-blue-800/80 transition-all duration-300 h-12 text-base">
                            <SelectValue placeholder="Select a service" className="text-blue-200" />
                          </SelectTrigger>
                          <SelectContent className="bg-blue-900 border-blue-400">
                            <SelectItem value="agency" className="text-white hover:bg-blue-800 focus:bg-blue-800">Agency Services</SelectItem>
                            <SelectItem value="stevedoring" className="text-white hover:bg-blue-800 focus:bg-blue-800">Stevedoring & Shore Handling</SelectItem>
                            <SelectItem value="project-cargo" className="text-white hover:bg-blue-800 focus:bg-blue-800">Project Cargo</SelectItem>
                            <SelectItem value="customs" className="text-white hover:bg-blue-800 focus:bg-blue-800">Customs Clearing</SelectItem>
                            <SelectItem value="warehousing" className="text-white hover:bg-blue-800 focus:bg-blue-800">Warehousing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-white font-semibold text-base">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        required
                        className="mt-2 bg-blue-800/60 border-blue-400/50 text-white placeholder-blue-200 focus:border-blue-300 focus:bg-blue-800/80 transition-all duration-300 text-base resize-none"
                        placeholder="Please describe your requirements, cargo details, timeline, and any special needs..."
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-500 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 h-14 rounded-lg"
                    >
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-8">
                {/* Departments */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Departments</h3>
                  
                  <div className="contact-info-grid space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="contact-card p-6 rounded-xl bg-gradient-to-r from-blue-900/60 to-blue-800/60 backdrop-blur-md border border-blue-400/50 hover:border-blue-300/70 hover:bg-gradient-to-r hover:from-blue-800/70 hover:to-blue-700/70 transition-all duration-300 shadow-xl hover:shadow-blue-500/30">
                        <div className="flex items-start gap-4 mb-4">
                          <span className="text-3xl bg-blue-700/50 p-2 rounded-lg">{dept.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-xl mb-1">{dept.name}</h4>
                            <p className="text-blue-200 font-medium">{dept.location}</p>
                            <p className="text-blue-300 text-sm mt-2">{dept.services}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 bg-blue-800/40 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                            <span className="text-blue-100 font-medium">{dept.phone}</span>
                          </div>
                          {dept.secondaryPhone && (
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                              <span className="text-blue-100 font-medium">{dept.secondaryPhone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-300 flex-shrink-0" />
                            <span className="text-blue-100 font-medium break-all">{dept.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Office Locations */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Office Locations</h3>
                  
                  <div className="contact-info-grid space-y-4">
                    {offices.map((office, index) => (
                      <div key={index} className="contact-card p-6 rounded-xl bg-gradient-to-r from-blue-900/60 to-cyan-900/60 backdrop-blur-md border border-blue-400/50 hover:border-blue-300/70 hover:bg-gradient-to-r hover:from-blue-800/70 hover:to-cyan-800/70 transition-all duration-300 shadow-xl hover:shadow-blue-500/30">
                        <div className="flex items-start gap-4 mb-4">
                          <MapPin className="w-6 h-6 text-blue-300 flex-shrink-0 mt-1 bg-blue-700/50 p-2 rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-xl mb-1">{office.name}</h4>
                            <p className="text-blue-200 font-medium">{office.location}</p>
                            {office.digitalAddress && (
                              <p className="text-blue-300 text-sm font-mono mt-1">Digital: {office.digitalAddress}</p>
                            )}
                            {office.coordinates && (
                              <p className="text-blue-400 text-xs font-mono mt-1">Coordinates: {office.coordinates}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-3 bg-blue-800/40 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                            <span className="text-blue-100 font-medium">{office.phone}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-blue-300 flex-shrink-0" />
                            <span className="text-blue-100 font-medium break-all">{office.email}</span>
                          </div>
                          <p className="text-blue-300 text-sm mt-2 bg-blue-900/40 rounded p-2">{office.services}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Quote Section */}
      <QuoteSection />
      
      <Footer />
    </div>
  );
}
