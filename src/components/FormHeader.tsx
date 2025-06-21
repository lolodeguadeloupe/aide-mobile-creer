
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormHeaderProps {
  title: string;
  onClose: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="mr-3"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default FormHeader;
