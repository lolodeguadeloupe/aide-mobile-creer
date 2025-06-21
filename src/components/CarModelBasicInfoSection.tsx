
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CarModelBasicInfoSectionProps {
  formData: {
    name: string;
    category: string;
    image: string;
  };
  onInputChange: (field: string, value: any) => void;
}

const CarModelBasicInfoSection: React.FC<CarModelBasicInfoSectionProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nom du modèle</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="ex: Citroën C3"
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Catégorie</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => onInputChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Économique">Économique</SelectItem>
            <SelectItem value="Compacte">Compacte</SelectItem>
            <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
            <SelectItem value="Standard">Standard</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CarModelBasicInfoSection;
