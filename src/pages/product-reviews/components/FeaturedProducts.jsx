import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Sony α7R V",
      category: "Cámaras",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      rating: 4.8,
      price: 4299,
      originalPrice: 4599,
      summary: "La última cámara mirrorless de Sony con sensor de 61MP y capacidades de video 8K.",
      badge: "Editor\'s Choice",
      isNew: true
    },
    {
      id: 2,
      name: "Canon RF 85mm f/1.2L",
      category: "Objetivos",
      image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=300&fit=crop",
      rating: 4.9,
      price: 2699,
      summary: "Objetivo retrato profesional con apertura ultra amplia y calidad óptica excepcional.",
      badge: "Más Vendido",
      isRecommended: true
    },
    {
      id: 3,
      name: "Godox AD600Pro",
      category: "Iluminación",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
      rating: 4.7,
      price: 899,
      originalPrice: 1099,
      summary: "Flash de estudio portátil con 600W de potencia y control inalámbrico.",
      badge: "Mejor Valor"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-current" />
      );
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Productos Destacados
          </h2>
          <p className="text-text-secondary">
            Nuestras recomendaciones editoriales y productos más valorados
          </p>
        </div>
        <Button
          variant="outline"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          Ver todos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-smooth">
            <div className="relative overflow-hidden h-48">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                {product.badge}
              </div>
              {product.isNew && (
                <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
                  Nuevo
                </div>
              )}
              {product.isRecommended && !product.isNew && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                  Recomendado
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs font-caption text-text-secondary bg-muted px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                {product.name}
              </h3>
              
              <div className="flex items-center space-x-1 mb-3">
                {renderStars(product.rating)}
                <span className="text-sm font-medium text-text-primary ml-1">
                  {product.rating}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl font-bold text-text-primary">
                  €{product.price.toLocaleString('es-ES')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-text-secondary line-through">
                      €{product.originalPrice.toLocaleString('es-ES')}
                    </span>
                    <span className="text-sm font-medium text-success bg-success/10 px-2 py-1 rounded">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              
              <p className="text-sm text-text-secondary mb-4">
                {product.summary}
              </p>
              
              <Button
                variant="default"
                className="w-full"
                iconName="Eye"
                iconPosition="left"
                iconSize={16}
              >
                Ver Reseña Completa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;