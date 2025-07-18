import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ events, selectedDate, onDateSelect, onEventSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(-1)}
          className="text-text-secondary hover:text-accent"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
        
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth(1)}
          className="text-text-secondary hover:text-accent"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-caption font-medium text-text-secondary py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const hasEvents = dayEvents.length > 0;
            
            return (
              <div key={index} className="aspect-square">
                {date ? (
                  <button
                    onClick={() => onDateSelect(date)}
                    className={`w-full h-full flex flex-col items-center justify-center text-sm rounded-md transition-smooth relative ${
                      isSelected(date)
                        ? 'bg-accent text-accent-foreground'
                        : isToday(date)
                        ? 'bg-accent/20 text-accent font-medium'
                        : hasEvents
                        ? 'bg-muted text-text-primary hover:bg-accent/10' :'text-text-primary hover:bg-muted'
                    }`}
                  >
                    <span className="mb-1">{date.getDate()}</span>
                    {hasEvents && (
                      <div className="flex space-x-1">
                        {dayEvents.slice(0, 3).map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className={`w-1.5 h-1.5 rounded-full ${
                              event.category === 'exposiciones' ? 'bg-blue-500' :
                              event.category === 'talleres' ? 'bg-green-500' :
                              event.category === 'concursos' ? 'bg-purple-500' :
                              event.category === 'conferencias'? 'bg-orange-500' : 'bg-accent'
                            }`}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                        )}
                      </div>
                    )}
                  </button>
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-3 text-xs font-caption">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-text-secondary">Exposiciones</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-text-secondary">Talleres</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-text-secondary">Concursos</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-text-secondary">Conferencias</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;