
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Search, Car } from 'lucide-react';
import { useCarRentals } from '@/hooks/useCarRentals';
import { useCarModels } from '@/hooks/useCarModels';
import { useToast } from '@/hooks/use-toast';

interface CarRentalsListProps {
  onEditCarRental: (carRental: any) => void;
}

const CarRentalsList: React.FC<CarRentalsListProps> = ({ onEditCarRental }) => {
  const { data: carModels, isLoading } = useCarRentals();
  const { deleteModel } = useCarModels();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCarRentals = carModels?.filter(carModel =>
    carModel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carModel.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carModel.car_rental_companies?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce modèle de voiture ?')) {
      try {
        deleteModel(id);
        toast({
          title: "Succès",
          description: "Modèle de voiture supprimé avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Chargement des modèles de voitures...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Rechercher par nom, catégorie ou compagnie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Car models list */}
      <div className="grid gap-4">
        {filteredCarRentals.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'Aucun modèle trouvé pour cette recherche.' : 'Aucun modèle de voiture enregistré.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCarRentals.map((carModel) => (
            <Card key={carModel.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {carModel.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Catégorie:</span> {carModel.category}</p>
                      <p><span className="font-medium">Transmission:</span> {carModel.transmission}</p>
                      <p><span className="font-medium">Places:</span> {carModel.seats}</p>
                      <p><span className="font-medium">Prix par jour:</span> {carModel.price_per_day}€</p>
                      {carModel.car_rental_companies && (
                        <p><span className="font-medium">Compagnie:</span> {carModel.car_rental_companies.name}</p>
                      )}
                      <p>
                        <span className="font-medium">Climatisation:</span>
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          carModel.air_con 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {carModel.air_con ? 'Oui' : 'Non'}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Statut:</span>
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          carModel.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {carModel.is_active ? 'Actif' : 'Inactif'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditCarRental(carModel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(carModel.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CarRentalsList;
