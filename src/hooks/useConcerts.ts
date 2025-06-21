
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useConcerts = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch concerts
  const { data, isLoading, error } = useQuery({
    queryKey: ['concerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('concerts')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Create concert
  const createConcert = useMutation({
    mutationFn: async (concert: any) => {
      const { data, error } = await supabase
        .from('concerts')
        .insert([concert])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concerts'] });
      toast({
        title: "Succès",
        description: "Concert créé avec succès",
      });
    },
    onError: (error) => {
      console.error('Error creating concert:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création du concert",
        variant: "destructive",
      });
    },
  });

  // Update concert
  const updateConcert = useMutation({
    mutationFn: async ({ id, ...concert }: any) => {
      const { data, error } = await supabase
        .from('concerts')
        .update(concert)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concerts'] });
      toast({
        title: "Succès",
        description: "Concert mis à jour avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating concert:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du concert",
        variant: "destructive",
      });
    },
  });

  // Delete concert
  const deleteConcert = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('concerts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concerts'] });
    },
    onError: (error) => {
      console.error('Error deleting concert:', error);
      throw error;
    },
  });

  return {
    data,
    isLoading,
    error,
    createConcert: createConcert.mutate,
    updateConcert: updateConcert.mutate,
    deleteConcert: deleteConcert.mutate,
    isCreating: createConcert.isPending,
    isUpdating: updateConcert.isPending,
    isDeleting: deleteConcert.isPending,
  };
};
