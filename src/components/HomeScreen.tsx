import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UtensilsCrossed, Music, Moon, Gamepad2, Building, Car, MapPin, Plane, Percent, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    { name: 'Restaurants', icon: UtensilsCrossed, path: '/restaurants', color: 'bg-red-500' },
    { name: 'Concerts', icon: Music, path: '/concerts', color: 'bg-purple-500' },
    { name: 'Vie nocturne', icon: Moon, path: '/nightlife', color: 'bg-indigo-500' },
    { name: 'Loisirs', icon: Gamepad2, path: '/loisirs', color: 'bg-green-500' },
    { name: 'Hébergements', icon: Building, path: '/accommodations', color: 'bg-blue-500' },
    { name: 'Location de voitures', icon: Car, path: '/car-rentals', color: 'bg-orange-500' },
    { name: 'Activités', icon: MapPin, path: '/activities', color: 'bg-teal-500' },
    { name: 'Voyages', icon: Plane, path: '/travel-offers', color: 'bg-sky-500' },
    { name: 'Promotions', icon: Percent, path: '/promotions', color: 'bg-pink-500' },
    { name: 'Bons Plans', icon: Gift, path: '/bons-plans', color: 'bg-yellow-500' },
  ];

  return (
    <div className="container mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-4">Bienvenue{user ? `, ${user.email}` : ''}!</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md ${item.color} text-white hover:opacity-80`}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-6 w-6 mb-2" />
            <span>{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
