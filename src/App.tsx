import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Conversions from "./pages/Conversions";
import UTMBuilder from "./pages/UTMBuilder";
import Settings from "./pages/Settings";
import Visitors from "./pages/Visitors";
import Integrations from "./pages/Integrations";
import Account from "./pages/Account";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/conversions" element={<Conversions />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/utm-builder" element={<UTMBuilder />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/account" element={<Account />} />
          <Route path="/plans" element={<Plans />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
