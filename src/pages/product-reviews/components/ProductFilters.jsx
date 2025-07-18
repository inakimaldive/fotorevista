import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProductFilters = ({ onFiltersChange, isOpen, onToggle }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minRating, setMinRating] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'cameras', label: 'Cámaras' },
    { id: 'lenses', label: 'Objetivos' },
    { id: 'accessories', label: 'Accesorios' },
    { id: 'lighting', label: 'Iluminación' },
    { id: 'tripods', label: 'Trípodes' },
    { id: 'software', label: 'Software' },
  ];

  const brands = [
    { id: 'canon', label: 'Canon' },
    { id: 'nikon', label: 'Nikon' },
    { id: 'sony', label: 'Sony' },
    { id: 'fujifilm', label: 'Fujifilm' },
    { id: 'panasonic', label: 'Panasonic' },
    { id: 'olympus', label: 'Olympus' },
    { id: 'leica', label: 'Leica' },
    { id: 'sigma', label: 'Sigma' },
    { id: 'tamron', label: 'Tamron' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'rating', label: 'Mejor valorados' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'recommended', label: 'Recomendados' },
    { value: 'popular', label: 'Más populares' },
  ];

  const ratingOptions = [
    { value: '', label: 'Todas las valoraciones' },
    { value: '4', label: '4+ estrellas' },
    { value: '3', label: '3+ estrellas' },
    { value: '2', label: '2+ estrellas' },
    { value: '1', label: '1+ estrellas' },
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(newCategories);
    onFiltersChange?.({ categories: newCategories });
  };

  const handleBrandChange = (brandId, checked) => {
    const newBrands = checked
      ? [...selectedBrands, brandId]
      : selectedBrands.filter(id => id !== brandId);
    setSelectedBrands(newBrands);
    onFiltersChange?.({ brands: newBrands });
  };

  const handlePriceRangeChange = (field, value) => {
    const newPriceRange = { ...priceRange, [field]: value };
    setPriceRange(newPriceRange);
    onFiltersChange?.({ priceRange: newPriceRange });
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: '', max: '' });
    setMinRating('');
    setSortBy('newest');
    onFiltersChange?.({ 
      categories: [], 
      brands: [], 
      priceRange: { min: '', max: '' }, 
      minRating: '', 
      sortBy: 'newest' 
    });
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || 
                          priceRange.min || priceRange.max || minRating || sortBy !== 'newest';

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort By */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Ordenar por
        </h3>
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(value) => {
            setSortBy(value);
            onFiltersChange?.({ sortBy: value });
          }}
          placeholder="Seleccionar orden"
        />
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Rango de precio (€)
        </h3>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Mín"
            value={priceRange.min}
            onChange={(e) => handlePriceRangeChange('min', e.target.value)}
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="number"
            placeholder="Máx"
            value={priceRange.max}
            onChange={(e) => handlePriceRangeChange('max', e.target.value)}
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Valoración mínima
        </h3>
        <Select
          options={ratingOptions}
          value={minRating}
          onChange={(value) => {
            setMinRating(value);
            onFiltersChange?.({ minRating: value });
          }}
          placeholder="Seleccionar valoración"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Categorías
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              label={category.label}
              checked={selectedCategories.includes(category.id)}
              onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Marcas
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <Checkbox
              key={brand.id}
              label={brand.label}
              checked={selectedBrands.includes(brand.id)}
              onChange={(e) => handleBrandChange(brand.id, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block lg:fixed left-0 top-20 h-[calc(100vh-5rem)] w-80 bg-surface border-r border-border overflow-y-auto z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Filtrar Productos
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              iconName="X"
              iconSize={20}
            />
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={onToggle} />
          <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-lg max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-heading font-semibold text-text-primary">
                  Filtrar Productos
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  iconName="X"
                  iconSize={20}
                />
              </div>
              <FilterContent />
              <div className="flex space-x-3 pt-6 border-t border-border mt-6">
                <Button
                  onClick={onToggle}
                  className="flex-1"
                >
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;