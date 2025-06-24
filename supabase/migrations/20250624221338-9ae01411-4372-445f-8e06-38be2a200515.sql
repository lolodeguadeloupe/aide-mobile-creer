
-- First, add the missing company_id column to car_rental_reservations if it doesn't exist
ALTER TABLE public.car_rental_reservations 
ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.partners(id);

-- Drop the existing policy to avoid conflicts
DROP POLICY IF EXISTS "Partners can view their reservations" ON public.car_rental_reservations;

-- Recreate the policy with the correct logic that uses the company_id column
CREATE POLICY "Partners can view their reservations" ON public.car_rental_reservations
FOR SELECT USING (
  company_id IN (
    SELECT company_id FROM public.fleet_managers 
    WHERE user_id = auth.uid()
  ) OR
  partner_id = auth.uid()
);
