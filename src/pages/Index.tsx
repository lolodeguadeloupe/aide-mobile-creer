
import { useState } from 'react';
import MobileNavigation from '@/components/MobileNavigation';
import HomeScreen from '@/components/HomeScreen';
import ProfileScreen from '@/components/ProfileScreen';
import SettingsScreen from '@/components/SettingsScreen';
import { Search, Heart } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return (
          <div className="flex-1 bg-gradient-to-br from-green-50 to-blue-50 p-4 pb-24 flex items-center justify-center">
            <div className="text-center">
              <Search size={48} className="text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Recherche</h2>
              <p className="text-gray-600">Fonctionnalité de recherche à venir</p>
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="flex-1 bg-gradient-to-br from-pink-50 to-red-50 p-4 pb-24 flex items-center justify-center">
            <div className="text-center">
              <Heart size={48} className="text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Favoris</h2>
              <p className="text-gray-600">Vos éléments favoris apparaîtront ici</p>
            </div>
          </div>
        );
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {renderScreen()}
      <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
