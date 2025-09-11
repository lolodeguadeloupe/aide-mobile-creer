
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { TablesInsert, TablesUpdate, Tables } from '@/integrations/supabase/types';

type Loisir = Tables<'loisirs'>;
type LoisirInsert = TablesInsert<'loisirs'>;
type LoisirUpdate = TablesUpdate<'loisirs'>;

interface UpdateLoisirInput extends LoisirUpdate {
  id: number;
}

export const useLoisirs = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all loisirs once
  const { data, isLoading, error } = useQuery({
    queryKey: ['loisirs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('loisirs')
        .select('*')
        .order('title');
      
      if (error) throw error;
      return data;
    },
  });

  // Create loisir
  const createLoisir = useMutation({
    mutationFn: async (loisir: LoisirInsert) => {
      const { data, error } = await supabase
        .from('loisirs')
        .insert([loisir])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loisirs'] });
      toast({
        title: "Succès",
        description: "Loisir créé avec succès",
      });
    },
    onError: (error) => {
      console.error('Error creating loisir:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création du loisir",
        variant: "destructive",
      });
    },
  });

  const updateLoisir = useMutation({
    mutationFn: async ({ id, ...loisir }: UpdateLoisirInput) => {
      const { data, error } = await supabase
        .from('loisirs')
        .update(loisir)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loisirs'] });
      toast({
        title: "Succès",
        description: "Loisir mis à jour avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating loisir:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du loisir",
        variant: "destructive",
      });
    },
  });

  const deleteLoisir = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('loisirs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loisirs'] });
    },
    onError: (error) => {
      console.error('Error deleting loisir:', error);
      throw error;
    },
  });

  return {
    data,
    isLoading,
    error,
    createLoisir: createLoisir.mutate,
    updateLoisir: updateLoisir.mutate,
    deleteLoisir: deleteLoisir.mutate,
    isCreating: createLoisir.isPending,
    isUpdating: updateLoisir.isPending,
    isDeleting: deleteLoisir.isPending,
  };
};
