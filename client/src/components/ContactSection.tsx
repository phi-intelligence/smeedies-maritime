import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import shipVideo from "@/assets/videos/Ship.mp4";

export default function ContactSection() {
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

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      >
        <source src={shipVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70" style={{ zIndex: 0 }} />
      
      <div className="max-w-7xl mx-auto px-6 relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3" data-testid="text-section-header">
            Contact Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="text-heading">
            Get in Touch with Our Team
          </h2>
          <p className="text-lg text-gray-200" data-testid="text-availability">
            We are available to provide services 24 hours a day, 7 days a week.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  data-testid="input-company"
                />
              </div>
              
              <div>
                <Label htmlFor="service">Service Required</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger id="service" data-testid="select-service">
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
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                  data-testid="textarea-message"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full" data-testid="button-send-message">
                Send Message
              </Button>
            </form>
          </div>
          
          <div className="space-y-8">
            {/* Management Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Management</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-sm text-gray-200">management@smeediesmaritime.com</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-sm text-gray-200">+233 (54) 167-1660</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accounting Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Accounting</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-sm text-gray-200">accounting@smeediesmaritime.com</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-sm text-gray-200">+233 (54) 944-3126</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing/Sales Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Marketing/Sales</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-sm text-gray-200">marketing@smeediesmaritime.com</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-sm text-gray-200">+1 (240) 495-8068</p>
                    <p className="text-sm text-gray-200">+233 (24) 650-5158</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations Contact */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Operations</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-sm text-gray-200">operations@smeediesmaritime.com</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-sm text-gray-200">+233 (24) 458-2071</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Locations</h3>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Port of Tema, Ghana</p>
                    <p className="text-sm text-gray-200">Digital Address: GT-020-5930</p>
                    <p className="text-sm text-gray-200">Tema, Community 5, GT020</p>
                    <p className="text-sm text-gray-200">5.639914, -0.006311</p>
                    <p className="text-sm text-gray-200 mt-1">Phone: +233 (303) 321-5401</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Kotoka International Airport</p>
                    <p className="text-sm text-gray-200">Digital Address: GL-125-6946</p>
                    <p className="text-sm text-gray-200">Accra, Ghana</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white">Port of Takoradi, Ghana</p>
                    <p className="text-sm text-gray-200">Digital Address: WS-407-0198</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
