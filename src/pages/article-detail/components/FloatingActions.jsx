import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActions = ({ onBookmark, onShare, isBookmarked, onFontSizeChange, currentFontSize }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const fontSizes = [
    { key: 'small', label: 'Pequeño', icon: 'Minus' },
    { key: 'default', label: 'Normal', icon: 'Type' },
    { key: 'large', label: 'Grande', icon: 'Plus' },
    { key: 'xlarge', label: 'Muy Grande', icon: 'Plus' }
  ];

  const shareOptions = [
    { name: 'Facebook', icon: 'Facebook', action: () => onShare('facebook') },
    { name: 'Twitter', icon: 'Twitter', action: () => onShare('twitter') },
    { name: 'LinkedIn', icon: 'Linkedin', action: () => onShare('linkedin') },
    { name: 'WhatsApp', icon: 'MessageCircle', action: () => onShare('whatsapp') },
    { name: 'Copiar enlace', icon: 'Copy', action: () => onShare('copy') },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* Font Size Menu */}
      {showFontMenu && (
        <div className="bg-surface border border-border rounded-lg shadow-modal p-2 mb-2">
          <div className="text-xs font-medium text-text-secondary px-2 py-1 border-b border-border mb-1">
            Tamaño de texto
          </div>
          {fontSizes.map((size) => (
            <button
              key={size.key}
              onClick={() => {
                onFontSizeChange(size.key);
                setShowFontMenu(false);
              }}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-smooth ${
                currentFontSize === size.key
                  ? 'bg-accent text-accent-foreground'
                  : 'text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={size.icon} size={14} />
              <span>{size.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Share Menu */}
      {showShareMenu && (
        <div className="bg-surface border border-border rounded-lg shadow-modal p-2 mb-2">
          <div className="text-xs font-medium text-text-secondary px-2 py-1 border-b border-border mb-1">
            Compartir artículo
          </div>
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                option.action();
                setShowShareMenu(false);
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth"
            >
              <Icon name={option.icon} size={14} />
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2">
        {/* Font Size Toggle */}
        <Button
          variant="default"
          size="icon"
          onClick={() => {
            setShowFontMenu(!showFontMenu);
            setShowShareMenu(false);
          }}
          className="w-12 h-12 rounded-full shadow-modal"
          aria-label="Cambiar tamaño de texto"
        >
          <Icon name="Type" size={20} />
        </Button>

        {/* Bookmark */}
        <Button
          variant={isBookmarked ? "default" : "outline"}
          size="icon"
          onClick={onBookmark}
          className="w-12 h-12 rounded-full shadow-modal"
          aria-label={isBookmarked ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={20}
            className={isBookmarked ? "fill-current" : ""}
          />
        </Button>

        {/* Share */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setShowShareMenu(!showShareMenu);
            setShowFontMenu(false);
          }}
          className="w-12 h-12 rounded-full shadow-modal"
          aria-label="Compartir artículo"
        >
          <Icon name="Share2" size={20} />
        </Button>

        {/* Scroll to Top */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full shadow-modal"
          aria-label="Volver arriba"
        >
          <Icon name="ArrowUp" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default FloatingActions;