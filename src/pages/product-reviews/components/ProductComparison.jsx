import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProductComparison = ({ isOpen, onClose, availableProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState([null, null, null]);
  const [comparisonData, setComparisonData] = useState(null);

  const mockComparisonData = {
    specifications: [
      { label: 'Tipo de sensor', key: 'sensorType' },
      { label: 'Resolución', key: 'resolution' },
      { label: 'Rango ISO', key: 'isoRange' },
      { label: 'Velocidad de obturación', key: 'shutterSpeed' },
      { label: 'Sistema de enfoque', key: 'focusSystem' },
      { label: 'Grabación de video', key: 'videoRecording' },
      { label: 'Conectividad', key: 'connectivity' },
      { label: 'Duración de batería', key: 'batteryLife' },
      { label: 'Peso', key: 'weight' },
      { label: 'Dimensiones', key: 'dimensions' },
    ],
    products: {
      1: {
        sensorType: 'CMOS Full Frame',
        resolution: '45.7 MP',
        isoRange: '64-25600',
        shutterSpeed: '1/8000 - 30s',
        focusSystem: '693 puntos AF',
        videoRecording: '4K 60fps',
        connectivity: 'Wi-Fi, Bluetooth, USB-C',
        batteryLife: '530 disparos',
        weight: '650g',
        dimensions: '128.9 × 96.4 × 67.3mm',
      },
      2: {
        sensorType: 'CMOS APS-C',
        resolution: '26.1 MP',
        isoRange: '100-51200',
        shutterSpeed: '1/4000 - 30s',
        focusSystem: '425 puntos AF',
        videoRecording: '4K 30fps',
        connectivity: 'Wi-Fi, Bluetooth',
        batteryLife: '440 disparos',
        weight: '503g',
        dimensions: '121.0 × 92.5 × 59.7mm',
      },
      3: {
        sensorType: 'CMOS Full Frame',
        resolution: '24.2 MP',
        isoRange: '100-51200',
        shutterSpeed: '1/8000 - 30s',
        focusSystem: '273 puntos AF',
        videoRecording: '4K 30fps',
        connectivity: 'Wi-Fi, Bluetooth, GPS',
        batteryLife: '610 disparos',
        weight: '580g',
        dimensions: '126.0 × 94.0 × 62.0mm',
      },
    }
  };

  const productOptions = availableProducts.map(product => ({
    value: product.id,
    label: product.name,
  }));

  const handleProductSelect = (index, productId) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index] = productId;
    setSelectedProducts(newSelectedProducts);
    
    // Load comparison data when products are selected
    if (newSelectedProducts.filter(Boolean).length >= 2) {
      setComparisonData(mockComparisonData);
    }
  };

  const getSelectedProduct = (productId) => {
    return availableProducts.find(p => p.id === productId);
  };

  const renderComparisonValue = (spec, productId) => {
    if (!productId || !comparisonData.products[productId]) return '-';
    return comparisonData.products[productId][spec.key] || '-';
  };

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Comparar Productos
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Product Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {selectedProducts.map((productId, index) => (
              <div key={index} className="space-y-4">
                <Select
                  options={[{ value: '', label: 'Seleccionar producto' }, ...productOptions]}
                  value={productId || ''}
                  onChange={(value) => handleProductSelect(index, value)}
                  placeholder={`Producto ${index + 1}`}
                />
                
                {productId && (
                  <div className="bg-muted rounded-lg p-4">
                    <div className="aspect-square overflow-hidden rounded-md mb-3">
                      <Image
                        src={getSelectedProduct(productId)?.image}
                        alt={getSelectedProduct(productId)?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-text-primary mb-2 text-sm">
                      {getSelectedProduct(productId)?.name}
                    </h3>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(getSelectedProduct(productId)?.rating)}
                      <span className="text-xs text-text-secondary ml-1">
                        {getSelectedProduct(productId)?.rating}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-text-primary">
                      €{getSelectedProduct(productId)?.price.toLocaleString('es-ES')}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          {comparisonData && selectedProducts.filter(Boolean).length >= 2 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium text-text-primary">
                      Especificación
                    </th>
                    {selectedProducts.map((productId, index) => (
                      productId && (
                        <th key={index} className="text-left p-3 font-medium text-text-primary">
                          Producto {index + 1}
                        </th>
                      )
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.specifications.map((spec, specIndex) => (
                    <tr key={specIndex} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3 font-medium text-text-secondary">
                        {spec.label}
                      </td>
                      {selectedProducts.map((productId, index) => (
                        productId && (
                          <td key={index} className="p-3 text-text-primary">
                            {renderComparisonValue(spec, productId)}
                          </td>
                        )
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cerrar
            </Button>
            {selectedProducts.filter(Boolean).length >= 2 && (
              <Button
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Exportar Comparación
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;