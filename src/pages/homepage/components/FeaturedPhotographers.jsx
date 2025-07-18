import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedPhotographers = () => {
  const photographers = [
    {
      id: 1,
      name: "Elena Martínez",
      specialty: "Fotografía de Retrato",
      location: "Madrid, España",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      coverImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      followers: "12.5K",
      awards: 8,
      verified: true
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      specialty: "Fotografía de Paisaje",
      location: "Barcelona, España",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      followers: "8.2K",
      awards: 5,
      verified: true
    },
    {
      id: 3,
      name: "Ana López",
      specialty: "Fotografía Urbana",
      location: "Valencia, España",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      coverImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      followers: "15.7K",
      awards: 12,
      verified: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-2">
            Fotógrafos Destacados
          </h2>
          <p className="text-text-secondary text-sm">
            Conoce a los profesionales que están marcando tendencia
          </p>
        </div>
        
        <Link to="/photographer-profiles">
          <Button variant="ghost" className="text-accent hover:text-accent/80">
            Ver todos
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {photographers.map((photographer) => (
          <Link 
            key={photographer.id} 
            to="/photographer-profiles"
            className="group cursor-pointer"
          >
            <div className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-smooth hover-scale">
              {/* Cover Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={photographer.coverImage}
                  alt={`Trabajo de ${photographer.name}`}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Stats Overlay */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <div className="flex items-center space-x-1 px-2 py-1 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
                    <Icon name="Award" size={12} />
                    <span>{photographer.awards}</span>
                  </div>
                </div>
              </div>
              
              {/* Profile Info */}
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Image
                      src={photographer.avatar}
                      alt={photographer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {photographer.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-text-primary group-hover:text-accent transition-smooth">
                      {photographer.name}
                    </h3>
                    <p className="text-text-secondary text-sm mb-1">
                      {photographer.specialty}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{photographer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{photographer.followers}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPhotographers;