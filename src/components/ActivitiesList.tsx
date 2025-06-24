
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, Star, Search, Eye, EyeOff } from 'lucide-react';
import { useActivities } from '@/hooks/useActivities';
import { useToast } from '@/hooks/use-toast';

interface ActivitiesListProps {
  onEditActivity: (activity: any) => void;
}

const ActivitiesList: React.FC<ActivitiesListProps> = ({ onEditActivity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: allActivities, isLoading, error, deleteActivity, updateActivity } = useActivities();
  const { toast } = useToast();

  // Filter activities based on search term
  const filteredActivities = useMemo(() => {
    if (!allActivities) return [];
    
    if (!searchTerm.trim()) {
      return allActivities;
    }

    const searchLower = searchTerm.toLowerCase();
    return allActivities.filter(activity => 
      activity.name?.toLowerCase().includes(searchLower) ||
      activity.path?.toLowerCase().includes(searchLower)
    );
  }, [allActivities, searchTerm]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      try {
        await deleteActivity(id);
        toast({
          title: "Succès",
          description: "Activité supprimée avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la suppression de l'activité",
          variant: "destructive",
        });
      }
    }
  };

  const handleToggleActive = async (activity: any) => {
    try {
      await updateActivity({
        id: activity.id,
        is_active: !activity.is_active
      });
      toast({
        title: "Succès",
        description: `Activité ${!activity.is_active ? 'activée' : 'désactivée'} avec succès`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification de l'activité",
        variant: "destructive",
      });
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
        <div className="text-red-500">Erreur lors du chargement des activités</div>
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
          placeholder="Rechercher par nom ou chemin..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results */}
      {!filteredActivities || filteredActivities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">
            {searchTerm ? 'Aucune activité trouvée pour cette recherche' : 'Aucune activité trouvée'}
          </div>
        </div>
      ) : (
        filteredActivities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{activity.name}</h3>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <span className="mr-1">Chemin:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {activity.path}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <span className="mr-1">Icône:</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {activity.icon_name}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Star size={14} className="mr-1 text-yellow-500" />
                    {activity.rating ? activity.rating.toFixed(1) : '0.0'}
                    <span className="ml-2">
                      {activity.is_active ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
                          <Eye size={12} className="mr-1" />
                          Actif
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center">
                          <EyeOff size={12} className="mr-1" />
                          Inactif
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-3 ml-4">
                  {/* Active/Inactive Toggle */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={activity.is_active}
                      onCheckedChange={() => handleToggleActive(activity)}
                    />
                    <span className="text-xs text-gray-500">
                      {activity.is_active ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditActivity(activity)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ActivitiesList;
