
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useBonsPlans } from '@/hooks/useBonsPlans';
import FormHeader from './FormHeader';

interface BonPlanFormProps {
  bonPlan?: any;
  onClose: () => void;
}

const BonPlanForm: React.FC<BonPlanFormProps> = ({ bonPlan, onClose }) => {
  const { createBonPlan, updateBonPlan, isCreating, isUpdating } = useBonsPlans();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    icon: '',
    badge: '',
    url: '',
    is_active: true
  });

  useEffect(() => {
    if (bonPlan) {
      setFormData({
        title: bonPlan.title || '',
        description: bonPlan.description || '',
        image: bonPlan.image || '',
        icon: bonPlan.icon || '',
        badge: bonPlan.badge || '',
        url: bonPlan.url || '',
        is_active: bonPlan.is_active !== false
      });
    } else {
      // Pour les nouveaux bons plans, définir une image par défaut
      setFormData(prev => ({
        ...prev,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
      }));
    }
  }, [bonPlan]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (bonPlan) {
        await updateBonPlan({ id: bonPlan.id, ...formData });
      } else {
        await createBonPlan(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving bon plan:', error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={bonPlan ? 'Modifier le bon plan' : 'Ajouter un bon plan'}
        onClose={onClose}
      />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="bg-white rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Titre du bon plan"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Description du bon plan"
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={3}
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <Label htmlFor="image">URL de l'image</Label>
              <Input
                id="image"
                type="text"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Icon */}
            <div>
              <Label htmlFor="icon">Icône (nom Lucide)</Label>
              <Input
                id="icon"
                type="text"
                value={formData.icon}
                onChange={(e) => handleInputChange('icon', e.target.value)}
                placeholder="Ex: gift, percent, star"
              />
            </div>

            {/* Badge */}
            <div>
              <Label htmlFor="badge">Badge (optionnel)</Label>
              <Input
                id="badge"
                type="text"
                value={formData.badge}
                onChange={(e) => handleInputChange('badge', e.target.value)}
                placeholder="Ex: NOUVEAU, -50%, LIMITÉ"
              />
            </div>

            {/* URL */}
            <div>
              <Label htmlFor="url">URL du bon plan</Label>
              <Input
                id="url"
                type="text"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="Ex: /restaurants, https://example.com/deal"
                autoComplete="off"
                spellCheck="false"
                pattern=".*"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange('is_active', checked)}
              />
              <Label htmlFor="is_active">Bon plan actif</Label>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Enregistrement...' : (bonPlan ? 'Modifier' : 'Créer')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BonPlanForm;
