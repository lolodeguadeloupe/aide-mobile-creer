
import React from 'react';
import ImageUploadManager from './ImageUploadManager';

interface PromotionImagesSectionProps {
  mainImage: string;
  galleryImages: string[];
  onMainImageChange: (url: string) => void;
  onGalleryImagesChange: (urls: string[]) => void;
}

const PromotionImagesSection: React.FC<PromotionImagesSectionProps> = ({
  mainImage,
  galleryImages,
  onMainImageChange,
  onGalleryImagesChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Images de la promotion</h2>
      <ImageUploadManager
        mainImage={mainImage}
        galleryImages={galleryImages}
        onMainImageChange={onMainImageChange}
        onGalleryImagesChange={onGalleryImagesChange}
      />
    </div>
  );
};

export default PromotionImagesSection;
