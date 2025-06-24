import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCreateAccommodation, useUpdateAccommodation, Accommodation } from '@/hooks/useAccommodations';
import FormHeader from './FormHeader';
import BasicInfoSection from './BasicInfoSection';
import ImagesSection from './ImagesSection';
import DetailsSection from './DetailsSection';
import AccommodationFeaturesSection from './AccommodationFeaturesSection';

interface Amenity {
  name: string;
  available: boolean;
}

interface AccommodationFormProps {
  accommodation?: Accommodation | null;
  onClose: () => void;
}

const AccommodationForm: React.FC<AccommodationFormProps> = ({ accommodation, onClose }) => {
  const createAccommodation = useCreateAccommodation();
  const updateAccommodation = useUpdateAccommodation();
  const isEditing = !!accommodation;

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    description: '',
    price: 0,
    rating: 0,
    rooms: 1,
    bathrooms: 1,
    max_guests: 2,
    image: '',
    gallery_images: [] as string[],
    features: [] as string[],
    amenities: [] as Amenity[],
    rules: [] as string[],
    discount: 0
  });

  useEffect(() => {
    if (accommodation) {
      setFormData({
        name: accommodation.name || '',
        type: accommodation.type || '',
        location: accommodation.location || '',
        description: accommodation.description || '',
        price: accommodation.price || 0,
        rating: accommodation.rating || 0,
        rooms: accommodation.rooms || 1,
        bathrooms: accommodation.bathrooms || 1,
        max_guests: accommodation.max_guests || 2,
        image: accommodation.image || '',
        gallery_images: Array.isArray(accommodation.gallery_images) 
          ? accommodation.gallery_images 
          : [],
        features: Array.isArray(accommodation.features) 
          ? accommodation.features 
          : [],
        amenities: Array.isArray(accommodation.amenities) 
          ? accommodation.amenities 
          : [],
        rules: Array.isArray(accommodation.rules) 
          ? accommodation.rules 
          : [],
        discount: accommodation.discount || 0
      });
    }
  }, [accommodation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      return;
    }
    
    try {
      if (isEditing && accommodation) {
        await updateAccommodation.mutateAsync({
          ...formData,
          id: accommodation.id
        });
      } else {
        await createAccommodation.mutateAsync(formData);
      }
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      if (error.message.includes('Refresh Token Not Found')) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
  };

  const handleInputChange = (field: string, value: string | number | string[] | Amenity[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={isEditing ? 'Modifier l\'hébergement' : 'Nouvel hébergement'}
        onClose={onClose}
      />

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection
            formData={{
              name: formData.name,
              type: formData.type,
              location: formData.location,
              description: formData.description
            }}
            onInputChange={handleInputChange}
          />

          <ImagesSection
            mainImage={formData.image}
            galleryImages={formData.gallery_images}
            onMainImageChange={(url) => handleInputChange('image', url)}
            onGalleryImagesChange={(urls) => handleInputChange('gallery_images', urls)}
          />

          <DetailsSection
            formData={{
              price: formData.price,
              rating: formData.rating,
              rooms: formData.rooms,
              bathrooms: formData.bathrooms,
              max_guests: formData.max_guests,
              discount: formData.discount
            }}
            onInputChange={handleInputChange}
          />

          <AccommodationFeaturesSection
            features={formData.features}
            amenities={formData.amenities}
            rules={formData.rules}
            onFeaturesChange={(features) => handleInputChange('features', features)}
            onAmenitiesChange={(amenities) => handleInputChange('amenities', amenities)}
            onRulesChange={(rules) => handleInputChange('rules', rules)}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={createAccommodation.isPending || updateAccommodation.isPending || !formData.image}
            >
              {createAccommodation.isPending || updateAccommodation.isPending
                ? 'Sauvegarde...'
                : isEditing
                ? 'Mettre à jour'
                : 'Créer l\'hébergement'
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccommodationForm;
