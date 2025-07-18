import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchComponent from '../../components/ui/SearchComponent';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CalendarView from './components/CalendarView';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';
import EventListView from './components/EventListView';
import EventMapView from './components/EventMapView';
import FeaturedEvents from './components/FeaturedEvents';

const EventsCalendar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState('list'); // 'list', 'calendar', 'map'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    regions: [],
    priceRange: 'all',
    skillLevel: 'all',
    dateRange: 'all',
    eventType: 'all'
  });
  const [loading, setLoading] = useState(false);

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Exposición: Maestros de la Fotografía Española",
      description: "Una retrospectiva de los grandes fotógrafos españoles del siglo XX, incluyendo obras de Català-Roca, Masats y Miserachs.",
      date: "2025-07-20",
      time: "10:00",
      location: "Museo Reina Sofía, Madrid",
      organizer: "Fundación Foto Colectania",
      category: "exposiciones",
      price: 12,
      availableSpots: 50,
      registrationDeadline: "2025-07-19",
      skillLevel: "todos",
      eventType: "presencial",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      isFeatured: true,
      isFavorited: false
    },
    {
      id: 2,
      title: "Taller: Fotografía Nocturna en la Ciudad",
      description: "Aprende las técnicas avanzadas para capturar la magia de la ciudad durante la noche. Incluye práctica en exteriores.",
      date: "2025-07-22",
      time: "19:00",
      location: "Centro Cultural Conde Duque, Madrid",
      organizer: "Escuela de Fotografía Madrid",
      category: "talleres",
      price: 85,
      availableSpots: 12,
      registrationDeadline: "2025-07-21",
      skillLevel: "intermedio",
      eventType: "presencial",
      image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&h=300&fit=crop",
      isFeatured: true,
      isFavorited: true
    },
    {
      id: 3,
      title: "Concurso Internacional de Fotografía de Naturaleza",
      description: "Participa en nuestro concurso anual con premios de hasta 5.000€. Categorías: fauna, flora, paisajes y conservación.",
      date: "2025-07-25",
      time: "23:59",
      location: "Online",
      organizer: "Asociación Española de Fotografía de Naturaleza",
      category: "concursos",
      price: 0,
      availableSpots: null,
      registrationDeadline: "2025-07-24",
      skillLevel: "todos",
      eventType: "online",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      isFeatured: true,
      isFavorited: false
    },
    {
      id: 4,
      title: "Conferencia: El Futuro de la Fotografía Digital",
      description: "Expertos internacionales discuten las tendencias emergentes en fotografía digital, IA y nuevas tecnologías.",
      date: "2025-07-28",
      time: "16:00",
      location: "Palacio de Congresos, Barcelona",
      organizer: "PhotoTech Conference",
      category: "conferencias",
      price: 45,
      availableSpots: 200,
      registrationDeadline: "2025-07-27",
      skillLevel: "profesional",
      eventType: "hibrido",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      isFeatured: false,
      isFavorited: false
    },
    {
      id: 5,
      title: "Encuentro de Fotógrafos de Calle",
      description: "Únete a otros apasionados de la fotografía urbana para un día de shooting y networking en el centro histórico.",
      date: "2025-07-30",
      time: "09:00",
      location: "Plaza Mayor, Madrid",
      organizer: "Colectivo Street Photo Madrid",
      category: "encuentros",
      price: 0,
      availableSpots: 25,
      registrationDeadline: "2025-07-29",
      skillLevel: "todos",
      eventType: "presencial",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      isFeatured: false,
      isFavorited: false
    },
    {
      id: 6,
      title: "Taller Online: Edición Avanzada con Lightroom",
      description: "Masterclass de 3 horas sobre técnicas profesionales de edición y revelado digital con Adobe Lightroom.",
      date: "2025-08-02",
      time: "18:00",
      location: "Online - Zoom",
      organizer: "Academia Digital Photo",
      category: "talleres",
      price: 35,
      availableSpots: 50,
      registrationDeadline: "2025-08-01",
      skillLevel: "intermedio",
      eventType: "online",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      isFeatured: false,
      isFavorited: true
    }
  ];

  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  // Filter events based on current filters and search
  useEffect(() => {
    let filtered = [...events];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(event =>
        filters.categories.includes(event.category)
      );
    }

    // Apply region filter
    if (filters.regions.length > 0) {
      filtered = filtered.filter(event => {
        const eventLocation = event.location.toLowerCase();
        return filters.regions.some(region =>
          eventLocation.includes(region.toLowerCase())
        );
      });
    }

    // Apply price filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(event => {
        switch (filters.priceRange) {
          case 'free':
            return event.price === 0;
          case '0-25':
            return event.price >= 0 && event.price <= 25;
          case '25-50':
            return event.price > 25 && event.price <= 50;
          case '50-100':
            return event.price > 50 && event.price <= 100;
          case '100+':
            return event.price > 100;
          default:
            return true;
        }
      });
    }

    // Apply skill level filter
    if (filters.skillLevel !== 'all') {
      filtered = filtered.filter(event =>
        event.skillLevel === filters.skillLevel || event.skillLevel === 'todos'
      );
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        
        switch (filters.dateRange) {
          case 'today':
            return eventDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return eventDate.toDateString() === tomorrow.toDateString();
          case 'this-week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return eventDate >= weekStart && eventDate <= weekEnd;
          case 'next-week':
            const nextWeekStart = new Date(today);
            nextWeekStart.setDate(today.getDate() + (7 - today.getDay()));
            const nextWeekEnd = new Date(nextWeekStart);
            nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
            return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
          case 'this-month':
            return eventDate.getMonth() === today.getMonth() && 
                   eventDate.getFullYear() === today.getFullYear();
          case 'next-month':
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);
            return eventDate.getMonth() === nextMonth.getMonth() && 
                   eventDate.getFullYear() === nextMonth.getFullYear();
          default:
            return true;
        }
      });
    }

    // Apply event type filter
    if (filters.eventType !== 'all') {
      filtered = filtered.filter(event =>
        event.eventType === filters.eventType
      );
    }

    setFilteredEvents(filtered);
  }, [events, filters, searchQuery]);

  // Handle URL parameters
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam && ['list', 'calendar', 'map'].includes(viewParam)) {
      setView(viewParam);
    }
  }, [searchParams]);

  const handleViewChange = (newView) => {
    setView(newView);
    setSearchParams({ view: newView });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventFavorite = (eventId, isFavorited) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, isFavorited } : event
      )
    );
  };

  const handleEventShare = (event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${event.title} - ${event.description}\n${window.location.href}`;
      navigator.clipboard.writeText(shareText);
      alert('Enlace copiado al portapapeles');
    }
  };

  const handleEventRegister = (event) => {
    // Mock registration process
    alert(`Redirigiendo a la página de inscripción para: ${event.title}`);
  };

  const handleEventSelect = (event) => {
    // Handle event selection (could open modal, navigate to detail page, etc.)
    console.log('Event selected:', event);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const featuredEvents = events.filter(event => event.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className={`transition-all duration-300 ${isFiltersOpen ? 'lg:ml-80' : ''}`}>
        <div className="max-w-8xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-2">
                  Calendario de Eventos
                </h1>
                <p className="text-text-secondary max-w-2xl">
                  Descubre exposiciones, talleres, concursos y conferencias de fotografía en España y Latinoamérica. 
                  Conecta con la comunidad fotográfica y amplía tus conocimientos.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <SearchComponent
                  onSearch={handleSearch}
                  placeholder="Buscar eventos..."
                />
                <Button
                  variant="outline"
                  onClick={toggleFilters}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Filter" size={16} />
                  <span className="hidden sm:inline">Filtros</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Events */}
          {featuredEvents.length > 0 && (
            <FeaturedEvents
              events={featuredEvents}
              onEventSelect={handleEventSelect}
            />
          )}

          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-secondary">
                {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
              </span>
              {searchQuery && (
                <span className="text-sm text-text-secondary">
                  para "{searchQuery}"
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewChange('list')}
                className="flex items-center space-x-1"
              >
                <Icon name="List" size={16} />
                <span className="hidden sm:inline">Lista</span>
              </Button>
              <Button
                variant={view === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewChange('calendar')}
                className="flex items-center space-x-1"
              >
                <Icon name="Calendar" size={16} />
                <span className="hidden sm:inline">Calendario</span>
              </Button>
              <Button
                variant={view === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewChange('map')}
                className="flex items-center space-x-1"
              >
                <Icon name="Map" size={16} />
                <span className="hidden sm:inline">Mapa</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Calendar Sidebar (only in calendar view) */}
            {view === 'calendar' && (
              <div className="lg:col-span-1">
                <CalendarView
                  events={filteredEvents}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  onEventSelect={handleEventSelect}
                />
              </div>
            )}

            {/* Events Content */}
            <div className={view === 'calendar' ? 'lg:col-span-3' : 'lg:col-span-4'}>
              {view === 'list' && (
                <EventListView
                  events={filteredEvents}
                  onFavorite={handleEventFavorite}
                  onShare={handleEventShare}
                  onRegister={handleEventRegister}
                  loading={loading}
                />
              )}

              {view === 'calendar' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-heading font-semibold text-text-primary">
                      Eventos del {selectedDate.toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h2>
                  </div>
                  
                  {filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.toDateString() === selectedDate.toDateString();
                  }).length > 0 ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {filteredEvents
                        .filter(event => {
                          const eventDate = new Date(event.date);
                          return eventDate.toDateString() === selectedDate.toDateString();
                        })
                        .map(event => (
                          <EventCard
                            key={event.id}
                            event={event}
                            onFavorite={handleEventFavorite}
                            onShare={handleEventShare}
                            onRegister={handleEventRegister}
                          />
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                        <Icon name="Calendar" size={24} className="text-text-secondary" />
                      </div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                        No hay eventos programados
                      </h3>
                      <p className="text-text-secondary">
                        No se encontraron eventos para la fecha seleccionada.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {view === 'map' && (
                <EventMapView
                  events={filteredEvents}
                  onFavorite={handleEventFavorite}
                  onShare={handleEventShare}
                  onRegister={handleEventRegister}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Filters Sidebar */}
      <EventFilters
        isOpen={isFiltersOpen}
        onToggle={toggleFilters}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
};

export default EventsCalendar;