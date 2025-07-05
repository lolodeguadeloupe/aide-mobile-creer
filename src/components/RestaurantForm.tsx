import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRestaurants } from '@/hooks/useRestaurants';
import { usePartners, Partner } from '@/hooks/usePartners';
import FormHeader from './FormHeader';
import RestaurantBasicInfoSection from './RestaurantBasicInfoSection';
import RestaurantImagesSection from './RestaurantImagesSection';
import RestaurantMenusSection from './RestaurantMenusSection';

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  name: string;
  type: string;
  location: string;
  description: string;
  offer: string;
  rating: number;
  poids: number;
  icon: string;
  image?: string;
  gallery_images?: string[];
  id?: string | number;
  menus?: MenuCategory[];
  partner_id?: number | null;
}

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onClose: () => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ restaurant, onClose }) => {
  const { createRestaurant, updateRestaurant, isCreating, isUpdating } = useRestaurants();
  const { data: partners, isLoading: partnersLoading } = usePartners();
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    description: '',
    offer: '',
    rating: 0,
    poids: 0,
    icon: 'utensils',
    partner_id: null as number | null
  });
  
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [menus, setMenus] = useState<MenuCategory[]>(restaurant?.menus || []);

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || '',
        type: restaurant.type || '',
        location: restaurant.location || '',
        description: restaurant.description || '',
        offer: restaurant.offer || '',
        rating: restaurant.rating || 0,
        poids: restaurant.poids || 0,
        icon: restaurant.icon || 'utensils',
        partner_id: restaurant.partner_id || null
      });
      setMainImage(restaurant.image || '');
      setGalleryImages(restaurant.gallery_images || []);
      setMenus(restaurant.menus || []);
    }
  }, [restaurant]);

  const handleInputChange = (field: string, value: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const restaurantData = {
      ...formData,
      image: mainImage,
      gallery_images: galleryImages,
      menus
    };

    try {
      if (restaurant) {
        await updateRestaurant({ id: restaurant.id, ...restaurantData });
      } else {
        await createRestaurant(restaurantData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={restaurant ? 'Modifier le restaurant' : 'Ajouter un restaurant'}
        onClose={onClose}
      />
      
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <RestaurantBasicInfoSection
          formData={formData}
          onInputChange={handleInputChange}
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Partenaire
          </label>
          <select
            value={formData.partner_id || ''}
            onChange={e => handleInputChange('partner_id', e.target.value ? Number(e.target.value) : null)}
            className="input w-full"
            required
            disabled={partnersLoading}
          >
            <option value="">Sélectionner un partenaire</option>
            {partners?.map((partner: Partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.business_name}
              </option>
            ))}
          </select>
        </div>
        
        <RestaurantImagesSection
          mainImage={mainImage}
          galleryImages={galleryImages}
          onMainImageChange={setMainImage}
          onGalleryImagesChange={setGalleryImages}
        />
        
        <RestaurantMenusSection
          menus={menus}
          setMenus={setMenus}
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
            {isLoading ? 'Enregistrement...' : (restaurant ? 'Modifier' : 'Créer')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;
