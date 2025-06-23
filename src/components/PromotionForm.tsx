
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { usePromotions } from '@/hooks/usePromotions';
import FormHeader from './FormHeader';
import PromotionBasicInfoSection from './PromotionBasicInfoSection';

interface PromotionFormProps {
  promotion?: any;
  onClose: () => void;
}

const PromotionForm: React.FC<PromotionFormProps> = ({ promotion, onClose }) => {
  const { createPromotion, updatePromotion, isCreating, isUpdating } = usePromotions();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    badge: '',
    cta_text: '',
    cta_url: '',
    sort_order: 0,
    is_active: true
  });

  useEffect(() => {
    if (promotion) {
      setFormData({
        title: promotion.title || '',
        description: promotion.description || '',
        image: promotion.image || '',
        badge: promotion.badge || '',
        cta_text: promotion.cta_text || '',
        cta_url: promotion.cta_url || '',
        sort_order: promotion.sort_order || 0,
        is_active: promotion.is_active !== false
      });
    } else {
      // Pour les nouvelles promotions, définir une image par défaut
      setFormData(prev => ({
        ...prev,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
      }));
    }
  }, [promotion]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (promotion) {
        await updatePromotion({ id: promotion.id, ...formData });
      } else {
        await createPromotion(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving promotion:', error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={promotion ? 'Modifier la promotion' : 'Ajouter une promotion'}
        onClose={onClose}
      />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <PromotionBasicInfoSection
          formData={formData}
          onInputChange={handleInputChange}
        />
        
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
            {isLoading ? 'Enregistrement...' : (promotion ? 'Modifier' : 'Créer')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
