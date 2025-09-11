
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Tables } from '@/integrations/supabase/types';

type Partner = Tables<'partners'>;

interface CarModelCompanySectionProps {
  formData: {
    company_id: string;
  };
  companies: Partner[];
  onInputChange: (field: string, value: unknown) => void;
}

const CarModelCompanySection: React.FC<CarModelCompanySectionProps> = ({
  formData,
  companies,
  onInputChange
}) => {
  return (
    <div>
      <Label htmlFor="company_id">Compagnie de location</Label>
      <Select
        value={formData.company_id}
        onValueChange={(value) => onInputChange('company_id', value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une compagnie" />
        </SelectTrigger>
        <SelectContent>
          {companies?.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {company.business_name} - {company.location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CarModelCompanySection;
