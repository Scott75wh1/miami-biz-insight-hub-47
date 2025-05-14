
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Database, Map, MessageSquare, Layers, TrendingUp, Check, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ApiStatusIndicators = () => {
  const { apiKeys, isLoaded, lastUpdated, isApiKeyValid } = useApiKeys();
  const [apiStatus, setApiStatus] = useState<Record<string, 'active' | 'demo' | 'error' | 'loading'>>({
    censusGov: 'loading',
    googlePlaces: 'loading',
    openAI: 'loading',
    yelp: 'loading',
    googleTrends: 'loading'
  });
  const { toast } = useToast();
  const [isTestingApis, setIsTestingApis] = useState(false);

  // Define API services to display
  const apiServices = [
    { name: 'Census.gov', icon: Database, key: 'censusGov', description: 'Dati demografici e analisi' },
    { name: 'Google Places', icon: Map, key: 'googlePlaces', description: 'Localizzazione e POI' },
    { name: 'OpenAI', icon: MessageSquare, key: 'openAI', description: 'Analisi intelligente e raccomandazioni' },
    { name: 'Yelp', icon: Layers, key: 'yelp', description: 'Informazioni su attività e recensioni' },
    { name: 'Google Trends', icon: TrendingUp, key: 'googleTrends', description: 'Tendenze di mercato' }
  ];

  // Update API status when apiKeys change
  useEffect(() => {
    if (!isLoaded) return;
    
    const newStatus: Record<string, 'active' | 'demo' | 'error' | 'loading'> = {};
    
    Object.keys(apiKeys).forEach(key => {
      const apiKey = key as keyof typeof apiKeys;
      newStatus[apiKey] = isApiKeyValid(apiKey) ? 'active' : 'demo';
    });
    
    setApiStatus(newStatus);
  }, [apiKeys, isLoaded, isApiKeyValid]);

  // Test API connections
  const testApiConnections = async () => {
    setIsTestingApis(true);
    
    // Set all to loading
    setApiStatus(prev => {
      const newStatus = { ...prev };
      Object.keys(newStatus).forEach(key => {
        newStatus[key] = 'loading';
      });
      return newStatus;
    });
    
    toast({
      title: "Test API connessioni",
      description: "Controllo dello stato delle connessioni API in corso...",
    });
    
    // Simulate API connection tests
    // In a real app, you would make actual test API calls here
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update status based on API key validity and simulated test results
    const newStatus: Record<string, 'active' | 'demo' | 'error' | 'loading'> = {};
    
    Object.keys(apiKeys).forEach(key => {
      const apiKey = key as keyof typeof apiKeys;
      if (!isApiKeyValid(apiKey)) {
        newStatus[apiKey] = 'demo';
      } else {
        // Simulate some errors for demonstration
        newStatus[apiKey] = Math.random() > 0.8 ? 'error' : 'active';
      }
    });
    
    setApiStatus(newStatus);
    setIsTestingApis(false);
    
    toast({
      title: "Test completato",
      description: "Verifica dello stato delle connessioni API completata",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Stato delle API</CardTitle>
            <CardDescription>
              Connessioni alle fonti dati esterne
              {lastUpdated && (
                <span className="text-xs block text-muted-foreground">
                  Ultimo aggiornamento: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={testApiConnections}
            disabled={isTestingApis}
            className="flex items-center gap-1"
          >
            <Check className="h-3 w-3" />
            Verifica
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {apiServices.map((service) => {
            const status = apiStatus[service.key as keyof typeof apiStatus] || 'loading';
            
            return (
              <TooltipProvider key={service.key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center bg-background p-3 rounded-lg border">
                      <service.icon className="h-7 w-7 mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">{service.name}</div>
                      <Badge 
                        variant={status === 'active' ? "default" : status === 'error' ? "destructive" : status === 'demo' ? "outline" : "secondary"}
                        className={`mt-2 ${
                          status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                          status === 'demo' ? 'border-amber-300 text-amber-600' : 
                          status === 'error' ? 'bg-red-500 hover:bg-red-600' :
                          'animate-pulse'
                        }`}
                      >
                        {status === 'active' ? 'Connessa' : 
                         status === 'demo' ? 'Demo' : 
                         status === 'error' ? 'Errore' : 
                         'Verifica...'}
                      </Badge>
                      {status === 'error' && (
                        <span className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Errore
                        </span>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{service.description}</p>
                    {status === 'demo' && <p className="text-amber-500 text-xs mt-1">Utilizzando dati simulati</p>}
                    {status === 'error' && <p className="text-red-500 text-xs mt-1">Errore di connessione</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiStatusIndicators;
