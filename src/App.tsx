
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import RestaurantsScreen from './components/RestaurantsScreen';
import ConcertsScreen from './components/ConcertsScreen';
import NightlifeScreen from './components/NightlifeScreen';
import LoisirsScreen from './components/LoisirsScreen';
import AccommodationsScreen from './components/AccommodationsScreen';
import CarRentalsScreen from './components/CarRentalsScreen';
import ActivitiesScreen from './components/ActivitiesScreen';
import TravelOffersScreen from './components/TravelOffersScreen';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PromotionsScreen from './components/PromotionsScreen';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
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
      <PWAInstallPrompt />
    </div>
  );
}

export default App;
