
import { useState } from 'react';
import { useApiKeys } from './useApiKeys';
import { useToast } from '@/hooks/use-toast';

export function useTrafficData() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { apiKeys } = useApiKeys();
  const { toast } = useToast();

  const isTrafficLayerAvailable = () => {
    return apiKeys.googlePlaces && apiKeys.googlePlaces !== 'demo-key';
  };

  const showErrorToast = (message: string) => {
    toast({
      title: "Errore nella visualizzazione del traffico",
      description: message,
      variant: "destructive",
    });
  };

  const showSuccessToast = (message: string) => {
    toast({
      title: "Traffico visualizzato",
      description: message,
    });
  };

  return {
    isLoading,
    setIsLoading,
    isTrafficLayerAvailable,
    showErrorToast,
    showSuccessToast
  };
}
