import { ArrowRight, Ship, Truck, Globe, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import cargoShipHarborImage from "@/assets/images/cargo-ship-miami-harbor.jpg";
import portOperationsImage from "@/assets/images/port_operations_carg_5753cff0.jpg";
import cargoShipLoadingImage from "@/assets/images/cargo_ship_loading_v_b9f8b6f4.jpg";
import containerOperationsImage from "@/assets/images/container-cargo-freight-ship-port-twilight.jpg";
import nightPortImage from "@/assets/images/night-time-industrial-port-scene-with-shipping-containers-reflective-surfaces.jpg";
import exportLogisticsImage from "@/assets/images/export-ship-logistics-industrial-trade.jpg";
import logistics5Video from "@/assets/videos/logistics-5.mp4";
import { useEffect, useRef, useState } from "react";

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Ship,
      title: "Agency Services",
      features: [
        "Competitive Proforma Disbursement Account (PDA)",
        "Real-time port line-up service at Tema and Takoradi",
        "Guidance on berth restrictions and regulations",
        "Daily cargo operation updates",
        "Statement of Facts (SOF)"
      ]
    },
    {
      icon: Truck,
      title: "Stevedoring & Shore Handling",
      features: [
        "Dry bulk commodities (clinker, slag, gypsum, coal, manganese)",
        "Break bulk cargo (rice, soya bean meal, wheat, maize, sugar)",
        "Containerised cargo",
        "Heavy lift cargo",
        "Warehousing and storage services"
      ]
    },
    {
      icon: Globe,
      title: "Project Cargo",
      features: [
        "Clearance in 8 countries",
        "Ghana, Togo, Côte d'Ivoire",
        "Burkina Faso, Mali, Niger",
        "Benin, Nigeria"
      ]
    },
    {
      icon: FileCheck,
      title: "Customs Clearing",
      features: [
        "Fast clearance of consignments",
        "On-time delivery guarantee",
        "Minimum cost solutions",
        "Document pre-processing"
      ]
    }
  ];

  const serviceProcess = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "We discuss your requirements, cargo details, and timeline to provide the best solution."
    },
    {
      step: "2",
      title: "Documentation & Preparation",
      description: "Complete all necessary documentation and prepare for cargo handling operations."
    },
    {
      step: "3",
      title: "Execution & Monitoring",
      description: "Execute the service with real-time monitoring and regular updates on progress."
    },
    {
      step: "4",
      title: "Delivery & Follow-up",
      description: "Ensure successful delivery and provide comprehensive follow-up support."
    }
  ];

  const serviceGuarantees = [
    "100% On-Time Delivery",
    "Competitive Pricing",
    "24/7 Customer Support",
    "Full Insurance Coverage"
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${cargoShipHarborImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-3">
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comprehensive Maritime Solutions
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Professional shipping and logistics services across West Africa. We deliver excellence in every port, every time.
            </p>
          </div>
        </div>
      </section>

      {/* Agency Services */}
      <section ref={sectionRef} className="py-20 bg-transparent relative overflow-hidden">
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
              Agency Services
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Professional ship agency services with competitive pricing and real-time updates
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Competitive Proforma Disbursement Account</h3>
                <p className="text-gray-300 mb-4">Detailed estimates of port charges and husbanding charges for ship calls with transparent pricing.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Real-time cost estimates</li>
                  <li>• Transparent pricing structure</li>
                  <li>• No hidden fees</li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-Time Port Lineup Service</h3>
                <p className="text-gray-300 mb-4">Live updates on port status at Tema and Takoradi ports with berth availability.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Live port status updates</li>
                  <li>• Berth availability tracking</li>
                  <li>• Queue position monitoring</li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Port Regulations & Guidance</h3>
                <p className="text-gray-300 mb-4">Expert guidance on local port regulations and berth restrictions for smooth operations.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Local regulation expertise</li>
                  <li>• Berth restriction guidance</li>
                  <li>• Compliance assistance</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gold/10 to-blue-500/10 rounded-xl p-8 border border-gold/20">
              <h3 className="text-2xl font-bold text-white mb-4">Comprehensive Reporting</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gold mb-2">Time Tracking</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Estimated Time of Arrival (ETA)</li>
                    <li>• Estimated Time of Berthing (ETB)</li>
                    <li>• Estimated Time of Completion (ETC)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gold mb-2">Operations Updates</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Daily cargo operations reports</li>
                    <li>• Statement of Facts (SOF)</li>
                    <li>• Real-time status updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Husbandry Services */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${cargoShipLoadingImage})`,
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
              Husbandry Services
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Complete crew handling and vessel support services through a single contact point
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Crew Handling Services</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-300">Crew Changes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-300">Meet & Greet</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-300">Travel Arrangements</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-300">Hotel Accommodations</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Vessel Support Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Fuel (Bunker Supply)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Ship Spares</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Cash to Master</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Provisions & Fresh Water</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-gold/10 rounded-xl p-8 border border-blue-500/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Single Contact, Single Invoice</h3>
                <p className="text-lg text-gray-300 mb-6">All husbandry services through one contact point with standard rates for optimum efficiency</p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Fast Turnaround</h4>
                    <p className="text-gray-400">Speedy and well-coordinated services for optimal vessel efficiency</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Standard Rates</h4>
                    <p className="text-gray-400">Transparent pricing with no hidden costs or surprises</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">24/7 Support</h4>
                    <p className="text-gray-400">Round-the-clock assistance for all your vessel needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Cargo Services */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${containerOperationsImage})`,
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
              Cargo Services
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Comprehensive stevedoring and shore handling for all cargo types
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Break Bulk Commodities</h3>
                <p className="text-gray-300 mb-4">Specialized handling for rice, soya bean meal, wheat, maize, sugar and similar cargo types.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Rice handling</li>
                  <li>• Soya Bean Meal</li>
                  <li>• Wheat & Maize</li>
                  <li>• Sugar cargo</li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Containerized Cargo</h3>
                <p className="text-gray-300 mb-4">Professional handling of containerized cargo with modern equipment and experienced personnel.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Container handling</li>
                  <li>• General cargo</li>
                  <li>• Heavy lift operations</li>
                  <li>• Dry bulk commodities</li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Warehouse & Storage</h3>
                <p className="text-gray-300 mb-4">Comprehensive storage solutions both inside and outside port facilities.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Port storage facilities</li>
                  <li>• External warehouse options</li>
                  <li>• Temperature controlled storage</li>
                  <li>• Security monitoring</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/10 to-gold/10 rounded-xl p-8 border border-green-500/20 mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Special Cargo Services</h3>
                <p className="text-lg text-gray-300">Project cargo clearance and delivery across 8 countries</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gold mb-4">Coverage Countries</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                    <div>• Ghana</div>
                    <div>• Togo</div>
                    <div>• Côte d'Ivoire</div>
                    <div>• Burkina Faso</div>
                    <div>• Mali</div>
                    <div>• Niger</div>
                    <div>• Benin</div>
                    <div>• Nigeria</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gold mb-4">Service Features</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Timely clearance and delivery</li>
                    <li>• Project cargo expertise</li>
                    <li>• Cross-border logistics</li>
                    <li>• Documentation handling</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-blue-500/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Dry Bulk Commodities</h3>
                <p className="text-lg text-gray-300 mb-6">Specialized handling for industrial materials</p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Clinker & Slog</h4>
                    <p className="text-gray-400">Industrial materials handling</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Gypsum & Coal</h4>
                    <p className="text-gray-400">Mining materials expertise</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Manganese</h4>
                    <p className="text-gray-400">Mineral cargo handling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Service Process */}
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Service Process
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              A streamlined four-step process ensuring efficient and reliable service delivery
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceProcess.map((step, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-blue-900/20 backdrop-blur-sm border-blue-400/30 hover:bg-blue-800/30 hover:border-blue-300/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                    <span className="text-2xl font-bold text-blue-300">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-blue-100">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Service Guarantees */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            backgroundImage: `url(${exportLogisticsImage})`,
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
              Service Guarantees
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Our commitment to excellence backed by comprehensive guarantees
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceGuarantees.map((guarantee, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-md bg-green-900/20 backdrop-blur-sm border-green-400/30 hover:bg-green-800/30 hover:border-green-300/50 transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-md flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                    <span className="text-green-300">✓</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{guarantee}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Service Request Form */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={logistics5Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-800/60 to-slate-900/70 z-10" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Request a Service Quote
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Get a detailed quote for your maritime service requirements
            </p>
          </div>
            
            <div className="bg-blue-900/20 backdrop-blur-sm border-blue-400/30 p-8 rounded-md shadow-lg">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:border-blue-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:border-blue-300"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Company</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:border-blue-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Service Required</label>
                    <select className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white focus:outline-none focus:border-blue-300">
                      <option value="">Select a service</option>
                      <option value="agency">Agency Services</option>
                      <option value="stevedoring">Stevedoring & Shore Handling</option>
                      <option value="project-cargo">Project Cargo</option>
                      <option value="customs">Customs Clearing</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Cargo Details</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-blue-800/30 border border-blue-400/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:border-blue-300"
                    placeholder="Describe your cargo, quantity, destination, and any special requirements"
                  />
                </div>
                
                <div className="text-center">
                  <Button 
                    size="lg"
                    className="bg-gold text-primary hover:bg-gold/90 border-gold font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Request Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        <Footer />
    </div>
  );
}
