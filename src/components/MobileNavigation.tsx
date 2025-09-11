
import { Home, User, Settings, Search, Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const MobileNavigation = ({ activeTab, onTabChange }: MobileNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [internalActiveTab, setInternalActiveTab] = useState('home');

  const currentActiveTab = activeTab || (location.pathname === '/' ? 'home' : 'home');

  const tabs = [
    { id: 'home', label: 'Accueil', icon: Home, path: '/' },
    { id: 'search', label: 'Rechercher', icon: Search, path: '/search' },
    { id: 'favorites', label: 'Favoris', icon: Heart, path: '/favorites' },
    { id: 'profile', label: 'Profil', icon: User, path: '/profile' },
    { id: 'settings', label: 'Paramètres', icon: Settings, path: '/settings' },
  ];

  const handleTabChange = (tab: string) => {
    const selectedTab = tabs.find(t => t.id === tab);
    if (selectedTab) {
      navigate(selectedTab.path);
    }
    
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentActiveTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50 scale-105' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} className={`mb-1 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
