
import React from 'react';
import { Input } from '@/components/ui/input';

interface LoisirBasicInfoSectionProps {
  formData: {
    title: string;
    location: string;
    description: string;
    start_date: string;
    end_date: string;
    max_participants: number;
    current_participants: number;
  };
  onInputChange: (field: string, value: unknown) => void;
}

const LoisirBasicInfoSection: React.FC<LoisirBasicInfoSectionProps> = ({ 
  formData, 
  onInputChange 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre du loisir *
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="Sortie en mer, Randonnée guidée..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu *
          </label>
          <Input
            type="text"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder="Martinique, Fort-de-France..."
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
            placeholder="Décrivez l'activité de loisir..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de début *
            </label>
            <Input
              type="text"
              value={formData.start_date}
              onChange={(e) => onInputChange('start_date', e.target.value)}
              placeholder="15 Mars 2024"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de fin
            </label>
            <Input
              type="text"
              value={formData.end_date}
              onChange={(e) => onInputChange('end_date', e.target.value)}
              placeholder="20 Mars 2024"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Participants maximum *
            </label>
            <Input
              type="number"
              min="1"
              value={formData.max_participants}
              onChange={(e) => onInputChange('max_participants', parseInt(e.target.value) || 0)}
              placeholder="20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Participants actuels
            </label>
            <Input
              type="number"
              min="0"
              value={formData.current_participants}
              onChange={(e) => onInputChange('current_participants', parseInt(e.target.value) || 0)}
              placeholder="5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoisirBasicInfoSection;
