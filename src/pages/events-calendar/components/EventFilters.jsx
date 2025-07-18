import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EventFilters = ({ onFiltersChange, isOpen, onToggle }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [skillLevel, setSkillLevel] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [eventType, setEventType] = useState('all');

  const categories = [
    { id: 'exposiciones', label: 'Exposiciones' },
    { id: 'talleres', label: 'Talleres' },
    { id: 'concursos', label: 'Concursos' },
    { id: 'conferencias', label: 'Conferencias' },
    { id: 'encuentros', label: 'Encuentros' },
    { id: 'online', label: 'Eventos Online' }
  ];

  const regions = [
    { id: 'madrid', label: 'Madrid' },
    { id: 'barcelona', label: 'Barcelona' },
    { id: 'valencia', label: 'Valencia' },
    { id: 'sevilla', label: 'Sevilla' },
    { id: 'bilbao', label: 'Bilbao' },
    { id: 'zaragoza', label: 'Zaragoza' },
    { id: 'malaga', label: 'Málaga' },
    { id: 'murcia', label: 'Murcia' },
    { id: 'palma', label: 'Palma de Mallorca' },
    { id: 'las-palmas', label: 'Las Palmas' },
    { id: 'mexico', label: 'México' },
    { id: 'argentina', label: 'Argentina' },
    { id: 'colombia', label: 'Colombia' },
    { id: 'chile', label: 'Chile' }
  ];

  const priceOptions = [
    { value: 'all', label: 'Todos los precios' },
    { value: 'free', label: 'Gratuitos' },
    { value: '0-25', label: '0€ - 25€' },
    { value: '25-50', label: '25€ - 50€' },
    { value: '50-100', label: '50€ - 100€' },
    { value: '100+', label: 'Más de 100€' }
  ];

  const skillOptions = [
    { value: 'all', label: 'Todos los niveles' },
    { value: 'principiante', label: 'Principiante' },
    { value: 'intermedio', label: 'Intermedio' },
    { value: 'avanzado', label: 'Avanzado' },
    { value: 'profesional', label: 'Profesional' }
  ];

  const dateOptions = [
    { value: 'all', label: 'Todas las fechas' },
    { value: 'today', label: 'Hoy' },
    { value: 'tomorrow', label: 'Mañana' },
    { value: 'this-week', label: 'Esta semana' },
    { value: 'next-week', label: 'Próxima semana' },
    { value: 'this-month', label: 'Este mes' },
    { value: 'next-month', label: 'Próximo mes' }
  ];

  const eventTypeOptions = [
    { value: 'all', label: 'Todos los tipos' },
    { value: 'presencial', label: 'Presencial' },
    { value: 'online', label: 'Online' },
    { value: 'hibrido', label: 'Híbrido' }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    
    setSelectedCategories(newCategories);
    applyFilters({ categories: newCategories });
  };

  const handleRegionChange = (regionId, checked) => {
    const newRegions = checked
      ? [...selectedRegions, regionId]
      : selectedRegions.filter(id => id !== regionId);
    
    setSelectedRegions(newRegions);
    applyFilters({ regions: newRegions });
  };

  const applyFilters = (updates = {}) => {
    const filters = {
      categories: selectedCategories,
      regions: selectedRegions,
      priceRange,
      skillLevel,
      dateRange,
      eventType,
      ...updates
    };
    
    onFiltersChange?.(filters);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
    setPriceRange('all');
    setSkillLevel('all');
    setDateRange('all');
    setEventType('all');
    
    onFiltersChange?.({
      categories: [],
      regions: [],
      priceRange: 'all',
      skillLevel: 'all',
      dateRange: 'all',
      eventType: 'all'
    });
  };

  const hasActiveFilters = 
    selectedCategories.length > 0 ||
    selectedRegions.length > 0 ||
    priceRange !== 'all' ||
    skillLevel !== 'all' ||
    dateRange !== 'all' ||
    eventType !== 'all';

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Date Range */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Fecha del evento
        </h3>
        <Select
          options={dateOptions}
          value={dateRange}
          onChange={(value) => {
            setDateRange(value);
            applyFilters({ dateRange: value });
          }}
          placeholder="Seleccionar fecha"
        />
      </div>

      {/* Event Type */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Tipo de evento
        </h3>
        <Select
          options={eventTypeOptions}
          value={eventType}
          onChange={(value) => {
            setEventType(value);
            applyFilters({ eventType: value });
          }}
          placeholder="Seleccionar tipo"
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

      {/* Regions */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Ubicación
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {regions.map((region) => (
            <Checkbox
              key={region.id}
              label={region.label}
              checked={selectedRegions.includes(region.id)}
              onChange={(e) => handleRegionChange(region.id, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Precio
        </h3>
        <Select
          options={priceOptions}
          value={priceRange}
          onChange={(value) => {
            setPriceRange(value);
            applyFilters({ priceRange: value });
          }}
          placeholder="Seleccionar precio"
        />
      </div>

      {/* Skill Level */}
      <div>
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Nivel requerido
        </h3>
        <Select
          options={skillOptions}
          value={skillLevel}
          onChange={(value) => {
            setSkillLevel(value);
            applyFilters({ skillLevel: value });
          }}
          placeholder="Seleccionar nivel"
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full"
          >
            <Icon name="RotateCcw" size={16} className="mr-2" />
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
              Filtrar Eventos
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-text-secondary hover:text-accent"
            >
              <Icon name="X" size={20} />
            </Button>
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
                  Filtrar Eventos
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="text-text-secondary hover:text-accent"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <FilterContent />
              <div className="mt-6 pt-4 border-t border-border">
                <Button onClick={onToggle} className="w-full">
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

export default EventFilters;