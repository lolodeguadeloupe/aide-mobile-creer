import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Partner {
  id: string;
  business_name: string;
  business_type: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
  type: string | null;
  image: string | null;
  location: string | null;
  rating: number | null;
  offer: string | null;
  icon_name: string | null;
  gallery_images: string[];
  status: string;
  weight: number | null;
  user_id: string | null;
}

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
      return data || [];
    }
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .order('email');
      
      if (error) throw error;
      return data || [];
    }
  });
};

export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (partner: Omit<Partner, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('partners')
        .insert([{
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
          gallery_images: partner.gallery_images,
          status: partner.status,
          // weight: partner.weight, // Commenté temporairement si pas en base
          // user_id: partner.user_id, // Commenté temporairement si pas en base
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
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
      const { data, error } = await supabase
        .from('partners')
        .update({
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
          gallery_images: partner.gallery_images,
          status: partner.status,
          // weight: partner.weight, // Commenté temporairement si pas en base
          // user_id: partner.user_id, // Commenté temporairement si pas en base
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
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
    mutationFn: async (id: string) => {
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