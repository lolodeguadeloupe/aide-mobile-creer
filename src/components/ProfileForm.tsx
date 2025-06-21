
import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProfileFormProps {
  initialFirstName: string;
  initialLastName: string;
  onSave: (data: { first_name: string; last_name: string }) => Promise<boolean>;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialFirstName,
  initialLastName,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    first_name: initialFirstName,
    last_name: initialLastName
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const success = await onSave(formData);
    setSaving(false);
    if (success) {
      onCancel(); // Close edit mode
    }
  };

  return (
    <div className="w-full max-w-sm space-y-3">
      <Input
        placeholder="Prénom"
        value={formData.first_name}
        onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
      />
      <Input
        placeholder="Nom"
        value={formData.last_name}
        onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <Save size={16} className="mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
