
-- Add gallery_images column to travel_offers table
ALTER TABLE travel_offers 
ADD COLUMN IF NOT EXISTS gallery_images jsonb DEFAULT '[]'::jsonb;

-- Update existing records to have empty gallery if null
UPDATE travel_offers 
SET gallery_images = '[]'::jsonb 
WHERE gallery_images IS NULL;
