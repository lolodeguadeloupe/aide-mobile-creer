
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AccommodationsScreen from "./components/AccommodationsScreen";
import RestaurantsScreen from "./components/RestaurantsScreen";
import ConcertsScreen from "./components/ConcertsScreen";
import NightlifeScreen from "./components/NightlifeScreen";
import LoisirsScreen from "./components/LoisirsScreen";
import ActivitiesScreen from "./components/ActivitiesScreen";
import CarRentalsScreen from "./components/CarRentalsScreen";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/accommodations" element={<AccommodationsScreen />} />
            <Route path="/restaurants" element={<RestaurantsScreen />} />
            <Route path="/concerts" element={<ConcertsScreen />} />
            <Route path="/nightlife" element={<NightlifeScreen />} />
            <Route path="/loisirs" element={<LoisirsScreen />} />
            <Route path="/activities" element={<ActivitiesScreen />} />
            <Route path="/car-rentals" element={<CarRentalsScreen />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <PWAInstallPrompt />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
