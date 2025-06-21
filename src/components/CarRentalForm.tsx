
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useCarRentals } from '@/hooks/useCarRentals';

interface CarRentalFormProps {
  carRental?: any;
  onClose: () => void;
}

const CarRentalForm: React.FC<CarRentalFormProps> = ({ carRental, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price_per_day: 0,
    description: '',
    is_available: true,
  });

  const { createCarRental, updateCarRental, isCreating, isUpdating } = useCarRentals();

  useEffect(() => {
    if (carRental) {
      setFormData({
        name: carRental.name || '',
        brand: carRental.brand || '',
        model: carRental.model || '',
        year: carRental.year || new Date().getFullYear(),
        price_per_day: carRental.price_per_day || 0,
        description: carRental.description || '',
        is_available: carRental.is_available ?? true,
      });
    }
  }, [carRental]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (carRental) {
        await updateCarRental({ id: carRental.id, ...formData });
      } else {
        await createCarRental(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving car rental:', error);
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
          {carRental ? 'Modifier la voiture de location' : 'Nouvelle voiture de location'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom de la voiture</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="ex: Citroën C3 Économique"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="ex: Citroën"
                required
              />
            </div>
            <div>
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                type="text"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="ex: C3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year">Année</Label>
              <Input
                id="year"
                type="number"
                min="1990"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value) || new Date().getFullYear())}
                required
              />
            </div>
            <div>
              <Label htmlFor="price_per_day">Prix par jour (€)</Label>
              <Input
                id="price_per_day"
                type="number"
                min="0"
                step="0.01"
                value={formData.price_per_day}
                onChange={(e) => handleInputChange('price_per_day', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Décrivez les caractéristiques de la voiture..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_available"
              checked={formData.is_available}
              onCheckedChange={(checked) => handleInputChange('is_available', checked)}
            />
            <Label htmlFor="is_available">Voiture disponible à la location</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CarRentalForm;
