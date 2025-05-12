
import React from 'react';
import { Loader2 } from 'lucide-react';

interface PlacesLoadingStateProps {
  isLoading: boolean;
  customAddress: string | null;
}

const PlacesLoadingState: React.FC<PlacesLoadingStateProps> = ({ isLoading, customAddress }) => {
  if (!customAddress) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        <p className="text-sm">Inserisci un indirizzo per visualizzare i dati</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Caricamento dati...</span>
      </div>
    );
  }

  return null;
};

export default PlacesLoadingState;
