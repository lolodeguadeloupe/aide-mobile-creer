
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePromotions } from '@/hooks/usePromotions';
import PromotionsList from './PromotionsList';
import PromotionForm from './PromotionForm';

const PromotionsScreen = () => {
  const navigate = useNavigate();
  const { data: promotions } = usePromotions();
  const [showForm, setShowForm] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter promotions based on search term
  const filteredPromotions = useMemo(() => {
    if (!promotions) return [];
    
    if (!searchTerm.trim()) {
      return promotions;
    }

    const searchLower = searchTerm.toLowerCase();
    return promotions.filter(promotion => 
      promotion.title?.toLowerCase().includes(searchLower) ||
      promotion.description?.toLowerCase().includes(searchLower) ||
      promotion.cta_text?.toLowerCase().includes(searchLower)
    );
  }, [promotions, searchTerm]);

  const handleAddPromotion = () => {
    setEditingPromotion(null);
    setShowForm(true);
  };

  const handleEditPromotion = (promotion) => {
    setEditingPromotion(promotion);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPromotion(null);
  };

  if (showForm) {
    return (
      <PromotionForm
        promotion={editingPromotion}
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
              Gestion des promotions
            </h1>
          </div>
          <Button onClick={handleAddPromotion}>
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
            placeholder="Rechercher par titre, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {filteredPromotions?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'Aucune promotion trouvée pour cette recherche' : 'Aucune promotion trouvée'}
            </div>
            {!searchTerm && (
              <Button
                onClick={handleAddPromotion}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Créer la première promotion
              </Button>
            )}
          </div>
        ) : (
          <PromotionsList 
            onEditPromotion={handleEditPromotion} 
            promotions={filteredPromotions}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};

export default PromotionsScreen;
