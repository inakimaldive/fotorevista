import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navigationItems = [
    { label: 'Inicio', path: '/homepage', icon: 'Home' },
    { label: 'Noticias', path: '/article-detail', icon: 'Newspaper' },
    { label: 'Galerías', path: '/photography-gallery', icon: 'Camera' },
    { label: 'Productos', path: '/product-reviews', icon: 'Star' },
    { label: 'Eventos', path: '/events-calendar', icon: 'Calendar' },
    { label: 'Fotógrafos', path: '/photographer-profiles', icon: 'Users' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Handle search logic here
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface border-b border-border shadow-card">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between h-20 px-6">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 transition-smooth hover:opacity-80"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Camera" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-semibold text-primary">
                FotoRevista
              </span>
              <span className="text-xs font-caption text-text-secondary -mt-1">
                Fotografía Profesional
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActiveRoute(item.path)
                    ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center">
              {isSearchExpanded ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <Input
                    id="search-input"
                    type="search"
                    placeholder="Buscar artículos, galerías..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 mr-2"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSearch}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </form>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={toggleSearch}
                  className="text-text-secondary hover:text-accent"
                >
                  <Icon name="Search" size={20} />
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden text-text-primary"
              aria-label="Abrir menú de navegación"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} />
          <div className="fixed top-20 left-0 right-0 bottom-0 bg-surface border-t border-border">
            <div className="flex flex-col h-full">
              {/* Mobile Search */}
              <div className="p-6 border-b border-border">
                <form onSubmit={handleSearchSubmit}>
                  <Input
                    type="search"
                    placeholder="Buscar en FotoRevista..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </form>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-6 py-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                        isActiveRoute(item.path)
                          ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                      }`}
                    >
                      <Icon name={item.icon} size={20} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-border">
                <p className="text-sm font-caption text-text-secondary text-center">
                  © 2025 FotoRevista. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;