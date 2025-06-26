
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Star, MapPin } from 'lucide-react';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  name: string;
  type: string;
  location: string;
  description: string;
  offer: string;
  rating: number;
  poids: number;
  icon: string;
  image?: string;
  gallery_images?: string[];
  id?: string | number;
}

interface RestaurantsListProps {
  onEditRestaurant: (restaurant: Restaurant) => void;
  restaurants?: Restaurant[];
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({ onEditRestaurant, restaurants: propRestaurants }) => {
  const { data: fetchedRestaurants, isLoading, error } = useRestaurants();
  const { deleteRestaurant } = useRestaurants();
  const { toast } = useToast();

  // Use prop restaurants if provided, otherwise use fetched restaurants
  const restaurants = propRestaurants || fetchedRestaurants;

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
      try {
        await deleteRestaurant(id);
        toast({
          title: "Succès",
          description: "Restaurant supprimé avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression du restaurant",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading && !propRestaurants) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (error && !propRestaurants) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500">Erreur lors du chargement des restaurants</div>
      </div>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Aucun restaurant trouvé</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {restaurants.map((restaurant) => (
        <Card key={restaurant.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              {/* Image */}
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{restaurant.type}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={14} className="mr-1" />
                      {restaurant.location}
                    </div>
                    
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditRestaurant(restaurant)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(restaurant.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RestaurantsList;
