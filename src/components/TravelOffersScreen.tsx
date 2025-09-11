<<<<<<< HEAD
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTravelOffers } from '@/hooks/useTravelOffers';
import TravelOffersList from './TravelOffersList';
import TravelOfferForm from './TravelOfferForm';

const TravelOffersScreen = () => {
  const navigate = useNavigate();
  const { data: travelOffers } = useTravelOffers();
  const [showForm, setShowForm] = useState(false);
  const [editingTravelOffer, setEditingTravelOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter travel offers based on search term
  const filteredTravelOffers = useMemo(() => {
    if (!travelOffers) return [];
    
    if (!searchTerm.trim()) {
      return travelOffers;
    }

    const searchLower = searchTerm.toLowerCase();
    return travelOffers.filter(offer => 
      offer.title?.toLowerCase().includes(searchLower) ||
      offer.destination?.toLowerCase().includes(searchLower) ||
      offer.departure_location?.toLowerCase().includes(searchLower) ||
      offer.description?.toLowerCase().includes(searchLower)
    );
  }, [travelOffers, searchTerm]);

  const handleAddTravelOffer = () => {
    setEditingTravelOffer(null);
    setShowForm(true);
  };

  const handleEditTravelOffer = (travelOffer) => {
    setEditingTravelOffer(travelOffer);
    setShowForm(true);
  };

  /**
   * Resets the component state so that the travel offer form is not shown,
   * and there is no travel offer being edited.
   */
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTravelOffer(null);
  };

  if (showForm) {
    return (
      <TravelOfferForm
        travelOffer={editingTravelOffer}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mr-3"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Gestion des voyages
            </h1>
          </div>
          <Button onClick={handleAddTravelOffer}>
            <Plus size={20} className="mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher par titre, destination, lieu de départ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {filteredTravelOffers?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'Aucune offre de voyage trouvée pour cette recherche' : 'Aucune offre de voyage trouvée'}
            </div>
            {!searchTerm && (
              <Button
                onClick={handleAddTravelOffer}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Créer la première offre de voyage
              </Button>
            )}
          </div>
        ) : (
          <TravelOffersList 
            onEditTravelOffer={handleEditTravelOffer} 
            travelOffers={filteredTravelOffers}
          />
        )}
      </div>
    </div>
  );
};

export default TravelOffersScreen;
=======

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTravelOffers } from '@/hooks/useTravelOffers';
import TravelOffersList from './TravelOffersList';
import TravelOfferForm from './TravelOfferForm';

const TravelOffersScreen = () => {
  const navigate = useNavigate();
  const { data: travelOffers } = useTravelOffers();
  const [showForm, setShowForm] = useState(false);
  const [editingTravelOffer, setEditingTravelOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter travel offers based on search term
  const filteredTravelOffers = useMemo(() => {
    if (!travelOffers) return [];
    
    if (!searchTerm.trim()) {
      return travelOffers;
    }

    const searchLower = searchTerm.toLowerCase();
    return travelOffers.filter(offer => 
      offer.title?.toLowerCase().includes(searchLower) ||
      offer.destination?.toLowerCase().includes(searchLower) ||
      offer.departure_location?.toLowerCase().includes(searchLower) ||
      offer.description?.toLowerCase().includes(searchLower)
    );
  }, [travelOffers, searchTerm]);

  const handleAddTravelOffer = () => {
    setEditingTravelOffer(null);
    setShowForm(true);
  };

  const handleEditTravelOffer = (travelOffer) => {
    setEditingTravelOffer(travelOffer);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTravelOffer(null);
  };

  if (showForm) {
    return (
      <TravelOfferForm
        travelOffer={editingTravelOffer}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mr-3"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Gestion des voyages
            </h1>
          </div>
          <Button onClick={handleAddTravelOffer}>
            <Plus size={20} className="mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher par titre, destination, lieu de départ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {filteredTravelOffers?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'Aucune offre de voyage trouvée pour cette recherche' : 'Aucune offre de voyage trouvée'}
            </div>
            {!searchTerm && (
              <Button
                onClick={handleAddTravelOffer}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Créer la première offre de voyage
              </Button>
            )}
          </div>
        ) : (
          <TravelOffersList 
            onEditTravelOffer={handleEditTravelOffer} 
            travelOffers={filteredTravelOffers}
          />
        )}
      </div>
    </div>
  );
};

export default TravelOffersScreen;
>>>>>>> bf990d4 (Commit avant pull de verification)
