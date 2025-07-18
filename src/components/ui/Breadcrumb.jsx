import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeLabels = {
    '/homepage': 'Inicio',
    '/article-detail': 'Noticias',
    '/photography-gallery': 'Galerías',
    '/product-reviews': 'Productos',
    '/events-calendar': 'Eventos',
    '/photographer-profiles': 'Fotógrafos',
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Inicio', path: '/homepage' }];

    if (location.pathname !== '/homepage') {
      const currentLabel = routeLabels[location.pathname];
      if (currentLabel) {
        breadcrumbs.push({ label: currentLabel, path: location.pathname });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-caption text-text-secondary mb-6" aria-label="Navegación de ruta">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-border" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-text-primary font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-accent transition-smooth"
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;