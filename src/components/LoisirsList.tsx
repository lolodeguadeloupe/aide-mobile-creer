
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Users, Calendar, MapPin } from 'lucide-react';
import { useLoisirs } from '@/hooks/useLoisirs';
import { useToast } from '@/hooks/use-toast';

interface LoisirsListProps {
  onEditLoisir: (loisir: any) => void;
}

const LoisirsList: React.FC<LoisirsListProps> = ({ onEditLoisir }) => {
  const { data: loisirs, isLoading, error } = useLoisirs();
  const { deleteLoisir } = useLoisirs();
  const { toast } = useToast();

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

  if (!loisirs || loisirs.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Aucun loisir trouvé</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loisirs.map((loisir) => (
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
      ))}
    </div>
  );
};

export default LoisirsList;
