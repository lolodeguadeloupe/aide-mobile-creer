import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Star, MapPin, Calendar, Clock } from 'lucide-react';
import { useConcerts } from '@/hooks/useConcerts';
import { useToast } from '@/hooks/use-toast';

interface ConcertsListProps {
  onEditConcert: (concert: any) => void;
  concerts?: any[];
}

const ConcertsList: React.FC<ConcertsListProps> = ({ onEditConcert, concerts: propConcerts }) => {
  const { data: fetchedConcerts, isLoading, error } = useConcerts();
  const { deleteConcert } = useConcerts();
  const { toast } = useToast();

  // Use prop concerts if provided, otherwise use fetched concerts
  const concerts = propConcerts || fetchedConcerts;

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce concert ?')) {
      try {
        await deleteConcert(id);
        toast({
          title: "Succès",
          description: "Concert supprimé avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression du concert",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading && !propConcerts) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (error && !propConcerts) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500">Erreur lors du chargement des concerts</div>
      </div>
    );
  }

  if (!concerts || concerts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Aucun concert trouvé</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {concerts.map((concert) => (
        <Card key={concert.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex">
              {/* Image */}
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={concert.image}
                  alt={concert.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{concert.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{concert.artist}</p>
                    <p className="text-sm text-gray-500 mb-1">{concert.genre}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin size={14} className="mr-1" />
                      {concert.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar size={14} className="mr-1" />
                      {concert.date}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock size={14} className="mr-1" />
                      {concert.time}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{concert.rating}</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">{concert.price}€</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditConcert(concert)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(concert.id)}
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

export default ConcertsList;
