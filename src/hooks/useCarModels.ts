
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCarModels = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all car models
  const { data, isLoading, error } = useQuery({
    queryKey: ['car-models'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('car_models')
        .select(`
          *,
          car_rental_companies (
            name,
            location
          )
        `)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Create car model
  const createModel = useMutation({
    mutationFn: async (model: any) => {
      const { data, error } = await supabase
        .from('car_models')
        .insert([model])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-models'] });
      toast({
        title: "Succès",
        description: "Modèle de voiture créé avec succès",
      });
    },
    onError: (error) => {
      console.error('Error creating car model:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création du modèle",
        variant: "destructive",
      });
    },
  });

  const updateModel = useMutation({
    mutationFn: async ({ id, ...model }: any) => {
      const { data, error } = await supabase
        .from('car_models')
        .update(model)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-models'] });
      toast({
        title: "Succès",
        description: "Modèle mis à jour avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating car model:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour",
        variant: "destructive",
      });
    },
  });

  const deleteModel = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('car_models')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-models'] });
    },
    onError: (error) => {
      console.error('Error deleting car model:', error);
      throw error;
    },
  });

  return {
    data,
    isLoading,
    error,
    createModel: createModel.mutate,
    updateModel: updateModel.mutate,
    deleteModel: deleteModel.mutate,
    isCreating: createModel.isPending,
    isUpdating: updateModel.isPending,
    isDeleting: deleteModel.isPending,
  };
};
