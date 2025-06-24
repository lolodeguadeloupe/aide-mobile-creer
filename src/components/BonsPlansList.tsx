
import React from 'react';
import { Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBonsPlans } from '@/hooks/useBonsPlans';

interface BonsPlansListProps {
  searchTerm?: string;
  bonsPlans?: any[];
  onEditBonPlan?: (bonPlan: any) => void;
}

const BonsPlansList: React.FC<BonsPlansListProps> = ({ 
  searchTerm = '', 
  bonsPlans, 
  onEditBonPlan 
}) => {
  const { data: hookBonsPlans, deleteBonPlan, isDeleting } = useBonsPlans();

  // Use provided bons plans or fall back to hook data
  const plans = bonsPlans || hookBonsPlans || [];
  
  const handleEdit = onEditBonPlan || (() => {});

  const filteredPlans = plans.filter(plan =>
    plan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bon plan ?')) {
      try {
        await deleteBonPlan(id);
      } catch (error) {
        console.error('Error deleting bon plan:', error);
      }
    }
  };

  const constructFullUrl = (planUrl: string) => {
    if (!planUrl) return '';
    
    const baseUrl = 'https://demonstration.clubcreole.fr/';
    
    // If the URL already starts with http, return as is
    if (planUrl.startsWith('http')) {
      return planUrl;
    }
    
    // Remove leading slash if present to avoid double slashes
    const cleanUrl = planUrl.startsWith('/') ? planUrl.slice(1) : planUrl;
    
    return baseUrl + cleanUrl;
  };

  const handleViewPlan = (planUrl: string) => {
    const fullUrl = constructFullUrl(planUrl);
    if (fullUrl) {
      window.open(fullUrl, '_blank');
    }
  };

  if (filteredPlans.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun bon plan trouvé</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPlans.map((plan) => (
        <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex">
            {/* Image */}
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={plan.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop'}
                alt={plan.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(plan)}
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(plan.id)}
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
              {plan.description && (
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {plan.description}
                </p>
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="mb-3">
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Status and URL */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    plan.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {plan.is_active ? (
                      <><Eye size={12} className="inline mr-1" />Actif</>
                    ) : (
                      <><EyeOff size={12} className="inline mr-1" />Inactif</>
                    )}
                  </span>
                  
                  {plan.icon && (
                    <span className="text-xs text-gray-500">
                      Icône: {plan.icon}
                    </span>
                  )}
                </div>
                
                {plan.url && (
                  <Button
                    onClick={() => handleViewPlan(plan.url)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Voir le plan
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BonsPlansList;
