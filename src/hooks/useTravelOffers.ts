
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useTravelOffers = () => {
  const queryClient = useQueryClient();

  // Fetch all travel offers
  const { data, isLoading, error } = useQuery({
    queryKey: ['travel-offers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('travel_offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Create travel offer
  const createTravelOfferMutation = useMutation({
    mutationFn: async (travelOfferData: any) => {
      const { data, error } = await supabase
        .from('travel_offers')
        .insert([travelOfferData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-offers'] });
      toast.success('Offre de voyage créée avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la création de l\'offre de voyage:', error);
      toast.error('Erreur lors de la création de l\'offre de voyage');
    },
  });

  // Update travel offer
  const updateTravelOfferMutation = useMutation({
    mutationFn: async ({ id, ...travelOfferData }: any) => {
      const { data, error } = await supabase
        .from('travel_offers')
        .update(travelOfferData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-offers'] });
      toast.success('Offre de voyage modifiée avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la modification de l\'offre de voyage:', error);
      toast.error('Erreur lors de la modification de l\'offre de voyage');
    },
  });

  // Delete travel offer
  const deleteTravelOfferMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('travel_offers')
        .update({ is_active: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-offers'] });
      toast.success('Offre de voyage supprimée avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression de l\'offre de voyage:', error);
      toast.error('Erreur lors de la suppression de l\'offre de voyage');
    },
  });

  return {
    data,
    isLoading,
    error,
    createTravelOffer: createTravelOfferMutation.mutateAsync,
    updateTravelOffer: updateTravelOfferMutation.mutateAsync,
    deleteTravelOffer: deleteTravelOfferMutation.mutateAsync,
    isCreating: createTravelOfferMutation.isPending,
    isUpdating: updateTravelOfferMutation.isPending,
    isDeleting: deleteTravelOfferMutation.isPending,
  };
};
