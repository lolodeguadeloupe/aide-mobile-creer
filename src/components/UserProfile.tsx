
import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Erreur lors du chargement du profil');
      } else {
        setProfile(data);
        setEditForm({
          first_name: data.first_name || '',
          last_name: data.last_name || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name
        })
        .eq('id', user?.id);

      if (error) {
        toast.error('Erreur lors de la sauvegarde');
      } else {
        toast.success('Profil mis à jour avec succès');
        setIsEditing(false);
        fetchProfile(); // Refresh profile data
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Déconnexion réussie');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {profile?.first_name?.[0] || profile?.email?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          
          {isEditing ? (
            <div className="w-full max-w-sm space-y-3">
              <Input
                placeholder="Prénom"
                value={editForm.first_name}
                onChange={(e) => setEditForm(prev => ({ ...prev, first_name: e.target.value }))}
              />
              <Input
                placeholder="Nom"
                value={editForm.last_name}
                onChange={(e) => setEditForm(prev => ({ ...prev, last_name: e.target.value }))}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  <Save size={16} className="mr-2" />
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {profile?.first_name && profile?.last_name 
                  ? `${profile.first_name} ${profile.last_name}`
                  : 'Utilisateur'
                }
              </h2>
              <p className="text-gray-600 text-sm mb-4">Membre</p>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Edit3 size={16} className="mr-2" />
                Modifier le profil
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <Mail size={20} className="text-gray-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900 font-medium">{profile?.email}</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <Calendar size={20} className="text-gray-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Membre depuis</p>
              <p className="text-gray-900 font-medium">
                {profile?.created_at 
                  ? new Date(profile.created_at).toLocaleDateString('fr-FR')
                  : 'Non disponible'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <div>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 transition-colors"
        >
          <span className="text-red-600 font-medium">Se déconnecter</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
