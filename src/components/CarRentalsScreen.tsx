
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CarRentalsList from './CarRentalsList';
import CarRentalForm from './CarRentalForm';

const CarRentalsScreen = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingCarRental, setEditingCarRental] = useState(null);

  const handleEditCarRental = (carRental: any) => {
    setEditingCarRental(carRental);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCarRental(null);
  };

  const handleNewCarRental = () => {
    setEditingCarRental(null);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={handleCloseForm}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste
          </Button>
        </div>
        <CarRentalForm
          carRental={editingCarRental}
          onClose={handleCloseForm}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Locations de Voitures</h1>
          </div>
          <Button onClick={handleNewCarRental}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle voiture
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <CarRentalsList onEditCarRental={handleEditCarRental} />
      </div>
    </div>
  );
};

export default CarRentalsScreen;
