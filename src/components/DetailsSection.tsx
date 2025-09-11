
import React from 'react';
import { Input } from '@/components/ui/input';

interface DetailsSectionProps {
  formData: {
    price: number;
    rating: number;
    rooms: number;
    bathrooms: number;
    max_guests: number;
    discount: number;
  };
  onInputChange: (field: string, value: any) => void;
}

const DetailsSection: React.FC<DetailsSectionProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('price', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => onInputChange('rating', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => onInputChange('rooms', parseInt(e.target.value) || 1)}
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
            onChange={(e) => onInputChange('bathrooms', parseInt(e.target.value) || 1)}
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
            onChange={(e) => onInputChange('max_guests', parseInt(e.target.value) || 2)}
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
            onChange={(e) => onInputChange('discount', parseInt(e.target.value) || 0)}
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
