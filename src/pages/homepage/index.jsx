import React from 'react';
import Header from '../../components/ui/Header';
import HeroCarousel from './components/HeroCarousel';
import ContentCard from './components/ContentCard';
import SectionHeader from './components/SectionHeader';
import NewsletterBanner from './components/NewsletterBanner';
import StatsSection from './components/StatsSection';
import FeaturedPhotographers from './components/FeaturedPhotographers';
import Icon from '../../components/AppIcon';

const Homepage = () => {
  const latestNews = [
    {
      id: 1,
      title: "Sony Anuncia la Nueva Alpha 7R VI con Resolución de 100MP",
      excerpt: "La nueva cámara de Sony promete revolucionar la fotografía de alta resolución con tecnología de vanguardia.",
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Noticias",
      author: "María González",
      publishDate: "2025-07-18",
      readTime: "5 min",
      link: "/article-detail",
      featured: true
    },
    {
      id: 2,
      title: "Técnicas de Composición para Fotografía de Calle",
      excerpt: "Aprende las reglas fundamentales para crear imágenes impactantes en entornos urbanos.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Técnicas",
      author: "Pedro Sánchez",
      publishDate: "2025-07-17",
      readTime: "8 min",
      link: "/article-detail"
    },
    {
      id: 3,
      title: "Concurso Internacional de Fotografía Documental 2025",
      excerpt: "Participa en uno de los concursos más prestigiosos del año con premios de hasta €10,000.",
      image: "https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
      category: "Concursos",
      author: "Laura Martín",
      publishDate: "2025-07-16",
      readTime: "3 min",
      link: "/article-detail"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      title: "Canon EOS R5 Mark II - Análisis Completo",
      excerpt: "Descubre todas las características de la nueva cámara insignia de Canon en nuestro análisis detallado.",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80",
      category: "Reseñas",
      author: "Carlos Ruiz",
      publishDate: "2025-07-15",
      readTime: "12 min",
      link: "/product-reviews"
    },
    {
      id: 2,
      title: "Los Mejores Objetivos para Fotografía de Retrato 2025",
      excerpt: "Comparativa exhaustiva de los objetivos más recomendados para retratos profesionales.",
      image: "https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "Guías",
      author: "Ana Torres",
      publishDate: "2025-07-14",
      readTime: "10 min",
      link: "/product-reviews"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Exposición: Maestros de la Luz Contemporánea",
      excerpt: "Una muestra única que reúne las obras más destacadas de la fotografía española actual.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Exposiciones",
      author: "Museo Nacional",
      publishDate: "2025-07-20",
      readTime: "2 min",
      link: "/events-calendar"
    },
    {
      id: 2,
      title: "Taller: Fotografía Nocturna Avanzada",
      excerpt: "Aprende técnicas profesionales para capturar la magia de la noche con expertos reconocidos.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Talleres",
      author: "FotoEscuela Madrid",
      publishDate: "2025-07-25",
      readTime: "1 min",
      link: "/events-calendar"
    }
  ];

  const featuredGalleries = [
    {
      id: 1,
      title: "Paisajes de España: Una Mirada Íntima",
      excerpt: "Descubre la belleza natural de España a través de la lente de fotógrafos locales.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Paisajes",
      author: "Miguel Fernández",
      publishDate: "2025-07-13",
      readTime: "Vista rápida",
      link: "/photography-gallery"
    },
    {
      id: 2,
      title: "Retratos Urbanos: Historias de la Ciudad",
      excerpt: "Una colección de retratos que capturan la esencia humana en entornos urbanos.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      category: "Retratos",
      author: "Elena Vázquez",
      publishDate: "2025-07-12",
      readTime: "Vista rápida",
      link: "/photography-gallery"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-8xl mx-auto px-6 py-8 space-y-16">
        {/* Hero Carousel */}
        <section>
          <HeroCarousel />
        </section>

        {/* Latest News Section */}
        <section>
          <SectionHeader
            title="Últimas Noticias"
            subtitle="Mantente al día con las novedades del mundo fotográfico"
            icon="Newspaper"
            viewAllLink="/article-detail"
            viewAllText="Ver todas las noticias"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article, index) => (
              <ContentCard
                key={article.id}
                {...article}
                size={index === 0 ? 'large' : 'default'}
              />
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <SectionHeader
            title="Productos Destacados"
            subtitle="Análisis y reseñas de los últimos equipos fotográficos"
            icon="Star"
            viewAllLink="/product-reviews"
            viewAllText="Ver todos los productos"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProducts.map((product) => (
              <ContentCard
                key={product.id}
                {...product}
                size="large"
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <StatsSection />
        </section>

        {/* Featured Galleries Section */}
        <section>
          <SectionHeader
            title="Galerías Destacadas"
            subtitle="Explora las mejores obras de nuestra comunidad"
            icon="Camera"
            viewAllLink="/photography-gallery"
            viewAllText="Ver todas las galerías"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredGalleries.map((gallery) => (
              <ContentCard
                key={gallery.id}
                {...gallery}
                size="large"
              />
            ))}
          </div>
        </section>

        {/* Featured Photographers */}
        <section>
          <FeaturedPhotographers />
        </section>

        {/* Upcoming Events Section */}
        <section>
          <SectionHeader
            title="Próximos Eventos"
            subtitle="No te pierdas las exposiciones y talleres más importantes"
            icon="Calendar"
            viewAllLink="/events-calendar"
            viewAllText="Ver calendario completo"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <ContentCard
                key={event.id}
                {...event}
                size="default"
              />
            ))}
          </div>
        </section>

        {/* Newsletter Banner */}
        <section>
          <NewsletterBanner />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="max-w-8xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
                  <Icon name="Camera" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold">FotoRevista</h3>
                  <p className="text-sm opacity-80">Fotografía Profesional</p>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-4 max-w-md">
                La revista digital líder en fotografía para la comunidad hispanohablante. 
                Conectamos talento, inspiración y conocimiento fotográfico.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-smooth">
                  <Icon name="Facebook" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-smooth">
                  <Icon name="Instagram" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-smooth">
                  <Icon name="Twitter" size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-smooth">
                  <Icon name="Youtube" size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/article-detail" className="hover:opacity-100 transition-smooth">Noticias</a></li>
                <li><a href="/product-reviews" className="hover:opacity-100 transition-smooth">Productos</a></li>
                <li><a href="/photography-gallery" className="hover:opacity-100 transition-smooth">Galerías</a></li>
                <li><a href="/events-calendar" className="hover:opacity-100 transition-smooth">Eventos</a></li>
                <li><a href="/photographer-profiles" className="hover:opacity-100 transition-smooth">Fotógrafos</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} />
                  <span>info@fotorevista.es</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} />
                  <span>+34 91 123 4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="MapPin" size={14} />
                  <span>Madrid, España</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
            <p>© {new Date().getFullYear()} FotoRevista. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:opacity-100 transition-smooth">Política de Privacidad</a>
              <a href="#" className="hover:opacity-100 transition-smooth">Términos de Uso</a>
              <a href="#" className="hover:opacity-100 transition-smooth">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;