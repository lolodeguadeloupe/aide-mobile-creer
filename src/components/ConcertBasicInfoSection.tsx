
import React from 'react';
import { Input } from '@/components/ui/input';

interface ConcertBasicInfoSectionProps {
  formData: {
    name: string;
    artist: string;
    genre: string;
    location: string;
    date: string;
    time: string;
    description: string;
    offer: string;
    price: number;
    rating: number;
    icon: string;
  };
  onInputChange: (field: string, value: unknown) => void;
}

const ConcertBasicInfoSection: React.FC<ConcertBasicInfoSectionProps> = ({ 
  formData, 
  onInputChange 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du concert *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Festival Rock Summer, Jazz Night..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Artiste *
          </label>
          <Input
            type="text"
            value={formData.artist}
            onChange={(e) => onInputChange('artist', e.target.value)}
            placeholder="The Beatles, Mozart Orchestra..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre musical *
          </label>
          <Input
            type="text"
            value={formData.genre}
            onChange={(e) => onInputChange('genre', e.target.value)}
            placeholder="Rock, Jazz, Classique, Pop..."
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
            placeholder="Stade de France, Opéra de Paris..."
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
              placeholder="20:00"
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
            placeholder="Décrivez l'événement, l'ambiance, les artistes..."
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
            placeholder="Réduction early bird, pack famille..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix (€)
            </label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => onInputChange('price', parseFloat(e.target.value) || 0)}
              placeholder="50.00"
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

export default ConcertBasicInfoSection;
