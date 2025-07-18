import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchComponent from '../../components/ui/SearchComponent';

import Button from '../../components/ui/Button';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryTabs from './components/CategoryTabs';
import ProductFilters from './components/ProductFilters';
import ProductGrid from './components/ProductGrid';
import ProductComparison from './components/ProductComparison';

const ProductReviews = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const mockProducts = [
    {
      id: 1,
      name: "Canon EOS R5",
      category: "Cámaras",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 127,
      price: 3899,
      originalPrice: 4199,
      summary: "Cámara mirrorless profesional con sensor de 45MP y grabación 8K RAW interna.",
      pros: ["Calidad de imagen excepcional", "Grabación 8K", "Estabilización IBIS", "Construcción resistente"],
      cons: ["Precio elevado", "Consumo de batería alto"],
      isNew: false,
      isRecommended: true
    },
    {
      id: 2,
      name: "Sony FX3",
      category: "Cámaras",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 89,
      price: 4199,
      summary: "Cámara de cine full-frame compacta con capacidades profesionales de video.",
      pros: ["Excelente para video", "Compacta", "Buen rendimiento en poca luz"],
      cons: ["Enfoque en video", "Precio alto"],
      isNew: true,
      isRecommended: false
    },
    {
      id: 3,
      name: "Nikon Z9",
      category: "Cámaras",
      image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 156,
      price: 5499,
      summary: "Cámara mirrorless flagship con sensor de 45.7MP y capacidades de video 8K.",
      pros: ["Sin obturador mecánico", "Excelente calidad", "Duración de batería"],
      cons: ["Muy cara", "Tamaño grande"],
      isNew: false,
      isRecommended: true
    },
    {
      id: 4,
      name: "Canon RF 24-70mm f/2.8L",
      category: "Objetivos",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 203,
      price: 2299,
      originalPrice: 2499,
      summary: "Objetivo zoom estándar profesional con apertura constante f/2.8.",
      pros: ["Versatilidad", "Calidad óptica", "Estabilización IS"],
      cons: ["Peso considerable", "Precio alto"],
      isNew: false,
      isRecommended: false
    },
    {
      id: 5,
      name: "Sony FE 85mm f/1.4 GM",
      category: "Objetivos",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 167,
      price: 1799,
      summary: "Objetivo retrato premium con bokeh excepcional y nitidez sobresaliente.",
      pros: ["Bokeh hermoso", "Nitidez extrema", "Construcción premium"],
      cons: ["Precio elevado", "Peso"],
      isNew: false,
      isRecommended: true
    },
    {
      id: 6,
      name: "Godox V1 Flash",
      category: "Iluminación",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 134,
      price: 259,
      originalPrice: 299,
      summary: "Flash de cabeza redonda con batería de litio y modelado LED.",
      pros: ["Cabeza redonda", "Batería de larga duración", "Luz de modelado"],
      cons: ["Accesorios caros", "Interfaz compleja"],
      isNew: true,
      isRecommended: false
    },
    {
      id: 7,
      name: "Peak Design Tripod",
      category: "Trípodes",
      image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 78,
      price: 599,
      summary: "Trípode de fibra de carbono ultracompacto con diseño innovador.",
      pros: ["Muy compacto", "Diseño único", "Calidad de construcción"],
      cons: ["Precio muy alto", "Capacidad de carga limitada"],
      isNew: false,
      isRecommended: false
    },
    {
      id: 8,
      name: "Adobe Lightroom Classic",
      category: "Software",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 892,
      price: 119,
      summary: "Software profesional de edición y organización de fotografías RAW.",
      pros: ["Potente organización", "Edición no destructiva", "Sincronización"],
      cons: ["Curva de aprendizaje", "Suscripción mensual"],
      isNew: false,
      isRecommended: true
    },
    {
      id: 9,
      name: "Manfrotto 055 Series",
      category: "Trípodes",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 245,
      price: 189,
      originalPrice: 229,
      summary: "Trípode de aluminio versátil con columna central horizontal.",
      pros: ["Muy estable", "Columna horizontal", "Buen precio"],
      cons: ["Peso considerable", "No incluye cabezal"],
      isNew: false,
      isRecommended: true
    }
  ];

  useEffect(() => {
    loadProducts();
  }, [activeCategory, searchQuery]);

  const loadProducts = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let filteredProducts = mockProducts;
      
      if (activeCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.category.toLowerCase() === getCategoryName(activeCategory).toLowerCase()
        );
      }
      
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.summary.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setProducts(filteredProducts);
      setLoading(false);
      setHasMore(filteredProducts.length > 6);
    }, 500);
  };

  const getCategoryName = (categoryId) => {
    const categoryMap = {
      'cameras': 'Cámaras',
      'lenses': 'Objetivos',
      'accessories': 'Accesorios',
      'lighting': 'Iluminación',
      'tripods': 'Trípodes',
      'software': 'Software'
    };
    return categoryMap[categoryId] || '';
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (filters) => {
    console.log('Filters changed:', filters);
    // Apply filters logic here
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasMore(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Reseñas de Productos - FotoRevista</title>
        <meta name="description" content="Descubre las mejores cámaras, objetivos y accesorios fotográficos con nuestras reseñas detalladas y comparativas profesionales." />
        <meta name="keywords" content="reseñas cámaras, objetivos fotografía, accesorios fotográficos, comparativas equipos" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="max-w-8xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-2">
                  Reseñas de Productos
                </h1>
                <p className="text-lg text-text-secondary">
                  Análisis detallados de cámaras, objetivos y accesorios fotográficos
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <SearchComponent
                  onSearch={handleSearch}
                  placeholder="Buscar productos..."
                />
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                  iconSize={16}
                >
                  Filtros
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsComparisonOpen(true)}
                  iconName="BarChart3"
                  iconPosition="left"
                  iconSize={16}
                >
                  Comparar
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Products */}
          <FeaturedProducts />

          {/* Category Navigation */}
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Products Grid */}
          <div className={`transition-all duration-300 ${isFilterOpen ? 'lg:ml-80' : ''}`}>
            <ProductGrid
              products={products}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </div>
        </main>

        {/* Product Filters Sidebar */}
        <ProductFilters
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
          onFiltersChange={handleFiltersChange}
        />

        {/* Product Comparison Modal */}
        <ProductComparison
          isOpen={isComparisonOpen}
          onClose={() => setIsComparisonOpen(false)}
          availableProducts={mockProducts}
        />
      </div>
    </>
  );
};

export default ProductReviews;