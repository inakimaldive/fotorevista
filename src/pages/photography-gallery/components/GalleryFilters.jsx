import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const GalleryFilters = ({ onFiltersChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'landscape', label: 'Paisajes' },
    { value: 'portrait', label: 'Retratos' },
    { value: 'street', label: 'Fotografía Urbana' },
    { value: 'nature', label: 'Naturaleza' },
    { value: 'architecture', label: 'Arquitectura' },
    { value: 'macro', label: 'Macro' },
    { value: 'wedding', label: 'Bodas' },
    { value: 'fashion', label: 'Moda' },
    { value: 'documentary', label: 'Documental' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'popular', label: 'Más populares' },
    { value: 'rating', label: 'Mejor valoradas' },
    { value: 'views', label: 'Más vistas' },
    { value: 'editor', label: 'Selección del editor' },
  ];

  const locationOptions = [
    { value: 'all', label: 'Todas las ubicaciones' },
    { value: 'spain', label: 'España' },
    { value: 'europe', label: 'Europa' },
    { value: 'america', label: 'América' },
    { value: 'asia', label: 'Asia' },
    { value: 'africa', label: 'África' },
    { value: 'oceania', label: 'Oceanía' },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleCheckboxChange = (key, checked) => {
    const newFilters = { ...activeFilters, [key]: checked };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: 'all',
      sort: 'newest',
      location: 'all',
      awardWinners: false,
      editorChoice: false,
      highResolution: false,
      recentlyAdded: false,
    };
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = () => {
    return (
      activeFilters.category !== 'all' ||
      activeFilters.sort !== 'newest' ||
      activeFilters.location !== 'all' ||
      activeFilters.awardWinners ||
      activeFilters.editorChoice ||
      activeFilters.highResolution ||
      activeFilters.recentlyAdded
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          <span className="flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filtros</span>
            {hasActiveFilters() && (
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs">
                Activos
              </span>
            )}
          </span>
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block mt-4 lg:mt-0`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <Select
              label="Categoría"
              options={categoryOptions}
              value={activeFilters.category}
              onChange={(value) => handleFilterChange('category', value)}
              className="w-full"
            />
          </div>

          {/* Sort Filter */}
          <div>
            <Select
              label="Ordenar por"
              options={sortOptions}
              value={activeFilters.sort}
              onChange={(value) => handleFilterChange('sort', value)}
              className="w-full"
            />
          </div>

          {/* Location Filter */}
          <div>
            <Select
              label="Ubicación"
              options={locationOptions}
              value={activeFilters.location}
              onChange={(value) => handleFilterChange('location', value)}
              className="w-full"
            />
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-primary">
              Filtros rápidos
            </label>
            <div className="space-y-2">
              <Checkbox
                label="Solo premiadas"
                checked={activeFilters.awardWinners}
                onChange={(e) => handleCheckboxChange('awardWinners', e.target.checked)}
              />
              <Checkbox
                label="Selección del editor"
                checked={activeFilters.editorChoice}
                onChange={(e) => handleCheckboxChange('editorChoice', e.target.checked)}
              />
              <Checkbox
                label="Alta resolución"
                checked={activeFilters.highResolution}
                onChange={(e) => handleCheckboxChange('highResolution', e.target.checked)}
              />
              <Checkbox
                label="Añadidas recientemente"
                checked={activeFilters.recentlyAdded}
                onChange={(e) => handleCheckboxChange('recentlyAdded', e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters() && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center space-x-2"
            >
              <Icon name="RotateCcw" size={16} />
              <span>Limpiar filtros</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryFilters;