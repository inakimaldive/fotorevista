import React, { useState, useEffect, useCallback } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageLightbox = ({ image, images, currentIndex, isOpen, onClose, onNavigate }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMetadata, setShowMetadata] = useState(false);

  const handleKeyPress = useCallback((e) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        if (currentIndex < images.length - 1) {
          onNavigate(currentIndex + 1);
        }
        break;
      case 'i': case'I':
        setShowMetadata(!showMetadata);
        break;
      default:
        break;
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate, showMetadata]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsZoomed(false);
      setZoomLevel(1);
      setShowMetadata(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleZoomToggle = () => {
    if (isZoomed) {
      setZoomLevel(1);
      setIsZoomed(false);
    } else {
      setZoomLevel(2);
      setIsZoomed(true);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title.replace(/\s+/g, '_')}_${image.photographer}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Fotografía de ${image.photographer} - ${image.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('URL copiada al portapapeles');
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={24} />
            </Button>
            <div className="text-white">
              <h2 className="font-medium">{image.title}</h2>
              <p className="text-sm opacity-80">por {image.photographer}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">
              {currentIndex + 1} de {images.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-20">
        <div 
          className={`relative max-w-full max-h-full transition-transform duration-300 ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={handleZoomToggle}
        >
          <Image
            src={image.src}
            alt={image.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
        >
          <Icon name="ChevronLeft" size={32} />
        </Button>
      )}
      
      {currentIndex < images.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
        >
          <Icon name="ChevronRight" size={32} />
        </Button>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomToggle}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMetadata(!showMetadata)}
              className="text-white hover:bg-white/20"
            >
              <Icon name="Info" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-white hover:bg-white/20"
            >
              <Icon name="Share2" size={20} />
            </Button>
            
            {image.downloadable && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="text-white hover:bg-white/20"
              >
                <Icon name="Download" size={20} />
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-4 text-white text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={16} />
              <span>{formatNumber(image.views)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={16} />
              <span>{formatNumber(image.likes)}</span>
            </div>
            {image.rating && (
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} />
                <span>{image.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metadata Panel */}
      {showMetadata && (
        <div className="absolute right-4 top-20 bottom-20 w-80 bg-black/90 backdrop-blur-sm rounded-lg p-6 overflow-y-auto">
          <div className="space-y-6 text-white">
            <div>
              <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
              <p className="text-sm opacity-80">{image.description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} />
                <span className="text-sm">
                  <span className="opacity-80">Fotógrafo:</span> {image.photographer}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span className="text-sm">
                  <span className="opacity-80">Fecha:</span> {image.date}
                </span>
              </div>
              
              {image.location && (
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">
                    <span className="opacity-80">Ubicación:</span> {image.location}
                  </span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Icon name="Tag" size={16} />
                <span className="text-sm">
                  <span className="opacity-80">Categoría:</span> {image.category}
                </span>
              </div>
            </div>

            {image.cameraSettings && (
              <div className="space-y-3">
                <h4 className="font-medium">Configuración de Cámara</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="opacity-80">Cámara:</span>
                    <br />
                    {image.cameraSettings.camera}
                  </div>
                  <div>
                    <span className="opacity-80">Objetivo:</span>
                    <br />
                    {image.cameraSettings.lens}
                  </div>
                  <div>
                    <span className="opacity-80">ISO:</span>
                    <br />
                    {image.cameraSettings.iso}
                  </div>
                  <div>
                    <span className="opacity-80">Apertura:</span>
                    <br />
                    f/{image.cameraSettings.aperture}
                  </div>
                  <div>
                    <span className="opacity-80">Velocidad:</span>
                    <br />
                    {image.cameraSettings.shutterSpeed}
                  </div>
                  <div>
                    <span className="opacity-80">Focal:</span>
                    <br />
                    {image.cameraSettings.focalLength}mm
                  </div>
                </div>
              </div>
            )}

            {image.tags && image.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Etiquetas</h4>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white/20 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;