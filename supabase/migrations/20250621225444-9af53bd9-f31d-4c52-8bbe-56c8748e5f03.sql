
-- Add gallery_images column to car_rental_companies table if it doesn't exist
ALTER TABLE car_rental_companies 
ADD COLUMN IF NOT EXISTS gallery_images jsonb DEFAULT '[]'::jsonb;

-- Update existing records to have empty gallery if null
UPDATE car_rental_companies 
SET gallery_images = '[]'::jsonb 
WHERE gallery_images IS NULL;
