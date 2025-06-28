
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Partner {
  id: number;
  business_name: string;
  business_type: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
  type: string | null; // This seems redundant with business_type, but keeping for schema accuracy
  image: string | null;
  location: string | null;
  rating: number | null;
  offer: string | null;
  icon_name: string | null;
  gallery_images: string[];
  status: string;
  weight: number | null;
}

// Helper function to convert database row to Partner
const convertToPartner = (row: any): Partner => {
  return {
    id: row.id,
    business_name: row.business_name,
    business_type: row.business_type,
    description: row.description,
    address: row.address,
    phone: row.phone,
    website: row.website,
    created_at: row.created_at,
    updated_at: row.updated_at,
    type: row.type,
    image: row.image,
    location: row.location,
    rating: row.rating,
    offer: row.offer,
    icon_name: row.icon_name,
    gallery_images: Array.isArray(row.gallery_images) ? row.gallery_images : [],
    status: row.status,
    weight: row.weight,
  };
};

// Helper function to convert Partner to database format
const convertToDbFormat = (partner: Omit<Partner, 'id' | 'created_at' | 'updated_at'>) => {
  return {
    business_name: partner.business_name,
    business_type: partner.business_type,
    description: partner.description,
    address: partner.address,
    phone: partner.phone,
    website: partner.website,
    type: partner.type,
    image: partner.image,
    location: partner.location,
    rating: partner.rating,
    offer: partner.offer,
    icon_name: partner.icon_name,
    gallery_images: partner.gallery_images as any,
    status: partner.status,
    weight: partner.weight,
  };
};

export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('weight', { ascending: false })
        .order('business_name');
      
      if (error) throw error;
      return data ? data.map(convertToPartner) : [];
    }
  });
};

export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (partner: Omit<Partner, 'id'>) => {
      const dbData = convertToDbFormat(partner);
      const { data, error } = await supabase
        .from('partners')
        .insert([dbData])
        .select()
        .single();
      
      if (error) throw error;
      return convertToPartner(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success('Partenaire créé avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la création:', error);
      toast.error('Erreur lors de la création du partenaire');
    }
  });
};

export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...partner }: Partner) => {
      const dbData = convertToDbFormat(partner);
      const { data, error } = await supabase
        .from('partners')
        .update(dbData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return convertToPartner(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success('Partenaire mis à jour avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour du partenaire');
    }
  });
};

export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      toast.success('Partenaire supprimé avec succès');
    },
    onError: (error) => {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression du partenaire');
    }
  });
};
