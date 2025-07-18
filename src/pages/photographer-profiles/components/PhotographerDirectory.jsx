import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PhotographerDirectory = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const specialtyOptions = [
    { value: 'all', label: 'Todas las especialidades' },
    { value: 'wedding', label: 'Bodas' },
    { value: 'portrait', label: 'Retratos' },
    { value: 'landscape', label: 'Paisajes' },
    { value: 'commercial', label: 'Comercial' },
    { value: 'fashion', label: 'Moda' },
    { value: 'street', label: 'Fotografía urbana' },
    { value: 'documentary', label: 'Documental' },
  ];

  const locationOptions = [
    { value: 'all', label: 'Todas las ubicaciones' },
    { value: 'madrid', label: 'Madrid' },
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'sevilla', label: 'Sevilla' },
    { value: 'bilbao', label: 'Bilbao' },
    { value: 'other', label: 'Otras ciudades' },
  ];

  const sortOptions = [
    { value: 'popular', label: 'Más populares' },
    { value: 'recent', label: 'Más recientes' },
    { value: 'rating', label: 'Mejor valorados' },
    { value: 'alphabetical', label: 'Alfabético' },
  ];

  const mockPhotographers = [
    {
      id: 1,
      name: "Elena Martínez",
      location: "Madrid, España",
      specialties: ["Bodas", "Retratos"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      rating: 4.9,
      reviews: 127,
      followers: 15420,
      isVerified: true,
      availability: true,
      featured: true,
      portfolioPreview: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=300",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300"
      ]
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      location: "Barcelona, España",
      specialties: ["Paisajes", "Naturaleza"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      rating: 4.8,
      reviews: 89,
      followers: 8750,
      isVerified: true,
      availability: false,
      featured: false,
      portfolioPreview: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300"
      ]
    },
    {
      id: 3,
      name: "Ana García",
      location: "Valencia, España",
      specialties: ["Moda", "Comercial"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      rating: 4.7,
      reviews: 156,
      followers: 22100,
      isVerified: true,
      availability: true,
      featured: true,
      portfolioPreview: [
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300"
      ]
    },
    {
      id: 4,
      name: "Miguel Santos",
      location: "Sevilla, España",
      specialties: ["Documental", "Fotografía urbana"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      rating: 4.6,
      reviews: 73,
      followers: 5890,
      isVerified: false,
      availability: true,
      featured: false,
      portfolioPreview: [
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300",
        "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=300"
      ]
    },
    {
      id: 5,
      name: "Laura Fernández",
      location: "Bilbao, España",
      specialties: ["Retratos", "Familias"],
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      rating: 4.9,
      reviews: 201,
      followers: 18750,
      isVerified: true,
      availability: true,
      featured: true,
      portfolioPreview: [
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"
      ]
    },
    {
      id: 6,
      name: "David López",
      location: "Madrid, España",
      specialties: ["Comercial", "Producto"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      rating: 4.5,
      reviews: 94,
      followers: 12300,
      isVerified: true,
      availability: false,
      featured: false,
      portfolioPreview: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
      ]
    }
  ];

  const filteredPhotographers = mockPhotographers.filter(photographer => {
    const matchesSpecialty = selectedSpecialty === 'all' || 
      photographer.specialties.some(spec => spec.toLowerCase().includes(selectedSpecialty));
    const matchesLocation = selectedLocation === 'all' || 
      photographer.location.toLowerCase().includes(selectedLocation);
    
    return matchesSpecialty && matchesLocation;
  });

  const sortedPhotographers = [...filteredPhotographers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return b.id - a.id; // Assuming higher ID means more recent
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default: // popular
        return b.followers - a.followers;
    }
  });

  return (
    <section className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Directorio de Fotógrafos
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Descubre talentosos fotógrafos españoles especializados en diferentes áreas de la fotografía profesional.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Select
            label="Especialidad"
            options={specialtyOptions}
            value={selectedSpecialty}
            onChange={setSelectedSpecialty}
          />
          
          <Select
            label="Ubicación"
            options={locationOptions}
            value={selectedLocation}
            onChange={setSelectedLocation}
          />
          
          <Select
            label="Ordenar por"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-secondary">
            {sortedPhotographers.length} fotógrafos encontrados
          </p>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Grid"
              iconPosition="left"
            >
              Vista cuadrícula
            </Button>
          </div>
        </div>

        {/* Photographers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPhotographers.map((photographer) => (
            <div key={photographer.id} className="bg-surface rounded-lg shadow-card overflow-hidden hover-scale">
              {/* Featured Badge */}
              {photographer.featured && (
                <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Destacado
                </div>
              )}

              {/* Portfolio Preview */}
              <div className="relative h-48 overflow-hidden">
                <div className="grid grid-cols-3 h-full">
                  {photographer.portfolioPreview.map((image, index) => (
                    <div key={index} className="relative overflow-hidden">
                      <Image
                        src={image}
                        alt={`Portfolio ${photographer.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Photographer Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={photographer.avatar}
                        alt={photographer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {photographer.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground rounded-full p-1">
                          <Icon name="CheckCircle" size={12} />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary">
                        {photographer.name}
                      </h3>
                      <p className="text-sm text-text-secondary flex items-center">
                        <Icon name="MapPin" size={14} className="mr-1" />
                        {photographer.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${photographer.availability ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-xs text-text-secondary">
                      {photographer.availability ? 'Disponible' : 'Ocupado'}
                    </span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {photographer.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs font-caption rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {photographer.rating}
                    </div>
                    <div className="text-xs text-text-secondary flex items-center justify-center">
                      <Icon name="Star" size={12} className="mr-1 text-yellow-500" />
                      Rating
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {photographer.reviews}
                    </div>
                    <div className="text-xs text-text-secondary">Reseñas</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-text-primary">
                      {photographer.followers.toLocaleString('es-ES')}
                    </div>
                    <div className="text-xs text-text-secondary">Seguidores</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/photographer-profiles/${photographer.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full"
                      iconName="Eye"
                      iconPosition="left"
                    >
                      Ver perfil
                    </Button>
                  </Link>
                  
                  <Button
                    variant="default"
                    className="flex-1"
                    iconName="Mail"
                    iconPosition="left"
                  >
                    Contactar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedPhotographers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-secondary">
              No se encontraron fotógrafos con los filtros seleccionados.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedSpecialty('all');
                setSelectedLocation('all');
                setSortBy('popular');
              }}
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Load More */}
        {sortedPhotographers.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
            >
              Cargar más fotógrafos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotographerDirectory;