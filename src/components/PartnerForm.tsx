
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCreatePartner, useUpdatePartner, Partner } from '@/hooks/usePartners';
import FormHeader from './FormHeader';
import PartnerBasicInfoSection from './PartnerBasicInfoSection';
import ImagesSection from './ImagesSection';


interface PartnerFormProps {
  partner?: Partner | null;
  onClose: () => void;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ partner, onClose }) => {
  const createPartner = useCreatePartner();
  const updatePartner = useUpdatePartner();
  const isEditing = !!partner;

  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    description: '',
    address: '',
    phone: '',
    website: '',
    type: '',
    image: '',
    location: '',
    rating: 0,
    offer: '',
    icon_name: '',
    gallery_images: [] as string[],
    status: 'en_attente',
    weight: 0,
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        business_name: partner.business_name || '',
        business_type: partner.business_type || '',
        description: partner.description || '',
        address: partner.address || '',
        phone: partner.phone || '',
        website: partner.website || '',
        type: partner.type || '',
        image: partner.image || '',
        location: partner.location || '',
        rating: partner.rating || 0,
        offer: partner.offer || '',
        icon_name: partner.icon_name || '',
        gallery_images: Array.isArray(partner.gallery_images) 
          ? partner.gallery_images 
          : [],
        status: partner.status || 'en_attente',
        weight: partner.weight || 0,
      });
    }
  }, [partner]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      return;
    }
    
    try {
      if (isEditing && partner) {
        await updatePartner.mutateAsync({
          ...formData,
          id: partner.id
        });
      } else {
        await createPartner.mutateAsync(formData);
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

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={isEditing ? 'Modifier le partenaire' : 'Nouveau partenaire'}
        onClose={onClose}
      />

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PartnerBasicInfoSection
            formData={{
              business_name: formData.business_name,
              business_type: formData.business_type,
              description: formData.description,
              address: formData.address,
              phone: formData.phone,
              website: formData.website,
              type: formData.type,
              location: formData.location,
              rating: formData.rating,
              offer: formData.offer,
              icon_name: formData.icon_name,
              weight: formData.weight,
            }}
            onInputChange={handleInputChange}
          />

          

          <ImagesSection
            mainImage={formData.image}
            galleryImages={formData.gallery_images}
            onMainImageChange={(url) => handleInputChange('image', url)}
            onGalleryImagesChange={(urls) => handleInputChange('gallery_images', urls)}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={createPartner.isPending || updatePartner.isPending || !formData.image}
            >
              {createPartner.isPending || updatePartner.isPending
                ? 'Sauvegarde...'
                : isEditing
                ? 'Mettre à jour'
                : 'Créer le partenaire'
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerForm;
