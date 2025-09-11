
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Eye, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryImageUploadProps {
  galleryImages: string[];
  onGalleryImagesChange: (urls: string[]) => void;
  onPreviewImage: (imageUrl: string) => void;
}

const GalleryImageUpload: React.FC<GalleryImageUploadProps> = ({
  galleryImages,
  onGalleryImagesChange,
  onPreviewImage
}) => {
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const galleryCameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length + galleryImages.length > 10) {
      toast.error('Maximum 10 images dans la galerie');
      return;
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} ne doit pas dépasser 5MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onGalleryImagesChange([...galleryImages, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index: number) => {
    const newImages = galleryImages.filter((_, i) => i !== index);
    onGalleryImagesChange(newImages);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Galerie d'images ({galleryImages.length}/10)
      </label>
      
      {galleryImages.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-3">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative">
              <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt={`Galerie ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1 right-1 flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  className="h-6 w-6 p-0"
                  onClick={() => onPreviewImage(image)}
                >
                  <Eye size={12} />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="h-6 w-6 p-0"
                  onClick={() => removeGalleryImage(index)}
                >
                  <X size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        <Button
          type="button"
          variant="outline"
          onClick={() => galleryFileInputRef.current?.click()}
          disabled={galleryImages.length >= 10}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          Ajouter des images ({galleryImages.length}/10)
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => galleryCameraInputRef.current?.click()}
          disabled={galleryImages.length >= 10}
          className="flex items-center gap-2"
        >
          <Camera size={16} />
          Prendre une photo
        </Button>
        <input
          ref={galleryFileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <input
          ref={galleryCameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default GalleryImageUpload;
