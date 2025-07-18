import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import EventCard from './EventCard';

const EventMapView = ({ events, onFavorite, onShare, onRegister }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapCenter] = useState({ lat: 40.4168, lng: -3.7038 }); // Madrid center

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  // Mock coordinates for events (in a real app, these would come from the event data)
  const getEventCoordinates = (event) => {
    const mockCoordinates = {
      'madrid': { lat: 40.4168, lng: -3.7038 },
      'barcelona': { lat: 41.3851, lng: 2.1734 },
      'valencia': { lat: 39.4699, lng: -0.3763 },
      'sevilla': { lat: 37.3886, lng: -5.9823 },
      'bilbao': { lat: 43.2627, lng: -2.9253 }
    };
    
    const city = event.location.toLowerCase().split(',')[0].trim();
    return mockCoordinates[city] || mockCoordinates['madrid'];
  };

  return (
    <div className="relative h-[600px] bg-surface rounded-lg border border-border overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Mapa de eventos de fotografía"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=6&output=embed`}
          className="w-full h-full"
        />
      </div>

      {/* Event Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {events.map((event, index) => {
          const coords = getEventCoordinates(event);
          // Calculate position based on map bounds (simplified calculation)
          const x = ((coords.lng + 10) / 20) * 100; // Rough conversion for demo
          const y = ((60 - coords.lat) / 20) * 100; // Rough conversion for demo
          
          return (
            <button
              key={event.id}
              onClick={() => handleEventSelect(event)}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ 
                left: `${Math.max(5, Math.min(95, x))}%`, 
                top: `${Math.max(5, Math.min(95, y))}%` 
              }}
            >
              <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold ${
                event.category === 'exposiciones' ? 'bg-blue-500' :
                event.category === 'talleres' ? 'bg-green-500' :
                event.category === 'concursos' ? 'bg-purple-500' :
                event.category === 'conferencias'? 'bg-orange-500' : 'bg-accent'
              }`}>
                {index + 1}
              </div>
            </button>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-20 space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <Icon name="Locate" size={16} />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-medium text-text-primary mb-2">Categorías</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Exposiciones</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Talleres</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Concursos</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Conferencias</span>
          </div>
        </div>
      </div>

      {/* Event Details Panel */}
      {selectedEvent && (
        <div className="absolute top-4 left-4 z-30 w-80 max-h-[calc(100%-2rem)] overflow-y-auto">
          <div className="bg-white rounded-lg shadow-modal">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <h3 className="text-sm font-medium text-text-primary">
                Detalles del evento
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeEventDetails}
                className="text-text-secondary hover:text-accent"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="p-0">
              <EventCard
                event={selectedEvent}
                onFavorite={onFavorite}
                onShare={onShare}
                onRegister={onRegister}
              />
            </div>
          </div>
        </div>
      )}

      {/* View Toggle Info */}
      <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <p className="text-xs text-text-secondary">
          Haz clic en los marcadores para ver detalles
        </p>
      </div>
    </div>
  );
};

export default EventMapView;