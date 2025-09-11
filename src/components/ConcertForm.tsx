
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useConcerts } from '@/hooks/useConcerts';
import FormHeader from './FormHeader';
import type { Tables } from "@/integrations/supabase/types";

type Concert = Tables<'concerts'>;
import ConcertBasicInfoSection from './ConcertBasicInfoSection';
import ConcertImagesSection from './ConcertImagesSection';

interface ConcertFormProps {
  concert?: Concert;
  onClose: () => void;
}

const ConcertForm: React.FC<ConcertFormProps> = ({ concert, onClose }) => {
  const { createConcert, updateConcert, isCreating, isUpdating } = useConcerts();
  
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    genre: '',
    location: '',
    date: '',
    time: '',
    description: '',
    offer: '',
    price: 0,
    rating: 0,
    icon: 'Music'
  });
  
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (concert) {
      setFormData({
        name: concert.name || '',
        artist: concert.artist || '',
        genre: concert.genre || '',
        location: concert.location || '',
        date: concert.date || '',
        time: concert.time || '',
        description: concert.description || '',
        offer: concert.offer || '',
        price: concert.price || 0,
        rating: concert.rating || 0,
        icon: concert.icon || 'Music'
      });
      setMainImage(concert.image || '');
      setGalleryImages(concert.gallery_images || []);
    }
  }, [concert]);

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const concertData = {
      ...formData,
      image: mainImage,
      gallery_images: galleryImages
    };

    try {
      if (concert) {
        await updateConcert({ id: concert.id, ...concertData });
      } else {
        await createConcert(concertData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving concert:', error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={concert ? 'Modifier le concert' : 'Ajouter un concert'}
        onClose={onClose}
      />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <ConcertBasicInfoSection
          formData={formData}
          onInputChange={handleInputChange}
        />
        
        <ConcertImagesSection
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
            {isLoading ? 'Enregistrement...' : (concert ? 'Modifier' : 'Créer')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConcertForm;
