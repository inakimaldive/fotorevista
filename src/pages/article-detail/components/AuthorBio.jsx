import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthorBio = ({ author }) => {
  const socialLinks = [
    { platform: 'Instagram', icon: 'Instagram', url: author.social?.instagram },
    { platform: 'Twitter', icon: 'Twitter', url: author.social?.twitter },
    { platform: 'LinkedIn', icon: 'Linkedin', url: author.social?.linkedin },
    { platform: 'Website', icon: 'Globe', url: author.social?.website },
  ].filter(link => link.url);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-surface border border-border rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Author Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={author.avatar}
              alt={author.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-accent/20"
            />
          </div>
          
          {/* Author Info */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-2xl font-heading font-semibold text-text-primary mb-2">
                {author.name}
              </h3>
              <p className="text-accent font-medium mb-2">{author.title}</p>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span className="flex items-center">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  {author.location}
                </span>
                <span className="flex items-center">
                  <Icon name="Calendar" size={14} className="mr-1" />
                  {author.experience} años de experiencia
                </span>
                <span className="flex items-center">
                  <Icon name="Award" size={14} className="mr-1" />
                  {author.articlesCount} artículos
                </span>
              </div>
            </div>
            
            {/* Bio */}
            <p className="text-text-primary leading-relaxed mb-6">
              {author.bio}
            </p>
            
            {/* Specialties */}
            {author.specialties && author.specialties.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-secondary mb-2">Especialidades:</h4>
                <div className="flex flex-wrap gap-2">
                  {author.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Actions and Social Links */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Link to="/photographer-profiles">
                  <Button variant="default" size="sm">
                    <Icon name="User" size={16} className="mr-2" />
                    Ver Perfil Completo
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  <Icon name="Mail" size={16} className="mr-2" />
                  Contactar
                </Button>
              </div>
              
              {/* Social Links */}
              {socialLinks.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary mr-2">Sígueme:</span>
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-secondary hover:text-accent transition-smooth"
                      aria-label={`Seguir en ${link.platform}`}
                    >
                      <Icon name={link.icon} size={18} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recent Articles */}
        {author.recentArticles && author.recentArticles.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="text-lg font-heading font-medium text-text-primary mb-4">
              Más artículos de {author.name}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {author.recentArticles.map((article) => (
                <Link
                  key={article.id}
                  to="/article-detail"
                  className="flex items-center space-x-3 p-3 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-text-primary line-clamp-2 mb-1">
                      {article.title}
                    </h5>
                    <p className="text-sm text-text-secondary">
                      {article.publishDate}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorBio;