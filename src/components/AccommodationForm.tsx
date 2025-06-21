
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateAccommodation, useUpdateAccommodation, Accommodation } from '@/hooks/useAccommodations';
import ImageUploadManager from './ImageUploadManager';

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
    features: [],
    amenities: [],
    rules: [],
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
        features: accommodation.features || [],
        amenities: accommodation.amenities || [],
        rules: accommodation.rules || [],
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
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="mr-3"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Modifier l\'hébergement' : 'Nouvel hébergement'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'hébergement *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Villa Sunset, Appartement Centre..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <Input
                  type="text"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  placeholder="Villa, Appartement, Studio..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation *
                </label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Paris, Marseille, Nice..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Décrivez votre hébergement..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Images</h2>
            <ImageUploadManager
              mainImage={formData.image}
              galleryImages={formData.gallery_images}
              onMainImageChange={(url) => handleInputChange('image', url)}
              onGalleryImagesChange={(urls) => handleInputChange('gallery_images', urls)}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Détails & Prix</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix/nuit (€) *
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note (1-5)
                </label>
                <Input
                  type="number"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chambres *
                </label>
                <Input
                  type="number"
                  value={formData.rooms}
                  onChange={(e) => handleInputChange('rooms', parseInt(e.target.value) || 1)}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salles de bain *
                </label>
                <Input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value) || 1)}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max invités *
                </label>
                <Input
                  type="number"
                  value={formData.max_guests}
                  onChange={(e) => handleInputChange('max_guests', parseInt(e.target.value) || 2)}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Réduction (%)
                </label>
                <Input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => handleInputChange('discount', parseInt(e.target.value) || 0)}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
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
