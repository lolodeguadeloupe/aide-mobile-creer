
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Users, Calendar, MapPin, Search } from 'lucide-react';
import { useLoisirs } from '@/hooks/useLoisirs';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Loisir = Tables<'loisirs'>;

interface LoisirsListProps {
  onEditLoisir: (loisir: Loisir) => void;
}

const LoisirsList: React.FC<LoisirsListProps> = ({ onEditLoisir }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: allLoisirs, isLoading, error, deleteLoisir } = useLoisirs();
  const { toast } = useToast();

  // Filter loisirs based on search term (client-side filtering)
  const filteredLoisirs = useMemo(() => {
    if (!allLoisirs) return [];
    
    if (!searchTerm.trim()) {
      return allLoisirs;
    }

    const searchLower = searchTerm.toLowerCase();
    return allLoisirs.filter(loisir => 
      loisir.title?.toLowerCase().includes(searchLower) ||
      loisir.description?.toLowerCase().includes(searchLower) ||
      loisir.location?.toLowerCase().includes(searchLower)
    );
  }, [allLoisirs, searchTerm]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce loisir ?')) {
      try {
        await deleteLoisir(id);
        toast({
          title: "Succès",
          description: "Loisir supprimé avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression du loisir",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500">Erreur lors du chargement des loisirs</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher par titre, description ou lieu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results */}
      {!filteredLoisirs || filteredLoisirs.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">
            {searchTerm ? 'Aucun loisir trouvé pour cette recherche' : 'Aucun loisir trouvé'}
          </div>
        </div>
      ) : (
        filteredLoisirs.map((loisir) => (
          <Card key={loisir.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={loisir.image}
                    alt={loisir.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{loisir.title}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <MapPin size={14} className="mr-1" />
                        {loisir.location}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar size={14} className="mr-1" />
                        Du {loisir.start_date} {loisir.end_date && `au ${loisir.end_date}`}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={14} className="mr-1" />
                        {loisir.current_participants}/{loisir.max_participants} participants
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditLoisir(loisir)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(loisir.id)}
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
        ))
      )}
    </div>
  );
};

export default LoisirsList;
