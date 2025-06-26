import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { MenuCategory, MenuItem } from './RestaurantForm';

interface RestaurantMenusSectionProps {
  menus: MenuCategory[];
  setMenus: (menus: MenuCategory[]) => void;
}

const RestaurantMenusSection: React.FC<RestaurantMenusSectionProps> = ({ menus, setMenus }) => {
  const safeMenus = Array.isArray(menus) ? menus : [];

  // Ajout d'une catégorie
  const addCategory = () => {
    setMenus([...safeMenus, { name: '', items: [] }]);
  };

  // Suppression d'une catégorie
  const removeCategory = (catIdx: number) => {
    setMenus(safeMenus.filter((_, idx) => idx !== catIdx));
  };

  // Modification du nom d'une catégorie
  const updateCategoryName = (catIdx: number, name: string) => {
    setMenus(safeMenus.map((cat, idx) => idx === catIdx ? { ...cat, name } : cat));
  };

  // Ajout d'un item dans une catégorie
  const addItem = (catIdx: number) => {
    setMenus(safeMenus.map((cat, idx) => idx === catIdx ? { ...cat, items: [...cat.items, { name: '', price: 0 }] } : cat));
  };

  // Suppression d'un item
  const removeItem = (catIdx: number, itemIdx: number) => {
    setMenus(safeMenus.map((cat, idx) => idx === catIdx ? { ...cat, items: cat.items.filter((_, i) => i !== itemIdx) } : cat));
  };

  // Modification d'un item
  const updateItem = (catIdx: number, itemIdx: number, field: keyof MenuItem, value: string | number) => {
    setMenus(safeMenus.map((cat, idx) => {
      if (idx !== catIdx) return cat;
      return {
        ...cat,
        items: cat.items.map((item, i) => i === itemIdx ? { ...item, [field]: value } : item)
      };
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Menus</h2>
      {safeMenus.map((cat, catIdx) => (
        <div key={catIdx} className="mb-6 border-b pb-4">
          <div className="flex items-center mb-2">
            <Input
              type="text"
              value={cat.name}
              onChange={e => updateCategoryName(catIdx, e.target.value)}
              placeholder="Nom de la catégorie (ex: Entrées, Plats...)"
              className="flex-1 mr-2"
              required
            />
            <Button type="button" variant="destructive" onClick={() => removeCategory(catIdx)}>
              Supprimer catégorie
            </Button>
          </div>
          <div className="space-y-2 ml-4">
            {cat.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={item.name}
                  onChange={e => updateItem(catIdx, itemIdx, 'name', e.target.value)}
                  placeholder="Nom de l'item (ex: Salade César)"
                  required
                />
                <Input
                  type="number"
                  value={item.price}
                  min={0}
                  step={0.01}
                  onChange={e => updateItem(catIdx, itemIdx, 'price', parseFloat(e.target.value) || 0)}
                  placeholder="Prix (€)"
                  required
                />
                <Input
                  type="text"
                  value={item.description || ''}
                  onChange={e => updateItem(catIdx, itemIdx, 'description', e.target.value)}
                  placeholder="Description (optionnelle)"
                />
                <Button type="button" variant="destructive" onClick={() => removeItem(catIdx, itemIdx)}>
                  Supprimer
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => addItem(catIdx)}>
              Ajouter un item
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" onClick={addCategory}>
        Ajouter une catégorie
      </Button>
    </div>
  );
};

export default RestaurantMenusSection; 