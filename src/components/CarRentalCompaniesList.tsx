
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Search, Building } from 'lucide-react';
import { useCarRentalCompanies } from '@/hooks/useCarRentalCompanies';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Partner = Tables<'partners'>;

interface CarRentalCompaniesListProps {
  onEditCompany: (company: Partner) => void;
}

const CarRentalCompaniesList: React.FC<CarRentalCompaniesListProps> = ({ onEditCompany }) => {
  const { data: companies, isLoading, deleteCompany } = useCarRentalCompanies();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies?.filter(company =>
    company.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.type?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette compagnie ?')) {
      try {
        deleteCompany(id);
        toast({
          title: "Succès",
          description: "Compagnie supprimée avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Chargement des compagnies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Rechercher par nom, lieu ou type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Companies list */}
      <div className="grid gap-4">
        {filteredCompanies.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'Aucune compagnie trouvée pour cette recherche.' : 'Aucune compagnie enregistrée.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {company.business_name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Type:</span> {company.type}</p>
                      <p><span className="font-medium">Lieu:</span> {company.location}</p>
                      <p><span className="font-medium">Note:</span> {company.rating}/5</p>
                      {company.description && (
                        <p><span className="font-medium">Description:</span> {company.description}</p>
                      )}
                      {company.offer && (
                        <p><span className="font-medium">Offre:</span> {company.offer}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditCompany(company)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(company.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CarRentalCompaniesList;
