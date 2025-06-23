
import React from 'react';
import { Edit, Trash2, Calendar, MapPin, Users, Clock, Euro } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTravelOffers } from '@/hooks/useTravelOffers';

interface TravelOffersListProps {
  searchTerm?: string;
  travelOffers?: any[];
  onEdit?: (travelOffer: any) => void;
  onEditTravelOffer?: (travelOffer: any) => void;
}

const TravelOffersList: React.FC<TravelOffersListProps> = ({ 
  searchTerm = '', 
  travelOffers, 
  onEdit, 
  onEditTravelOffer 
}) => {
  const { data: hookTravelOffers, deleteTravelOffer, isDeleting } = useTravelOffers();

  // Use provided travelOffers or fall back to hook data
  const offers = travelOffers || hookTravelOffers || [];
  
  // Use the provided onEdit handler or onEditTravelOffer
  const handleEdit = onEdit || onEditTravelOffer || (() => {});

  const filteredOffers = offers.filter(offer =>
    offer.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.departure_location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre de voyage ?')) {
      try {
        await deleteTravelOffer(id);
      } catch (error) {
        console.error('Error deleting travel offer:', error);
      }
    }
  };

  if (filteredOffers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucune offre de voyage trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredOffers.map((offer) => {
        // Safely handle inclusions as it might be a Json type
        const inclusions = Array.isArray(offer.inclusions) ? offer.inclusions : [];
        
        return (
          <div key={offer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex">
              {/* Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={offer.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop'}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEdit(offer)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(offer.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      disabled={isDeleting}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                
                {/* Details */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{offer.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{offer.duration_days} jours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{offer.current_participants || 0}/{offer.max_participants || 20}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Euro size={14} />
                    <span className="font-semibold text-blue-600">{offer.price}€</span>
                  </div>
                  {offer.departure_date && (
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(offer.departure_date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {offer.description && (
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                    {offer.description}
                  </p>
                )}

                {/* Inclusions */}
                {inclusions.length > 0 && (
                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-green-700 mb-1">✓ Inclusions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {inclusions.slice(0, 3).map((inclusion: string, index: number) => (
                        <span
                          key={index}
                          className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                        >
                          {inclusion}
                        </span>
                      ))}
                      {inclusions.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{inclusions.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    offer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {offer.is_active ? 'Actif' : 'Inactif'}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    Départ: {offer.departure_location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TravelOffersList;
