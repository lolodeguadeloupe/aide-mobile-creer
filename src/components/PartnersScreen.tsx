
import React, { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { usePartners, useDeletePartner, Partner } from '@/hooks/usePartners';
import PartnerForm from './PartnerForm';

const PartnersScreen: React.FC = () => {
  const navigate = useNavigate();
  const { data: partners, isLoading, error } = usePartners();
  const deletePartner = useDeletePartner();
  const [showForm, setShowForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPartners = useMemo(() => {
    if (!partners) return [];
    const searchLower = searchTerm.toLowerCase();
    return partners.filter(partner => 
      (partner.business_name?.toLowerCase().includes(searchLower)) ||
      (partner.business_type?.toLowerCase().includes(searchLower)) ||
      (partner.location?.toLowerCase().includes(searchLower)) ||
      (partner.description?.toLowerCase().includes(searchLower))
    );
  }, [partners, searchTerm]);

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      try {
        await deletePartner.mutateAsync(id);
      } catch (error) {
        console.error("Erreur lors de la suppression du partenaire", error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPartner(null);
  };

  if (showForm) {
    return (
      <PartnerForm
        partner={editingPartner}
        onClose={handleCloseForm}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Erreur lors du chargement des partenaires</div>
        </div>
      </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Partenaires</h1>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
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
            placeholder="Rechercher par nom, type, lieu ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {filteredPartners?.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'Aucun partenaire trouvé pour cette recherche' : 'Aucun partenaire trouvé'}
            </div>
            {!searchTerm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={20} className="mr-2" />
                Créer le premier partenaire
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPartners?.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <img
                        src={partner.image || '/placeholder.svg'}
                        alt={partner.business_name}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {partner.business_name}
                        </h3>
                        <p className="text-sm text-gray-600">{partner.business_type}</p>
                        <p className="text-sm text-gray-500">{partner.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 my-3">
                        <div><span className="font-semibold">Offre:</span> {partner.offer}</div>
                        <div><span className="font-semibold">Note:</span> {partner.rating}/5</div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {partner.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(partner)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(partner.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnersScreen;
