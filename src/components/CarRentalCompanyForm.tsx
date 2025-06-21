
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCarRentalCompanies } from '@/hooks/useCarRentalCompanies';
import { X, Plus } from 'lucide-react';

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
    image: '',
    icon_name: 'car',
    gallery_images: [] as string[],
  });

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
        image: company.image || '',
        icon_name: company.icon_name || 'car',
        gallery_images: company.gallery_images || [],
      });
    }
  }, [company]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submissionData = {
        ...formData,
        gallery_images: JSON.stringify(formData.gallery_images),
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

  const addGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      gallery_images: [...prev.gallery_images, '']
    }));
  };

  const updateGalleryImage = (index: number, url: string) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.map((img, i) => i === index ? url : img)
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index)
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

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="image">URL de l'image principale</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Gallery Images Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Images de galerie</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addGalleryImage}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter une image
              </Button>
            </div>
            
            {formData.gallery_images.length > 0 && (
              <div className="space-y-2">
                {formData.gallery_images.map((imageUrl, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => updateGalleryImage(index, e.target.value)}
                      placeholder={`URL de l'image ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeGalleryImage(index)}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
