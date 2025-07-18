import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ArticleHero = ({ article, onShare, onBookmark, isBookmarked }) => {
  const shareOptions = [
    { name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
    { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2' },
    { name: 'WhatsApp', icon: 'MessageCircle', color: '#25D366' },
  ];

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <Image
        src={article.heroImage}
        alt={article.title}
        className="w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
        <div className="max-w-4xl">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              <Icon name={article.categoryIcon} size={14} className="mr-1" />
              {article.category}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          
          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
              {article.subtitle}
            </p>
          )}
          
          {/* Author and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-white font-medium">{article.author.name}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span>{article.publishDate}</span>
                  <span>•</span>
                  <span>{article.readTime} min lectura</span>
                  <span>•</span>
                  <span>{article.views} visualizaciones</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBookmark}
                className="text-white hover:bg-white/20"
              >
                <Icon 
                  name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
                  size={20} 
                  className={isBookmarked ? "fill-current" : ""} 
                />
              </Button>
              
              {/* Share Dropdown */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="Share2" size={20} />
                </Button>
                
                <div className="absolute bottom-full right-0 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-surface border border-border rounded-lg shadow-modal p-2 min-w-[160px]">
                  {shareOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => onShare(option.name.toLowerCase())}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-muted rounded-md transition-smooth"
                    >
                      <Icon name={option.icon} size={16} style={{ color: option.color }} />
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHero;