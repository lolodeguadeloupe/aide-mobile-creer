
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNightlifeEvents = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch nightlife events
  const { data, isLoading, error } = useQuery({
    queryKey: ['nightlife-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nightlife_events')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  // Create nightlife event
  const createEvent = useMutation({
    mutationFn: async (event: any) => {
      const { data, error } = await supabase
        .from('nightlife_events')
        .insert([event])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nightlife-events'] });
      toast({
        title: "Succès",
        description: "Soirée créée avec succès",
      });
    },
    onError: (error) => {
      console.error('Error creating event:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création de la soirée",
        variant: "destructive",
      });
    },
  });

  // Update nightlife event
  const updateEvent = useMutation({
    mutationFn: async ({ id, ...event }: any) => {
      const { data, error } = await supabase
        .from('nightlife_events')
        .update(event)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nightlife-events'] });
      toast({
        title: "Succès",
        description: "Soirée mise à jour avec succès",
      });
    },
    onError: (error) => {
      console.error('Error updating event:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de la soirée",
        variant: "destructive",
      });
    },
  });

  // Delete nightlife event
  const deleteEvent = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('nightlife_events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nightlife-events'] });
    },
    onError: (error) => {
      console.error('Error deleting event:', error);
      throw error;
    },
  });

  return {
    data,
    isLoading,
    error,
    createEvent: createEvent.mutate,
    updateEvent: updateEvent.mutate,
    deleteEvent: deleteEvent.mutate,
    isCreating: createEvent.isPending,
    isUpdating: updateEvent.isPending,
    isDeleting: deleteEvent.isPending,
  };
};
