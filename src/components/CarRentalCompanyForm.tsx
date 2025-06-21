
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCarRentalCompanies } from '@/hooks/useCarRentalCompanies';
import ImageUploadManager from './ImageUploadManager';

interface CarRentalCompanyFormProps {
  company?: any;
  onClose: () => void;
}

const CarRentalCompanyForm: React.FC<CarRentalCompanyFormProps> = ({ company, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    description: '',
    offer: '',
    rating: 0,
    icon_name: 'car',
  });

  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const { createCompany, updateCompany, isCreating, isUpdating } = useCarRentalCompanies();

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        type: company.type || '',
        location: company.location || '',
        description: company.description || '',
        offer: company.offer || '',
        rating: company.rating || 0,
        icon_name: company.icon_name || 'car',
      });
      setMainImage(company.image || '');
      setGalleryImages(company.gallery_images || []);
    }
  }, [company]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submissionData = {
        ...formData,
        image: mainImage,
        gallery_images: galleryImages,
      };

      if (company) {
        await updateCompany({ id: company.id, ...submissionData });
      } else {
        await createCompany(submissionData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving company:', error);
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
          {company ? 'Modifier la compagnie' : 'Nouvelle compagnie de location'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom de la compagnie</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="ex: Europcar Martinique"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                type="text"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                placeholder="ex: location de voitures"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Lieu</Label>
              <Input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="ex: Fort-de-France"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Décrivez la compagnie..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="offer">Offre spéciale</Label>
            <Input
              id="offer"
              type="text"
              value={formData.offer}
              onChange={(e) => handleInputChange('offer', e.target.value)}
              placeholder="ex: -15% sur la première location"
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

          {/* Image Management Section */}
          <ImageUploadManager
            mainImage={mainImage}
            galleryImages={galleryImages}
            onMainImageChange={setMainImage}
            onGalleryImagesChange={setGalleryImages}
          />

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

export default CarRentalCompanyForm;
