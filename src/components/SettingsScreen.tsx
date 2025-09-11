
import { 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Smartphone,
  Lock
} from 'lucide-react';

const SettingsScreen = () => {
  const settingsGroups = [
    {
      title: 'Préférences',
      items: [
        { icon: Bell, label: 'Notifications', value: 'Activées', color: 'text-blue-600' },
        { icon: Globe, label: 'Langue', value: 'Français', color: 'text-green-600' },
        { icon: Moon, label: 'Mode sombre', value: 'Désactivé', color: 'text-purple-600' },
      ]
    },
    {
      title: 'Sécurité',
      items: [
        { icon: Shield, label: 'Confidentialité', value: '', color: 'text-orange-600' },
        { icon: Lock, label: 'Mot de passe', value: '', color: 'text-red-600' },
        { icon: Smartphone, label: 'Authentification 2FA', value: 'Activée', color: 'text-indigo-600' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Aide & Support', value: '', color: 'text-gray-600' },
      ]
    }
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 p-4 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Personnalisez votre expérience</p>
      </div>

      {/* Settings Groups */}
      <div className="space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {group.title}
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg bg-gray-100 mr-3`}>
                        <Icon size={20} className={item.color} />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900 font-medium">{item.label}</p>
                        {item.value && (
                          <p className="text-sm text-gray-500">{item.value}</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button className="w-full flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 transition-colors">
          <LogOut size={20} className="text-red-600 mr-3" />
          <span className="text-red-600 font-medium">Se déconnecter</span>
        </button>
      </div>

      {/* App Version */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default SettingsScreen;
