
import { useState, useCallback } from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { analyzeTrendsData } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import { apiLogger } from '@/services/logService';
import { TrendItem, Category, AIRecommendation } from '../types';
import { BusinessType } from '@/components/BusinessTypeSelector';

export interface UseAiRecommendationsResult {
  aiRecommendations: AIRecommendation;
  isAiLoading: boolean;
  getAiRecommendations: (
    trends: TrendItem[], 
    categories: Category[], 
    district: string, 
    businessType: string | BusinessType
  ) => Promise<void>;
}

export function useAiRecommendations(): UseAiRecommendationsResult {
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation>({
    summary: "",
    recommendations: []
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();

  // Function to get AI recommendations
  const getAiRecommendations = useCallback(async (
    trends: TrendItem[], 
    categories: Category[], 
    district: string, 
    businessType: string | BusinessType
  ) => {
    setIsAiLoading(true);
    
    const logIndex = apiLogger.logAPICall(
      'OpenAI',
      'analyzeTrendsData',
      { businessType, district, trendsCount: trends.length }
    );
    
    try {
      const aiAnalysis = await analyzeTrendsData(
        apiKeys.openAI,
        businessType as string,
        trends,
        categories,
        district
      );
      
      apiLogger.logAPIResponse(logIndex, { 
        success: true,
        recommendationsCount: aiAnalysis?.recommendations?.length || 0
      });
      
      if (aiAnalysis) {
        setAiRecommendations(aiAnalysis);
        
        // Show a toast notification if using real data (not demo key)
        if (apiKeys.openAI !== 'demo-key') {
          toast({
            title: "Analisi AI completata",
            description: `Consigli strategici per ${district} generati con successo.`,
          });
        }
      }
    } catch (error) {
      apiLogger.logAPIError(logIndex, error);
      
      console.error('Error getting AI trend recommendations:', error);
      
      // Set default recommendations in case of error
      setAiRecommendations({
        summary: `Analisi non disponibile al momento per ${district}`,
        recommendations: [
          "Monitorare i trend di mercato regolarmente",
          "Analizzare la concorrenza locale",
          "Considerare le tendenze demografiche della zona"
        ]
      });
    } finally {
      setIsAiLoading(false);
    }
  }, [apiKeys.openAI, toast]);

  return {
    aiRecommendations,
    isAiLoading,
    getAiRecommendations
  };
}
