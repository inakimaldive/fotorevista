import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { Checkbox } from './Checkbox';
import Select from './Select';

const FilterSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const getFiltersForRoute = () => {
    const route = location.pathname;
    
    switch (route) {
      case '/photography-gallery':
        return {
          title: 'Filtrar Galerías',
          categories: [
            { id: 'landscape', label: 'Paisajes' },
            { id: 'portrait', label: 'Retratos' },
            { id: 'street', label: 'Fotografía Urbana' },
            { id: 'nature', label: 'Naturaleza' },
            { id: 'architecture', label: 'Arquitectura' },
            { id: 'macro', label: 'Macro' },
          ],
          tags: [
            { id: 'black-white', label: 'Blanco y Negro' },
            { id: 'color', label: 'Color' },
            { id: 'digital', label: 'Digital' },
            { id: 'film', label: 'Película' },
            { id: 'professional', label: 'Profesional' },
            { id: 'amateur', label: 'Amateur' },
          ]
        };
      
      case '/product-reviews':
        return {
          title: 'Filtrar Productos',
          categories: [
            { id: 'cameras', label: 'Cámaras' },
            { id: 'lenses', label: 'Objetivos' },
            { id: 'accessories', label: 'Accesorios' },
            { id: 'lighting', label: 'Iluminación' },
            { id: 'tripods', label: 'Trípodes' },
            { id: 'software', label: 'Software' },
          ],
          tags: [
            { id: 'budget', label: 'Económico' },
            { id: 'premium', label: 'Premium' },
            { id: 'beginner', label: 'Principiante' },
            { id: 'professional', label: 'Profesional' },
            { id: 'recommended', label: 'Recomendado' },
            { id: 'new-release', label: 'Nuevo Lanzamiento' },
          ]
        };
      
      case '/events-calendar':
        return {
          title: 'Filtrar Eventos',
          categories: [
            { id: 'workshops', label: 'Talleres' },
            { id: 'exhibitions', label: 'Exposiciones' },
            { id: 'competitions', label: 'Concursos' },
            { id: 'conferences', label: 'Conferencias' },
            { id: 'meetups', label: 'Encuentros' },
            { id: 'online', label: 'Online' },
          ],
          tags: [
            { id: 'free', label: 'Gratuito' },
            { id: 'paid', label: 'De Pago' },
            { id: 'madrid', label: 'Madrid' },
            { id: 'barcelona', label: 'Barcelona' },
            { id: 'valencia', label: 'Valencia' },
            { id: 'international', label: 'Internacional' },
          ]
        };
      
      case '/photographer-profiles':
        return {
          title: 'Filtrar Fotógrafos',
          categories: [
            { id: 'wedding', label: 'Bodas' },
            { id: 'fashion', label: 'Moda' },
            { id: 'commercial', label: 'Comercial' },
            { id: 'documentary', label: 'Documental' },
            { id: 'fine-art', label: 'Arte' },
            { id: 'photojournalism', label: 'Fotoperiodismo' },
          ],
          tags: [
            { id: 'emerging', label: 'Emergente' },
            { id: 'established', label: 'Establecido' },
            { id: 'award-winner', label: 'Premiado' },
            { id: 'local', label: 'Local' },
            { id: 'international', label: 'Internacional' },
            { id: 'available', label: 'Disponible' },
          ]
        };
      
      default:
        return {
          title: 'Filtrar Contenido',
          categories: [
            { id: 'articles', label: 'Artículos' },
            { id: 'tutorials', label: 'Tutoriales' },
            { id: 'news', label: 'Noticias' },
            { id: 'reviews', label: 'Reseñas' },
            { id: 'interviews', label: 'Entrevistas' },
            { id: 'tips', label: 'Consejos' },
          ],
          tags: [
            { id: 'beginner', label: 'Principiante' },
            { id: 'intermediate', label: 'Intermedio' },
            { id: 'advanced', label: 'Avanzado' },
            { id: 'trending', label: 'Tendencia' },
            { id: 'featured', label: 'Destacado' },
            { id: 'popular', label: 'Popular' },
          ]
        };
    }
  };

  const filterConfig = getFiltersForRoute();

  const dateOptions = [
    { value: 'all', label: 'Todas las fechas' },
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'year', label: 'Este año' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Más reciente' },
    { value: 'popular', label: 'Más popular' },
    { value: 'rating', label: 'Mejor valorado' },
    { value: 'alphabetical', label: 'Alfabético' },
  ];

  const handleCategoryChange = (categoryId, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleTagChange = (tagId, checked) => {
    if (checked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setDateRange('all');
    setSortBy('recent');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || dateRange !== 'all' || sortBy !== 'recent';

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block lg:fixed left-0 top-20 h-[calc(100vh-5rem)] w-80 bg-surface border-r border-border overflow-y-auto z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              {filterConfig.title}
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

          <div className="space-y-6">
            {/* Sort By */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Ordenar por
              </h3>
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                placeholder="Seleccionar orden"
              />
            </div>

            {/* Date Range */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Fecha
              </h3>
              <Select
                options={dateOptions}
                value={dateRange}
                onChange={setDateRange}
                placeholder="Seleccionar fecha"
              />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Categorías
              </h3>
              <div className="space-y-2">
                {filterConfig.categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    label={category.label}
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Etiquetas
              </h3>
              <div className="space-y-2">
                {filterConfig.tags.map((tag) => (
                  <Checkbox
                    key={tag.id}
                    label={tag.label}
                    checked={selectedTags.includes(tag.id)}
                    onChange={(e) => handleTagChange(tag.id, e.target.checked)}
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
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
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
                  {filterConfig.title}
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

              <div className="space-y-6">
                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">
                    Ordenar por
                  </h3>
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="Seleccionar orden"
                  />
                </div>

                {/* Date Range */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">
                    Fecha
                  </h3>
                  <Select
                    options={dateOptions}
                    value={dateRange}
                    onChange={setDateRange}
                    placeholder="Seleccionar fecha"
                  />
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">
                    Categorías
                  </h3>
                  <div className="space-y-2">
                    {filterConfig.categories.map((category) => (
                      <Checkbox
                        key={category.id}
                        label={category.label}
                        checked={selectedCategories.includes(category.id)}
                        onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                      />
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-3">
                    Etiquetas
                  </h3>
                  <div className="space-y-2">
                    {filterConfig.tags.map((tag) => (
                      <Checkbox
                        key={tag.id}
                        label={tag.label}
                        checked={selectedTags.includes(tag.id)}
                        onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-border">
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="flex-1"
                    >
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Limpiar
                    </Button>
                  )}
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
        </div>
      )}
    </>
  );
};

export default FilterSidebar;