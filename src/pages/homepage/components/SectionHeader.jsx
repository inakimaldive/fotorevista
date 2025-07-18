import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SectionHeader = ({ 
  title, 
  subtitle, 
  viewAllLink, 
  viewAllText = "Ver todo",
  icon,
  className = ""
}) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div className="flex items-center space-x-3">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 text-accent rounded-lg">
            <Icon name={icon} size={20} />
          </div>
        )}
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary">
            {title}
          </h2>
          {subtitle && (
            <p className="text-text-secondary text-sm font-caption mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {viewAllLink && (
        <Link to={viewAllLink}>
          <Button variant="ghost" className="text-accent hover:text-accent/80">
            {viewAllText}
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;