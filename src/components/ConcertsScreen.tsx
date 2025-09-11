
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useConcerts } from '@/hooks/useConcerts';
import ConcertsList from './ConcertsList';
import ConcertForm from './ConcertForm';

const ConcertsScreen = () => {
  const navigate = useNavigate();
  const { data: concerts } = useConcerts();
  const [showForm, setShowForm] = useState(false);
  const [editingConcert, setEditingConcert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter concerts based on search term
  const filteredConcerts = useMemo(() => {
    if (!concerts) return [];
    
    if (!searchTerm.trim()) {
      return concerts;
    }

    const searchLower = searchTerm.toLowerCase();
    return concerts.filter(concert => 
      concert.name?.toLowerCase().includes(searchLower) ||
      concert.artist?.toLowerCase().includes(searchLower) ||
      concert.genre?.toLowerCase().includes(searchLower) ||
      concert.location?.toLowerCase().includes(searchLower) ||
      concert.description?.toLowerCase().includes(searchLower)
    );
  }, [concerts, searchTerm]);

  const handleAddConcert = () => {
    setEditingConcert(null);
    setShowForm(true);
  };

  const handleEditConcert = (concert) => {
    setEditingConcert(concert);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingConcert(null);
  };

  if (showForm) {
    return (
      <ConcertForm
        concert={editingConcert}
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
              Gestion des concerts
            </h1>
          </div>
          <Button onClick={handleAddConcert}>
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
            placeholder="Rechercher par nom, artiste, genre, lieu ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {filteredConcerts?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'Aucun concert trouvé pour cette recherche' : 'Aucun concert trouvé'}
            </div>
            {!searchTerm && (
              <Button
                onClick={handleAddConcert}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Créer le premier concert
              </Button>
            )}
          </div>
        ) : (
          <ConcertsList 
            onEditConcert={handleEditConcert} 
            concerts={filteredConcerts}
          />
        )}
      </div>
    </div>
  );
};

export default ConcertsScreen;
