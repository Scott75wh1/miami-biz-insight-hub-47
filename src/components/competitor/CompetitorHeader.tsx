
import React from 'react';
import { Loader2, MapPin } from 'lucide-react';

interface CompetitorHeaderProps {
  businessType: string;
  district: string;
  isLoading: boolean;
  businessAddress?: string;
  cuisineType?: string;
}

export const CompetitorHeader: React.FC<CompetitorHeaderProps> = ({
  businessType,
  district,
  isLoading,
  businessAddress,
  cuisineType
}) => {
  const getBusinessTypeLabel = () => {
    switch(businessType) {
      case 'restaurant': 
        return cuisineType ? `Ristoranti (${cuisineType})` : 'Ristoranti';
      case 'coffee_shop': 
        return 'Caffetterie';
      case 'retail': 
        return 'Negozi';
      case 'tech': 
        return 'Aziende Tech';
      case 'fitness': 
        return 'Centri Fitness';
      default: 
        return businessType;
    }
  };

  return (
    <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
      <div className="flex items-center">
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            <span>Caricamento competitor...</span>
          </div>
        ) : (
          <span>I principali competitor nella zona {district}</span>
        )}
      </div>
      <div>
        Tipo di business: <span className="font-medium">{getBusinessTypeLabel()}</span>
      </div>
      {businessAddress && (
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          <span>Indirizzo: {businessAddress}</span>
        </div>
      )}
    </div>
  );
};
