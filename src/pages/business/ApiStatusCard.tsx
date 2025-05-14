
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check } from 'lucide-react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Button } from '@/components/ui/button';

export const ApiStatusCard: React.FC = () => {
  const { apiKeys, isApiKeyValid } = useApiKeys();
  const [apiStatuses, setApiStatuses] = useState({
    openAI: false,
    googlePlaces: false,
    censusGov: false,
    yelp: false,
    googleTrends: false
  });

  // Verifica lo stato delle API al caricamento del componente
  useEffect(() => {
    checkApiStatuses();
  }, [apiKeys]);

  // Funzione per verificare lo stato delle API
  const checkApiStatuses = () => {
    setApiStatuses({
      openAI: isApiKeyValid('openAI'),
      googlePlaces: isApiKeyValid('googlePlaces'),
      censusGov: isApiKeyValid('censusGov'),
      yelp: isApiKeyValid('yelp'),
      googleTrends: isApiKeyValid('googleTrends')
    });
  };

  const handleTestApis = () => {
    // Simuliamo un test delle API
    checkApiStatuses();
  };

  return (
    <Card>
      <CardHeader className="pb-2 sm:pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm sm:text-base">Stato APIs</CardTitle>
          <Button variant="outline" size="sm" onClick={handleTestApis} className="flex items-center gap-1">
            <Check className="h-3 w-3" />
            Verifica
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2">
          {Object.entries(apiStatuses).map(([api, isActive]) => (
            <div key={api} className="flex justify-between items-center">
              <span className="text-xs sm:text-sm">{api}</span>
              <span className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${
                isActive ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
              }`}>
                {isActive ? "Attiva" : "Demo"}
              </span>
            </div>
          ))}
        </div>
        
        <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-100 py-2 sm:py-3">
          <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <AlertDescription className="text-xs">
            Configura tutte le API nelle impostazioni per risultati ottimali.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
