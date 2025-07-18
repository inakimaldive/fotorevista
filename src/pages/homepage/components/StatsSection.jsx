import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: 'Users',
      value: '50K+',
      label: 'Fotógrafos Registrados',
      description: 'Comunidad activa de profesionales'
    },
    {
      id: 2,
      icon: 'Camera',
      value: '10K+',
      label: 'Galerías Publicadas',
      description: 'Obras de arte visual compartidas'
    },
    {
      id: 3,
      icon: 'Award',
      value: '500+',
      label: 'Premios Otorgados',
      description: 'Reconocimientos a la excelencia'
    },
    {
      id: 4,
      icon: 'Calendar',
      value: '200+',
      label: 'Eventos Anuales',
      description: 'Exposiciones y talleres'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2">
          Nuestra Comunidad en Números
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          FotoRevista se ha convertido en la plataforma líder para fotógrafos de habla hispana, 
          conectando talento y pasión por la imagen.
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mx-auto mb-4">
              <Icon name={stat.icon} size={24} />
            </div>
            
            <div className="text-3xl font-heading font-bold text-text-primary mb-1">
              {stat.value}
            </div>
            
            <div className="text-sm font-medium text-text-primary mb-1">
              {stat.label}
            </div>
            
            <div className="text-xs text-text-secondary font-caption">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;