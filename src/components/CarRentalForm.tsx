
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCarModels } from '@/hooks/useCarModels';
import { useCarRentalCompanies } from '@/hooks/useCarRentalCompanies';

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom du modèle</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="ex: Citroën C3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
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
            <div>
              <Label htmlFor="company_id">Compagnie</Label>
              <Select
                value={formData.company_id.toString()}
                onValueChange={(value) => handleInputChange('company_id', parseInt(value))}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transmission">Transmission</Label>
              <Select
                value={formData.transmission}
                onValueChange={(value) => handleInputChange('transmission', value)}
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
                onChange={(e) => handleInputChange('seats', parseInt(e.target.value) || 5)}
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
              onChange={(e) => handleInputChange('price_per_day', parseInt(e.target.value) || 0)}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">URL de l'image</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="air_con"
              checked={formData.air_con}
              onCheckedChange={(checked) => handleInputChange('air_con', checked)}
            />
            <Label htmlFor="air_con">Climatisation</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleInputChange('is_active', checked)}
            />
            <Label htmlFor="is_active">Modèle actif</Label>
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
