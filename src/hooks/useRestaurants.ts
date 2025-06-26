
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Restaurant } from '@/components/RestaurantForm';

export const useRestaurants = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch restaurants
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('poids', { ascending: false })
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Create restaurant
  const createRestaurant = useMutation({
    mutationFn: async (restaurant: Restaurant) => {
      const { data, error } = await supabase
        .from('restaurants')
        .insert([restaurant])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      toast({
        title: "Succès",
        description: "Restaurant créé avec succès",
      });
    },
    onError: (error) => {
      console.error('Error creating restaurant:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création du restaurant",
        variant: "destructive",
      });
    },
  });

  // Update restaurant
  const updateRestaurant = useMutation({
    mutationFn: async ({ id, ...restaurant }: Restaurant) => {
      const { data, error } = await supabase
        .from('restaurants')
        .update(restaurant)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      toast({
        title: "Succès",
        description: "Restaurant mis à jour avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating restaurant:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du restaurant",
        variant: "destructive",
      });
    },
  });

  // Delete restaurant
  const deleteRestaurant = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
    onError: (error) => {
      console.error('Error deleting restaurant:', error);
      throw error;
    },
  });

  return {
    data,
    isLoading,
    error,
    createRestaurant: createRestaurant.mutate,
    updateRestaurant: updateRestaurant.mutate,
    deleteRestaurant: deleteRestaurant.mutate,
    isCreating: createRestaurant.isPending,
    isUpdating: updateRestaurant.isPending,
    isDeleting: deleteRestaurant.isPending,
  };
};
