
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { performBusinessAnalysis, AnalysisResult, BusinessInfo } from '@/services/businessAnalysisService';
import type { BusinessFormValues } from '@/components/business/BusinessAnalysisForm';

export function useBusinessAnalysis() {
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();
  const { selectedDistrict } = useDistrictSelection();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);

  const startAnalysis = async (values: BusinessFormValues) => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    try {
      toast({
        title: "Analisi iniziata",
        description: "Stiamo raccogliendo i dati per la tua attività...",
      });
      
      const businessInfo: BusinessInfo = {
        name: values.businessName,
        address: values.businessAddress,
        district: selectedDistrict,
        type: values.businessType || 'general', // Ensure type is always provided
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
        description: "I risultati sono pronti per la consultazione",
      });
      
    } catch (error) {
      console.error("Error during business analysis:", error);
      toast({
        title: "Errore durante l'analisi",
        description: "Si è verificato un errore durante l'analisi. Riprova più tardi.",
        variant: "destructive",
      });
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
