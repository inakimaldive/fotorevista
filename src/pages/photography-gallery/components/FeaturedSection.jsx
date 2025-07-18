import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedSection = ({ featuredImages, onImageClick }) => {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (!featuredImages || featuredImages.length === 0) {
    return null;
  }

  const mainFeatured = featuredImages[0];
  const secondaryFeatured = featuredImages.slice(1, 3);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-text-primary">
          Imágenes Destacadas
        </h2>
        <Button variant="outline" className="hidden md:flex">
          <Icon name="Star" size={16} className="mr-2" />
          Ver todas las destacadas
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Image */}
        <div className="lg:col-span-2">
          <div 
            className="group relative overflow-hidden rounded-lg cursor-pointer bg-muted"
            onClick={() => onImageClick(mainFeatured, 0)}
          >
            <div className="aspect-[16/10] relative">
              <Image
                src={mainFeatured.src}
                alt={mainFeatured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                          <Icon name="Star" size={14} className="inline mr-1" />
                          Destacada
                        </span>
                        {mainFeatured.isAward && (
                          <span className="bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-medium">
                            <Icon name="Award" size={14} className="inline mr-1" />
                            Premiada
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-white mb-2">
                        {mainFeatured.title}
                      </h3>
                      <p className="text-white/80 text-sm mb-3 line-clamp-2">
                        {mainFeatured.description}
                      </p>
                      <div className="flex items-center space-x-4 text-white/80 text-sm">
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={14} />
                          <span>{mainFeatured.photographer}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>{mainFeatured.date}</span>
                        </div>
                        {mainFeatured.location && (
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={14} />
                            <span>{mainFeatured.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-3 text-white text-sm">
                  <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Icon name="Eye" size={14} />
                    <span>{formatNumber(mainFeatured.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Icon name="Heart" size={14} />
                    <span>{formatNumber(mainFeatured.likes)}</span>
                  </div>
                  {mainFeatured.rating && (
                    <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Icon name="Star" size={14} />
                      <span>{mainFeatured.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Featured Images */}
        <div className="space-y-6">
          {secondaryFeatured.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer bg-muted"
              onClick={() => onImageClick(image, index + 1)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {image.isAward && (
                        <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                          <Icon name="Award" size={12} className="inline mr-1" />
                          Premiada
                        </span>
                      )}
                      <span className="bg-muted/80 text-text-primary px-2 py-1 rounded-full text-xs">
                        {image.category}
                      </span>
                    </div>
                    <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">
                      {image.title}
                    </h4>
                    <div className="flex items-center justify-between text-white/80 text-xs">
                      <span>por {image.photographer}</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Icon name="Eye" size={12} />
                          <span>{formatNumber(image.views)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Heart" size={12} />
                          <span>{formatNumber(image.likes)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;