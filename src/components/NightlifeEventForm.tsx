
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNightlifeEvents } from '@/hooks/useNightlifeEvents';
import FormHeader from './FormHeader';
import type { Tables } from "@/integrations/supabase/types";

type NightlifeEvent = Tables<'nightlife_events'>;
import NightlifeEventBasicInfoSection from './NightlifeEventBasicInfoSection';
import NightlifeEventImagesSection from './NightlifeEventImagesSection';

interface NightlifeEventFormProps {
  event?: NightlifeEvent;
  onClose: () => void;
}

const NightlifeEventForm: React.FC<NightlifeEventFormProps> = ({ event, onClose }) => {
  const { createEvent, updateEvent, isCreating, isUpdating } = useNightlifeEvents();
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    venue: '',
    date: '',
    time: '',
    description: '',
    offer: '',
    price: 0,
    rating: 0,
    features: []
  });
  
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        type: event.type || '',
        venue: event.venue || '',
        date: event.date || '',
        time: event.time || '',
        description: event.description || '',
        offer: event.offer || '',
        price: event.price || 0,
        rating: event.rating || 0,
        features: event.features || []
      });
      setMainImage(event.image || '');
      setGalleryImages(event.gallery_images || []);
    }
  }, [event]);

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      image: mainImage,
      gallery_images: galleryImages
    };

    try {
      if (event) {
        await updateEvent({ id: event.id, ...eventData });
      } else {
        await createEvent(eventData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={event ? 'Modifier la soirée' : 'Ajouter une soirée'}
        onClose={onClose}
      />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <NightlifeEventBasicInfoSection
          formData={formData}
          onInputChange={handleInputChange}
        />
        
        <NightlifeEventImagesSection
          mainImage={mainImage}
          galleryImages={galleryImages}
          onMainImageChange={setMainImage}
          onGalleryImagesChange={setGalleryImages}
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
            {isLoading ? 'Enregistrement...' : (event ? 'Modifier' : 'Créer')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NightlifeEventForm;
