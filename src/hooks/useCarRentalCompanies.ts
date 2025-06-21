
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCarRentalCompanies = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all car rental companies
  const { data, isLoading, error } = useQuery({
    queryKey: ['car-rental-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('car_rental_companies')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      // Parse gallery_images JSON for each company
      return data?.map(company => ({
        ...company,
        gallery_images: company.gallery_images || []
      }));
    },
  });

  // Create car rental company
  const createCompany = useMutation({
    mutationFn: async (company: any) => {
      // Ensure gallery_images is properly formatted
      const companyData = {
        ...company,
        gallery_images: typeof company.gallery_images === 'string' 
          ? JSON.parse(company.gallery_images) 
          : company.gallery_images || []
      };

      const { data, error } = await supabase
        .from('car_rental_companies')
        .insert([companyData])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car-rental-companies'] });
      toast({
        title: "Succès",
        description: "Compagnie de location créée avec succès",
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
      // Ensure gallery_images is properly formatted
      const companyData = {
        ...company,
        gallery_images: typeof company.gallery_images === 'string' 
          ? JSON.parse(company.gallery_images) 
          : company.gallery_images || []
      };

      const { data, error } = await supabase
        .from('car_rental_companies')
        .update(companyData)
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
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('car_rental_companies')
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
