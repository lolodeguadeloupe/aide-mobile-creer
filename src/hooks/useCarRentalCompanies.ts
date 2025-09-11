
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCarRentalCompanies = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all car rental companies from partners table
  const { data, isLoading, error } = useQuery({
    queryKey: ['car-rental-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('business_type', 'car_rental')
        .order('business_name');
      
      if (error) throw error;
      return data;
    },
  });

  // Create car rental company
  const createCompany = useMutation({
    mutationFn: async (company: any) => {
      const { data, error } = await supabase
        .from('partners')
        .insert([{
          ...company,
          business_type: 'car_rental',
          business_name: company.name,
          type: company.type
        }])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rental-companies'] });
      toast({
        title: "Succès",
        description: "Compagnie créée avec succès",
      });
    },
    onError: (error) => {
      console.error('Error creating car rental company:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de la compagnie",
        variant: "destructive",
      });
    },
  });

  const updateCompany = useMutation({
    mutationFn: async ({ id, ...company }: any) => {
      const { data, error } = await supabase
        .from('partners')
        .update({
          ...company,
          business_type: 'car_rental',
          business_name: company.name,
          type: company.type
        })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rental-companies'] });
      toast({
        title: "Succès",
        description: "Compagnie mise à jour avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating car rental company:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour",
        variant: "destructive",
      });
    },
  });

  const deleteCompany = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rental-companies'] });
    },
    onError: (error) => {
      console.error('Error deleting car rental company:', error);
      throw error;
    },
  });

  return {
    data,
    isLoading,
    error,
    createCompany: createCompany.mutate,
    updateCompany: updateCompany.mutate,
    deleteCompany: deleteCompany.mutate,
    isCreating: createCompany.isPending,
    isUpdating: updateCompany.isPending,
    isDeleting: deleteCompany.isPending,
  };
};
