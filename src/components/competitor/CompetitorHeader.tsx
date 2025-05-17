
import React from 'react';
import { Loader2, MapPin, Info, CoffeeIcon, UtensilsIcon, ShoppingBagIcon, AirplayIcon, DumbbellIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  const getBusinessTypeIcon = () => {
    switch(businessType) {
      case 'restaurant': 
        return <UtensilsIcon className="h-3 w-3 mr-1" />;
      case 'coffee_shop': 
        return <CoffeeIcon className="h-3 w-3 mr-1" />;
      case 'retail': 
        return <ShoppingBagIcon className="h-3 w-3 mr-1" />;
      case 'tech': 
        return <AirplayIcon className="h-3 w-3 mr-1" />;
      case 'fitness': 
        return <DumbbellIcon className="h-3 w-3 mr-1" />;
      default: 
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-1.5 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            <span>Caricamento competitor...</span>
          </div>
        ) : (
          <>
            <span>I principali competitor nella zona</span>
            <span className="font-medium">{district}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 ml-1 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs">Analisi basata sui dati più recenti disponibili per quest'area</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
      <div className="flex items-center">
        {getBusinessTypeIcon()}
        <span>Tipo di business: <span className="font-medium">{getBusinessTypeLabel()}</span></span>
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
