
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NightlifeEventsList from './NightlifeEventsList';
import NightlifeEventForm from './NightlifeEventForm';

const NightlifeScreen = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  if (showForm) {
    return (
      <NightlifeEventForm
        event={editingEvent}
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
              Gestion des soirées
            </h1>
          </div>
          <Button onClick={handleAddEvent}>
            <Plus size={20} className="mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <NightlifeEventsList onEditEvent={handleEditEvent} />
      </div>
    </div>
  );
};

export default NightlifeScreen;
