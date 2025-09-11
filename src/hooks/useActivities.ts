
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useActivities = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all activities
  const { data, isLoading, error } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Create activity
  const createActivity = useMutation({
    mutationFn: async (activity: any) => {
      const { data, error } = await supabase
        .from('activities')
        .insert([activity])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({
        title: "Succès",
        description: "Activité créée avec succès",
      });
    },
    onError: (error) => {
      console.error('Error creating activity:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de l'activité",
        variant: "destructive",
      });
    },
  });

  const updateActivity = useMutation({
    mutationFn: async ({ id, ...activity }: any) => {
      const { data, error } = await supabase
        .from('activities')
        .update(activity)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      toast({
        title: "Succès",
        description: "Activité mise à jour avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating activity:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de l'activité",
        variant: "destructive",
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      console.error('Error deleting activity:', error);
      throw error;
    },
  });

  return {
    data,
    isLoading,
    error,
    createActivity: createActivity.mutate,
    updateActivity: updateActivity.mutate,
    deleteActivity: deleteActivity.mutate,
    isCreating: createActivity.isPending,
    isUpdating: updateActivity.isPending,
    isDeleting: deleteActivity.isPending,
  };
};
