import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PortfolioGallery = ({ photographer }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'portrait', label: 'Retratos' },
    { id: 'landscape', label: 'Paisajes' },
    { id: 'street', label: 'Urbana' },
    { id: 'commercial', label: 'Comercial' },
    { id: 'wedding', label: 'Bodas' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? photographer.portfolio 
    : photographer.portfolio.filter(img => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setCurrentImageIndex(0);
  };

  const navigateLightbox = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredImages.length
      : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentImageIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
    if (e.key === 'ArrowRight') navigateLightbox('next');
  };

  React.useEffect(() => {
    if (lightboxImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage, currentImageIndex]);

  return (
    <section className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 sm:mb-0">
            Portfolio
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer hover-scale"
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-smooth group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-smooth flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-smooth">
                  <Icon name="ZoomIn" size={24} color="white" />
                </div>
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-smooth">
                <h3 className="text-white text-sm font-medium truncate">
                  {image.title}
                </h3>
                <p className="text-white/80 text-xs">
                  {image.location} • {image.year}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Camera" size={48} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-secondary">
              No hay imágenes disponibles en esta categoría.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredImages.length > 12 && (
          <div className="text-center mt-8">
            <Button variant="outline" iconName="Plus" iconPosition="left">
              Cargar más imágenes
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            >
              <Icon name="X" size={24} />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <Icon name="ChevronLeft" size={24} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <Icon name="ChevronRight" size={24} />
            </Button>

            {/* Image */}
            <div className="relative">
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-heading font-semibold mb-2">
                  {lightboxImage.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center">
                    <Icon name="MapPin" size={16} className="mr-1" />
                    {lightboxImage.location}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Calendar" size={16} className="mr-1" />
                    {lightboxImage.year}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Camera" size={16} className="mr-1" />
                    {lightboxImage.camera}
                  </span>
                </div>
                {lightboxImage.description && (
                  <p className="text-white/90 text-sm mt-2">
                    {lightboxImage.description}
                  </p>
                )}
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGallery;