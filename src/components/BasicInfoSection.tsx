
import React from 'react';
import { Input } from '@/components/ui/input';

interface BasicInfoSectionProps {
  formData: {
    name: string;
    type: string;
    location: string;
    description: string;
  };
  onInputChange: (field: string, value: unknown) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('name', e.target.value)}
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
            onChange={(e) => onInputChange('type', e.target.value)}
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
            onChange={(e) => onInputChange('location', e.target.value)}
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
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Décrivez votre hébergement..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
