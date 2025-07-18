import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ArticleContent = ({ content, images, relatedProducts }) => {
  const [fontSize, setFontSize] = useState('default');
  const [selectedImage, setSelectedImage] = useState(null);

  const fontSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Font Size Controls */}
      <div className="flex items-center justify-end mb-6 pb-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Tamaño de texto:</span>
          <div className="flex items-center space-x-1">
            {Object.entries(fontSizes).map(([size, className]) => (
              <Button
                key={size}
                variant={fontSize === size ? "default" : "ghost"}
                size="sm"
                onClick={() => setFontSize(size)}
                className="px-2 py-1"
              >
                <span className={size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : size === 'xlarge' ? 'text-xl' : 'text-sm'}>
                  A
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className={`prose prose-lg max-w-none ${fontSizes[fontSize]}`}>
        {content.map((section, index) => {
          switch (section.type) {
            case 'paragraph':
              return (
                <p key={index} className="mb-6 leading-relaxed text-text-primary">
                  {section.content}
                </p>
              );
            
            case 'heading':
              return (
                <h2 key={index} className="text-2xl md:text-3xl font-heading font-semibold text-text-primary mt-8 mb-4">
                  {section.content}
                </h2>
              );
            
            case 'subheading':
              return (
                <h3 key={index} className="text-xl md:text-2xl font-heading font-medium text-text-primary mt-6 mb-3">
                  {section.content}
                </h3>
              );
            
            case 'quote':
              return (
                <blockquote key={index} className="border-l-4 border-accent pl-6 my-8 italic text-lg text-text-secondary">
                  <p className="mb-2">"{section.content}"</p>
                  {section.author && (
                    <cite className="text-sm font-medium text-text-primary">
                      — {section.author}
                    </cite>
                  )}
                </blockquote>
              );
            
            case 'list':
              return (
                <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-text-primary">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              );
            
            case 'image':
              return (
                <div key={index} className="my-8">
                  <div 
                    className="relative overflow-hidden rounded-lg cursor-pointer hover-scale"
                    onClick={() => handleImageClick(section)}
                  >
                    <Image
                      src={section.src}
                      alt={section.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {section.caption && (
                    <p className="text-sm text-text-secondary mt-2 text-center italic">
                      {section.caption}
                    </p>
                  )}
                </div>
              );
            
            case 'gallery':
              return (
                <div key={index} className="my-8">
                  <h3 className="text-xl font-heading font-medium text-text-primary mb-4">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.images.map((image, imgIndex) => (
                      <div 
                        key={imgIndex}
                        className="relative overflow-hidden rounded-lg cursor-pointer hover-scale"
                        onClick={() => handleImageClick(image)}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            
            default:
              return null;
          }
        })}
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Star" size={20} className="mr-2 text-accent" />
            Productos Relacionados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-4 bg-surface rounded-lg border border-border">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary">{product.name}</h4>
                  <p className="text-sm text-text-secondary">{product.brand}</p>
                  <p className="text-lg font-semibold text-accent">{product.price}</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver más
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-5xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            >
              <Icon name="X" size={24} />
            </Button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            {selectedImage.caption && (
              <p className="text-white text-center mt-4 text-sm">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleContent;