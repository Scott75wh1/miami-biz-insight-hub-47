
import { useState, useCallback, useRef } from 'react';
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
  
  // Track currently analyzing params to prevent duplicate/recursive calls
  const processingRequest = useRef<{
    district: string,
    businessType: string
  } | null>(null);
  
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();

  // Function to get AI recommendations
  const getAiRecommendations = useCallback(async (
    trends: TrendItem[], 
    categories: Category[], 
    district: string, 
    businessType: string | BusinessType
  ) => {
    // Skip if we're already processing the same request
    if (processingRequest.current && 
        processingRequest.current.district === district && 
        processingRequest.current.businessType === businessType) {
      console.log(`Already processing request for ${businessType} in ${district}, skipping duplicate call`);
      return;
    }
    
    setIsAiLoading(true);
    processingRequest.current = { district, businessType: businessType as string };
    
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
      processingRequest.current = null;
    }
  }, [apiKeys.openAI, toast]);

  return {
    aiRecommendations,
    isAiLoading,
    getAiRecommendations
  };
}
