import React from 'react';
import { Input } from '@/components/ui/input';

interface PartnerBasicInfoSectionProps {
  formData: {
    business_name: string;
    business_type: string;
    description: string | null;
    address: string | null;
    phone: string | null;
    website: string | null;
    type: string | null;
    image: string | null;
    location: string | null;
    rating: number | null;
    offer: string | null;
    icon_name: string | null;
    weight: number | null;
  };
  onInputChange: (field: string, value: string | number) => void;
}

const PartnerBasicInfoSection: React.FC<PartnerBasicInfoSectionProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Informations générales</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de l'entreprise *
          </label>
          <Input
            type="text"
            value={formData.business_name}
            onChange={(e) => onInputChange('business_name', e.target.value)}
            placeholder="Nom de l'entreprise..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type d'entreprise *
          </label>
          <Input
            type="text"
            value={formData.business_type}
            onChange={(e) => onInputChange('business_type', e.target.value)}
            placeholder="Restaurant, Hôtel, Musée..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Décrivez le partenaire..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse
          </label>
          <Input
            type="text"
            value={formData.address || ''}
            onChange={(e) => onInputChange('address', e.target.value)}
            placeholder="Adresse du partenaire..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <Input
            type="text"
            value={formData.phone || ''}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder="Numéro de téléphone..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Web
          </label>
          <Input
            type="text"
            value={formData.website || ''}
            onChange={(e) => onInputChange('website', e.target.value)}
            placeholder="URL du site web..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type (générique)
          </label>
          <Input
            type="text"
            value={formData.type || ''}
            onChange={(e) => onInputChange('type', e.target.value)}
            placeholder="Catégorie générale (ex: Loisir, Restauration)..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Localisation
          </label>
          <Input
            type="text"
            value={formData.location || ''}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder="Paris 1er, Marseille Centre..."
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
            value={formData.rating || 0}
            onChange={(e) => onInputChange('rating', parseFloat(e.target.value) || 0)}
            placeholder="4.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Offre spéciale
          </label>
          <Input
            type="text"
            value={formData.offer || ''}
            onChange={(e) => onInputChange('offer', e.target.value)}
            placeholder="-10% sur présentation de l'application..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de l'icône
          </label>
          <Input
            type="text"
            value={formData.icon_name || ''}
            onChange={(e) => onInputChange('icon_name', e.target.value)}
            placeholder="Nom de l'icône (ex: utensils, map-pin)..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Poids (ordre d'affichage)
          </label>
          <Input
            type="number"
            min="0"
            max="100"
            value={formData.weight || 0}
            onChange={(e) => onInputChange('weight', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerBasicInfoSection;
