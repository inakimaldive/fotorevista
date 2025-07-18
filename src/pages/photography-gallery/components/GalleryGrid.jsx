import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GalleryGrid = ({ images, onImageClick, loading }) => {
  const [visibleImages, setVisibleImages] = useState(20);
  const [imageHeights, setImageHeights] = useState({});
  const observerRef = useRef();
  const lastImageRef = useRef();

  const calculateImageHeight = useCallback((image) => {
    const baseHeight = 200;
    const aspectRatio = image.width / image.height;
    return Math.floor(baseHeight / aspectRatio);
  }, []);

  useEffect(() => {
    const heights = {};
    images.forEach(image => {
      heights[image.id] = calculateImageHeight(image);
    });
    setImageHeights(heights);
  }, [images, calculateImageHeight]);

  const loadMoreImages = useCallback(() => {
    if (visibleImages < images.length) {
      setVisibleImages(prev => Math.min(prev + 20, images.length));
    }
  }, [visibleImages, images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 }
    );

    if (lastImageRef.current) {
      observer.observe(lastImageRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreImages, loading]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (loading && visibleImages === 20) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg aspect-[3/4]"></div>
            <div className="mt-2 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.slice(0, visibleImages).map((image, index) => (
          <div
            key={image.id}
            ref={index === visibleImages - 1 ? lastImageRef : null}
            className="group cursor-pointer"
            onClick={() => onImageClick(image, index)}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted">
              <Image
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ height: `${imageHeights[image.id] || 200}px` }}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="Eye" size={24} />
                  </Button>
                </div>
              </div>

              {/* Award badge */}
              {image.isAward && (
                <div className="absolute top-2 left-2">
                  <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                    <Icon name="Award" size={12} className="inline mr-1" />
                    Premiada
                  </div>
                </div>
              )}

              {/* Quick actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Favorito:', image.id);
                    }}
                  >
                    <Icon name="Heart" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Compartir:', image.id);
                    }}
                  >
                    <Icon name="Share2" size={16} />
                  </Button>
                </div>
              </div>

              {/* Engagement metrics */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{formatNumber(image.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{formatNumber(image.likes)}</span>
                    </div>
                  </div>
                  {image.rating && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} />
                      <span>{image.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image info */}
            <div className="mt-3 space-y-1">
              <h3 className="font-medium text-text-primary text-sm line-clamp-2 group-hover:text-accent transition-colors">
                {image.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-xs text-text-secondary">
                  por {image.photographer}
                </p>
                <div className="flex items-center space-x-1 text-xs text-text-secondary">
                  <Icon name="Calendar" size={10} />
                  <span>{image.date}</span>
                </div>
              </div>
              {image.category && (
                <div className="flex items-center space-x-2">
                  <span className="inline-block bg-muted text-text-secondary px-2 py-1 rounded-full text-xs">
                    {image.category}
                  </span>
                  {image.location && (
                    <div className="flex items-center space-x-1 text-xs text-text-secondary">
                      <Icon name="MapPin" size={10} />
                      <span>{image.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load more indicator */}
      {loading && visibleImages > 20 && (
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="animate-spin">
              <Icon name="Loader2" size={20} />
            </div>
            <span>Cargando más imágenes...</span>
          </div>
        </div>
      )}

      {/* End of results */}
      {visibleImages >= images.length && images.length > 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">
            Has visto todas las {images.length} imágenes
          </p>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;