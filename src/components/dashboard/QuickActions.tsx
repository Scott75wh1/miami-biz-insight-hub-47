
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Building, BarChart, Database, MapIcon, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { districts, handleDistrictChange, selectedDistrict } = useDistrictSelection();

  const handleAnalyzeClick = () => {
    navigate('/my-business');
  };

  const handleDataClick = () => {
    navigate('/census');
  };

  const handleMapsClick = () => {
    navigate('/');
  };

  const handleRefreshData = () => {
    toast({
      title: 'Aggiornamento dati',
      description: `I dati per ${selectedDistrict} sono stati aggiornati`,
    });
  };

  const randomizeDistrict = () => {
    // Get a random district that's different from the current one
    const filteredDistricts = districts.filter(d => d !== selectedDistrict);
    const randomIndex = Math.floor(Math.random() * filteredDistricts.length);
    const newDistrict = filteredDistricts[randomIndex];
    
    handleDistrictChange(newDistrict);
    toast({
      title: 'Distretto cambiato',
      description: `Nuovo distretto selezionato: ${newDistrict}`,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button 
        onClick={handleAnalyzeClick} 
        variant="outline" 
        className="h-24 flex flex-col items-center justify-center"
      >
        <Building size={24} className="mb-2" />
        <span>Analizza Attività</span>
      </Button>
      
      <Button 
        onClick={handleDataClick}
        variant="outline" 
        className="h-24 flex flex-col items-center justify-center"
      >
        <Database size={24} className="mb-2" />
        <span>Dati Demografici</span>
      </Button>
      
      <Button 
        onClick={handleMapsClick}
        variant="outline" 
        className="h-24 flex flex-col items-center justify-center"
      >
        <MapIcon size={24} className="mb-2" />
        <span>Mappa Interattiva</span>
      </Button>
      
      <Button 
        onClick={randomizeDistrict}
        variant="outline" 
        className="h-24 flex flex-col items-center justify-center"
      >
        <BarChart size={24} className="mb-2" />
        <span>Altro Distretto</span>
      </Button>
      
      <Button 
        onClick={handleRefreshData}
        variant="outline" 
        className="h-24 flex flex-col items-center justify-center col-span-2"
      >
        <RefreshCcw size={24} className="mb-2" />
        <span>Aggiorna Dati</span>
      </Button>
    </div>
  );
};

export default QuickActions;
