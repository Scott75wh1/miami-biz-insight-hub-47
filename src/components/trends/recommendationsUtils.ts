
import { analyzeTrendsData } from '@/services/apiService';
import { TrendItem, Category, AIRecommendation } from './types';
import { useToast } from '@/hooks/use-toast';

export const getAiRecommendations = async (
  apiKey: string,
  trends: TrendItem[],
  categories: Category[],
  district: string,
  businessType: string,
  setIsAiLoading: (value: boolean) => void,
  setAiRecommendations: (value: AIRecommendation) => void
): Promise<void> => {
  setIsAiLoading(true);
  
  try {
    const aiAnalysis = await analyzeTrendsData(
      apiKey,
      businessType,
      trends,
      categories,
      district
    );
    
    if (aiAnalysis) {
      setAiRecommendations(aiAnalysis);
      
      // Show a toast notification if using real data (not demo key)
      if (apiKey !== 'demo-key') {
        const { toast } = useToast();
        toast({
          title: "Analisi AI completata",
          description: `Consigli strategici per ${district} generati con successo.`,
        });
      }
    }
  } catch (error) {
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
};
