import React from 'react';
import EventCard from './EventCard';
import Icon from '../../../components/AppIcon';

const EventListView = ({ events, onFavorite, onShare, onRegister, loading }) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-surface rounded-lg border border-border p-6 animate-pulse">
            <div className="flex space-x-4">
              <div className="w-24 h-24 bg-muted rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Icon name="Calendar" size={24} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          No se encontraron eventos
        </h3>
        <p className="text-text-secondary max-w-md mx-auto">
          No hay eventos que coincidan con los filtros seleccionados. Intenta ajustar los criterios de búsqueda.
        </p>
      </div>
    );
  }

  const groupEventsByDate = (events) => {
    const grouped = {};
    events.forEach(event => {
      const date = new Date(event.date).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(event);
    });
    return grouped;
  };

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return date.toLocaleDateString('es-ES', options);
    }
  };

  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => new Date(a) - new Date(b));

  return (
    <div className="space-y-8">
      {sortedDates.map(dateString => (
        <div key={dateString}>
          <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm border-b border-border pb-2 mb-6">
            <h2 className="text-xl font-heading font-semibold text-text-primary capitalize">
              {formatDateHeader(dateString)}
            </h2>
            <p className="text-sm text-text-secondary">
              {groupedEvents[dateString].length} evento{groupedEvents[dateString].length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {groupedEvents[dateString].map(event => (
              <EventCard
                key={event.id}
                event={event}
                onFavorite={onFavorite}
                onShare={onShare}
                onRegister={onRegister}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListView;