
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Récupérer le nombre d'éléments pour chaque table
      const [
        restaurantsCount,
        concertsCount,
        accommodationsCount,
        activitiesCount,
        leisureActivitiesCount,
        loisirsCount,
        nightlifeCount,
        travelOffersCount,
        promotionsCount,
        bonsPlansCount
      ] = await Promise.all([
        supabase.from('restaurants').select('*', { count: 'exact', head: true }),
        supabase.from('concerts').select('*', { count: 'exact', head: true }),
        supabase.from('accommodations').select('*', { count: 'exact', head: true }),
        supabase.from('activities').select('*', { count: 'exact', head: true }),
        supabase.from('leisure_activities').select('*', { count: 'exact', head: true }),
        supabase.from('loisirs').select('*', { count: 'exact', head: true }),
        supabase.from('nightlife_events').select('*', { count: 'exact', head: true }),
        supabase.from('travel_offers').select('*', { count: 'exact', head: true }),
        supabase.from('promotions').select('*', { count: 'exact', head: true }),
        supabase.from('bons_plans').select('*', { count: 'exact', head: true })
      ]);

      return {
        restaurants: restaurantsCount.count || 0,
        concerts: concertsCount.count || 0,
        accommodations: accommodationsCount.count || 0,
        activities: activitiesCount.count || 0,
        leisureActivities: leisureActivitiesCount.count || 0,
        loisirs: loisirsCount.count || 0,
        nightlife: nightlifeCount.count || 0,
        travelOffers: travelOffersCount.count || 0,
        promotions: promotionsCount.count || 0,
        bonsPlans: bonsPlansCount.count || 0
      };
    }
  });
};
