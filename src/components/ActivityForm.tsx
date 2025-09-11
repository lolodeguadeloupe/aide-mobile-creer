
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useActivities } from '@/hooks/useActivities';

interface ActivityFormProps {
  activity?: any;
  onClose: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ activity, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    icon_name: '',
    rating: 0,
    is_active: true,
  });

  const { createActivity, updateActivity, isCreating, isUpdating } = useActivities();

  useEffect(() => {
    if (activity) {
      setFormData({
        name: activity.name || '',
        path: activity.path || '',
        icon_name: activity.icon_name || '',
        rating: activity.rating || 0,
        is_active: activity.is_active ?? true,
      });
    }
  }, [activity]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (activity) {
        await updateActivity({ id: activity.id, ...formData });
      } else {
        await createActivity(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {activity ? 'Modifier l\'activité' : 'Nouvelle activité'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom de l'activité</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="path">Chemin</Label>
            <Input
              id="path"
              type="text"
              value={formData.path}
              onChange={(e) => handleInputChange('path', e.target.value)}
              placeholder="/example-path"
              required
            />
          </div>

          <div>
            <Label htmlFor="icon_name">Nom de l'icône</Label>
            <Input
              id="icon_name"
              type="text"
              value={formData.icon_name}
              onChange={(e) => handleInputChange('icon_name', e.target.value)}
              placeholder="ex: Star, Heart, etc."
              required
            />
          </div>

          <div>
            <Label htmlFor="rating">Note (0-5)</Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleInputChange('is_active', checked)}
            />
            <Label htmlFor="is_active">Activité active</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
