import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroSlides = [
    {
      id: 1,
      title: "Técnicas Avanzadas de Fotografía Nocturna",
      excerpt: "Descubre los secretos para capturar la magia de la noche con estas técnicas profesionales que transformarán tus fotografías nocturnas.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Técnicas",
      readTime: "8 min",
      author: "Carlos Mendoza",
      publishDate: "2025-07-17",
      link: "/article-detail"
    },
    {
      id: 2,
      title: "Canon EOS R5 Mark II: Revolución en Fotografía",
      excerpt: "Análisis completo de la nueva Canon EOS R5 Mark II, la cámara que está redefiniendo los estándares de la fotografía profesional.",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Productos",
      readTime: "12 min",
      author: "Ana García",
      publishDate: "2025-07-16",
      link: "/product-reviews"
    },
    {
      id: 3,
      title: "Exposición: Maestros de la Fotografía Española",
      excerpt: "Una retrospectiva única que celebra el legado de los grandes maestros de la fotografía española contemporánea.",
      image: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
      category: "Eventos",
      readTime: "6 min",
      author: "Miguel Torres",
      publishDate: "2025-07-15",
      link: "/events-calendar"
    },
    {
      id: 4,
      title: "Tendencias 2025: Fotografía Minimalista",
      excerpt: "El minimalismo fotográfico conquista las redes sociales. Exploramos esta tendencia que está definiendo el año 2025.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Tendencias",
      readTime: "10 min",
      author: "Laura Ruiz",
      publishDate: "2025-07-14",
      link: "/photography-gallery"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg bg-muted"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                    {slide.category}
                  </span>
                  <span className="text-white/80 text-sm font-caption">
                    {slide.readTime} de lectura
                  </span>
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                
                <p className="text-white/90 text-base md:text-lg mb-6 leading-relaxed max-w-2xl">
                  {slide.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 text-white/80 text-sm">
                    <span>Por {slide.author}</span>
                    <span>•</span>
                    <span>{new Date(slide.publishDate).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  
                  <Link to={slide.link}>
                    <Button variant="default" className="bg-white text-primary hover:bg-white/90">
                      Leer artículo
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth z-10"
        aria-label="Slide anterior"
      >
        <Icon name="ChevronLeft" size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth z-10"
        aria-label="Siguiente slide"
      >
        <Icon name="ChevronRight" size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentSlide 
                ? 'bg-white' :'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth z-10"
        aria-label={isAutoPlaying ? 'Pausar reproducción' : 'Reanudar reproducción'}
      >
        <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
      </button>
    </div>
  );
};

export default HeroCarousel;