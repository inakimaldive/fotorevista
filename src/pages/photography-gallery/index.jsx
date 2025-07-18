import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchComponent from '../../components/ui/SearchComponent';
import FilterSidebar from '../../components/ui/FilterSidebar';
import GalleryFilters from './components/GalleryFilters';
import GalleryStats from './components/GalleryStats';
import FeaturedSection from './components/FeaturedSection';
import GalleryGrid from './components/GalleryGrid';
import ImageLightbox from './components/ImageLightbox';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PhotographyGallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    sort: 'newest',
    location: 'all',
    awardWinners: false,
    editorChoice: false,
    highResolution: false,
    recentlyAdded: false,
  });

  // Mock data for gallery images
  const mockImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      title: "Amanecer en los Picos de Europa",
      photographer: "María González",
      description: "Captura del amanecer desde el mirador de Fuente Dé, mostrando la majestuosidad de los Picos de Europa en todo su esplendor matutino.",
      category: "landscape",
      location: "Cantabria, España",
      date: "15/07/2025",
      views: 12450,
      likes: 892,
      rating: 4.8,
      width: 800,
      height: 600,
      isAward: true,
      isFeatured: true,
      downloadable: true,
      cameraSettings: {
        camera: "Canon EOS R5",
        lens: "RF 24-70mm f/2.8L",
        iso: 100,
        aperture: 8,
        shutterSpeed: "1/125s",
        focalLength: 35
      },
      tags: ["paisaje", "montaña", "amanecer", "naturaleza"]
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8d3?w=600&h=800&fit=crop",
      title: "Retrato en Luz Natural",
      photographer: "Carlos Ruiz",
      description: "Retrato femenino utilizando únicamente luz natural, creando un ambiente íntimo y cálido que resalta la expresividad del sujeto.",
      category: "portrait",
      location: "Madrid, España",
      date: "12/07/2025",
      views: 8920,
      likes: 654,
      rating: 4.6,
      width: 600,
      height: 800,
      isAward: false,
      isFeatured: true,
      downloadable: false,
      cameraSettings: {
        camera: "Sony A7R IV",
        lens: "FE 85mm f/1.4 GM",
        iso: 200,
        aperture: 1.8,
        shutterSpeed: "1/200s",
        focalLength: 85
      },
      tags: ["retrato", "luz natural", "femenino", "intimidad"]
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      title: "Arquitectura Contemporánea",
      photographer: "Ana Martín",
      description: "Perspectiva arquitectónica de un edificio moderno en el distrito financiero, jugando con líneas, formas y reflejos urbanos.",
      category: "architecture",
      location: "Barcelona, España",
      date: "10/07/2025",
      views: 6780,
      likes: 423,
      rating: 4.4,
      width: 800,
      height: 600,
      isAward: false,
      isFeatured: true,
      downloadable: true,
      cameraSettings: {
        camera: "Nikon Z7 II",
        lens: "NIKKOR Z 14-30mm f/4 S",
        iso: 64,
        aperture: 11,
        shutterSpeed: "1/60s",
        focalLength: 20
      },
      tags: ["arquitectura", "moderno", "urbano", "geometría"]
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      title: "Sendero del Bosque Encantado",
      photographer: "David López",
      description: "Camino serpenteante a través de un bosque de hayas en otoño, con la luz filtrada creando un ambiente mágico y misterioso.",
      category: "nature",
      location: "Asturias, España",
      date: "08/07/2025",
      views: 15230,
      likes: 1120,
      rating: 4.9,
      width: 800,
      height: 600,
      isAward: true,
      isFeatured: false,
      downloadable: true,
      cameraSettings: {
        camera: "Fujifilm X-T4",
        lens: "XF 16-55mm f/2.8 R LM WR",
        iso: 160,
        aperture: 5.6,
        shutterSpeed: "1/30s",
        focalLength: 23
      },
      tags: ["naturaleza", "bosque", "otoño", "sendero"]
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=800&fit=crop",
      title: "Vida Urbana Nocturna",
      photographer: "Elena Fernández",
      description: "Escena callejera nocturna capturando el movimiento y la energía de la ciudad, con luces de neón reflejándose en el pavimento húmedo.",
      category: "street",
      location: "Valencia, España",
      date: "05/07/2025",
      views: 9840,
      likes: 567,
      rating: 4.3,
      width: 600,
      height: 800,
      isAward: false,
      isFeatured: false,
      downloadable: false,
      cameraSettings: {
        camera: "Leica Q2",
        lens: "Summilux 28mm f/1.7",
        iso: 1600,
        aperture: 2.8,
        shutterSpeed: "1/60s",
        focalLength: 28
      },
      tags: ["urbano", "nocturno", "movimiento", "neón"]
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
      title: "Reflejos en el Lago",
      photographer: "Miguel Ángel Torres",
      description: "Paisaje sereno de un lago de montaña al atardecer, con reflejos perfectos de las nubes y picos nevados en aguas cristalinas.",
      category: "landscape",
      location: "Pirineos, España",
      date: "03/07/2025",
      views: 11670,
      likes: 834,
      rating: 4.7,
      width: 800,
      height: 600,
      isAward: false,
      isFeatured: false,
      downloadable: true,
      cameraSettings: {
        camera: "Canon EOS R6",
        lens: "RF 24-105mm f/4L",
        iso: 100,
        aperture: 11,
        shutterSpeed: "1/15s",
        focalLength: 50
      },
      tags: ["paisaje", "lago", "reflejos", "atardecer"]
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop",
      title: "Macro: Gota de Rocío",
      photographer: "Laura Sánchez",
      description: "Fotografía macro de una gota de rocío sobre una hoja, revelando un mundo en miniatura lleno de detalles y texturas fascinantes.",
      category: "macro",
      location: "Jardín Botánico, Madrid",
      date: "01/07/2025",
      views: 7450,
      likes: 612,
      rating: 4.5,
      width: 600,
      height: 800,
      isAward: true,
      isFeatured: false,
      downloadable: true,
      cameraSettings: {
        camera: "Olympus OM-D E-M1 Mark III",
        lens: "M.Zuiko 60mm f/2.8 Macro",
        iso: 200,
        aperture: 8,
        shutterSpeed: "1/250s",
        focalLength: 60
      },
      tags: ["macro", "rocío", "naturaleza", "detalle"]
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      title: "Ceremonia Tradicional",
      photographer: "Roberto Jiménez",
      description: "Momento emotivo durante una ceremonia de boda tradicional española, capturando la alegría y las tradiciones familiares.",
      category: "wedding",
      location: "Sevilla, España",
      date: "28/06/2025",
      views: 5890,
      likes: 445,
      rating: 4.2,
      width: 800,
      height: 600,
      isAward: false,
      isFeatured: false,
      downloadable: false,
      cameraSettings: {
        camera: "Canon EOS 5D Mark IV",
        lens: "EF 70-200mm f/2.8L",
        iso: 800,
        aperture: 2.8,
        shutterSpeed: "1/125s",
        focalLength: 135
      },
      tags: ["boda", "tradición", "ceremonia", "emoción"]
    }
  ];

  // Initialize data
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add more mock images for demonstration
      const expandedImages = [];
      for (let i = 0; i < 50; i++) {
        const baseImage = mockImages[i % mockImages.length];
        expandedImages.push({
          ...baseImage,
          id: i + 1,
          title: `${baseImage.title} ${i > 7 ? `- Variación ${i - 7}` : ''}`,
          views: baseImage.views + Math.floor(Math.random() * 5000),
          likes: baseImage.likes + Math.floor(Math.random() * 500),
        });
      }
      
      setImages(expandedImages);
      setLoading(false);
    };

    loadImages();
  }, []);

  // Filter and search logic
  const processedImages = useMemo(() => {
    let filtered = [...images];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(image =>
        image.title.toLowerCase().includes(query) ||
        image.photographer.toLowerCase().includes(query) ||
        image.category.toLowerCase().includes(query) ||
        image.description.toLowerCase().includes(query) ||
        (image.tags && image.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Apply category filter
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(image => image.category === activeFilters.category);
    }

    // Apply location filter
    if (activeFilters.location !== 'all') {
      filtered = filtered.filter(image => {
        if (activeFilters.location === 'spain') {
          return image.location && image.location.includes('España');
        }
        return true; // For other locations, show all for demo
      });
    }

    // Apply checkbox filters
    if (activeFilters.awardWinners) {
      filtered = filtered.filter(image => image.isAward);
    }

    if (activeFilters.editorChoice) {
      filtered = filtered.filter(image => image.isFeatured);
    }

    if (activeFilters.highResolution) {
      filtered = filtered.filter(image => image.width >= 800 && image.height >= 600);
    }

    if (activeFilters.recentlyAdded) {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 7);
      filtered = filtered.filter(image => {
        const imageDate = new Date(image.date.split('/').reverse().join('-'));
        return imageDate >= recentDate;
      });
    }

    // Apply sorting
    switch (activeFilters.sort) {
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'editor':
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-')));
        break;
    }

    return filtered;
  }, [images, searchQuery, activeFilters]);

  useEffect(() => {
    setFilteredImages(processedImages);
  }, [processedImages]);

  const featuredImages = useMemo(() => {
    return images.filter(image => image.isFeatured).slice(0, 3);
  }, [images]);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const handleLightboxNavigate = (newIndex) => {
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setCurrentImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-8xl mx-auto px-6 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">
              Galería Fotográfica
            </h1>
            <p className="text-lg text-text-secondary">
              Descubre las mejores obras de fotógrafos profesionales y emergentes
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchComponent
              onSearch={handleSearch}
              placeholder="Buscar por título, fotógrafo, categoría..."
            />
            <Button
              variant="outline"
              onClick={() => setIsFilterSidebarOpen(true)}
              className="lg:hidden"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Gallery Stats */}
        <GalleryStats
          totalImages={images.length}
          filteredImages={filteredImages.length}
          loading={loading}
        />

        {/* Gallery Filters */}
        <GalleryFilters
          onFiltersChange={handleFiltersChange}
          activeFilters={activeFilters}
        />

        {/* Featured Section */}
        {!searchQuery && activeFilters.category === 'all' && !loading && (
          <FeaturedSection
            featuredImages={featuredImages}
            onImageClick={handleImageClick}
          />
        )}

        {/* Results Header */}
        {(searchQuery || activeFilters.category !== 'all') && (
          <div className="mb-6">
            <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Imágenes filtradas'}
            </h2>
            <p className="text-text-secondary">
              {filteredImages.length} {filteredImages.length === 1 ? 'imagen encontrada' : 'imágenes encontradas'}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        <GalleryGrid
          images={filteredImages}
          onImageClick={handleImageClick}
          loading={loading}
        />

        {/* No Results */}
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
              <Icon name="Search" size={32} className="text-text-secondary" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
              No se encontraron imágenes
            </h3>
            <p className="text-text-secondary mb-6">
              Intenta ajustar los filtros o cambiar los términos de búsqueda
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setActiveFilters({
                  category: 'all',
                  sort: 'newest',
                  location: 'all',
                  awardWinners: false,
                  editorChoice: false,
                  highResolution: false,
                  recentlyAdded: false,
                });
              }}
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Limpiar filtros
            </Button>
          </div>
        )}
      </main>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onToggle={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
      />

      {/* Image Lightbox */}
      <ImageLightbox
        image={selectedImage}
        images={filteredImages}
        currentIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        onNavigate={handleLightboxNavigate}
      />
    </div>
  );
};

export default PhotographyGallery;