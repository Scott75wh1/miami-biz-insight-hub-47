
import { useState, useEffect, useCallback } from 'react';
import { useApiKeys } from './useApiKeys';
import { useToast } from '@/hooks/use-toast';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { performBusinessAnalysis, BusinessInfo, AnalysisResult } from '@/services/businessAnalysis';

// Update the BusinessFormValues interface to include businessType
interface BusinessFormValues {
  businessName?: string;
  businessAddress?: string;
  businessType?: string;
}

export function useBusinessAnalysis() {
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();
  const { selectedDistrict } = useDistrictSelection();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [lastDistrict, setLastDistrict] = useState<string>(selectedDistrict);
  const [lastBusinessInfo, setLastBusinessInfo] = useState<BusinessInfo | null>(null);

  // Effetto per gestire i cambiamenti di distretto
  useEffect(() => {
    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`[useBusinessAnalysis] Distretto cambiato a ${customEvent.detail.district}`);
      
      // Ripristina lo stato dell'analisi quando cambia il distretto
      if (lastBusinessInfo && analysisComplete) {
        setLastDistrict(customEvent.detail.district);
        refreshAnalysis(customEvent.detail.district);
      }
    };

    console.log(`[useBusinessAnalysis] Configurazione listener per distretto: ${selectedDistrict}`);
    window.addEventListener('districtChanged', handleDistrictChange);
    
    return () => {
      window.removeEventListener('districtChanged', handleDistrictChange);
    };
  }, [selectedDistrict, analysisComplete, lastBusinessInfo]);

  // Verifica se il distretto è cambiato e se abbiamo già un'analisi
  useEffect(() => {
    if (lastDistrict !== selectedDistrict && lastBusinessInfo && analysisComplete) {
      console.log(`[useBusinessAnalysis] Distretto cambiato da ${lastDistrict} a ${selectedDistrict}, aggiorno l'analisi`);
      setLastDistrict(selectedDistrict);
      refreshAnalysis(selectedDistrict);
    }
  }, [selectedDistrict, lastDistrict, analysisComplete, lastBusinessInfo]);

  // Funzione per aggiornare l'analisi quando cambia il distretto
  const refreshAnalysis = useCallback(async (district: string) => {
    if (!lastBusinessInfo) return;
    
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    console.log(`[useBusinessAnalysis] Aggiornamento analisi per ${lastBusinessInfo.name} nel nuovo distretto ${district}`);
    
    try {
      toast({
        title: "Aggiornamento analisi",
        description: `Aggiornamento dati per il distretto ${district}...`,
      });
      
      const updatedBusinessInfo: BusinessInfo = {
        ...lastBusinessInfo,
        district: district
      };
      
      // Convert ApiKeys to Record<string, string> to satisfy type requirement
      const apiKeysRecord: Record<string, string> = {
        googlePlaces: apiKeys.googlePlaces,
        censusGov: apiKeys.censusGov,
        yelp: apiKeys.yelp,
        googleTrends: apiKeys.googleTrends,
        openAI: apiKeys.openAI,
      };
      
      const result = await performBusinessAnalysis(updatedBusinessInfo, apiKeysRecord);
      
      console.log(`[useBusinessAnalysis] Analisi aggiornata per ${updatedBusinessInfo.name} nel distretto ${result.businessInfo.district}`);
      
      setAnalysisData(result);
      setAnalysisComplete(true);
      
      toast({
        title: "Analisi completata",
        description: `I risultati aggiornati per ${updatedBusinessInfo.name} a ${result.businessInfo.district} sono pronti`,
        variant: "default",
      });
      
    } catch (error) {
      console.error("[useBusinessAnalysis] Error during business analysis refresh:", error);
      toast({
        title: "Errore durante l'aggiornamento",
        description: "Si è verificato un errore durante l'aggiornamento dell'analisi. Riprova più tardi.",
        variant: "destructive",
      });
      
    } finally {
      setIsAnalyzing(false);
    }
  }, [lastBusinessInfo, apiKeys, toast]);

  const startAnalysis = async (values: BusinessFormValues) => {
    // Reset previous analysis data before starting a new one
    setAnalysisData(null);
    setAnalysisComplete(false);
    setIsAnalyzing(true);
    
    console.log(`[useBusinessAnalysis] Iniziando analisi per ${values.businessName} nel distretto ${selectedDistrict}`);
    console.log(`[useBusinessAnalysis] API Keys disponibili:`, Object.keys(apiKeys).filter(k => !!apiKeys[k]).join(', '));
    
    try {
      toast({
        title: "Analisi iniziata",
        description: "Stiamo raccogliendo i dati per la tua attività...",
      });
      
      const businessInfo: BusinessInfo = {
        name: values.businessName || '',
        address: values.businessAddress || '',
        district: selectedDistrict,
        // Ensure type is always provided with a default if not available
        type: values.businessType || 'general',
      };
      
      // Salva le informazioni aziendali per eventuali aggiornamenti futuri
      setLastBusinessInfo(businessInfo);
      setLastDistrict(selectedDistrict);
      
      // Convert ApiKeys to Record<string, string> to satisfy type requirement
      const apiKeysRecord: Record<string, string> = {
        googlePlaces: apiKeys.googlePlaces,
        censusGov: apiKeys.censusGov,
        yelp: apiKeys.yelp,
        googleTrends: apiKeys.googleTrends,
        openAI: apiKeys.openAI,
      };
      
      const result = await performBusinessAnalysis(businessInfo, apiKeysRecord);
      
      console.log(`[useBusinessAnalysis] Analisi completata per ${businessInfo.name}:`, {
        district: result.businessInfo.district,
        dataReceived: {
          places: !!result.rawData.places,
          yelp: !!result.rawData.yelp,
          census: !!result.rawData.census,
          trends: !!result.rawData.trends
        }
      });
      
      setAnalysisData(result);
      setAnalysisComplete(true);
      
      toast({
        title: "Analisi completata",
        description: `I risultati per ${businessInfo.name} a ${result.businessInfo.district} sono pronti`,
        variant: "default",
      });
      
    } catch (error) {
      console.error("[useBusinessAnalysis] Error during business analysis:", error);
      toast({
        title: "Errore durante l'analisi",
        description: "Si è verificato un errore durante l'analisi. Riprova più tardi.",
        variant: "destructive",
      });
      
      // Reset analysis state on error
      setAnalysisComplete(false);
      setAnalysisData(null);
      setLastBusinessInfo(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    analysisComplete,
    analysisData,
    startAnalysis,
    refreshAnalysis
  };
}
