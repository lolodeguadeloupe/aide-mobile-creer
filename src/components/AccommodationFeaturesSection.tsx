
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';

interface AccommodationFeaturesSectionProps {
  features: string[];
  amenities: string[];
  rules: string[];
  onFeaturesChange: (features: string[]) => void;
  onAmenitiesChange: (amenities: string[]) => void;
  onRulesChange: (rules: string[]) => void;
}

const AccommodationFeaturesSection: React.FC<AccommodationFeaturesSectionProps> = ({
  features,
  amenities,
  rules,
  onFeaturesChange,
  onAmenitiesChange,
  onRulesChange
}) => {
  const addFeature = () => {
    onFeaturesChange([...features, '']);
  };

  const removeFeature = (index: number) => {
    onFeaturesChange(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    onFeaturesChange(updatedFeatures);
  };

  const addAmenity = () => {
    onAmenitiesChange([...amenities, '']);
  };

  const removeAmenity = (index: number) => {
    onAmenitiesChange(amenities.filter((_, i) => i !== index));
  };

  const updateAmenity = (index: number, value: string) => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index] = value;
    onAmenitiesChange(updatedAmenities);
  };

  const addRule = () => {
    onRulesChange([...rules, '']);
  };

  const removeRule = (index: number) => {
    onRulesChange(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, value: string) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    onRulesChange(updatedRules);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Équipements et règlement</h2>
      
      {/* Équipements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-gray-700">Équipements</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder="Ex: WiFi gratuit, Climatisation, TV écran plat..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeFeature(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {features.length === 0 && (
            <p className="text-sm text-gray-500 italic">Aucun équipement ajouté</p>
          )}
        </div>
      </div>

      {/* Commodités */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-gray-700">Commodités</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAmenity}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={amenity}
                onChange={(e) => updateAmenity(index, e.target.value)}
                placeholder="Ex: Piscine, Parking gratuit, Petit-déjeuner inclus..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeAmenity(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {amenities.length === 0 && (
            <p className="text-sm text-gray-500 italic">Aucune commodité ajoutée</p>
          )}
        </div>
      </div>

      {/* Règlement intérieur */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-gray-700">Règlement intérieur</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRule}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-start gap-2">
              <Textarea
                value={rule}
                onChange={(e) => updateRule(index, e.target.value)}
                placeholder="Ex: Arrivée après 15h, Départ avant 11h, Animaux non autorisés..."
                className="flex-1 min-h-[60px]"
                rows={2}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeRule(index)}
                className="text-red-600 hover:text-red-700 mt-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {rules.length === 0 && (
            <p className="text-sm text-gray-500 italic">Aucune règle ajoutée</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccommodationFeaturesSection;
