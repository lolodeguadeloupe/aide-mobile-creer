
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useTravelOffers = () => {
  const queryClient = useQueryClient();

  // Fetch all travel offers
  const { data, isLoading, error } = useQuery({
    queryKey: ['travel-offers'],
    queryFn: async () => {
      console.log('Fetching travel offers...');
      const { data, error } = await supabase
        .from('travel_offers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching travel offers:', error);
        throw error;
      }
      console.log('Fetched travel offers:', data);
      return data;
    },
  });

  // Create travel offer
  const createTravelOfferMutation = useMutation({
    mutationFn: async (travelOfferData: any) => {
      console.log('Creating travel offer:', travelOfferData);
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Vous devez être connecté pour créer une offre de voyage');
      }
      
      const { data, error } = await supabase
        .from('travel_offers')
        .insert([travelOfferData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating travel offer:', error);
        throw error;
      }
      console.log('Created travel offer:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-offers'] });
      toast.success('Offre de voyage créée avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur lors de la création de l\'offre de voyage:', error);
      const errorMessage = error.message || 'Erreur lors de la création de l\'offre de voyage';
      toast.error(errorMessage);
    },
  });

  // Update travel offer
  const updateTravelOfferMutation = useMutation({
    mutationFn: async ({ id, ...travelOfferData }: any) => {
      console.log('Updating travel offer with ID:', id);
      console.log('Travel offer data:', travelOfferData);
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Vous devez être connecté pour modifier une offre de voyage');
      }
      
      const { data, error } = await supabase
        .from('travel_offers')
        .update(travelOfferData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      console.log('Updated travel offer:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-offers'] });
      toast.success('Offre de voyage modifiée avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur lors de la modification de l\'offre de voyage:', error);
      const errorMessage = error.message || 'Erreur lors de la modification de l\'offre de voyage';
      toast.error(errorMessage);
    },
  });

  // Delete travel offer - Updated to use actual DELETE for admins
  const deleteTravelOfferMutation = useMutation({
    mutationFn: async (id: number) => {
      console.log('Deleting travel offer with ID:', id);
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Vous devez être connecté pour supprimer une offre de voyage');
      }
      
      // Check if user is admin to determine delete method
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profile?.role === 'admin') {
        // Admin can completely delete the record
        console.log('Admin deletion - completely removing record');
        const { error } = await supabase
          .from('travel_offers')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error('Error deleting travel offer:', error);
          throw error;
        }
      } else {
        // Non-admin users can only soft delete (set is_active to false)
        console.log('Non-admin deletion - setting is_active to false');
        const { error } = await supabase
          .from('travel_offers')
          .update({ is_active: false })
          .eq('id', id);
        
        if (error) {
          console.error('Error deactivating travel offer:', error);
          throw error;
        }
      }
      
      console.log('Successfully processed delete request for travel offer with ID:', id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-offers'] });
      toast.success('Offre de voyage supprimée avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur lors de la suppression de l\'offre de voyage:', error);
      const errorMessage = error.message || 'Erreur lors de la suppression de l\'offre de voyage';
      toast.error(errorMessage);
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
