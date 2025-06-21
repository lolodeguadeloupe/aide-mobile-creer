
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthScreen from '@/components/AuthScreen';
import HomeScreen from '@/components/HomeScreen';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  if (!user && !showAuth) {
    return (
      <HomeScreen onShowAuth={() => setShowAuth(true)} />
    );
  }

  if (!user && showAuth) {
    return <AuthScreen onBack={() => setShowAuth(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeScreen onShowAuth={() => setShowAuth(true)} />
      
      {/* Navigation rapide */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gestion</h2>
          <div className="space-y-2">
            <Button
              onClick={() => navigate('/accommodations')}
              variant="outline"
              className="w-full justify-start"
            >
              Gérer les hébergements
            </Button>
            <Button
              onClick={() => navigate('/restaurants')}
              variant="outline"
              className="w-full justify-start"
            >
              Gérer les restaurants
            </Button>
            <Button
              onClick={() => navigate('/concerts')}
              variant="outline"
              className="w-full justify-start"
            >
              Gérer les concerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
