
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ImagePreviewModalProps {
  previewImage: string | null;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  previewImage,
  onClose
}) => {
  if (!previewImage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-full">
        <Button
          onClick={onClose}
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
  );
};

export default ImagePreviewModal;
