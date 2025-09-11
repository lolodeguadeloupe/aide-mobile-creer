
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRestaurants } from '@/hooks/useRestaurants';
import RestaurantsList from './RestaurantsList';
import RestaurantForm from './RestaurantForm';

const RestaurantsScreen = () => {
  const navigate = useNavigate();
  const { data: restaurants } = useRestaurants();
  const [showForm, setShowForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter restaurants based on search term
  const filteredRestaurants = useMemo(() => {
    if (!restaurants) return [];
    
    if (!searchTerm.trim()) {
      return restaurants;
    }

    const searchLower = searchTerm.toLowerCase();
    return restaurants.filter(restaurant => 
      restaurant.name?.toLowerCase().includes(searchLower) ||
      restaurant.type?.toLowerCase().includes(searchLower) ||
      restaurant.location?.toLowerCase().includes(searchLower) ||
      restaurant.description?.toLowerCase().includes(searchLower)
    );
  }, [restaurants, searchTerm]);

  const handleAddRestaurant = () => {
    setEditingRestaurant(null);
    setShowForm(true);
  };

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRestaurant(null);
  };

  if (showForm) {
    return (
      <RestaurantForm
        restaurant={editingRestaurant}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mr-3"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Gestion des restaurants
            </h1>
          </div>
          <Button onClick={handleAddRestaurant}>
            <Plus size={20} className="mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher par nom, type, lieu ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {filteredRestaurants?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'Aucun restaurant trouvé pour cette recherche' : 'Aucun restaurant trouvé'}
            </div>
            {!searchTerm && (
              <Button
                onClick={handleAddRestaurant}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Créer le premier restaurant
              </Button>
            )}
          </div>
        ) : (
          <RestaurantsList 
            onEditRestaurant={handleEditRestaurant} 
            restaurants={filteredRestaurants}
          />
        )}
      </div>
    </div>
  );
};

export default RestaurantsScreen;
