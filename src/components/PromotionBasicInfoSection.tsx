
import React from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PromotionBasicInfoSectionProps {
  formData: {
    title: string;
    description: string;
    image: string;
    gallery_images: string[];
    badge: string;
    cta_text: string;
    cta_url: string;
    sort_order: number;
    is_active: boolean;
  };
  onInputChange: (field: string, value: any) => void;
}

const PromotionBasicInfoSection: React.FC<PromotionBasicInfoSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Informations générales</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Title */}
        <div>
          <Label htmlFor="title">Titre *</Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="Titre de la promotion"
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description *</Label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Description de la promotion"
            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            rows={3}
            required
          />
        </div>

        {/* Badge */}
        <div>
          <Label htmlFor="badge">Badge (optionnel)</Label>
          <Input
            id="badge"
            type="text"
            value={formData.badge}
            onChange={(e) => onInputChange('badge', e.target.value)}
            placeholder="Ex: NOUVEAU, -50%, LIMITÉ"
          />
        </div>

        {/* CTA Text */}
        <div>
          <Label htmlFor="cta_text">Texte du bouton d'action *</Label>
          <Input
            id="cta_text"
            type="text"
            value={formData.cta_text}
            onChange={(e) => onInputChange('cta_text', e.target.value)}
            placeholder="Ex: Voir l'offre, Réserver maintenant"
            required
          />
        </div>

        {/* CTA URL */}
        <div>
          <Label htmlFor="cta_url">URL du bouton d'action</Label>
          <Input
            id="cta_url"
            type="text"
            value={formData.cta_url}
            onChange={(e) => onInputChange('cta_url', e.target.value)}
            placeholder="Ex: /hebergements, https://example.com/promotion"
            autoComplete="off"
            spellCheck="false"
            pattern=".*"
          />
        </div>

        {/* Sort Order */}
        <div>
          <Label htmlFor="sort_order">Ordre d'affichage</Label>
          <Input
            id="sort_order"
            type="number"
            value={formData.sort_order}
            onChange={(e) => onInputChange('sort_order', parseInt(e.target.value) || 0)}
            placeholder="0"
            min="0"
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) => onInputChange('is_active', checked)}
          />
          <Label htmlFor="is_active">Promotion active</Label>
        </div>
      </div>
    </div>
  );
};

export default PromotionBasicInfoSection;
