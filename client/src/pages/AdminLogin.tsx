import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock, User, Ship } from "lucide-react";
import Navigation from "@/components/Navigation";
import shipVideo from "@/assets/videos/Ship.mp4";
import { getApiUrl } from '@/config/api';

export default function AdminLogin() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(getApiUrl('ADMIN') + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Important for session cookies
      });

      // Check if response is ok and content-type is JSON
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Expected JSON response, got: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${data.user.username}`,
        });
        setLocation('/admin/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/70 to-slate-900/80 z-10" />
        
        <div className="relative z-20 max-w-full mx-auto w-full flex items-center justify-center">
          <div className="w-full max-w-md mx-6">
            <Card className="bg-slate-900/90 backdrop-blur-sm border-slate-700/50 shadow-2xl">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <Ship className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Admin Login
                  </CardTitle>
                  <CardDescription className="text-gray-300 mt-2">
                    Smeedies Maritime Admin Dashboard
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username" className="text-white font-medium">
                        Username
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="username"
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          required
                          className="pl-10 bg-slate-800/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                          placeholder="Enter your username"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="password" className="text-white font-medium">
                        Password
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          className="pl-10 bg-slate-800/50 border-slate-600/50 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
                
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
