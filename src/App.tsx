import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import HomeScreen from './components/HomeScreen';
import RestaurantsScreen from './components/RestaurantsScreen';
import ConcertsScreen from './components/ConcertsScreen';
import NightlifeScreen from './components/NightlifeScreen';
import LoisirsScreen from './components/LoisirsScreen';
import AccommodationsScreen from './components/AccommodationsScreen';
import CarRentalsScreen from './components/CarRentalsScreen';
import ActivitiesScreen from './components/ActivitiesScreen';
import TravelOffersScreen from './components/TravelOffersScreen';
import MobileNavigation from './components/MobileNavigation';
import { AuthProvider } from './contexts/AuthContext';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { QueryClient } from '@tanstack/react-query';
import PromotionsScreen from './components/PromotionsScreen';

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <Router>
          <div className="App">
            <Toaster />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/restaurants" element={<RestaurantsScreen />} />
              <Route path="/concerts" element={<ConcertsScreen />} />
              <Route path="/nightlife" element={<NightlifeScreen />} />
              <Route path="/loisirs" element={<LoisirsScreen />} />
              <Route path="/accommodations" element={<AccommodationsScreen />} />
              <Route path="/car-rentals" element={<CarRentalsScreen />} />
              <Route path="/activities" element={<ActivitiesScreen />} />
              <Route path="/travel-offers" element={<TravelOffersScreen />} />
              <Route path="/promotions" element={<PromotionsScreen />} />
            </Routes>
            <MobileNavigation />
            <PWAInstallPrompt />
          </div>
        </Router>
      </AuthProvider>
    </QueryClient>
  );
}

export default App;
