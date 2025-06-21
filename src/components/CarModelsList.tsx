
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, MapPin, Star, Users, Settings, Wind } from 'lucide-react';
import { useCarRentals } from '@/hooks/useCarRentals';

const CarModelsList = () => {
  const { data: carModels, isLoading, error } = useCarRentals();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Erreur lors du chargement des modèles</p>
      </div>
    );
  }

  if (!carModels || carModels.length === 0) {
    return (
      <div className="text-center p-8">
        <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Aucun modèle de voiture disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {carModels.map((model) => (
        <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 right-2 bg-blue-600">
              {model.category}
            </Badge>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{model.name}</CardTitle>
            {model.car_rental_companies && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {model.car_rental_companies.name} - {model.car_rental_companies.location}
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{model.seats} places</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{model.transmission}</span>
                </div>
              </div>
              
              {model.air_con && (
                <div className="flex items-center text-sm text-green-600">
                  <Wind className="h-4 w-4 mr-1" />
                  <span>Climatisation</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-blue-600">
                  {model.price_per_day}€/jour
                </div>
                {model.car_rental_companies?.rating && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm">{model.car_rental_companies.rating}</span>
                  </div>
                )}
              </div>
              
              <Button className="w-full">
                Réserver maintenant
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CarModelsList;
