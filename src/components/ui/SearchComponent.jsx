import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const SearchComponent = ({ onSearch, placeholder = "Buscar contenido..." }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const mockSuggestions = [
    { type: 'article', title: 'Técnicas de fotografía nocturna', category: 'Noticias' },
    { type: 'gallery', title: 'Paisajes de España', category: 'Galerías' },
    { type: 'product', title: 'Canon EOS R5 Review', category: 'Productos' },
    { type: 'event', title: 'Exposición Madrid Photo', category: 'Eventos' },
    { type: 'photographer', title: 'Ana García Portfolio', category: 'Fotógrafos' },
  ];

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 0) {
      const filtered = mockSuggestions.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setShowSuggestions(false);
      console.log('Searching for:', query.trim());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    onSearch?.(suggestion.title);
  };

  const getIconForType = (type) => {
    const icons = {
      article: 'FileText',
      gallery: 'Camera',
      product: 'Star',
      event: 'Calendar',
      photographer: 'User',
    };
    return icons[type] || 'Search';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {!isExpanded ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleExpand}
          className="text-text-secondary hover:text-accent"
          aria-label="Abrir búsqueda"
        >
          <Icon name="Search" size={20} />
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative">
            <Input
              ref={inputRef}
              type="search"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              className="w-64 pr-10"
              onFocus={() => query.trim() && setShowSuggestions(true)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-text-secondary hover:text-accent"
            >
              <Icon name="Search" size={16} />
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCollapse}
            className="ml-2 text-text-secondary hover:text-accent"
            aria-label="Cerrar búsqueda"
          >
            <Icon name="X" size={20} />
          </Button>
        </form>
      )}

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-modal z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-caption text-text-secondary px-3 py-2 border-b border-border">
              Sugerencias de búsqueda
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-smooth"
              >
                <Icon 
                  name={getIconForType(suggestion.type)} 
                  size={16} 
                  className="text-text-secondary" 
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary truncate">
                    {suggestion.title}
                  </div>
                  <div className="text-xs font-caption text-text-secondary">
                    {suggestion.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;