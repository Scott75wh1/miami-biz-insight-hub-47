
import React from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ApiConnectionStatusProps {
  status: 'good' | 'unstable' | 'error';
  onRetry: () => void;
}

const ApiConnectionStatus: React.FC<ApiConnectionStatusProps> = ({ status, onRetry }) => {
  if (status === 'good') return null;
  
  const isUnstable = status === 'unstable';
  const Icon = isUnstable ? AlertTriangle : AlertCircle;
  const variant = isUnstable ? "default" : "destructive";
  
  return (
    <Alert variant={variant} className={`${isUnstable ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-destructive/10'} mb-4`}>
      <Icon className="h-4 w-4 mr-2" />
      <AlertDescription className="text-xs flex-1">
        {isUnstable
          ? "La connessione all'API sembra instabile. Alcuni messaggi potrebbero non essere elaborati correttamente."
          : "Impossibile connettersi all'API. Verifica la tua connessione e le impostazioni API."
        }
      </AlertDescription>
      <Button variant="outline" size="sm" onClick={onRetry} className="ml-2 text-xs">
        {isUnstable ? 'Riprova' : 'Riavvia'}
      </Button>
    </Alert>
  );
};

export default ApiConnectionStatus;
