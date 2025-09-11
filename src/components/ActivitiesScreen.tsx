
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActivitiesList from './ActivitiesList';
import ActivityForm from './ActivityForm';
import type { Tables } from '@/integrations/supabase/types';

type Activity = Tables<'activities'>;

const ActivitiesScreen = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingActivity(null);
  };

  const handleNewActivity = () => {
    setEditingActivity(null);
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
        <ActivityForm
          activity={editingActivity}
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
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Activités</h1>
          </div>
          <Button onClick={handleNewActivity}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle activité
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <ActivitiesList onEditActivity={handleEditActivity} />
      </div>
    </div>
  );
};

export default ActivitiesScreen;
