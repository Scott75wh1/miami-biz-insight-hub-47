
import { useToast } from '@/hooks/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';

/**
 * Hook for handling competitor-related toast notifications
 */
export const useCompetitorToasts = () => {
  const { toast } = useToast();
  
  // Aggiungiamo un riferimento per tenere traccia dei toast mostrati
  const toastsShown = React.useRef<Record<string, boolean>>({});

  const showSuccessToast = (businessType: BusinessType, selectedDistrict: string) => {
    const toastKey = `success-${businessType}-${selectedDistrict}`;
    
    // Mostra il toast solo se non è già stato mostrato
    if (!toastsShown.current[toastKey]) {
      toast({
        title: "Dati competitor caricati",
        description: `I dati dei competitor per ${businessType} in ${selectedDistrict} sono stati caricati con successo.`,
      });
      
      toastsShown.current[toastKey] = true;
      
      // Resetta dopo 5 secondi per permettere futuri toast
      setTimeout(() => {
        toastsShown.current[toastKey] = false;
      }, 5000);
    }
  };

  const showDefaultDataToast = () => {
    const toastKey = 'default-data';
    
    if (!toastsShown.current[toastKey]) {
      toast({
        title: "Dati predefiniti",
        description: "Utilizzando dati di esempio.",
      });
      
      toastsShown.current[toastKey] = true;
      
      setTimeout(() => {
        toastsShown.current[toastKey] = false;
      }, 5000);
    }
  };

  const showAIAnalysisToast = () => {
    // Non mostriamo questo toast per ridurre il numero di notifiche
  };

  const showErrorToast = () => {
    const toastKey = 'error-data';
    
    if (!toastsShown.current[toastKey]) {
      toast({
        title: "Errore nel caricamento",
        description: "Impossibile recuperare dati. Utilizzando dati di esempio.",
        variant: "destructive",
      });
      
      toastsShown.current[toastKey] = true;
      
      setTimeout(() => {
        toastsShown.current[toastKey] = false;
      }, 5000);
    }
  };

  return {
    showSuccessToast,
    showDefaultDataToast,
    showAIAnalysisToast,
    showErrorToast
  };
};
