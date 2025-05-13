
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsDialog } from '@/components/SettingsDialog';

interface TrafficMapErrorProps {
  errorMessage: string | null;
}

export const TrafficMapError: React.FC<TrafficMapErrorProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;
  
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-8 text-center">
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Errore di caricamento della mappa</h3>
      <p className="text-muted-foreground mb-6">{errorMessage}</p>
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()} variant="outline">
          Ricarica pagina
        </Button>
        <SettingsDialog />
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        È necessaria una chiave API valida di Google Maps per visualizzare la mappa.
        Vai su Impostazioni per configurare la tua chiave API.
      </p>
    </div>
  );
};
