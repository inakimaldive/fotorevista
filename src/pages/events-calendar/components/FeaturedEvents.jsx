import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedEvents = ({ events, onEventSelect }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'exposiciones': 'bg-blue-500',
      'talleres': 'bg-green-500',
      'concursos': 'bg-purple-500',
      'conferencias': 'bg-orange-500',
      'encuentros': 'bg-pink-500',
      'online': 'bg-indigo-500'
    };
    return colors[category] || 'bg-accent';
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Eventos Destacados
          </h2>
          <p className="text-text-secondary mt-1">
            Los eventos más importantes de la semana
          </p>
        </div>
        <Button variant="outline" className="hidden sm:flex">
          Ver todos
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.slice(0, 3).map((event, index) => (
          <div
            key={event.id}
            className="group relative bg-surface rounded-lg border border-border shadow-card hover:shadow-modal transition-smooth overflow-hidden cursor-pointer"
            onClick={() => onEventSelect?.(event)}
          >
            {/* Featured Badge */}
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                <Icon name="Star" size={12} className="inline mr-1" />
                Destacado
              </div>
            </div>

            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Date Badge */}
              <div className="absolute bottom-3 left-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                  <div className="text-lg font-bold text-text-primary">
                    {formatDate(event.date).split('/')[0]}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute bottom-3 right-3">
                <div className={`${getCategoryColor(event.category)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-smooth">
                {event.title}
              </h3>

              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Clock" size={14} />
                  <span>{event.time || '10:00'}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="MapPin" size={14} />
                  <span className="truncate">{event.location}</span>
                </div>

                {event.organizer && (
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="User" size={14} />
                    <span className="truncate">{event.organizer}</span>
                  </div>
                )}
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {event.price === 0 ? (
                    <span className="text-sm font-medium text-green-600">Gratuito</span>
                  ) : (
                    <span className="text-sm font-medium text-text-primary">
                      {event.price}€
                    </span>
                  )}
                  {event.availableSpots && event.availableSpots < 10 && (
                    <span className="text-xs text-orange-600 font-medium">
                      ¡Pocas plazas!
                    </span>
                  )}
                </div>
                
                <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver detalles
                </Button>
              </div>

              {/* Urgency Indicator */}
              {event.registrationDeadline && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-orange-600">
                    <Icon name="AlertCircle" size={12} />
                    <span>
                      Inscripción hasta: {formatDate(event.registrationDeadline)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="mt-6 text-center sm:hidden">
        <Button variant="outline" className="w-full">
          Ver todos los eventos destacados
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedEvents;