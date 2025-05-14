
import { useToast } from '@/hooks/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';

/**
 * Hook for handling competitor-related toast notifications
 */
export const useCompetitorToasts = () => {
  const { toast } = useToast();

  const showSuccessToast = (businessType: BusinessType, selectedDistrict: string) => {
    toast({
      title: "Dati competitor caricati",
      description: `I dati dei competitor per ${businessType} in ${selectedDistrict} sono stati caricati con successo.`,
    });
  };

  const showDefaultDataToast = () => {
    toast({
      title: "Dati predefiniti",
      description: "Utilizzando dati di esempio.",
    });
  };

  const showAIAnalysisToast = () => {
    // Non mostriamo questo toast per ridurre il numero di notifiche
    // Evita possibili problemi di performance
  };

  const showErrorToast = () => {
    toast({
      title: "Errore nel caricamento",
      description: "Impossibile recuperare dati. Utilizzando dati di esempio.",
      variant: "destructive",
    });
  };

  return {
    showSuccessToast,
    showDefaultDataToast,
    showAIAnalysisToast,
    showErrorToast
  };
};
