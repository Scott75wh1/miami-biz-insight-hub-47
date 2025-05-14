
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApiKeys } from '@/hooks/useApiKeys';
import { Database, Map, MessageSquare, Layers, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ApiStatusIndicators = () => {
  const { apiKeys, isLoaded } = useApiKeys();

  // Define API services to display
  const apiServices = [
    { name: 'Census.gov', icon: Database, key: 'censusGov', description: 'Dati demografici e analisi' },
    { name: 'Google Places', icon: Map, key: 'googlePlaces', description: 'Localizzazione e POI' },
    { name: 'OpenAI', icon: MessageSquare, key: 'openAI', description: 'Analisi intelligente e raccomandazioni' },
    { name: 'Yelp', icon: Layers, key: 'yelp', description: 'Informazioni su attività e recensioni' },
    { name: 'Google Trends', icon: TrendingUp, key: 'googleTrends', description: 'Tendenze di mercato' }
  ];

  const getApiStatus = (apiKey: string) => {
    if (!isLoaded) return 'loading';
    return apiKey && apiKey !== 'demo-key' ? 'active' : 'demo';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Stato delle API</CardTitle>
        <CardDescription>
          Connessioni alle fonti dati esterne
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {apiServices.map((service) => {
            const status = getApiStatus(apiKeys[service.key as keyof typeof apiKeys]);
            
            return (
              <TooltipProvider key={service.key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center bg-background p-3 rounded-lg border">
                      <service.icon className="h-7 w-7 mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">{service.name}</div>
                      <Badge 
                        variant={status === 'active' ? "default" : status === 'demo' ? "outline" : "secondary"}
                        className={`mt-2 ${
                          status === 'active' ? 'bg-green-500 hover:bg-green-600' : 
                          status === 'demo' ? 'border-amber-300 text-amber-600' : 
                          'animate-pulse'
                        }`}
                      >
                        {status === 'active' ? 'Attiva' : status === 'demo' ? 'Demo' : 'Caricamento...'}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{service.description}</p>
                    {status === 'demo' && <p className="text-amber-500 text-xs mt-1">Utilizzando dati simulati</p>}
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
