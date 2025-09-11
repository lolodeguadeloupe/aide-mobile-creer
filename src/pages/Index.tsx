<<<<<<< HEAD
import React, { useState } from 'react';
import { useAuth } from '@/contexts/useAuth';
import AuthScreen from '@/components/AuthScreen';
import Dashboard from '@/components/Dashboard';
import SignOutButton from '@/components/SignOutButton';

const Index = () => {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (!user && showAuth) {
    return <AuthScreen onBack={() => setShowAuth(false)} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Tableau de bord administrateur
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connectez-vous pour accéder à votre interface d'administration
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => setShowAuth(true)}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
      
      {/* Logout Button - Fixed position */}
      <div className="fixed bottom-4 right-4 z-40">
        <SignOutButton />
      </div>
    </div>
  );
};

export default Index;
=======

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthScreen from '@/components/AuthScreen';
import Dashboard from '@/components/Dashboard';
import SignOutButton from '@/components/SignOutButton';

const Index = () => {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (!user && showAuth) {
    return <AuthScreen onBack={() => setShowAuth(false)} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Tableau de bord administrateur
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connectez-vous pour accéder à votre interface d'administration
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <button
              onClick={() => setShowAuth(true)}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
      
      {/* Logout Button - Fixed position */}
      <div className="fixed bottom-4 right-4 z-40">
        <SignOutButton />
      </div>
    </div>
  );
};

export default Index;
>>>>>>> bf990d4 (Commit avant pull de verification)
