
import React from 'react';
import { Edit3 } from 'lucide-react';
import { Profile } from '@/types/profile';
import ProfileForm from './ProfileForm';

interface ProfileHeaderProps {
  profile: Profile;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: (data: { first_name: string; last_name: string }) => Promise<boolean>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSave
}) => {
  return (
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
          <ProfileForm
            initialFirstName={profile?.first_name || ''}
            initialLastName={profile?.last_name || ''}
            onSave={onSave}
            onCancel={onCancelEdit}
          />
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
              onClick={onStartEdit}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Edit3 size={16} className="mr-2" />
              Modifier le profil
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
