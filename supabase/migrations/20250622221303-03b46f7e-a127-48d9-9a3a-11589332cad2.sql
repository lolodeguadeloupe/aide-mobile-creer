
-- Ajouter une politique pour permettre aux administrateurs de supprimer des offres de voyage
CREATE POLICY "Administrators can delete travel offers" 
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
