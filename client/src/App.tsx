import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Chatbot from "@/components/Chatbot";
import NewHome from "@/pages/NewHome";
import Services from "@/pages/Services";
import Operations from "@/pages/Operations";
import Warehousing from "@/pages/Warehousing";
import Contact from "@/pages/Contact";
import GlobeDemo from "@/pages/GlobeDemo";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={NewHome} />
      <Route path="/services" component={Services} />
      <Route path="/operations" component={Operations} />
      <Route path="/warehousing" component={Warehousing} />
      <Route path="/contact" component={Contact} />
      <Route path="/globe-demo" component={GlobeDemo} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Handle scroll to top on route changes
  useScrollToTop();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <Chatbot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
