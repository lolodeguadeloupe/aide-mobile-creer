
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCarModels } from '@/hooks/useCarModels';
import { useCarRentalCompanies } from '@/hooks/useCarRentalCompanies';
import CarModelBasicInfoSection from './CarModelBasicInfoSection';
import CarModelSpecsSection from './CarModelSpecsSection';
import CarModelCompanySection from './CarModelCompanySection';
import CarModelFormActions from './CarModelFormActions';

interface CarRentalFormProps {
  carRental?: any;
  onClose: () => void;
}

const CarRentalForm: React.FC<CarRentalFormProps> = ({ carRental, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    transmission: 'Manuel',
    seats: 5,
    air_con: true,
    price_per_day: 0,
    company_id: 0,
    image: '',
    is_active: true,
  });

  const { createModel, updateModel, isCreating, isUpdating } = useCarModels();
  const { data: companies } = useCarRentalCompanies();

  useEffect(() => {
    if (carRental) {
      setFormData({
        name: carRental.name || '',
        category: carRental.category || '',
        transmission: carRental.transmission || 'Manuel',
        seats: carRental.seats || 5,
        air_con: carRental.air_con ?? true,
        price_per_day: carRental.price_per_day || 0,
        company_id: carRental.company_id || 0,
        image: carRental.image || '',
        is_active: carRental.is_active ?? true,
      });
    }
  }, [carRental]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (carRental) {
        await updateModel({ id: carRental.id, ...formData });
      } else {
        await createModel(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving car model:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {carRental ? 'Modifier le modèle de voiture' : 'Nouveau modèle de voiture'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CarModelBasicInfoSection
            formData={{
              name: formData.name,
              category: formData.category,
              image: formData.image
            }}
            onInputChange={handleInputChange}
          />

          <CarModelCompanySection
            formData={{ company_id: formData.company_id }}
            companies={companies}
            onInputChange={handleInputChange}
          />

          <CarModelSpecsSection
            formData={{
              transmission: formData.transmission,
              seats: formData.seats,
              air_con: formData.air_con,
              price_per_day: formData.price_per_day,
              is_active: formData.is_active
            }}
            onInputChange={handleInputChange}
          />

          <CarModelFormActions
            onClose={onClose}
            isCreating={isCreating}
            isUpdating={isUpdating}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default CarRentalForm;
