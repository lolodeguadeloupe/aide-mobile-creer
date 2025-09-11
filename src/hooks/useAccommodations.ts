
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Amenity {
  name: string;
  available: boolean;
}

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
  gallery_images: string[];
  features: string[];
  amenities: Amenity[];
  rules: string[];
  discount?: number;
}

// Helper function to convert database row to Accommodation
const convertToAccommodation = (row: any): Accommodation => {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    location: row.location,
    description: row.description,
    price: row.price,
    rating: row.rating,
    rooms: row.rooms,
    bathrooms: row.bathrooms,
    max_guests: row.max_guests,
    image: row.image,
    gallery_images: Array.isArray(row.gallery_images) ? row.gallery_images : [],
    features: Array.isArray(row.features) ? row.features : [],
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    rules: Array.isArray(row.rules) ? row.rules : [],
    discount: row.discount
  };
};

// Helper function to convert Accommodation to database format
const convertToDbFormat = (accommodation: Omit<Accommodation, 'id'>) => {
  return {
    name: accommodation.name,
    type: accommodation.type,
    location: accommodation.location,
    description: accommodation.description,
    price: accommodation.price,
    rating: accommodation.rating,
    rooms: accommodation.rooms,
    bathrooms: accommodation.bathrooms,
    max_guests: accommodation.max_guests,
    image: accommodation.image,
    gallery_images: accommodation.gallery_images as any,
    features: accommodation.features as any,
    amenities: accommodation.amenities as any,
    rules: accommodation.rules as any,
    discount: accommodation.discount
  };
};

export const useAccommodations = () => {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) throw error;
      return data ? data.map(convertToAccommodation) : [];
    }
  });
};

export const useCreateAccommodation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (accommodation: Omit<Accommodation, 'id'>) => {
      const dbData = convertToDbFormat(accommodation);
      const { data, error } = await supabase
        .from('accommodations')
        .insert([dbData])
        .select()
        .single();
      
      if (error) throw error;
      return convertToAccommodation(data);
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
      const dbData = convertToDbFormat(accommodation);
      const { data, error } = await supabase
        .from('accommodations')
        .update(dbData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return convertToAccommodation(data);
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
