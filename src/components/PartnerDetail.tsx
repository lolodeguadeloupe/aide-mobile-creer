import React from 'react';
import { ArrowLeft, Edit, Trash2, Phone, Globe, MapPin, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { usePartners, useDeletePartner, useUsers } from '@/hooks/usePartners';
import type { Tables } from '@/integrations/supabase/types';

type Partner = Tables<'partners'>;

interface PartnerWithUserId extends Partner {
  user_id?: string;
}

const PartnerDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: partners } = usePartners();
  const { data: users } = useUsers();
  const deletePartner = useDeletePartner();
  
  const partner = partners?.find(p => p.id === id);
  const assignedUser = partner && (partner as PartnerWithUserId).user_id 
    ? users?.find(u => u.id === (partner as PartnerWithUserId).user_id)
    : null;

  const handleDelete = async () => {
    if (!partner || !window.confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return;
    
    try {
      await deletePartner.mutateAsync(partner.id);
      navigate('/partners');
    } catch (error) {
      console.error("Erreur lors de la suppression du partenaire", error);
    }
  };

  const handleEdit = () => {
    navigate(`/partners/${id}/edit`);
  };

  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Partenaire introuvable</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/partners')}
              className="mr-3"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Détails du partenaire</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
            >
              <Edit size={16} className="mr-2" />
              Modifier
            </Button>
            <Button
              onClick={handleDelete}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={16} className="mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Main Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start gap-6 mb-6">
            <img
              src={partner.image || '/placeholder.svg'}
              alt={partner.business_name}
              className="w-24 h-24 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {partner.business_name}
              </h2>
              <p className="text-lg text-gray-600 mb-2">{partner.business_type}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={16} />
                <span>{partner.location || 'Localisation non spécifiée'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Informations générales</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Offre:</span>
                    <span className="text-gray-600">{partner.offer || 'Non spécifiée'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    <span className="font-medium text-gray-700">Note:</span>
                    <span className="text-gray-600">{partner.rating || 0}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Statut:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      partner.status === 'actif' 
                        ? 'bg-green-100 text-green-800'
                        : partner.status === 'en_attente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {partner.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Utilisateur assigné */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Utilisateur responsable</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {assignedUser ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{assignedUser.email}</p>
                        {assignedUser.first_name && assignedUser.last_name && (
                          <p className="text-sm text-gray-600">
                            {assignedUser.first_name} {assignedUser.last_name}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-gray-500">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <p>Aucun utilisateur assigné</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
                <div className="space-y-2">
                  {partner.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <a 
                        href={`tel:${partner.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {partner.phone}
                      </a>
                    </div>
                  )}
                  {partner.website && (
                    <div className="flex items-center gap-2">
                      <Globe size={16} className="text-gray-500" />
                      <a 
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {partner.website}
                      </a>
                    </div>
                  )}
                  {partner.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-gray-600">{partner.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Informations techniques */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Informations techniques</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID:</span>
                    <span className="font-mono text-gray-800">{partner.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Créé le:</span>
                    <span className="text-gray-800">
                      {new Date(partner.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Modifié le:</span>
                    <span className="text-gray-800">
                      {new Date(partner.updated_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {partner.weight && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Poids:</span>
                      <span className="text-gray-800">{partner.weight}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {partner.description && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{partner.description}</p>
          </div>
        )}

        {/* Gallery */}
        {partner.gallery_images && partner.gallery_images.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Galerie d'images</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partner.gallery_images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${partner.business_name} - Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDetail;