import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiographySection = ({ photographer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowToggle = photographer.bio.length > 300;
  const displayBio = isExpanded ? photographer.bio : photographer.bio.substring(0, 300);

  return (
    <section className="bg-surface py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Biography */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">
              Biografía
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-text-primary leading-relaxed mb-4">
                {displayBio}
                {!isExpanded && shouldShowToggle && '...'}
              </p>
              
              {shouldShowToggle && (
                <Button
                  variant="ghost"
                  onClick={toggleExpanded}
                  className="text-accent hover:text-accent/80 p-0 h-auto font-normal"
                >
                  {isExpanded ? 'Leer menos' : 'Leer más'}
                </Button>
              )}
            </div>

            {/* Career Highlights */}
            <div className="mt-8">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Momentos Destacados
              </h3>
              
              <div className="space-y-4">
                {photographer.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-text-primary">{highlight.title}</div>
                      <div className="text-sm text-text-secondary">{highlight.year}</div>
                      {highlight.description && (
                        <div className="text-sm text-text-secondary mt-1">
                          {highlight.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Awards */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Award" size={20} className="mr-2 text-accent" />
                Premios y Reconocimientos
              </h3>
              
              <div className="space-y-3">
                {photographer.awards.map((award, index) => (
                  <div key={index} className="border-l-2 border-accent pl-4">
                    <div className="font-medium text-text-primary text-sm">
                      {award.title}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {award.organization} • {award.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Camera" size={20} className="mr-2 text-accent" />
                Equipo Principal
              </h3>
              
              <div className="space-y-2">
                {photographer.equipment.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-text-primary">{item.name}</span>
                    <span className="text-xs text-text-secondary">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="GraduationCap" size={20} className="mr-2 text-accent" />
                Formación
              </h3>
              
              <div className="space-y-3">
                {photographer.education.map((edu, index) => (
                  <div key={index}>
                    <div className="font-medium text-text-primary text-sm">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {edu.institution} • {edu.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exhibitions */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Image" size={20} className="mr-2 text-accent" />
                Exposiciones Recientes
              </h3>
              
              <div className="space-y-3">
                {photographer.exhibitions.slice(0, 3).map((exhibition, index) => (
                  <div key={index}>
                    <div className="font-medium text-text-primary text-sm">
                      {exhibition.title}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {exhibition.venue} • {exhibition.year}
                    </div>
                  </div>
                ))}
              </div>
              
              {photographer.exhibitions.length > 3 && (
                <Button
                  variant="ghost"
                  className="text-accent hover:text-accent/80 p-0 h-auto font-normal text-sm mt-3"
                >
                  Ver todas las exposiciones
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographySection;