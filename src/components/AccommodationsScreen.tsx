
import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccommodations, useDeleteAccommodation, Accommodation } from '@/hooks/useAccommodations';
import { useState } from 'react';
import AccommodationForm from './AccommodationForm';

const AccommodationsScreen: React.FC = () => {
  const { data: accommodations, isLoading, error } = useAccommodations();
  const deleteAccommodation = useDeleteAccommodation();
  const [showForm, setShowForm] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);

  const handleEdit = (accommodation: Accommodation) => {
    setEditingAccommodation(accommodation);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet hébergement ?')) {
      deleteAccommodation.mutate(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAccommodation(null);
  };

  if (showForm) {
    return (
      <AccommodationForm
        accommodation={editingAccommodation}
        onClose={handleCloseForm}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Erreur lors du chargement des hébergements</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Hébergements</h1>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {accommodations?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">Aucun hébergement trouvé</div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={20} className="mr-2" />
              Créer le premier hébergement
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {accommodations?.map((accommodation) => (
              <div
                key={accommodation.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <img
                        src={accommodation.image}
                        alt={accommodation.name}
                        className="w-16 h-16 rounded-lg object-cover mr-3"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {accommodation.name}
                        </h3>
                        <p className="text-sm text-gray-600">{accommodation.type}</p>
                        <p className="text-sm text-gray-500">{accommodation.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                      <div>Prix: {accommodation.price}€/nuit</div>
                      <div>Note: {accommodation.rating}/5</div>
                      <div>Chambres: {accommodation.rooms}</div>
                      <div>Max invités: {accommodation.max_guests}</div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {accommodation.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(accommodation)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(accommodation.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationsScreen;
