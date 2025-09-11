
-- Supprimer les anciennes politiques pour éviter les conflits
DROP POLICY IF EXISTS "Authenticated users can delete travel offers" ON public.travel_offers;
DROP POLICY IF EXISTS "Administrators can delete travel offers" ON public.travel_offers;

-- Créer une nouvelle politique pour permettre aux utilisateurs authentifiés de "soft delete" (désactiver)
CREATE POLICY "Authenticated users can deactivate travel offers" 
ON public.travel_offers 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Créer une politique spécifique pour permettre aux administrateurs de supprimer complètement
CREATE POLICY "Administrators can permanently delete travel offers" 
ON public.travel_offers 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);
