import React from 'react';

import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-yellow-500 fill-current opacity-50" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-smooth hover-scale">
      <div className="relative overflow-hidden h-48">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
            Nuevo
          </div>
        )}
        {product.isRecommended && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
            Recomendado
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-caption text-text-secondary bg-muted px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm font-medium text-text-primary">
            {product.rating}
          </span>
          <span className="text-sm text-text-secondary">
            ({product.reviewCount} reseñas)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-text-primary">
              €{product.price.toLocaleString('es-ES')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-text-secondary line-through">
                €{product.originalPrice.toLocaleString('es-ES')}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
        
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {product.summary}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Pros:</span>
            <span className="text-success font-medium">{product.pros.length} puntos</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Contras:</span>
            <span className="text-error font-medium">{product.cons.length} puntos</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="default"
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            Leer Reseña
          </Button>
          <Button
            variant="outline"
            size="icon"
            iconName="Heart"
            iconSize={16}
          />
          <Button
            variant="outline"
            size="icon"
            iconName="Share2"
            iconSize={16}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;