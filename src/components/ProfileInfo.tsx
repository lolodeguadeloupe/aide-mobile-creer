
import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import { Profile } from '@/types/profile';

interface ProfileInfoProps {
  profile: Profile;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
  return (
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
  );
};

export default ProfileInfo;
