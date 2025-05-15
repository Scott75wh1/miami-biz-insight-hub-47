
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useApiKeys } from '@/hooks/useApiKeys';

export function useTrafficData() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();

  const isTrafficLayerAvailable = useCallback(() => {
    return apiKeys.googlePlaces && apiKeys.googlePlaces !== 'demo-key';
  }, [apiKeys.googlePlaces]);

  const showErrorToast = useCallback((message: string) => {
    toast({
      title: "Errore dati di traffico",
      description: message,
      variant: "destructive",
    });
  }, [toast]);
  
  const showSuccessToast = useCallback((message: string) => {
    toast({
      title: "Successo",
      description: message,
    });
  }, [toast]);

  return {
    isTrafficLayerAvailable,
    showErrorToast,
    showSuccessToast,
    isLoading,
    setIsLoading
  };
}
