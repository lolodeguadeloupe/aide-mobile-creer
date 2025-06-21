
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const SignOutButton: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Déconnexion réussie');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <div>
      <button 
        onClick={handleSignOut}
        className="w-full flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 transition-colors"
      >
        <span className="text-red-600 font-medium">Se déconnecter</span>
      </button>
    </div>
  );
};

export default SignOutButton;
