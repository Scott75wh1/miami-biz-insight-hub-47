
import React from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const ApiSummary = () => {
  const { areKeysSet, isUsingRealData } = useApiKeys();
  const navigate = useNavigate();
  const [isDismissed, setIsDismissed] = React.useState(false);
  
  // Se tutte le API sono in modalità demo, mostra un avviso
  if (!areKeysSet() && !isDismissed) {
    return (
      <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex justify-between items-center text-sm">
          <span>
            Stai utilizzando dati demo. Per ottenere dati reali, configura le API keys nelle impostazioni.
          </span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 border-amber-300 hover:bg-amber-100"
              onClick={() => navigate('/settings')}
            >
              Configura API
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 hover:bg-amber-100"
              onClick={() => setIsDismissed(true)}
            >
              Nascondi
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Se alcune API sono configurate ma non tutte
  if (areKeysSet() && !isUsingRealData() && !isDismissed) {
    return (
      <Alert variant="default" className="bg-blue-50 border-blue-200 text-blue-800">
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription className="flex justify-between items-center text-sm">
          <span>
            Alcune API keys sono configurate. Completa la configurazione per utilizzare tutte le funzionalità.
          </span>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 hover:bg-blue-100"
            onClick={() => setIsDismissed(true)}
          >
            Nascondi
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
};
