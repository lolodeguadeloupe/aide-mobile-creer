
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCarRentals = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all car models with their companies
  const { data, isLoading, error } = useQuery({
    queryKey: ['car-models-with-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('car_models')
        .select(`
          *,
          partners (
            id,
            business_name,
            location,
            type,
            rating
          )
        `)
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};
