import React from 'react';
import Icon from '../../../components/AppIcon';

const GalleryStats = ({ totalImages, filteredImages, loading }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  const stats = [
    {
      icon: 'Camera',
      label: 'Total de imágenes',
      value: formatNumber(totalImages),
      color: 'text-accent',
    },
    {
      icon: 'Filter',
      label: 'Mostrando',
      value: formatNumber(filteredImages),
      color: 'text-primary',
    },
    {
      icon: 'Users',
      label: 'Fotógrafos',
      value: '247',
      color: 'text-secondary',
    },
    {
      icon: 'Award',
      label: 'Premiadas',
      value: '89',
      color: 'text-accent',
    },
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-3 ${stat.color}`}>
              <Icon name={stat.icon} size={24} />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-text-primary">
                {loading && index === 1 ? (
                  <div className="animate-pulse bg-muted h-6 w-12 mx-auto rounded"></div>
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryStats;