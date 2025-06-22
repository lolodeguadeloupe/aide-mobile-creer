
import { Bell, Plus, TrendingUp, Star, Users, LogIn, Calendar, MapPin, Music, Utensils, Car, GamepadIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface HomeScreenProps {
  onShowAuth: () => void;
}

const HomeScreen = ({ onShowAuth }: HomeScreenProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const stats = [
    { label: 'Utilisateurs actifs', value: '2.4K', icon: Users, color: 'bg-blue-500' },
    { label: 'Croissance', value: '+15%', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Évaluations', value: '4.8', icon: Star, color: 'bg-yellow-500' },
  ];

  const recentActivities = [
    { title: 'Nouveau utilisateur inscrit', time: 'Il y a 2 min', avatar: '👤' },
    { title: 'Mise à jour déployée', time: 'Il y a 1h', avatar: '🚀' },
    { title: 'Feedback reçu', time: 'Il y a 3h', avatar: '💬' },
  ];

  const quickActions = [
    { label: 'Hébergement', icon: MapPin, route: '/accommodations' },
    { label: 'Restaurant', icon: Utensils, route: '/restaurants' },
    { label: 'Concert', icon: Music, route: '/concerts' },
    { label: 'Soirée', icon: Calendar, route: '/nightlife' },
    { label: 'Loisir', icon: GamepadIcon, route: '/loisirs' },
    { label: 'Activité', icon: Star, route: '/activities' },
    { label: 'Location auto', icon: Car, route: '/car-rentals' },
  ];

  const handleQuickAction = (route: string) => {
    if (!user) {
      onShowAuth();
      return;
    }
    navigate(route);
  };

  const handleAnalytics = () => {
    if (!user) {
      onShowAuth();
      return;
    }
    // For now, just show an alert - could be expanded to a full analytics page
    alert('Fonctionnalité Analytics à venir !');
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 p-4 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user ? `Bonjour ${user.email?.split('@')[0]} !` : 'Bonjour !'}
          </h1>
          <p className="text-gray-600">Bienvenue dans votre app</p>
        </div>
        <div className="flex items-center gap-2">
          {!user && (
            <button 
              onClick={onShowAuth}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              <LogIn size={16} />
              Connexion
            </button>
          )}
          <button className="relative p-2 bg-white rounded-full shadow-md">
            <Bell size={20} className="text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Actions rapides</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowQuickMenu(!showQuickMenu)}
              className="flex items-center justify-center p-4 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors w-full"
            >
              <Plus size={20} className="text-blue-600 mr-2" />
              <span className="text-blue-600 font-medium">Nouveau</span>
            </button>
            
            {/* Quick Menu Dropdown */}
            {showQuickMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 max-h-64 overflow-y-auto">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setShowQuickMenu(false);
                        handleQuickAction(action.route);
                      }}
                      className="flex items-center w-full p-3 hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                    >
                      <Icon size={18} className="text-gray-600 mr-3" />
                      <span className="text-gray-700 font-medium">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          <button 
            onClick={handleAnalytics}
            className="flex items-center justify-center p-4 bg-purple-50 rounded-xl border border-purple-100 hover:bg-purple-100 transition-colors"
          >
            <TrendingUp size={20} className="text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Analytics</span>
          </button>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showQuickMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowQuickMenu(false)}
        />
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Activité récente</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
              <div className="text-2xl mr-3">{activity.avatar}</div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium text-sm">{activity.title}</p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
