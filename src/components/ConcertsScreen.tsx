
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConcertsList from './ConcertsList';
import ConcertForm from './ConcertForm';

const ConcertsScreen = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingConcert, setEditingConcert] = useState(null);

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

      {/* Content */}
      <div className="p-4">
        <ConcertsList onEditConcert={handleEditConcert} />
      </div>
    </div>
  );
};

export default ConcertsScreen;
