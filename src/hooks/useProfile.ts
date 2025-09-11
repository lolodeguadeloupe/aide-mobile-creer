import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Profile } from '@/types/profile';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Erreur lors du chargement du profil');
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const updateProfile = async (updates: { first_name: string; last_name: string }) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        toast.error('Erreur lors de la sauvegarde');
        return false;
      } else {
        toast.success('Profil mis à jour avec succès');
        fetchProfile(); // Refresh profile data
        return true;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de la sauvegarde');
      return false;
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refreshProfile: fetchProfile
  };
};
