
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadManagerProps {
  mainImage: string;
  galleryImages: string[];
  onMainImageChange: (url: string) => void;
  onGalleryImagesChange: (urls: string[]) => void;
}

const ImageUploadManager: React.FC<ImageUploadManagerProps> = ({
  mainImage,
  galleryImages,
  onMainImageChange,
  onGalleryImagesChange
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const handleMainImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('L\'image ne doit pas dépasser 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onMainImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const openPreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Image principale */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image principale *
        </label>
        <div className="space-y-3">
          {mainImage && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={mainImage}
                alt="Image principale"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={() => openPreview(mainImage)}
              >
                <Eye size={16} />
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              {mainImage ? 'Changer l\'image' : 'Télécharger une image'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Galerie d'images */}
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
                    onClick={() => openPreview(image)}
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
        <input
          ref={galleryFileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImageUpload}
          className="hidden"
        />
      </div>

      {/* Modal de prévisualisation */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <Button
              onClick={closePreview}
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 z-10"
            >
              <X size={16} />
            </Button>
            <img
              src={previewImage}
              alt="Prévisualisation"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadManager;
