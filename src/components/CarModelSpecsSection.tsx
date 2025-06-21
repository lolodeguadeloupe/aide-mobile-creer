
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CarModelSpecsSectionProps {
  formData: {
    transmission: string;
    seats: number;
    air_con: boolean;
    price_per_day: number;
    is_active: boolean;
  };
  onInputChange: (field: string, value: any) => void;
}

const CarModelSpecsSection: React.FC<CarModelSpecsSectionProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Select
            value={formData.transmission}
            onValueChange={(value) => onInputChange('transmission', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manuel">Manuel</SelectItem>
              <SelectItem value="Automatique">Automatique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="seats">Nombre de places</Label>
          <Input
            id="seats"
            type="number"
            min="2"
            max="9"
            value={formData.seats}
            onChange={(e) => onInputChange('seats', parseInt(e.target.value) || 5)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="price_per_day">Prix par jour (€)</Label>
        <Input
          id="price_per_day"
          type="number"
          min="0"
          step="1"
          value={formData.price_per_day}
          onChange={(e) => onInputChange('price_per_day', parseInt(e.target.value) || 0)}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="air_con"
          checked={formData.air_con}
          onCheckedChange={(checked) => onInputChange('air_con', checked)}
        />
        <Label htmlFor="air_con">Climatisation</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => onInputChange('is_active', checked)}
        />
        <Label htmlFor="is_active">Modèle actif</Label>
      </div>
    </div>
  );
};

export default CarModelSpecsSection;
