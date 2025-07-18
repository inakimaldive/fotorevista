import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RelatedArticles = ({ articles, trending }) => {
  return (
    <div className="space-y-8">
      {/* Related Articles */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-accent" />
          Artículos Relacionados
        </h3>
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              to="/article-detail"
              className="flex space-x-3 p-3 hover:bg-muted rounded-lg transition-smooth"
            >
              <Image
                src={article.thumbnail}
                alt={article.title}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary line-clamp-2 mb-2">
                  {article.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <span className="flex items-center">
                    <Icon name={article.categoryIcon} size={12} className="mr-1" />
                    {article.category}
                  </span>
                  <span>•</span>
                  <span>{article.readTime} min</span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  {article.publishDate}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Articles */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2 text-accent" />
          Tendencias
        </h3>
        <div className="space-y-4">
          {trending.map((article, index) => (
            <Link
              key={article.id}
              to="/article-detail"
              className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-smooth"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary line-clamp-2 mb-1">
                  {article.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <span className="flex items-center">
                    <Icon name="Eye" size={10} className="mr-1" />
                    {article.views}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Icon name="MessageCircle" size={10} className="mr-1" />
                    {article.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="text-center">
          <Icon name="Mail" size={32} className="mx-auto text-accent mb-3" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Suscríbete a nuestro boletín
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Recibe las últimas noticias de fotografía directamente en tu correo
          </p>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="tu@email.com"
              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-accent/90 transition-smooth">
              Suscribirse
            </button>
          </div>
          <p className="text-xs text-text-secondary mt-2">
            Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </div>

      {/* Social Follow */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 text-center">
          Síguenos en redes sociales
        </h3>
        <div className="flex justify-center space-x-4">
          {[
            { name: 'Instagram', icon: 'Instagram', color: '#E4405F', followers: '25.4K' },
            { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2', followers: '18.2K' },
            { name: 'Facebook', icon: 'Facebook', color: '#1877F2', followers: '32.1K' },
            { name: 'YouTube', icon: 'Youtube', color: '#FF0000', followers: '12.8K' },
          ].map((social) => (
            <a
              key={social.name}
              href="#"
              className="flex flex-col items-center p-3 hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon 
                name={social.icon} 
                size={24} 
                style={{ color: social.color }}
                className="mb-1"
              />
              <span className="text-xs font-medium text-text-primary">
                {social.followers}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;