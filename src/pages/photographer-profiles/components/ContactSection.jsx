import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactSection = ({ photographer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    { value: 'wedding', label: 'Boda' },
    { value: 'portrait', label: 'Sesión de retratos' },
    { value: 'commercial', label: 'Fotografía comercial' },
    { value: 'event', label: 'Evento corporativo' },
    { value: 'fashion', label: 'Moda' },
    { value: 'product', label: 'Fotografía de producto' },
    { value: 'other', label: 'Otro' }
  ];

  const budgetRanges = [
    { value: '500-1000', label: '500€ - 1.000€' },
    { value: '1000-2500', label: '1.000€ - 2.500€' },
    { value: '2500-5000', label: '2.500€ - 5.000€' },
    { value: '5000+', label: 'Más de 5.000€' },
    { value: 'discuss', label: 'A discutir' }
  ];

  const contactMethods = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Teléfono' },
    { value: 'whatsapp', label: 'WhatsApp' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: '',
        preferredContact: 'email'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="contact-section" className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
            Contactar con {photographer.name}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            ¿Interesado en trabajar juntos? Envía tu consulta y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg p-6 shadow-card">
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-6">
                Formulario de Contacto
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nombre completo"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Teléfono"
                    type="tel"
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  
                  <Select
                    label="Método de contacto preferido"
                    options={contactMethods}
                    value={formData.preferredContact}
                    onChange={(value) => handleInputChange('preferredContact', value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Tipo de proyecto"
                    options={projectTypes}
                    value={formData.projectType}
                    onChange={(value) => handleInputChange('projectType', value)}
                    placeholder="Selecciona el tipo de proyecto"
                    required
                  />
                  
                  <Select
                    label="Presupuesto estimado"
                    options={budgetRanges}
                    value={formData.budget}
                    onChange={(value) => handleInputChange('budget', value)}
                    placeholder="Selecciona tu presupuesto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Cuéntanos sobre tu proyecto, fechas, ubicación y cualquier detalle importante..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Availability */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-surface rounded-lg p-6 shadow-card">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Información de Contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-accent" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Email</div>
                    <div className="text-sm text-text-secondary">{photographer.contact.email}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-accent" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Teléfono</div>
                    <div className="text-sm text-text-secondary">{photographer.contact.phone}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-accent" />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Ubicación</div>
                    <div className="text-sm text-text-secondary">{photographer.location}</div>
                  </div>
                </div>

                {photographer.contact.website && (
                  <div className="flex items-center space-x-3">
                    <Icon name="Globe" size={20} className="text-accent" />
                    <div>
                      <div className="text-sm font-medium text-text-primary">Sitio web</div>
                      <a 
                        href={photographer.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:text-accent/80"
                      >
                        {photographer.contact.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-surface rounded-lg p-6 shadow-card">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Disponibilidad
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${photographer.availability ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-text-primary">
                    {photographer.availability ? 'Disponible para nuevos proyectos' : 'No disponible actualmente'}
                  </span>
                </div>

                <div className="text-sm text-text-secondary">
                  <strong>Tiempo de respuesta:</strong> {photographer.responseTime}
                </div>

                <div className="text-sm text-text-secondary">
                  <strong>Ubicaciones de trabajo:</strong> {photographer.workLocations.join(', ')}
                </div>

                {photographer.nextAvailability && (
                  <div className="text-sm text-text-secondary">
                    <strong>Próxima disponibilidad:</strong> {photographer.nextAvailability}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-surface rounded-lg p-6 shadow-card">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Información de Precios
              </h3>
              
              <div className="space-y-3">
                {photographer.pricing.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-text-primary">{item.service}</span>
                    <span className="text-sm font-medium text-accent">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-text-secondary">
                  * Los precios pueden variar según la complejidad del proyecto y la ubicación.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-surface rounded-lg p-6 shadow-card">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Sígueme en redes sociales
              </h3>
              
              <div className="flex space-x-3">
                {photographer.social.instagram && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(photographer.social.instagram, '_blank')}
                  >
                    <Icon name="Instagram" size={20} />
                  </Button>
                )}
                
                {photographer.social.twitter && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(photographer.social.twitter, '_blank')}
                  >
                    <Icon name="Twitter" size={20} />
                  </Button>
                )}
                
                {photographer.social.linkedin && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(photographer.social.linkedin, '_blank')}
                  >
                    <Icon name="Linkedin" size={20} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;