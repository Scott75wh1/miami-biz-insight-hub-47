
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Database, ArrowRight } from 'lucide-react';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { Card } from '@/components/ui/card';

interface CensusEmptyStateProps {
  onRefresh: () => void;
  selectedDistrict: string;
}

const CensusEmptyState: React.FC<CensusEmptyStateProps> = ({ onRefresh, selectedDistrict }) => {
  const { districts, handleDistrictChange } = useDistrictSelection();
  
  const handleTryAnotherDistrict = () => {
    // Get a random district that's different from the current one
    const filteredDistricts = districts.filter(d => d !== selectedDistrict);
    const randomIndex = Math.floor(Math.random() * filteredDistricts.length);
    const newDistrict = filteredDistricts[randomIndex];
    
    handleDistrictChange(newDistrict);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/40 rounded-full p-6 mb-6">
        <Database className="h-12 w-12 text-muted-foreground/70" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Nessun dato disponibile</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Non sono stati trovati dati del censimento per {selectedDistrict}. 
        Prova ad aggiornare i dati o a selezionare un altro distretto.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button 
          onClick={onRefresh}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Aggiorna i dati
        </Button>
        <Button 
          variant="outline" 
          onClick={handleTryAnotherDistrict}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          Prova un altro distretto
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
        {districts.filter(d => d !== selectedDistrict).slice(0, 3).map(district => (
          <Card 
            key={district} 
            className="p-4 cursor-pointer hover:shadow-md transition-shadow border-muted"
            onClick={() => handleDistrictChange(district)}
          >
            <p className="font-medium">{district}</p>
            <p className="text-xs text-muted-foreground mt-1">Dati disponibili</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CensusEmptyState;
