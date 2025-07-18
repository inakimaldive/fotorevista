import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onFavorite, onShare, onRegister }) => {
  const [isFavorited, setIsFavorited] = useState(event.isFavorited || false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'exposiciones': 'bg-blue-100 text-blue-800 border-blue-200',
      'talleres': 'bg-green-100 text-green-800 border-green-200',
      'concursos': 'bg-purple-100 text-purple-800 border-purple-200',
      'conferencias': 'bg-orange-100 text-orange-800 border-orange-200',
      'encuentros': 'bg-pink-100 text-pink-800 border-pink-200',
      'online': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'exposiciones': 'Image',
      'talleres': 'Users',
      'concursos': 'Trophy',
      'conferencias': 'Mic',
      'encuentros': 'Coffee',
      'online': 'Monitor'
    };
    return icons[category] || 'Calendar';
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite?.(event.id, !isFavorited);
  };

  const handleShare = () => {
    onShare?.(event);
  };

  const handleRegister = () => {
    onRegister?.(event);
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card hover:shadow-modal transition-smooth overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
            <Icon name={getCategoryIcon(event.category)} size={12} className="mr-1" />
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            className={`bg-white/90 backdrop-blur-sm hover:bg-white ${
              isFavorited ? 'text-red-500' : 'text-text-secondary'
            }`}
          >
            <Icon name={isFavorited ? "Heart" : "Heart"} size={16} fill={isFavorited ? "currentColor" : "none"} />
          </Button>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-heading font-semibold text-text-primary line-clamp-2 flex-1">
            {event.title}
          </h3>
        </div>

        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(event.date)}</span>
            {event.time && (
              <>
                <Icon name="Clock" size={14} className="ml-2" />
                <span>{formatTime(event.time)}</span>
              </>
            )}
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

        {/* Price and Availability */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {event.price === 0 ? (
              <span className="text-sm font-medium text-green-600">Gratuito</span>
            ) : (
              <span className="text-sm font-medium text-text-primary">
                {event.price}€
              </span>
            )}
            {event.availableSpots && (
              <span className="text-xs text-text-secondary">
                • {event.availableSpots} plazas disponibles
              </span>
            )}
          </div>
          
          {event.skillLevel && (
            <span className="text-xs px-2 py-1 bg-muted text-text-secondary rounded-full">
              {event.skillLevel}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={handleRegister}
            className="flex-1"
            disabled={event.availableSpots === 0}
          >
            {event.availableSpots === 0 ? 'Agotado' : 'Inscribirse'}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="text-text-secondary hover:text-accent"
          >
            <Icon name="Share2" size={16} />
          </Button>
        </div>

        {/* Registration Deadline */}
        {event.registrationDeadline && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="AlertCircle" size={12} />
              <span>Inscripción hasta: {formatDate(event.registrationDeadline)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;