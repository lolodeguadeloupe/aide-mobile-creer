
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RestaurantsList from './RestaurantsList';
import RestaurantForm from './RestaurantForm';

const RestaurantsScreen = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

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

      {/* Content */}
      <div className="p-4">
        <RestaurantsList onEditRestaurant={handleEditRestaurant} />
      </div>
    </div>
  );
};

export default RestaurantsScreen;
