
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCarRentals = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all car rentals
  const { data, isLoading, error } = useQuery({
    queryKey: ['car-rentals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('car_rentals')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Create car rental
  const createCarRental = useMutation({
    mutationFn: async (carRental: any) => {
      const { data, error } = await supabase
        .from('car_rentals')
        .insert([carRental])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rentals'] });
      toast({
        title: "Succès",
        description: "Voiture de location créée avec succès",
      });
    },
    onError: (error) => {
      console.error('Error creating car rental:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de la voiture de location",
        variant: "destructive",
      });
    },
  });

  const updateCarRental = useMutation({
    mutationFn: async ({ id, ...carRental }: any) => {
      const { data, error } = await supabase
        .from('car_rentals')
        .update(carRental)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rentals'] });
      toast({
        title: "Succès",
        description: "Voiture de location mise à jour avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating car rental:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de la voiture de location",
        variant: "destructive",
      });
    },
  });

  const deleteCarRental = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('car_rentals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rentals'] });
    },
    onError: (error) => {
      console.error('Error deleting car rental:', error);
      throw error;
    },
  });

  return {
    data,
    isLoading,
    error,
    createCarRental: createCarRental.mutate,
    updateCarRental: updateCarRental.mutate,
    deleteCarRental: deleteCarRental.mutate,
    isCreating: createCarRental.isPending,
    isUpdating: updateCarRental.isPending,
    isDeleting: deleteCarRental.isPending,
  };
};
