
import React, { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import SignOutButton from './SignOutButton';

const UserProfile = () => {
  const { profile, loading, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

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

  if (!profile) {
    return (
      <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Impossible de charger le profil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24">
      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        onStartEdit={() => setIsEditing(true)}
        onCancelEdit={() => setIsEditing(false)}
        onSave={updateProfile}
      />

      <ProfileInfo profile={profile} />

      <SignOutButton />
    </div>
  );
};

export default UserProfile;
