
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Star, Plus, BarChart3, Settings, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Utilisateurs actifs",
      value: "2,543",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Croissance",
      value: "18.2%",
      change: "+2.4%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Évaluations",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Revenus",
      value: "€45,231",
      change: "+8.1%",
      icon: BarChart3,
      color: "text-purple-600"
    }
  ];

  const quickActions = [
    { name: 'Nouveau restaurant', action: () => navigate('/restaurants'), icon: Plus },
    { name: 'Gérer les concerts', action: () => navigate('/concerts'), icon: Settings },
    { name: 'Voir les statistiques', action: () => navigate('/analytics'), icon: BarChart3 },
    { name: 'Notifications', action: () => navigate('/notifications'), icon: Bell },
  ];

  const recentActivity = [
    { action: "Nouveau restaurant ajouté", time: "Il y a 2h", type: "success" },
    { action: "Concert mis à jour", time: "Il y a 4h", type: "info" },
    { action: "Promotion créée", time: "Il y a 6h", type: "warning" },
    { action: "Utilisateur inscrit", time: "Il y a 8h", type: "success" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-2">Vue d'ensemble de votre plateforme</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change} depuis le mois dernier
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50"
                    onClick={action.action}
                  >
                    <action.icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{action.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'info' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Grid */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestion des contenus</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Restaurants', path: '/restaurants', count: 45 },
              { name: 'Concerts', path: '/concerts', count: 23 },
              { name: 'Hébergements', path: '/accommodations', count: 67 },
              { name: 'Activités', path: '/activities', count: 34 },
              { name: 'Loisirs', path: '/loisirs', count: 28 },
              { name: 'Vie nocturne', path: '/nightlife', count: 19 },
              { name: 'Voyages', path: '/travel-offers', count: 12 },
              { name: 'Promotions', path: '/promotions', count: 8 },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(item.path)}>
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{item.count}</p>
                    <p className="text-xs text-gray-500">éléments</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
