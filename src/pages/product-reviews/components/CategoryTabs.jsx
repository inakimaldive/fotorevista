import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'Todos', icon: 'Grid3X3', count: 156 },
    { id: 'cameras', label: 'Cámaras', icon: 'Camera', count: 45 },
    { id: 'lenses', label: 'Objetivos', icon: 'Circle', count: 38 },
    { id: 'accessories', label: 'Accesorios', icon: 'Package', count: 29 },
    { id: 'lighting', label: 'Iluminación', icon: 'Lightbulb', count: 22 },
    { id: 'tripods', label: 'Trípodes', icon: 'Triangle', count: 15 },
    { id: 'software', label: 'Software', icon: 'Monitor', count: 7 },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-1 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
              activeCategory === category.id
                ? 'bg-accent text-accent-foreground'
                : 'text-text-secondary hover:text-text-primary hover:bg-muted'
            }`}
          >
            <Icon name={category.icon} size={16} />
            <span>{category.label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeCategory === category.id
                ? 'bg-accent-foreground/20'
                : 'bg-muted text-text-secondary'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;