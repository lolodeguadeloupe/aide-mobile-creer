
import React from 'react';
import ImageUploadManager from './ImageUploadManager';

interface TravelOfferImagesSectionProps {
  mainImage: string;
  galleryImages: string[];
  onMainImageChange: (url: string) => void;
  onGalleryImagesChange: (urls: string[]) => void;
}

const TravelOfferImagesSection: React.FC<TravelOfferImagesSectionProps> = ({
  mainImage,
  galleryImages,
  onMainImageChange,
  onGalleryImagesChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Images de l'offre</h2>
      <ImageUploadManager
        mainImage={mainImage}
        galleryImages={galleryImages}
        onMainImageChange={onMainImageChange}
        onGalleryImagesChange={onGalleryImagesChange}
      />
    </div>
  );
};

export default TravelOfferImagesSection;
