
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { TablesInsert, TablesUpdate, Tables } from '@/integrations/supabase/types';

type Promotion = Tables<'promotions'>;
type PromotionInsert = TablesInsert<'promotions'>;
type PromotionUpdate = TablesUpdate<'promotions'>;

interface UpdatePromotionInput extends PromotionUpdate {
  id: number;
}

export const usePromotions = () => {
  const queryClient = useQueryClient();

  // Fetch all promotions
  const { data, isLoading, error } = useQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      console.log('Fetching promotions...');
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching promotions:', error);
        throw error;
      }
      console.log('Fetched promotions:', data);
      return data;
    },
  });

  // Create promotion
  const createPromotionMutation = useMutation({
    mutationFn: async (promotionData: PromotionInsert) => {
      console.log('Creating promotion:', promotionData);
      
      const { data, error } = await supabase
        .from('promotions')
        .insert([promotionData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating promotion:', error);
        throw error;
      }
      console.log('Created promotion:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast.success('Promotion créée avec succès');
    },
    onError: (error: Error) => {
      console.error('Erreur lors de la création de la promotion:', error);
      const errorMessage = error.message || 'Erreur lors de la création de la promotion';
      toast.error(errorMessage);
    },
  });

  // Update promotion
  const updatePromotionMutation = useMutation({
    mutationFn: async ({ id, ...promotionData }: UpdatePromotionInput) => {
      console.log('Updating promotion with ID:', id);
      console.log('Promotion data:', promotionData);
      
      const { data, error } = await supabase
        .from('promotions')
        .update(promotionData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      console.log('Updated promotion:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast.success('Promotion modifiée avec succès');
    },
    onError: (error: Error) => {
      console.error('Erreur lors de la modification de la promotion:', error);
      const errorMessage = error.message || 'Erreur lors de la modification de la promotion';
      toast.error(errorMessage);
    },
  });

  // Delete promotion
  const deletePromotionMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log('Deleting promotion with ID:', id);
      
      const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting promotion:', error);
        throw error;
      }
      
      console.log('Successfully deleted promotion with ID:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast.success('Promotion supprimée avec succès');
    },
    onError: (error: Error) => {
      console.error('Erreur lors de la suppression de la promotion:', error);
      const errorMessage = error.message || 'Erreur lors de la suppression de la promotion';
      toast.error(errorMessage);
    },
  });

  return {
    data,
    isLoading,
    error,
    createPromotion: createPromotionMutation.mutateAsync,
    updatePromotion: updatePromotionMutation.mutateAsync,
    deletePromotion: deletePromotionMutation.mutateAsync,
    isCreating: createPromotionMutation.isPending,
    isUpdating: updatePromotionMutation.isPending,
    isDeleting: deletePromotionMutation.isPending,
  };
};
