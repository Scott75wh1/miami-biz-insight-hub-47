
import { useState, useEffect } from 'react';
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

  // Aggiungiamo un effect per monitorare i cambiamenti di distretto
  useEffect(() => {
    console.log(`useBusinessAnalysis: distretto cambiato a ${selectedDistrict}`);
  }, [selectedDistrict]);

  const startAnalysis = async (values: BusinessFormValues) => {
    // Reset previous analysis data before starting a new one
    setAnalysisData(null);
    setAnalysisComplete(false);
    setIsAnalyzing(true);
    
    console.log(`Iniziando analisi per ${values.businessName} nel distretto ${selectedDistrict}`);
    console.log(`API Keys disponibili:`, Object.keys(apiKeys).filter(k => !!apiKeys[k]).join(', '));
    
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
      
      // Convert ApiKeys to Record<string, string> to satisfy type requirement
      const apiKeysRecord: Record<string, string> = {
        googlePlaces: apiKeys.googlePlaces,
        censusGov: apiKeys.censusGov,
        yelp: apiKeys.yelp,
        googleTrends: apiKeys.googleTrends,
        openAI: apiKeys.openAI,
      };
      
      const result = await performBusinessAnalysis(businessInfo, apiKeysRecord);
      
      console.log(`Analisi completata per ${businessInfo.name}:`, {
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
      console.error("Error during business analysis:", error);
      toast({
        title: "Errore durante l'analisi",
        description: "Si è verificato un errore durante l'analisi. Riprova più tardi.",
        variant: "destructive",
      });
      
      // Reset analysis state on error
      setAnalysisComplete(false);
      setAnalysisData(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    analysisComplete,
    analysisData,
    startAnalysis
  };
}
