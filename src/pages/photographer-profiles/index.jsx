import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterSidebar from '../../components/ui/FilterSidebar';
import ProfileHeader from './components/ProfileHeader';
import BiographySection from './components/BiographySection';
import PortfolioGallery from './components/PortfolioGallery';
import FeaturedWorks from './components/FeaturedWorks';
import ContactSection from './components/ContactSection';
import RecentActivity from './components/RecentActivity';
import PhotographerDirectory from './components/PhotographerDirectory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PhotographerProfiles = () => {
  const { id } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [currentLanguage, setCurrentLanguage] = useState('es');

  // Mock photographer data
  const mockPhotographer = {
    id: 1,
    name: "Elena Martínez",
    location: "Madrid, España",
    specializations: ["Bodas", "Retratos", "Eventos"],
    experience: 8,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    isVerified: true,
    availability: true,
    responseTime: "24 horas",
    workLocations: ["Madrid", "Toledo", "Segovia"],
    nextAvailability: "Marzo 2025",
    bio: `Soy Elena Martínez, fotógrafa profesional especializada en bodas y retratos con más de 8 años de experiencia capturando momentos únicos e irrepetibles. Mi pasión por la fotografía comenzó durante mis estudios de Bellas Artes, donde descubrí que mi verdadera vocación era contar historias a través de la imagen.\n\nMi estilo se caracteriza por un enfoque natural y emotivo, buscando siempre la autenticidad en cada disparo. Creo firmemente que las mejores fotografías surgen cuando las personas se sienten cómodas y pueden ser ellas mismas frente a la cámara.\n\nA lo largo de mi carrera, he tenido el privilegio de documentar más de 200 bodas y realizar innumerables sesiones de retratos, cada una única y especial. Mi trabajo ha sido reconocido en diversas publicaciones especializadas y he tenido la oportunidad de exponer en galerías de Madrid y Barcelona.`,
    
    stats: {
      followers: 15420,
      photos: 2847,
      awards: 12,
      exhibitions: 8
    },

    social: {
      website: "https://elenamartinez.photography",
      instagram: "https://instagram.com/elenamartinez_photo",
      twitter: "https://twitter.com/elenamartinez",
      linkedin: "https://linkedin.com/in/elenamartinez"
    },

    highlights: [
      {
        title: "Premio Nacional de Fotografía de Bodas",
        year: "2023",
        description: "Reconocimiento por la serie \'Amor en Tiempos Modernos'"
      },
      {
        title: "Exposición Individual en Galería Spectrum",
        year: "2022",
        description: "Muestra \'Retratos de la España Rural'"
      },
      {
        title: "Publicación en Vogue España",
        year: "2021",
        description: "Reportaje sobre nuevos talentos en fotografía nupcial"
      },
      {
        title: "Certificación Master en Fotografía Digital",
        year: "2020",
        description: "Instituto Europeo de Fotografía"
      }
    ],

    awards: [
      {
        title: "Mejor Fotógrafa de Bodas",
        organization: "Wedding Photography Awards",
        year: "2023"
      },
      {
        title: "Premio Revelación",
        organization: "Festival Internacional de Fotografía",
        year: "2022"
      },
      {
        title: "Mención Honorífica",
        organization: "Concurso Nacional de Retratos",
        year: "2021"
      }
    ],

    equipment: [
      { name: "Canon EOS R5", type: "Cámara" },
      { name: "Canon RF 24-70mm f/2.8", type: "Objetivo" },
      { name: "Canon RF 85mm f/1.2", type: "Objetivo" },
      { name: "Profoto B10", type: "Flash" }
    ],

    education: [
      {
        degree: "Máster en Fotografía Digital",
        institution: "Instituto Europeo de Fotografía",
        year: "2020"
      },
      {
        degree: "Licenciatura en Bellas Artes",
        institution: "Universidad Complutense de Madrid",
        year: "2016"
      }
    ],

    exhibitions: [
      {
        title: "Retratos de la España Rural",
        venue: "Galería Spectrum, Madrid",
        year: "2022"
      },
      {
        title: "Amor en Tiempos Modernos",
        venue: "Centro Cultural Conde Duque",
        year: "2021"
      },
      {
        title: "Colectiva Nuevos Talentos",
        venue: "Museo de Arte Contemporáneo",
        year: "2020"
      }
    ],

    portfolio: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        title: "Ceremonia en Toledo",
        category: "wedding",
        location: "Toledo",
        year: "2023",
        camera: "Canon EOS R5",
        description: "Momento íntimo durante la ceremonia religiosa"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        title: "Retrato de Novia",
        category: "portrait",
        location: "Madrid",
        year: "2023",
        camera: "Canon EOS R5",
        description: "Retrato natural en luz de ventana"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
        title: "Sesión de Pareja",
        category: "portrait",
        location: "Retiro, Madrid",
        year: "2023",
        camera: "Canon EOS R5",
        description: "Sesión pre-boda en el Parque del Retiro"
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
        title: "Detalles de Boda",
        category: "wedding",
        location: "Segovia",
        year: "2023",
        camera: "Canon EOS R5",
        description: "Composición artística de los detalles nupciales"
      },
      {
        id: 5,
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
        title: "Retrato Familiar",
        category: "portrait",
        location: "Madrid",
        year: "2023",
        camera: "Canon EOS R5",
        description: "Sesión familiar en estudio"
      },
      {
        id: 6,
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
        title: "Baile de Novios",
        category: "wedding",
        location: "Madrid",
        year: "2023",
        camera: "Canon EOS R5",
        description: "Primer baile bajo las estrellas"
      }
    ],

    featuredWorks: [
      {
        id: 1,
        title: "Amor Eterno",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        description: "Esta imagen captura la esencia del amor verdadero en un momento de intimidad absoluta. La pareja, perdida en su propio mundo, representa la conexión profunda que trasciende el tiempo y el espacio.",
        year: "2023",
        location: "Toledo, España",
        camera: "Canon EOS R5",
        settings: "85mm, f/1.4, 1/200s, ISO 400",
        award: "Premio Nacional 2023",
        recognition: [
          "Ganadora del Premio Nacional de Fotografía de Bodas 2023",
          "Seleccionada para la exposición \'Amor en Tiempos Modernos'",
          "Publicada en Wedding Photography Magazine"
        ],
        technicalDetails: {
          aperture: "f/1.4",
          shutter: "1/200s",
          iso: "400",
          focal: "85mm"
        },
        story: "Esta fotografía fue tomada durante una boda íntima en Toledo. La luz natural que entraba por las ventanas de la catedral creó este momento mágico que capturé sin que la pareja se diera cuenta. Es la esencia de lo que busco en mi trabajo: momentos auténticos y llenos de emoción.",
        likes: 2847,
        comments: 156,
        shares: 89
      },
      {
        id: 2,
        title: "Generaciones",
        image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800",
        description: "Un retrato multigeneracional que celebra los lazos familiares y la transmisión de valores a través del tiempo. Cada rostro cuenta una historia, cada mirada refleja una experiencia única.",
        year: "2022",
        location: "Madrid, España",
        camera: "Canon EOS R5",
        settings: "50mm, f/2.8, 1/125s, ISO 200",
        award: "Mención Honorífica",
        recognition: [
          "Mención Honorífica en el Concurso Nacional de Retratos 2022",
          "Exhibida en la Galería Spectrum de Madrid",
          "Seleccionada para el libro \'Retratos de España'"
        ],
        technicalDetails: {
          aperture: "f/2.8",
          shutter: "1/125s",
          iso: "200",
          focal: "50mm"
        },
        story: "Durante una sesión familiar, me di cuenta de que tenía frente a mí cuatro generaciones de mujeres. La composición surgió naturalmente cuando la bisabuela comenzó a contar historias de su juventud. Capturé este momento de conexión intergeneracional que se ha convertido en una de mis obras más queridas.",
        likes: 1923,
        comments: 98,
        shares: 67
      }
    ],

    contact: {
      email: "elena@elenamartinez.photography",
      phone: "+34 600 123 456",
      website: "https://elenamartinez.photography"
    },

    pricing: [
      { service: "Sesión de retratos", price: "desde 200€" },
      { service: "Boda completa", price: "desde 1.500€" },
      { service: "Evento corporativo", price: "desde 400€" },
      { service: "Sesión familiar", price: "desde 250€" }
    ],

    recentActivity: [
      {
        id: 1,
        type: "upload",
        title: "Nueva serie: Retratos de Invierno",
        description: "He subido una nueva colección de retratos capturados durante las sesiones de invierno en Madrid.",
        date: "2025-01-15",
        images: [
          {
            url: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300",
            alt: "Retrato de invierno 1"
          },
          {
            url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300",
            alt: "Retrato de invierno 2"
          }
        ],
        tags: ["retratos", "invierno", "madrid"],
        likes: 234,
        comments: 18,
        shares: 12
      },
      {
        id: 2,
        type: "exhibition",
        title: "Exposición en Galería Arte Contemporáneo",
        description: "Mi obra \'Generaciones\' será exhibida en la nueva muestra colectiva sobre fotografía familiar contemporánea.",
        date: "2025-01-10",
        details: {
          venue: "Galería Arte Contemporáneo",
          duration: "Enero - Marzo 2025",
          location: "Madrid"
        },
        link: "https://galeriaarte.com/exposiciones/generaciones",
        likes: 156,
        comments: 23,
        shares: 8
      },
      {
        id: 3,
        type: "award",
        title: "Finalista en Wedding Photography Awards",
        description: "Mi serie 'Amor en Tiempos Modernos' ha sido seleccionada como finalista en la categoría de Mejor Serie Documental.",
        date: "2025-01-05",
        details: {
          category: "Mejor Serie Documental",
          competition: "Wedding Photography Awards 2025",
          status: "Finalista"
        },
        likes: 189,
        comments: 31,
        shares: 15
      }
    ]
  };

  const navigationSections = [
    { id: 'profile', label: 'Perfil', icon: 'User' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Camera' },
    { id: 'featured', label: 'Obras Destacadas', icon: 'Star' },
    { id: 'activity', label: 'Actividad', icon: 'Activity' },
    { id: 'contact', label: 'Contacto', icon: 'Mail' },
    { id: 'directory', label: 'Directorio', icon: 'Users' }
  ];

  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    
    // Scroll to section if it exists
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const renderActiveSection = () => {
    if (!id && activeSection === 'directory') {
      return <PhotographerDirectory />;
    }

    if (id) {
      switch (activeSection) {
        case 'profile':
          return (
            <>
              <div id="section-profile">
                <ProfileHeader photographer={mockPhotographer} />
              </div>
              <div id="section-biography">
                <BiographySection photographer={mockPhotographer} />
              </div>
            </>
          );
        case 'portfolio':
          return (
            <div id="section-portfolio">
              <PortfolioGallery photographer={mockPhotographer} />
            </div>
          );
        case 'featured':
          return (
            <div id="section-featured">
              <FeaturedWorks photographer={mockPhotographer} />
            </div>
          );
        case 'activity':
          return (
            <div id="section-activity">
              <RecentActivity photographer={mockPhotographer} />
            </div>
          );
        case 'contact':
          return (
            <div id="section-contact">
              <ContactSection photographer={mockPhotographer} />
            </div>
          );
        case 'directory':
          return <PhotographerDirectory />;
        default:
          return (
            <>
              <div id="section-profile">
                <ProfileHeader photographer={mockPhotographer} />
              </div>
              <div id="section-biography">
                <BiographySection photographer={mockPhotographer} />
              </div>
            </>
          );
      }
    }

    return <PhotographerDirectory />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className={`transition-layout ${isFilterOpen ? 'lg:ml-80' : ''}`}>
        <div className="max-w-8xl mx-auto">
          <div className="px-6 py-6">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  {id ? `Perfil de ${mockPhotographer.name}` : 'Perfiles de Fotógrafos'}
                </h1>
                <p className="text-text-secondary">
                  {id 
                    ? 'Explora el trabajo y la trayectoria de este talentoso fotógrafo' :'Descubre fotógrafos profesionales de la comunidad española'
                  }
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  onClick={toggleFilter}
                  iconName="Filter"
                  iconPosition="left"
                  className="lg:hidden"
                >
                  Filtros
                </Button>
                
                <Button
                  variant="outline"
                  onClick={toggleFilter}
                  iconName={isFilterOpen ? "X" : "SlidersHorizontal"}
                  iconPosition="left"
                  className="hidden lg:flex"
                >
                  {isFilterOpen ? 'Cerrar filtros' : 'Filtros'}
                </Button>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 p-4 bg-surface rounded-lg border border-border">
              {navigationSections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleSectionChange(section.id)}
                  iconName={section.icon}
                  iconPosition="left"
                  className="text-sm"
                >
                  {section.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        {renderActiveSection()}
      </main>

      {/* Filter Sidebar */}
      <FilterSidebar isOpen={isFilterOpen} onToggle={toggleFilter} />

      {/* Back to Top Button */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 z-40 shadow-modal"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Icon name="ArrowUp" size={20} />
      </Button>
    </div>
  );
};

export default PhotographerProfiles;