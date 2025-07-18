import React from 'react';
import ProductCard from './ProductCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ products, loading, hasMore, onLoadMore }) => {
  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Icon name="Search" size={24} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          No se encontraron productos
        </h3>
        <p className="text-text-secondary mb-6">
          Intenta ajustar los filtros o buscar con términos diferentes
        </p>
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center pt-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
          >
            {loading ? 'Cargando...' : 'Cargar más productos'}
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-text-secondary">
        Mostrando {products.length} productos
        {hasMore && ' de muchos más'}
      </div>
    </div>
  );
};

export default ProductGrid;