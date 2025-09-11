
import React from 'react';
import { Input } from '@/components/ui/input';

interface NightlifeEventBasicInfoSectionProps {
  formData: {
    name: string;
    type: string;
    venue: string;
    date: string;
    time: string;
    description: string;
    offer: string;
    price: number;
    rating: number;
    features: string[];
  };
  onInputChange: (field: string, value: unknown) => void;
}

const NightlifeEventBasicInfoSection: React.FC<NightlifeEventBasicInfoSectionProps> = ({ 
  formData, 
  onInputChange 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de la soirée *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Soirée Salsa, Nuit Électro..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de soirée *
          </label>
          <Input
            type="text"
            value={formData.type}
            onChange={(e) => onInputChange('type', e.target.value)}
            placeholder="Salsa, Électro, Jazz, Karaoké..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu *
          </label>
          <Input
            type="text"
            value={formData.venue}
            onChange={(e) => onInputChange('venue', e.target.value)}
            placeholder="Club Paradis, Bar Le Central..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <Input
              type="text"
              value={formData.date}
              onChange={(e) => onInputChange('date', e.target.value)}
              placeholder="15 Juillet 2024"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heure *
            </label>
            <Input
              type="text"
              value={formData.time}
              onChange={(e) => onInputChange('time', e.target.value)}
              placeholder="22:00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Décrivez l'ambiance, la musique, les animations..."
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
            placeholder="Happy hour, entrée gratuite avant 23h..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix d'entrée (€)
            </label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => onInputChange('price', parseFloat(e.target.value) || 0)}
              placeholder="15.00"
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
        </div>
      </div>
    </div>
  );
};

export default NightlifeEventBasicInfoSection;
