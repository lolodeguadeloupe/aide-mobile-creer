
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBonsPlans } from '@/hooks/useBonsPlans';
import BonsPlansList from './BonsPlansList';
import BonPlanForm from './BonPlanForm';

const BonsPlansScreen = () => {
  const navigate = useNavigate();
  const { data: bonsPlans } = useBonsPlans();
  const [showForm, setShowForm] = useState(false);
  const [editingBonPlan, setEditingBonPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter bons plans based on search term
  const filteredBonsPlans = useMemo(() => {
    if (!bonsPlans) return [];
    
    if (!searchTerm.trim()) {
      return bonsPlans;
    }

    const searchLower = searchTerm.toLowerCase();
    return bonsPlans.filter(bonPlan => 
      bonPlan.title?.toLowerCase().includes(searchLower) ||
      bonPlan.description?.toLowerCase().includes(searchLower)
    );
  }, [bonsPlans, searchTerm]);

  const handleAddBonPlan = () => {
    setEditingBonPlan(null);
    setShowForm(true);
  };

  const handleEditBonPlan = (bonPlan) => {
    setEditingBonPlan(bonPlan);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBonPlan(null);
  };

  if (showForm) {
    return (
      <BonPlanForm
        bonPlan={editingBonPlan}
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
              Gestion des bons plans
            </h1>
          </div>
          <Button onClick={handleAddBonPlan}>
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
        {filteredBonsPlans?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'Aucun bon plan trouvé pour cette recherche' : 'Aucun bon plan trouvé'}
            </div>
            {!searchTerm && (
              <Button
                onClick={handleAddBonPlan}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Créer le premier bon plan
              </Button>
            )}
          </div>
        ) : (
          <BonsPlansList 
            onEditBonPlan={handleEditBonPlan} 
            bonsPlans={filteredBonsPlans}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};

export default BonsPlansScreen;
