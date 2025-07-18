import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ArticleHero from './components/ArticleHero';
import ArticleContent from './components/ArticleContent';
import AuthorBio from './components/AuthorBio';
import CommentSection from './components/CommentSection';
import RelatedArticles from './components/RelatedArticles';
import FloatingActions from './components/FloatingActions';

const ArticleDetail = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState('default');

  // Mock article data
  const article = {
    id: 1,
    title: "Técnicas Avanzadas de Fotografía Nocturna: Capturando la Magia de la Oscuridad",
    subtitle: "Descubre los secretos profesionales para crear imágenes espectaculares en condiciones de poca luz",
    category: "Técnicas",
    categoryIcon: "Camera",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    author: {
      name: "Carlos Mendoza",
      title: "Fotógrafo Profesional y Instructor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Madrid, España",
      experience: 12,
      articlesCount: 47,
      bio: `Carlos Mendoza es un fotógrafo profesional especializado en fotografía nocturna y astrofotografía. Con más de 12 años de experiencia, ha trabajado para National Geographic y ha impartido talleres en toda Europa. Su trabajo se centra en capturar la belleza oculta de la noche y enseñar técnicas avanzadas a fotógrafos de todos los niveles.`,
      specialties: ["Fotografía Nocturna", "Astrofotografía", "Paisajes", "Long Exposure"],
      social: {
        instagram: "https://instagram.com/carlosmendoza_photo",
        twitter: "https://twitter.com/carlosmendoza",
        linkedin: "https://linkedin.com/in/carlosmendoza",
        website: "https://carlosmendoza.photography"
      },
      recentArticles: [
        {
          id: 2,
          title: "Guía Completa de Astrofotografía para Principiantes",
          thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=150&fit=crop",
          publishDate: "15 Jul 2025"
        },
        {
          id: 3,
          title: "Los Mejores Lugares para Fotografía Nocturna en España",
          thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop",
          publishDate: "10 Jul 2025"
        }
      ]
    },
    publishDate: "18 Jul 2025",
    readTime: 8,
    views: "2.4K",
    content: [
      {
        type: "paragraph",
        content: "La fotografía nocturna es uno de los géneros más desafiantes y gratificantes de la fotografía. Cuando el sol se oculta, se abre un mundo completamente nuevo de posibilidades creativas que van desde la captura de paisajes urbanos iluminados hasta la majestuosa Vía Láctea."
      },
      {
        type: "heading",
        content: "Equipamiento Esencial"
      },
      {
        type: "paragraph",
        content: "Para obtener resultados profesionales en fotografía nocturna, necesitarás un equipamiento específico que te permita trabajar en condiciones de poca luz. La calidad de tu equipo marcará una diferencia significativa en los resultados finales."
      },
      {
        type: "list",
        items: [
          "Cámara con buen rendimiento en ISO alto (preferiblemente full frame)",
          "Objetivos luminosos (f/1.4 - f/2.8) para capturar más luz",
          "Trípode robusto y estable para exposiciones largas",
          "Disparador remoto o intervalómetro",
          "Linterna frontal con luz roja para preservar la visión nocturna",
          "Baterías adicionales (el frío reduce la duración de la batería)"
        ]
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
        alt: "Equipo de fotografía nocturna sobre una mesa",
        caption: "Equipamiento básico para fotografía nocturna: cámara, objetivos luminosos, trípode y accesorios"
      },
      {
        type: "subheading",
        content: "Configuración de Cámara"
      },
      {
        type: "paragraph",
        content: "La configuración correcta de tu cámara es crucial para el éxito en fotografía nocturna. Cada ajuste debe ser cuidadosamente considerado para maximizar la captura de luz mientras minimizas el ruido digital."
      },
      {
        type: "quote",
        content: "En fotografía nocturna, la paciencia y la preparación son tan importantes como el equipo técnico. Cada noche es una nueva oportunidad para capturar algo único.",
        author: "Carlos Mendoza"
      },
      {
        type: "gallery",
        title: "Ejemplos de Fotografía Nocturna",
        images: [
          {
            src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop",
            alt: "Vía Láctea sobre montañas",
            caption: "Vía Láctea capturada con 25 segundos de exposición"
          },
          {
            src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
            alt: "Paisaje urbano nocturno",
            caption: "Paisaje urbano con técnica de larga exposición"
          },
          {
            src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
            alt: "Estrellas en el desierto",
            caption: "Fotografía de estrellas en el desierto de Atacama"
          }
        ]
      },
      {
        type: "heading",
        content: "Técnicas Avanzadas"
      },
      {
        type: "paragraph",
        content: "Una vez dominados los fundamentos, puedes explorar técnicas más avanzadas como el focus stacking para astrofotografía, la técnica de blend para combinar múltiples exposiciones, y el uso de filtros especializados para reducir la contaminación lumínica."
      }
    ]
  };

  const relatedProducts = [
    {
      id: 1,
      name: "Sony A7R V",
      brand: "Sony",
      price: "€3.899",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=150&fit=crop"
    },
    {
      id: 2,
      name: "Sigma 14mm f/1.8 DG DN Art",
      brand: "Sigma",
      price: "€1.599",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=150&fit=crop"
    }
  ];

  const comments = [
    {
      id: 1,
      author: {
        name: "Ana García",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      content: "Excelente artículo, Carlos. He estado practicando fotografía nocturna durante meses y estos consejos son oro puro. Especialmente útil la parte sobre configuración de ISO.",
      timestamp: new Date(Date.now() - 3600000),
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 11,
          author: {
            name: "Carlos Mendoza",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          },
          content: "¡Gracias Ana! Me alegra saber que te ha sido útil. Si tienes alguna pregunta específica, no dudes en contactarme.",
          timestamp: new Date(Date.now() - 3000000),
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "Miguel Rodríguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      content: "¿Podrías hacer un artículo sobre los mejores lugares en España para astrofotografía? Vivo en Andalucía y me gustaría explorar nuevas ubicaciones.",
      timestamp: new Date(Date.now() - 7200000),
      likes: 8,
      isLiked: true,
      replies: []
    },
    {
      id: 3,
      author: {
        name: "Laura Martín",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      content: "Las fotos de ejemplo son impresionantes. ¿Qué configuración usaste para la imagen de la Vía Láctea? Me cuesta conseguir esa nitidez en las estrellas.",
      timestamp: new Date(Date.now() - 10800000),
      likes: 15,
      isLiked: false,
      replies: []
    }
  ];

  const relatedArticles = [
    {
      id: 4,
      title: "Guía Completa de Astrofotografía para Principiantes",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=200&h=150&fit=crop",
      category: "Técnicas",
      categoryIcon: "Star",
      readTime: 12,
      publishDate: "15 Jul 2025"
    },
    {
      id: 5,
      title: "Los Mejores Objetivos para Fotografía Nocturna",
      thumbnail: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=200&h=150&fit=crop",
      category: "Equipamiento",
      categoryIcon: "Camera",
      readTime: 6,
      publishDate: "12 Jul 2025"
    },
    {
      id: 6,
      title: "Procesado de Imágenes Nocturnas en Lightroom",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop",
      category: "Post-procesado",
      categoryIcon: "Edit",
      readTime: 10,
      publishDate: "08 Jul 2025"
    }
  ];

  const trendingArticles = [
    {
      id: 7,
      title: "Canon EOS R5 Mark II: Primera Impresión y Análisis",
      views: "15.2K",
      comments: 89
    },
    {
      id: 8,
      title: "Tendencias en Fotografía de Bodas 2025",
      views: "12.8K",
      comments: 67
    },
    {
      id: 9,
      title: "Cómo Crear un Portfolio Fotográfico Profesional",
      views: "11.4K",
      comments: 54
    },
    {
      id: 10,
      title: "Los Errores Más Comunes en Fotografía de Retrato",
      views: "9.7K",
      comments: 43
    }
  ];

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Enlace copiado al portapapeles');
        break;
      default:
        break;
    }
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{article.title} - FotoRevista</title>
        <meta name="description" content={article.subtitle} />
        <meta name="keywords" content="fotografía nocturna, técnicas fotografía, astrofotografía, Carlos Mendoza" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.subtitle} />
        <meta property="og:image" content={article.heroImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.subtitle} />
        <meta name="twitter:image" content={article.heroImage} />
      </Helmet>

      <Header />

      <main className="pt-4">
        <div className="max-w-8xl mx-auto px-6">
          <Breadcrumb />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-8xl mx-auto">
          {/* Main Content */}
          <div className="flex-1 lg:max-w-5xl">
            <ArticleHero
              article={article}
              onShare={handleShare}
              onBookmark={handleBookmark}
              isBookmarked={isBookmarked}
            />

            <ArticleContent
              content={article.content}
              relatedProducts={relatedProducts}
            />

            <AuthorBio author={article.author} />

            <CommentSection
              comments={comments}
              articleId={article.id}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 lg:sticky lg:top-24 lg:h-fit">
            <RelatedArticles
              articles={relatedArticles}
              trending={trendingArticles}
            />
          </aside>
        </div>
      </main>

      <FloatingActions
        onBookmark={handleBookmark}
        onShare={handleShare}
        isBookmarked={isBookmarked}
        onFontSizeChange={handleFontSizeChange}
        currentFontSize={fontSize}
      />
    </div>
  );
};

export default ArticleDetail;