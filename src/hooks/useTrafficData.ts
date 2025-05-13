
import { useState } from 'react';
import { fetchTrafficData } from '@/services/api/traffic/trafficService';
import { useApiKeys } from './useApiKeys';
import { TrafficRouteData } from '@/services/api/traffic/types';
import { useToast } from '@/components/ui/use-toast';

export function useTrafficData() {
  const [trafficData, setTrafficData] = useState<TrafficRouteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { apiKeys } = useApiKeys();
  const { toast } = useToast();

  const fetchTrafficRoutes = async (origin: string, destination: string, mode: string = 'driving') => {
    try {
      setIsLoading(true);
      
      const data = await fetchTrafficData(apiKeys.googlePlaces, origin, destination, mode);
      
      if (data) {
        setTrafficData(data);
        
        // Show success toast
        toast({
          title: "Dati traffico caricati",
          description: `Percorso da ${origin} a ${destination} analizzato con successo.`,
        });
      }
    } catch (error) {
      console.error('Error fetching traffic data:', error);
      toast({
        title: "Errore nell'analisi del traffico",
        description: "Non è stato possibile analizzare il traffico. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    trafficData,
    isLoading,
    fetchTrafficRoutes
  };
}
