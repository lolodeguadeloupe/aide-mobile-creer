
import React, { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAccommodations, useDeleteAccommodation, Accommodation } from '@/hooks/useAccommodations';
import AccommodationForm from './AccommodationForm';

const AccommodationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { data: accommodations, isLoading, error } = useAccommodations();
  const deleteAccommodation = useDeleteAccommodation();
  const [showForm, setShowForm] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<Accommodation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter accommodations based on search term
  const filteredAccommodations = useMemo(() => {
    if (!accommodations) return [];
    
    if (!searchTerm.trim()) {
      return accommodations;
    }

    const searchLower = searchTerm.toLowerCase();
    return accommodations.filter(accommodation => 
      accommodation.name?.toLowerCase().includes(searchLower) ||
      accommodation.type?.toLowerCase().includes(searchLower) ||
      accommodation.location?.toLowerCase().includes(searchLower) ||
      accommodation.description?.toLowerCase().includes(searchLower)
    );
  }, [accommodations, searchTerm]);

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
            <h1 className="text-2xl font-bold text-gray-900">Hébergements</h1>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
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
        {filteredAccommodations?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'Aucun hébergement trouvé pour cette recherche' : 'Aucun hébergement trouvé'}
            </div>
            {!searchTerm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Créer le premier hébergement
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAccommodations?.map((accommodation) => (
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
