
import React from 'react';
import { Button } from '@/components/ui/button';

interface CarModelFormActionsProps {
  onClose: () => void;
  isCreating: boolean;
  isUpdating: boolean;
}

const CarModelFormActions: React.FC<CarModelFormActionsProps> = ({
  onClose,
  isCreating,
  isUpdating
}) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button type="button" variant="outline" onClick={onClose}>
        Annuler
      </Button>
      <Button 
        type="submit" 
        disabled={isCreating || isUpdating}
      >
        {isCreating || isUpdating ? 'Enregistrement...' : 'Enregistrer'}
      </Button>
    </div>
  );
};

export default CarModelFormActions;
