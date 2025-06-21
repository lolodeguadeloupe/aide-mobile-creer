
import { Camera, Edit3, MapPin, Calendar, Mail, Phone } from 'lucide-react';

const ProfileScreen = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-4 pb-24">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">JD</span>
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-blue-500 rounded-full shadow-lg">
              <Camera size={16} className="text-white" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">John Doe</h2>
          <p className="text-gray-600 text-sm mb-4">Développeur Full Stack</p>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            <Edit3 size={16} className="mr-2" />
            Modifier le profil
          </button>
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
              <p className="text-gray-900 font-medium">john.doe@example.com</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <Phone size={20} className="text-gray-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="text-gray-900 font-medium">+33 6 12 34 56 78</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <MapPin size={20} className="text-gray-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Localisation</p>
              <p className="text-gray-900 font-medium">Paris, France</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <Calendar size={20} className="text-gray-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Membre depuis</p>
              <p className="text-gray-900 font-medium">Mars 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-blue-600 mb-1">24</p>
          <p className="text-xs text-gray-600">Projets</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-green-600 mb-1">156</p>
          <p className="text-xs text-gray-600">Commits</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-purple-600 mb-1">4.9</p>
          <p className="text-xs text-gray-600">Rating</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
