import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ photographer }) => {
  const handleSocialClick = (platform, url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src={photographer.avatar}
                alt={`Retrato de ${photographer.name}`}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-accent/20"
              />
              {photographer.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2">
                  <Icon name="CheckCircle" size={20} />
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
              <div className="min-w-0">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-2">
                  {photographer.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center text-text-secondary">
                    <Icon name="MapPin" size={16} className="mr-1" />
                    <span className="text-sm font-caption">{photographer.location}</span>
                  </div>
                  
                  <div className="flex items-center text-text-secondary">
                    <Icon name="Camera" size={16} className="mr-1" />
                    <span className="text-sm font-caption">{photographer.experience} años de experiencia</span>
                  </div>
                  
                  {photographer.availability && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-caption text-success">Disponible para proyectos</span>
                    </div>
                  )}
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {photographer.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm font-caption rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  {photographer.social.website && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSocialClick('website', photographer.social.website)}
                      className="text-text-secondary hover:text-accent"
                    >
                      <Icon name="Globe" size={20} />
                    </Button>
                  )}
                  
                  {photographer.social.instagram && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSocialClick('instagram', photographer.social.instagram)}
                      className="text-text-secondary hover:text-accent"
                    >
                      <Icon name="Instagram" size={20} />
                    </Button>
                  )}
                  
                  {photographer.social.twitter && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSocialClick('twitter', photographer.social.twitter)}
                      className="text-text-secondary hover:text-accent"
                    >
                      <Icon name="Twitter" size={20} />
                    </Button>
                  )}
                  
                  {photographer.social.linkedin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSocialClick('linkedin', photographer.social.linkedin)}
                      className="text-text-secondary hover:text-accent"
                    >
                      <Icon name="Linkedin" size={20} />
                    </Button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  iconName="UserPlus"
                  iconPosition="left"
                  className="whitespace-nowrap"
                >
                  Seguir
                </Button>
                
                <Button
                  onClick={handleContactClick}
                  iconName="Mail"
                  iconPosition="left"
                  className="whitespace-nowrap"
                >
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-text-primary">
              {photographer.stats.followers.toLocaleString('es-ES')}
            </div>
            <div className="text-sm font-caption text-text-secondary">Seguidores</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-text-primary">
              {photographer.stats.photos}
            </div>
            <div className="text-sm font-caption text-text-secondary">Fotografías</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-text-primary">
              {photographer.stats.awards}
            </div>
            <div className="text-sm font-caption text-text-secondary">Premios</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-text-primary">
              {photographer.stats.exhibitions}
            </div>
            <div className="text-sm font-caption text-text-secondary">Exposiciones</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;