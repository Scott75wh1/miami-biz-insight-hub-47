
import { useToast } from '@/components/ui/use-toast';
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
      title: "Utilizzando dati predefiniti",
      description: "Nessun dato disponibile dalle API, utilizzando dati di esempio.",
    });
  };

  const showAIAnalysisToast = () => {
    toast({
      title: "Analisi AI completata",
      description: "I punti di forza dei competitor sono stati analizzati con successo.",
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Errore nel caricamento competitor",
      description: "Impossibile recuperare dati. Controlla le tue API key.",
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
