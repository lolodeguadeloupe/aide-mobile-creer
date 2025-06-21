
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CarModelCompanySectionProps {
  formData: {
    company_id: number;
  };
  companies: Array<{ id: number; name: string }> | undefined;
  onInputChange: (field: string, value: any) => void;
}

const CarModelCompanySection: React.FC<CarModelCompanySectionProps> = ({
  formData,
  companies,
  onInputChange
}) => {
  return (
    <div>
      <Label htmlFor="company_id">Compagnie</Label>
      <Select
        value={formData.company_id.toString()}
        onValueChange={(value) => onInputChange('company_id', parseInt(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une compagnie" />
        </SelectTrigger>
        <SelectContent>
          {companies?.map((company) => (
            <SelectItem key={company.id} value={company.id.toString()}>
              {company.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CarModelCompanySection;
