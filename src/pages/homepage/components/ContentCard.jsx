import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ContentCard = ({ 
  title, 
  excerpt, 
  image, 
  category, 
  author, 
  publishDate, 
  readTime, 
  link,
  featured = false,
  size = 'default'
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const cardClasses = {
    small: 'group cursor-pointer',
    default: 'group cursor-pointer hover-scale',
    large: 'group cursor-pointer hover-scale'
  };

  const imageClasses = {
    small: 'w-full h-32 object-cover',
    default: 'w-full h-48 object-cover',
    large: 'w-full h-64 object-cover'
  };

  return (
    <Link to={link} className={cardClasses[size]}>
      <article className={`bg-card rounded-lg overflow-hidden shadow-card transition-smooth group-hover:shadow-modal ${featured ? 'ring-2 ring-accent/20' : ''}`}>
        {/* Image */}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            className={`${imageClasses[size]} transition-smooth group-hover:scale-105`}
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/70 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>
          
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center space-x-1 px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                <Icon name="Star" size={12} />
                <span>Destacado</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className={`font-heading font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-accent transition-smooth ${
            size === 'large' ? 'text-lg' : size === 'small' ? 'text-sm' : 'text-base'
          }`}>
            {title}
          </h3>
          
          {size !== 'small' && (
            <p className="text-text-secondary text-sm mb-3 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
          
          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs font-caption text-text-secondary">
            <div className="flex items-center space-x-2">
              <span>{author}</span>
              <span>•</span>
              <span>{formatDate(publishDate)}</span>
            </div>
            
            {readTime && (
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{readTime}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ContentCard;