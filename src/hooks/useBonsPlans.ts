
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useBonsPlans = () => {
  const queryClient = useQueryClient();

  // Fetch all bons plans
  const { data, isLoading, error } = useQuery({
    queryKey: ['bons-plans'],
    queryFn: async () => {
      console.log('Fetching bons plans...');
      const { data, error } = await supabase
        .from('bons_plans')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching bons plans:', error);
        throw error;
      }
      console.log('Fetched bons plans:', data);
      return data;
    },
  });

  // Create bon plan
  const createBonPlanMutation = useMutation({
    mutationFn: async (bonPlanData: any) => {
      console.log('Creating bon plan:', bonPlanData);
      
      const { data, error } = await supabase
        .from('bons_plans')
        .insert([bonPlanData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating bon plan:', error);
        throw error;
      }
      console.log('Created bon plan:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bons-plans'] });
      toast.success('Bon plan créé avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur lors de la création du bon plan:', error);
      const errorMessage = error.message || 'Erreur lors de la création du bon plan';
      toast.error(errorMessage);
    },
  });

  // Update bon plan
  const updateBonPlanMutation = useMutation({
    mutationFn: async ({ id, ...bonPlanData }: any) => {
      console.log('Updating bon plan with ID:', id);
      console.log('Bon plan data:', bonPlanData);
      
      const { data, error } = await supabase
        .from('bons_plans')
        .update(bonPlanData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      console.log('Updated bon plan:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bons-plans'] });
      toast.success('Bon plan modifié avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur lors de la modification du bon plan:', error);
      const errorMessage = error.message || 'Erreur lors de la modification du bon plan';
      toast.error(errorMessage);
    },
  });

  // Delete bon plan
  const deleteBonPlanMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log('Deleting bon plan with ID:', id);
      
      const { error } = await supabase
        .from('bons_plans')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting bon plan:', error);
        throw error;
      }
      
      console.log('Successfully deleted bon plan with ID:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bons-plans'] });
      toast.success('Bon plan supprimé avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur lors de la suppression du bon plan:', error);
      const errorMessage = error.message || 'Erreur lors de la suppression du bon plan';
      toast.error(errorMessage);
    },
  });

  return {
    data,
    isLoading,
    error,
    createBonPlan: createBonPlanMutation.mutateAsync,
    updateBonPlan: updateBonPlanMutation.mutateAsync,
    deleteBonPlan: deleteBonPlanMutation.mutateAsync,
    isCreating: createBonPlanMutation.isPending,
    isUpdating: updateBonPlanMutation.isPending,
    isDeleting: deleteBonPlanMutation.isPending,
  };
};
