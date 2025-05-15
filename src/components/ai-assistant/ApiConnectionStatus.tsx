
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ApiConnectionStatusProps {
  status: 'good' | 'unstable' | 'error';
  onRetry?: () => void;
}

const ApiConnectionStatus: React.FC<ApiConnectionStatusProps> = ({ 
  status,
  onRetry
}) => {
  if (status === 'good') return null;

  return (
    <div className="mb-4">
      <Alert variant={status === 'unstable' ? 'warning' : 'destructive'}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {status === 'unstable' ? (
              <Wifi className="h-4 w-4 text-amber-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-destructive" />
            )}
            <AlertTitle>
              {status === 'unstable' 
                ? "Connessione API instabile" 
                : "Errore di connessione API"}
            </AlertTitle>
          </div>
          {onRetry && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onRetry}
              className="flex items-center text-xs gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Riprova
            </Button>
          )}
        </div>
        <AlertDescription className="mt-2 text-sm">
          {status === 'unstable' ? (
            <>
              Si stanno verificando problemi intermittenti nella connessione alle API.
              Prova a:
              <ul className="list-disc pl-5 mt-1 text-xs">
                <li>Verificare la tua connessione internet</li>
                <li>Controllare che l'API key sia valida nelle impostazioni</li>
                <li>Ricaricare la pagina se il problema persiste</li>
              </ul>
            </>
          ) : (
            "Non è stato possibile connettersi alle API. Verifica la tua connessione internet e l'API key nelle impostazioni."
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ApiConnectionStatus;
