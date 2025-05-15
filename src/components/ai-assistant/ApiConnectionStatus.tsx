
import React from 'react';
import { WifiOff, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ApiConnectionStatusProps {
  status: 'good' | 'unstable' | 'error';
  onRetry: () => void;
}

const ApiConnectionStatus: React.FC<ApiConnectionStatusProps> = ({ status, onRetry }) => {
  if (status === 'good') return null;
  
  return (
    <Alert 
      variant={status === 'error' ? 'destructive' : 'warning'}
      className="border-b rounded-none"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {status === 'error' ? (
            <WifiOff className="h-4 w-4 mr-2" />
          ) : (
            <AlertCircle className="h-4 w-4 mr-2" />
          )}
          <AlertDescription>
            {status === 'error' 
              ? "Connessione all'API fallita. Verifica la tua connessione internet o le API key." 
              : "Connessione instabile. Alcune richieste potrebbero non andare a buon fine."
            }
          </AlertDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="ml-2 flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" /> 
          Riprova
        </Button>
      </div>
    </Alert>
  );
};

export default ApiConnectionStatus;
