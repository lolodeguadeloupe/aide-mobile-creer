
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoisirsList from './LoisirsList';
import LoisirForm from './LoisirForm';

const LoisirsScreen = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingLoisir, setEditingLoisir] = useState(null);

  const handleAddLoisir = () => {
    setEditingLoisir(null);
    setShowForm(true);
  };

  const handleEditLoisir = (loisir) => {
    setEditingLoisir(loisir);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingLoisir(null);
  };

  if (showForm) {
    return (
      <LoisirForm
        loisir={editingLoisir}
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
              Gestion des loisirs
            </h1>
          </div>
          <Button onClick={handleAddLoisir}>
            <Plus size={20} className="mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <LoisirsList onEditLoisir={handleEditLoisir} />
      </div>
    </div>
  );
};

export default LoisirsScreen;
