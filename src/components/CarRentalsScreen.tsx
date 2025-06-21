
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Building, Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarRentalCompaniesList from './CarRentalCompaniesList';
import CarRentalCompanyForm from './CarRentalCompanyForm';

const CarRentalsScreen = () => {
  const navigate = useNavigate();
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleEditCompany = (company: any) => {
    setEditingCompany(company);
    setShowCompanyForm(true);
  };

  const handleCloseCompanyForm = () => {
    setShowCompanyForm(false);
    setEditingCompany(null);
  };

  const handleNewCompany = () => {
    setEditingCompany(null);
    setShowCompanyForm(true);
  };

  if (showCompanyForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={handleCloseCompanyForm}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à la liste
          </Button>
        </div>
        <CarRentalCompanyForm
          company={editingCompany}
          onClose={handleCloseCompanyForm}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Locations de Voitures</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="companies" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="companies" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Compagnies
              </TabsTrigger>
              <TabsTrigger value="models" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Modèles
              </TabsTrigger>
            </TabsList>
            
            <Button onClick={handleNewCompany}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle compagnie
            </Button>
          </div>

          <TabsContent value="companies">
            <CarRentalCompaniesList onEditCompany={handleEditCompany} />
          </TabsContent>
          
          <TabsContent value="models">
            <div className="text-center p-8">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Gestion des modèles de voitures à venir...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CarRentalsScreen;
