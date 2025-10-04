import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import shipVideo from "@/assets/videos/Ship.mp4";
import nightPortImage from "@/assets/images/cargo-ships-docked-port-night.jpg";
import nightPortSecurityImage from "@/assets/images/night-time-industrial-port-scene-with-shipping-containers-reflective-surfaces.jpg";
import portOperationsImage from "@/assets/images/port_operations_carg_5753cff0.jpg";
import backgroundNewVideo from "@/assets/videos/background-new.mp4";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", service: "", message: "" });
  };

  const offices = [
    {
      name: "Tema Office",
      location: "Tema Community 5, Ghana",
      digitalAddress: "GT-020-5930",
      services: "Port operations and cargo handling",
      phone: "+233 XXX XXX XXX",
      email: "tema@smeediesmaritime.com"
    },
    {
      name: "Accra Office",
      location: "Accra, Ghana",
      digitalAddress: "GL-125-6946",
      services: "Air cargo and general operations",
      phone: "+233 XXX XXX XXX",
      email: "accra@smeediesmaritime.com"
    },
    {
      name: "Takoradi Office",
      location: "Takoradi, Western Region",
      digitalAddress: "",
      services: "Regional cargo management",
      phone: "+233 XXX XXX XXX",
      email: "takoradi@smeediesmaritime.com"
    },
    {
      name: "Kumasi Office",
      location: "Kumasi, Central Ghana",
      digitalAddress: "",
      services: "Forwarding and distribution",
      phone: "+233 XXX XXX XXX",
      email: "kumasi@smeediesmaritime.com"
    }
  ];

  const emergencyContacts = [
    {
      title: "24/7 Emergency Line",
      description: "Available round-the-clock for urgent maritime operations",
      phone: "+233 XXX XXX XXX"
    },
    {
      title: "Port Operations",
      description: "Direct contact for port-related emergencies",
      phone: "+233 XXX XXX XXX"
    },
    {
      title: "Customs Clearance",
      description: "Emergency customs clearance services",
      phone: "+233 XXX XXX XXX"
    }
  ];

  const businessHours = [
    {
      service: "Regular Business Hours",
      hours: "Monday - Friday: 8:00 AM - 6:00 PM",
      description: "General inquiries and operations"
    },
    {
      service: "Emergency Services",
      hours: "24/7 Availability",
      description: "Urgent maritime operations and emergencies"
    },
    {
      service: "Port Operations",
      hours: "24/7 Port Services",
      description: "Continuous port operations and vessel services"
    },
    {
      service: "Customs Clearance",
      hours: "Business Days + Emergency",
      description: "Regular and emergency customs processing"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-transparent relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
              Contact Us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch with Our Team
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We are available to provide services 24 hours a day, 7 days a week. Contact us for all your maritime and logistics needs.
            </p>
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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Send us a Message</h2>
                  <p className="text-gray-200">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white font-medium">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-2 bg-blue-800/30 border-blue-400/30 text-white placeholder-gray-300 focus:border-blue-300"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="mt-2 bg-blue-800/30 border-blue-400/30 text-white placeholder-gray-300 focus:border-blue-300"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company" className="text-white font-medium">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-2 bg-blue-800/30 border-blue-400/30 text-white placeholder-gray-300 focus:border-blue-300"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="service" className="text-white font-medium">Service Required</Label>
                      <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                        <SelectTrigger className="mt-2 bg-blue-800/30 border-blue-400/30 text-white focus:border-blue-300">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agency">Agency Services</SelectItem>
                          <SelectItem value="stevedoring">Stevedoring & Shore Handling</SelectItem>
                          <SelectItem value="project-cargo">Project Cargo</SelectItem>
                          <SelectItem value="customs">Customs Clearing</SelectItem>
                          <SelectItem value="warehousing">Warehousing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      required
                      className="mt-2 bg-blue-800/30 border-blue-400/30 text-white placeholder-gray-300 focus:border-blue-300"
                      placeholder="Please describe your requirements, cargo details, timeline, and any special needs..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gold text-primary hover:bg-gold/90 border-gold font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Our Offices</h3>
                  
                  <div className="space-y-6">
                    {offices.map((office, index) => (
                      <div key={index} className="p-6 rounded-md bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                        <div className="flex items-start gap-3 mb-3">
                          <MapPin className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-white text-lg">{office.name}</h4>
                            <p className="text-sm text-blue-100">{office.location}</p>
                            {office.digitalAddress && (
                              <p className="text-sm text-blue-200 font-mono">Digital: {office.digitalAddress}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-300" />
                            <span className="text-sm text-blue-100">{office.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-300" />
                            <span className="text-sm text-blue-100">{office.email}</span>
                          </div>
                          <p className="text-xs text-blue-200 mt-2">{office.services}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Emergency Contacts */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${nightPortSecurityImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Emergency Contacts
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Available 24/7 for urgent maritime operations and emergencies
            </p>
          </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {emergencyContacts.map((contact, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-red-900/20 backdrop-blur-sm border-red-400/30 hover:bg-red-800/30 hover:border-red-300/50 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
                >
                  <div className="w-16 h-16 bg-red-500/20 rounded-md flex items-center justify-center mx-auto mb-4 border border-red-400/30">
                    <Phone className="w-8 h-8 text-red-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{contact.title}</h3>
                  <p className="text-red-100 text-sm mb-3">{contact.description}</p>
                  <p className="text-red-200 font-mono font-semibold">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Business Hours */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${portOperationsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Business Hours
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Our service availability across different operational areas
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessHours.map((schedule, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-md bg-green-900/20 backdrop-blur-sm border-green-400/30 hover:bg-green-800/30 hover:border-green-300/50 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-green-300" />
                    <h3 className="font-bold text-white">{schedule.service}</h3>
                  </div>
                  <p className="text-green-200 font-semibold mb-2">{schedule.hours}</p>
                  <p className="text-green-100 text-sm">{schedule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Quote Request Section */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundNewVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-20">
          <div className="bg-blue-900/20 backdrop-blur-sm border-blue-400/30 p-8 rounded-md shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Request a Quote</h2>
              <p className="text-lg text-gray-200">
                Get a detailed quote for your maritime and logistics requirements
              </p>
            </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Service Types</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Agency Services</li>
                    <li>• Stevedoring & Shore Handling</li>
                    <li>• Project Cargo</li>
                    <li>• Customs Clearing</li>
                    <li>• Warehousing</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">What We Need</h3>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Cargo type and quantity</li>
                    <li>• Origin and destination</li>
                    <li>• Timeline requirements</li>
                    <li>• Special handling needs</li>
                    <li>• Documentation requirements</li>
                  </ul>
                </div>
              </div>
              
            <div className="text-center mt-8">
              <Button 
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 border-blue-500 font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Quote Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
