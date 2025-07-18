import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedWorks = ({ photographer }) => {
  const handleViewWork = (work) => {
    console.log('Viewing featured work:', work.title);
  };

  return (
    <section className="bg-surface py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Obras Destacadas
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Una selección de las mejores obras de {photographer.name}, reconocidas por su calidad artística y técnica excepcional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {photographer.featuredWorks.map((work, index) => (
            <div key={work.id} className="group">
              <div className="relative overflow-hidden rounded-lg bg-muted mb-6">
                <Image
                  src={work.image}
                  alt={work.title}
                  className="w-full h-80 lg:h-96 object-cover transition-smooth group-hover:scale-105"
                />
                
                {/* Award Badge */}
                {work.award && (
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Icon name="Award" size={16} className="mr-1" />
                    {work.award}
                  </div>
                )}

                {/* View Button */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth flex items-center justify-center">
                  <Button
                    onClick={() => handleViewWork(work)}
                    className="opacity-0 group-hover:opacity-100 transition-smooth"
                    iconName="Eye"
                    iconPosition="left"
                  >
                    Ver obra completa
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    {work.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {work.description}
                  </p>
                </div>

                {/* Work Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center text-text-secondary">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      <span>{work.year}</span>
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      <span>{work.location}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-text-secondary">
                      <Icon name="Camera" size={16} className="mr-2" />
                      <span>{work.camera}</span>
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <Icon name="Aperture" size={16} className="mr-2" />
                      <span>{work.settings}</span>
                    </div>
                  </div>
                </div>

                {/* Recognition */}
                {work.recognition && work.recognition.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-2">
                      Reconocimientos:
                    </h4>
                    <div className="space-y-1">
                      {work.recognition.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-text-secondary">
                          <Icon name="Star" size={14} className="mr-2 text-accent" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Details */}
                {work.technicalDetails && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-2">
                      Detalles técnicos:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-text-secondary">
                      {Object.entries(work.technicalDetails).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Story Behind */}
                {work.story && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-2">
                      Historia detrás de la imagen:
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {work.story}
                    </p>
                  </div>
                )}

                {/* Social Engagement */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center">
                      <Icon name="Heart" size={16} className="mr-1" />
                      <span>{work.likes?.toLocaleString('es-ES') || 0}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="MessageCircle" size={16} className="mr-1" />
                      <span>{work.comments?.toLocaleString('es-ES') || 0}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Share2" size={16} className="mr-1" />
                      <span>{work.shares?.toLocaleString('es-ES') || 0}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    className="text-accent hover:text-accent/80"
                  >
                    Ver más detalles
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Works Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            iconName="Grid"
            iconPosition="left"
            className="px-8"
          >
            Ver todas las obras destacadas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;