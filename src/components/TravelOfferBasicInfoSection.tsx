
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface TravelOfferBasicInfoSectionProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const TravelOfferBasicInfoSection: React.FC<TravelOfferBasicInfoSectionProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre de l'offre *
          </label>
          <Input
            type="text"
            required
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="Ex: Voyage aux Maldives"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lieu de départ *
            </label>
            <Input
              type="text"
              required
              value={formData.departure_location}
              onChange={(e) => onInputChange('departure_location', e.target.value)}
              placeholder="Ex: Paris"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination *
            </label>
            <Input
              type="text"
              required
              value={formData.destination}
              onChange={(e) => onInputChange('destination', e.target.value)}
              placeholder="Ex: Maldives"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <Textarea
            required
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Décrivez votre offre de voyage..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix (€) *
            </label>
            <Input
              type="number"
              required
              min="0"
              value={formData.price}
              onChange={(e) => onInputChange('price', parseFloat(e.target.value) || 0)}
              placeholder="1500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée (jours) *
            </label>
            <Input
              type="number"
              required
              min="1"
              value={formData.duration_days}
              onChange={(e) => onInputChange('duration_days', parseInt(e.target.value) || 1)}
              placeholder="7"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max participants
            </label>
            <Input
              type="number"
              min="1"
              value={formData.max_participants}
              onChange={(e) => onInputChange('max_participants', parseInt(e.target.value) || 20)}
              placeholder="20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de départ
            </label>
            <Input
              type="date"
              value={formData.departure_date}
              onChange={(e) => onInputChange('departure_date', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date de retour
            </label>
            <Input
              type="date"
              value={formData.return_date}
              onChange={(e) => onInputChange('return_date', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelOfferBasicInfoSection;
