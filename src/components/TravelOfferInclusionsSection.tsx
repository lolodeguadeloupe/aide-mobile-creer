
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface TravelOfferInclusionsSectionProps {
  inclusions: string[];
  exclusions: string[];
  onInclusionsChange: (inclusions: string[]) => void;
  onExclusionsChange: (exclusions: string[]) => void;
}

const TravelOfferInclusionsSection: React.FC<TravelOfferInclusionsSectionProps> = ({
  inclusions,
  exclusions,
  onInclusionsChange,
  onExclusionsChange,
}) => {
  const addInclusion = () => {
    onInclusionsChange([...inclusions, '']);
  };

  const removeInclusion = (index: number) => {
    const newInclusions = inclusions.filter((_, i) => i !== index);
    onInclusionsChange(newInclusions);
  };

  const updateInclusion = (index: number, value: string) => {
    const newInclusions = [...inclusions];
    newInclusions[index] = value;
    onInclusionsChange(newInclusions);
  };

  const addExclusion = () => {
    onExclusionsChange([...exclusions, '']);
  };

  const removeExclusion = (index: number) => {
    const newExclusions = exclusions.filter((_, i) => i !== index);
    onExclusionsChange(newExclusions);
  };

  const updateExclusion = (index: number, value: string) => {
    const newExclusions = [...exclusions];
    newExclusions[index] = value;
    onExclusionsChange(newExclusions);
  };

  return (
    <div className="bg-white rounded-lg p-4 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Inclusions & Exclusions</h3>
      
      {/* Inclusions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-green-700">✓ Inclus dans le voyage</h4>
          <Button
            type="button"
            onClick={addInclusion}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Ajouter
          </Button>
        </div>
        
        {inclusions.length === 0 && (
          <p className="text-gray-500 text-sm italic">Aucune inclusion ajoutée</p>
        )}
        
        <div className="space-y-2">
          {inclusions.map((inclusion, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-green-600 font-medium">✓</span>
              <Input
                value={inclusion}
                onChange={(e) => updateInclusion(index, e.target.value)}
                placeholder="Ex: Vol aller-retour, Pension complète..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => removeInclusion(index)}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-red-700">✗ Non inclus</h4>
          <Button
            type="button"
            onClick={addExclusion}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Ajouter
          </Button>
        </div>
        
        {exclusions.length === 0 && (
          <p className="text-gray-500 text-sm italic">Aucune exclusion ajoutée</p>
        )}
        
        <div className="space-y-2">
          {exclusions.map((exclusion, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-red-600 font-medium">✗</span>
              <Input
                value={exclusion}
                onChange={(e) => updateExclusion(index, e.target.value)}
                placeholder="Ex: Boissons alcoolisées, Excursions optionnelles..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => removeExclusion(index)}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelOfferInclusionsSection;
