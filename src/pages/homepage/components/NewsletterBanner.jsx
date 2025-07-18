import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-success text-success-foreground rounded-full mx-auto mb-4">
          <Icon name="Check" size={24} />
        </div>
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          ¡Suscripción Confirmada!
        </h3>
        <p className="text-text-secondary">
          Gracias por unirte a nuestra comunidad. Recibirás las mejores noticias de fotografía en tu correo.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground rounded-lg">
                <Icon name="Mail" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-text-primary">
                  Newsletter FotoRevista
                </h3>
                <p className="text-text-secondary text-sm font-caption">
                  Mantente al día con las últimas tendencias
                </p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-4 leading-relaxed">
              Recibe semanalmente las mejores noticias, técnicas, productos y eventos del mundo de la fotografía directamente en tu correo electrónico.
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Sin spam</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Contenido exclusivo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span>Cancela cuando quieras</span>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              
              <Button
                type="submit"
                loading={isLoading}
                disabled={!email.trim()}
                className="w-full"
                iconName="Send"
                iconPosition="right"
              >
                {isLoading ? 'Suscribiendo...' : 'Suscribirse Gratis'}
              </Button>
              
              <p className="text-xs text-text-secondary text-center">
                Al suscribirte, aceptas nuestra política de privacidad y términos de uso.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBanner;