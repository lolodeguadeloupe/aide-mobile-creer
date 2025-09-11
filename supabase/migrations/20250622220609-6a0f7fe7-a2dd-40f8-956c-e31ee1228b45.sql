
-- Activer RLS sur la table travel_offers si ce n'est pas déjà fait
ALTER TABLE public.travel_offers ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Allow public read access" ON public.travel_offers;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.travel_offers;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON public.travel_offers;
DROP POLICY IF EXISTS "Allow authenticated users to delete" ON public.travel_offers;

-- Politique pour permettre la lecture publique des offres actives
CREATE POLICY "Public can view active travel offers" 
ON public.travel_offers 
FOR SELECT 
USING (is_active = true);

-- Politique pour permettre aux utilisateurs authentifiés de créer des offres
CREATE POLICY "Authenticated users can create travel offers" 
ON public.travel_offers 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Politique pour permettre aux utilisateurs authentifiés de modifier toutes les offres
CREATE POLICY "Authenticated users can update travel offers" 
ON public.travel_offers 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Politique pour permettre aux utilisateurs authentifiés de supprimer (désactiver) des offres
CREATE POLICY "Authenticated users can delete travel offers" 
ON public.travel_offers 
FOR DELETE 
TO authenticated
USING (true);
