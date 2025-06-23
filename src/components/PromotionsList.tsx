
import React from 'react';
import { Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePromotions } from '@/hooks/usePromotions';

interface PromotionsListProps {
  searchTerm?: string;
  promotions?: any[];
  onEditPromotion?: (promotion: any) => void;
}

const PromotionsList: React.FC<PromotionsListProps> = ({ 
  searchTerm = '', 
  promotions, 
  onEditPromotion 
}) => {
  const { data: hookPromotions, deletePromotion, isDeleting } = usePromotions();

  // Use provided promotions or fall back to hook data
  const promos = promotions || hookPromotions || [];
  
  const handleEdit = onEditPromotion || (() => {});

  const filteredPromos = promos.filter(promo =>
    promo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.cta_text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
      try {
        await deletePromotion(id);
      } catch (error) {
        console.error('Error deleting promotion:', error);
      }
    }
  };

  if (filteredPromos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucune promotion trouvée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPromos.map((promo) => (
        <div key={promo.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex">
            {/* Image */}
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={promo.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'}
                alt={promo.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{promo.title}</h3>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(promo)}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(promo.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800"
                    disabled={isDeleting}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              
              {/* Description */}
              {promo.description && (
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {promo.description}
                </p>
              )}

              {/* Badge */}
              {promo.badge && (
                <div className="mb-3">
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                    {promo.badge}
                  </span>
                </div>
              )}

              {/* CTA and Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    promo.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {promo.is_active ? (
                      <><Eye size={12} className="inline mr-1" />Actif</>
                    ) : (
                      <><EyeOff size={12} className="inline mr-1" />Inactif</>
                    )}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    Ordre: {promo.sort_order || 0}
                  </span>
                </div>
                
                {promo.cta_url && (
                  <div className="flex items-center text-blue-600 text-sm">
                    <ExternalLink size={14} className="mr-1" />
                    <span className="truncate max-w-32">{promo.cta_text || 'Voir plus'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotionsList;
