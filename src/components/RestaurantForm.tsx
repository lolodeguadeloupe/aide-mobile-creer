import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRestaurants } from '@/hooks/useRestaurants';
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
}

interface RestaurantFormProps {
  restaurant?: Restaurant;
  onClose: () => void;
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ restaurant, onClose }) => {
  const { createRestaurant, updateRestaurant, isCreating, isUpdating } = useRestaurants();
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    description: '',
    offer: '',
    rating: 0,
    poids: 0,
    icon: 'utensils'
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
        icon: restaurant.icon || 'utensils'
      });
      setMainImage(restaurant.image || '');
      setGalleryImages(restaurant.gallery_images || []);
      setMenus(restaurant.menus || []);
    }
  }, [restaurant]);

  const handleInputChange = (field: string, value: string | number) => {
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
