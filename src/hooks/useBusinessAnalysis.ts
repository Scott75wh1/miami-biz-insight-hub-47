
import { useState } from 'react';
import { useApiKeys } from './useApiKeys';
import { useToast } from '@/hooks/use-toast';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { performBusinessAnalysis, AnalysisResult, BusinessInfo } from '@/services/businessAnalysisService';

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

  const startAnalysis = async (values: BusinessFormValues) => {
    // Reset previous analysis data before starting a new one
    setAnalysisData(null);
    setAnalysisComplete(false);
    setIsAnalyzing(true);
    
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
