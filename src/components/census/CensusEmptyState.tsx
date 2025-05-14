
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileX, RefreshCcw, MapPin } from 'lucide-react';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

interface CensusEmptyStateProps {
  onRefresh?: () => void;
}

const CensusEmptyState = ({ onRefresh }: CensusEmptyStateProps) => {
  const { selectedDistrict, handleDistrictChange, districts } = useDistrictSelection();
  
  const tryAnotherDistrict = () => {
    // Find a different district to suggest
    const otherDistricts = districts.filter(d => d !== selectedDistrict);
    if (otherDistricts.length > 0) {
      // Select a random district from the available ones
      const randomIndex = Math.floor(Math.random() * otherDistricts.length);
      handleDistrictChange(otherDistricts[randomIndex]);
    }
  };
  
  return (
    <div className="py-12 px-4 text-center">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
          <FileX className="h-10 w-10 text-muted-foreground" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">
        Dati non disponibili
      </h3>
      
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Non ci sono dati demografici disponibili per {selectedDistrict}. 
        Prova a selezionare un altro distretto o aggiornare i dati.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRefresh && (
          <Button 
            variant="outline"
            onClick={onRefresh}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Aggiorna dati
          </Button>
        )}
        
        <Button 
          onClick={tryAnotherDistrict}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Prova un altro distretto
        </Button>
      </div>
    </div>
  );
};

export default CensusEmptyState;
