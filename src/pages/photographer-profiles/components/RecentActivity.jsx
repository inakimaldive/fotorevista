import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ photographer }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activityFilters = [
    { id: 'all', label: 'Todas', icon: 'Activity' },
    { id: 'uploads', label: 'Subidas', icon: 'Upload' },
    { id: 'exhibitions', label: 'Exposiciones', icon: 'Image' },
    { id: 'awards', label: 'Premios', icon: 'Award' },
    { id: 'collaborations', label: 'Colaboraciones', icon: 'Users' },
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? photographer.recentActivity 
    : photographer.recentActivity.filter(activity => activity.type === selectedFilter);

  const getActivityIcon = (type) => {
    const icons = {
      upload: 'Upload',
      exhibition: 'Image',
      award: 'Award',
      collaboration: 'Users',
      feature: 'Star',
      workshop: 'BookOpen',
      interview: 'Mic',
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      upload: 'text-blue-500',
      exhibition: 'text-purple-500',
      award: 'text-yellow-500',
      collaboration: 'text-green-500',
      feature: 'text-orange-500',
      workshop: 'text-indigo-500',
      interview: 'text-pink-500',
    };
    return colors[type] || 'text-accent';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
    if (diffDays < 365) return `Hace ${Math.ceil(diffDays / 30)} meses`;
    return `Hace ${Math.ceil(diffDays / 365)} años`;
  };

  return (
    <section className="bg-surface py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 sm:mb-0">
            Actividad Reciente
          </h2>
          
          {/* Activity Filters */}
          <div className="flex flex-wrap gap-2">
            {activityFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                iconName={filter.icon}
                iconPosition="left"
                className="text-sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="space-y-6">
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="flex space-x-4">
              {/* Timeline Icon */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <Icon name={getActivityIcon(activity.type)} size={20} />
                </div>
                {index < filteredActivities.length - 1 && (
                  <div className="w-px h-16 bg-border mx-auto mt-2"></div>
                )}
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-background rounded-lg p-6 shadow-card">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-text-secondary mb-3">
                        {activity.description}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0 text-sm text-text-secondary">
                      {formatDate(activity.date)}
                    </div>
                  </div>

                  {/* Activity Media */}
                  {activity.images && activity.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                      {activity.images.slice(0, 4).map((image, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover hover-scale cursor-pointer"
                          />
                          {idx === 3 && activity.images.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white font-medium">
                                +{activity.images.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Activity Details */}
                  {activity.details && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {Object.entries(activity.details).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2 text-sm">
                          <Icon name="Info" size={16} className="text-text-secondary" />
                          <span className="text-text-secondary capitalize">{key}:</span>
                          <span className="text-text-primary font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Activity Tags */}
                  {activity.tags && activity.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs font-caption rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Activity Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      {activity.likes && (
                        <div className="flex items-center">
                          <Icon name="Heart" size={16} className="mr-1" />
                          <span>{activity.likes.toLocaleString('es-ES')}</span>
                        </div>
                      )}
                      
                      {activity.comments && (
                        <div className="flex items-center">
                          <Icon name="MessageCircle" size={16} className="mr-1" />
                          <span>{activity.comments.toLocaleString('es-ES')}</span>
                        </div>
                      )}
                      
                      {activity.shares && (
                        <div className="flex items-center">
                          <Icon name="Share2" size={16} className="mr-1" />
                          <span>{activity.shares.toLocaleString('es-ES')}</span>
                        </div>
                      )}
                    </div>

                    {activity.link && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="right"
                        className="text-accent hover:text-accent/80"
                        onClick={() => window.open(activity.link, '_blank')}
                      >
                        Ver más
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Activity" size={48} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-secondary">
              No hay actividad reciente en esta categoría.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredActivities.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              iconName="RotateCcw"
              iconPosition="left"
            >
              Cargar más actividad
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentActivity;