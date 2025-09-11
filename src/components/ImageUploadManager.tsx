
import React, { useState } from 'react';
import MainImageUpload from './MainImageUpload';
import GalleryImageUpload from './GalleryImageUpload';
import ImagePreviewModal from './ImagePreviewModal';

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

  const openPreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="space-y-6">
      <MainImageUpload
        mainImage={mainImage}
        onMainImageChange={onMainImageChange}
        onPreviewImage={openPreview}
      />

      <GalleryImageUpload
        galleryImages={galleryImages}
        onGalleryImagesChange={onGalleryImagesChange}
        onPreviewImage={openPreview}
      />

      <ImagePreviewModal
        previewImage={previewImage}
        onClose={closePreview}
      />
    </div>
  );
};

export default ImageUploadManager;
