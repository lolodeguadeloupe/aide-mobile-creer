
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTravelOffers } from '@/hooks/useTravelOffers';
import FormHeader from './FormHeader';
import TravelOfferBasicInfoSection from './TravelOfferBasicInfoSection';
import TravelOfferImagesSection from './TravelOfferImagesSection';

interface TravelOfferFormProps {
  travelOffer?: any;
  onClose: () => void;
}

const TravelOfferForm: React.FC<TravelOfferFormProps> = ({ travelOffer, onClose }) => {
  const { createTravelOffer, updateTravelOffer, isCreating, isUpdating } = useTravelOffers();
  
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    departure_location: '',
    description: '',
    price: 0,
    duration_days: 1,
    departure_date: '',
    return_date: '',
    max_participants: 20,
    current_participants: 0,
    inclusions: [],
    exclusions: [],
    is_active: true
  });
  
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (travelOffer) {
      setFormData({
        title: travelOffer.title || '',
        destination: travelOffer.destination || '',
        departure_location: travelOffer.departure_location || '',
        description: travelOffer.description || '',
        price: travelOffer.price || 0,
        duration_days: travelOffer.duration_days || 1,
        departure_date: travelOffer.departure_date || '',
        return_date: travelOffer.return_date || '',
        max_participants: travelOffer.max_participants || 20,
        current_participants: travelOffer.current_participants || 0,
        inclusions: travelOffer.inclusions || [],
        exclusions: travelOffer.exclusions || [],
        is_active: travelOffer.is_active !== false
      });
      setMainImage(travelOffer.image || '');
      setGalleryImages(travelOffer.gallery_images || []);
    }
  }, [travelOffer]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const travelOfferData = {
      ...formData,
      image: mainImage,
      gallery_images: galleryImages
    };

    try {
      if (travelOffer) {
        await updateTravelOffer({ id: travelOffer.id, ...travelOfferData });
      } else {
        await createTravelOffer(travelOfferData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving travel offer:', error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={travelOffer ? 'Modifier l\'offre de voyage' : 'Ajouter une offre de voyage'}
        onClose={onClose}
      />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <TravelOfferBasicInfoSection
          formData={formData}
          onInputChange={handleInputChange}
        />
        
        <TravelOfferImagesSection
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
            {isLoading ? 'Enregistrement...' : (travelOffer ? 'Modifier' : 'Créer')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TravelOfferForm;
