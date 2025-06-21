
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface MainImageUploadProps {
  mainImage: string;
  onMainImageChange: (url: string) => void;
  onPreviewImage: (imageUrl: string) => void;
}

const MainImageUpload: React.FC<MainImageUploadProps> = ({
  mainImage,
  onMainImageChange,
  onPreviewImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
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
              onClick={() => onPreviewImage(mainImage)}
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
  );
};

export default MainImageUpload;
