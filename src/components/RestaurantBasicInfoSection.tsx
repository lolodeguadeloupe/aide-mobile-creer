import React from 'react';
import { Input } from '@/components/ui/input';

interface RestaurantBasicInfoSectionProps {
  formData: {
    name: string;
    type: string;
    location: string;
    description: string;
    offer: string;
    rating: number;
    icon: string;
    poids: number;
  };
  onInputChange: (field: string, value: any) => void;
}

const RestaurantBasicInfoSection: React.FC<RestaurantBasicInfoSectionProps> = ({ 
  formData, 
  onInputChange 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du restaurant *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Le Petit Bistrot, Chez Marie..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de cuisine *
          </label>
          <Input
            type="text"
            value={formData.type}
            onChange={(e) => onInputChange('type', e.target.value)}
            placeholder="Française, Italienne, Asiatique..."
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
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder="Paris 1er, Marseille Centre..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Décrivez l'ambiance et les spécialités du restaurant..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Offre spéciale
          </label>
          <Input
            type="text"
            value={formData.offer}
            onChange={(e) => onInputChange('offer', e.target.value)}
            placeholder="Menu du jour à 25€, -20% sur les desserts..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note (sur 5)
          </label>
          <Input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={(e) => onInputChange('rating', parseFloat(e.target.value) || 0)}
            placeholder="4.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poids (ordre d'affichage)
          </label>
          <Input
            type="number"
            min="0"
            value={formData.poids}
            onChange={(e) => onInputChange('poids', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantBasicInfoSection;
