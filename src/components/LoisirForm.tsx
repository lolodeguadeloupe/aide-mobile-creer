
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLoisirs } from '@/hooks/useLoisirs';
import FormHeader from './FormHeader';
import LoisirBasicInfoSection from './LoisirBasicInfoSection';
import LoisirImagesSection from './LoisirImagesSection';

interface LoisirFormProps {
  loisir?: any;
  onClose: () => void;
}

const LoisirForm: React.FC<LoisirFormProps> = ({ loisir, onClose }) => {
  const { createLoisir, updateLoisir, isCreating, isUpdating } = useLoisirs();
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    start_date: '',
    end_date: '',
    max_participants: 0,
    current_participants: 0
  });
  
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (loisir) {
      setFormData({
        title: loisir.title || '',
        location: loisir.location || '',
        description: loisir.description || '',
        start_date: loisir.start_date || '',
        end_date: loisir.end_date || '',
        max_participants: loisir.max_participants || 0,
        current_participants: loisir.current_participants || 0
      });
      setMainImage(loisir.image || '');
      setGalleryImages(loisir.gallery_images || []);
    }
  }, [loisir]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const loisirData = {
      ...formData,
      image: mainImage,
      gallery_images: galleryImages
    };

    try {
      if (loisir) {
        await updateLoisir({ id: loisir.id, ...loisirData });
      } else {
        await createLoisir(loisirData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving loisir:', error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={loisir ? 'Modifier le loisir' : 'Ajouter un loisir'}
        onClose={onClose}
      />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <LoisirBasicInfoSection
          formData={formData}
          onInputChange={handleInputChange}
        />
        
        <LoisirImagesSection
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
            {isLoading ? 'Enregistrement...' : (loisir ? 'Modifier' : 'Créer')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoisirForm;
