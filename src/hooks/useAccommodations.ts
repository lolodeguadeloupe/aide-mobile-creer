
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Accommodation {
  id: number;
  name: string;
  type: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  rooms: number;
  bathrooms: number;
  max_guests: number;
  image: string;
  gallery_images: any[];
  features: any[];
  amenities: any[];
  rules: any[];
  discount?: number;
}

export const useAccommodations = () => {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      return data as Accommodation[];
    }
  });
};

export const useCreateAccommodation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (accommodation: Omit<Accommodation, 'id'>) => {
      const { data, error } = await supabase
        .from('accommodations')
        .insert([accommodation])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      toast.success('Hébergement créé avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la création:', error);
      toast.error('Erreur lors de la création de l\'hébergement');
    }
  });
};

export const useUpdateAccommodation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...accommodation }: Accommodation) => {
      const { data, error } = await supabase
        .from('accommodations')
        .update(accommodation)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      toast.success('Hébergement mis à jour avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour de l\'hébergement');
    }
  });
};

export const useDeleteAccommodation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('accommodations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodations'] });
      toast.success('Hébergement supprimé avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression de l\'hébergement');
    }
  });
};
