import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MapPin, Calendar, Users } from 'lucide-react';
import { useTravelOffers } from '@/hooks/useTravelOffers';
import { useToast } from '@/hooks/use-toast';

interface TravelOffer {
  id: number;
  title: string;
  image?: string;
  departure_location: string;
  destination: string;
  duration_days: number;
  current_participants?: number;
  max_participants: number;
  price: number;
  // Ajoute d'autres champs si nécessaire
}

interface TravelOffersListProps {
  onEditTravelOffer: (travelOffer: TravelOffer) => void;
  travelOffers?: TravelOffer[];
}

const TravelOffersList: React.FC<TravelOffersListProps> = ({ onEditTravelOffer, travelOffers: propTravelOffers }) => {
  const { data: fetchedTravelOffers, isLoading, error } = useTravelOffers();
  const { deleteTravelOffer } = useTravelOffers();
  const { toast } = useToast();

  // Use prop travel offers if provided, otherwise use fetched travel offers
  const travelOffers = propTravelOffers || fetchedTravelOffers;

  const handleEdit = (travelOffer: TravelOffer) => {
    console.log('Editing travel offer:', travelOffer);
    // Ensure we have a valid travel offer with an ID
    if (!travelOffer || !travelOffer.id) {
      console.error('Invalid travel offer:', travelOffer);
      toast({
        title: "Erreur",
        description: "Impossible de modifier cette offre de voyage (ID manquant)",
        variant: "destructive",
      });
      return;
    }
    onEditTravelOffer(travelOffer);
  };

  const handleDelete = async (id: number) => {
    console.log('Attempting to delete travel offer with ID:', id);
    if (!id) {
      console.error('No ID provided for deletion');
      toast({
        title: "Erreur",
        description: "ID de l'offre manquant",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre de voyage ?')) {
      try {
        await deleteTravelOffer(id);
        toast({
          title: "Succès",
          description: "Offre de voyage supprimée avec succès",
        });
      } catch (error) {
        console.error('Delete error:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression de l'offre de voyage",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading && !propTravelOffers) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (error && !propTravelOffers) {
    console.error('Error loading travel offers:', error);
    return (
      <div className="text-center py-8">
        <div className="text-red-500">Erreur lors du chargement des offres de voyage</div>
      </div>
    );
  }

  if (!travelOffers || travelOffers.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Aucune offre de voyage trouvée</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {travelOffers.map((travelOffer) => {
        // Add safety check for each travel offer
        if (!travelOffer || !travelOffer.id) {
          console.warn('Skipping invalid travel offer:', travelOffer);
          return null;
        }

        return (
          <Card key={travelOffer.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                {/* Image principale */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={travelOffer.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'}
                    alt={travelOffer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{travelOffer.title}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <MapPin size={14} className="mr-1" />
                        {travelOffer.departure_location} → {travelOffer.destination}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar size={14} className="mr-1" />
                        {travelOffer.duration_days} jours
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Users size={14} className="mr-1" />
                        {travelOffer.current_participants || 0}/{travelOffer.max_participants} participants
                      </div>
                      
                      <div className="text-lg font-bold text-blue-600">
                        {travelOffer.price}€
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(travelOffer)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(travelOffer.id)}
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
        );
      })}
    </div>
  );
};

export default TravelOffersList;
