
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { fetchGoogleTrendsData } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import { getSearchKeywords, getGrowingCategories } from '@/components/trends/TrendsUtils';
import { TrendsContextType, TrendItem, Category, AIRecommendation } from './types';
import { analyzeTrendsData } from '@/services/apiService';
import { BusinessType } from '@/components/BusinessTypeSelector';

export const TrendsContext = createContext<TrendsContextType | undefined>(undefined);

export const TrendsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTrends, setSearchTrends] = useState<TrendItem[]>([]);
  const [growingCategories, setGrowingCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation>({
    summary: "",
    recommendations: []
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [lastFetchParams, setLastFetchParams] = useState<{businessType: string, district: string} | null>(null);
  
  const { toast } = useToast();
  const { apiKeys, isLoaded } = useApiKeys();
  const isUsingDemoKey = !apiKeys.googleTrends || apiKeys.googleTrends === 'demo-key';

  // Function to get AI recommendations
  const getAiRecommendations = useCallback(async (
    trends: TrendItem[], 
    categories: Category[], 
    district: string, 
    businessType: string | BusinessType
  ) => {
    setIsAiLoading(true);
    
    try {
      const aiAnalysis = await analyzeTrendsData(
        apiKeys.openAI,
        businessType as string,
        trends,
        categories,
        district
      );
      
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

  // Function to fetch trends data
  const fetchTrendsData = useCallback(async (businessType: string | BusinessType, district: string) => {
    if (!isLoaded) return;
    
    // Prevent duplicate fetches with the same parameters
    if (lastFetchParams && 
        lastFetchParams.businessType === businessType && 
        lastFetchParams.district === district) {
      console.log("Skipping duplicate fetch for:", businessType, district);
      return;
    }
    
    // Set loading state and update last fetch params
    setIsLoading(true);
    setLastFetchParams({ businessType, district });
    
    try {
      // Get keywords based on business type and selected district
      const keywords = getSearchKeywords(businessType as BusinessType, district);
      
      // Fetch trends data from Google Trends API
      const data = await fetchGoogleTrendsData(apiKeys.googleTrends, keywords, 'US-FL-528', district);
      
      if (data && 'trends' in data) {
        // Map the API response to our TrendItem interface
        const mappedTrends = data.trends.map((trend: any) => ({
          label: trend.keyword,
          value: trend.value,
        }));
        
        setSearchTrends(mappedTrends);
        
        // Set the growing categories based on business type and district
        setGrowingCategories(getGrowingCategories(businessType as BusinessType, district));
        
        const messageType = isUsingDemoKey ? "Dati dimostrativi di trend caricati" : "Dati reali dei trend caricati";
        toast({
          title: messageType,
          description: isUsingDemoKey 
            ? "Stai visualizzando dati dimostrativi. Inserisci una API key valida per dati reali."
            : `I dati dei trend per ${district} sono stati caricati con successo.`,
        });
        
        // Now get AI recommendations based on the trends data and district
        await getAiRecommendations(mappedTrends, getGrowingCategories(businessType as BusinessType, district), district, businessType);
        
      } else {
        // Use default data if API returns no results
        const defaultTrends = keywords.map((keyword, index) => ({
          label: keyword,
          value: 80 - (index * 10)
        }));
        
        setSearchTrends(defaultTrends);
        
        // Set the growing categories based on business type and district
        const defaultCategories = getGrowingCategories(businessType as BusinessType, district);
        setGrowingCategories(defaultCategories);
        
        toast({
          title: "Utilizzando dati predefiniti",
          description: "Nessun dato disponibile dall'API, utilizzando dati di esempio.",
        });
        
        // Get AI recommendations based on default data
        await getAiRecommendations(defaultTrends, defaultCategories, district, businessType);
      }
    } catch (error) {
      console.error('Error fetching trends data:', error);
      
      // Use default data if there's an error
      const keywords = getSearchKeywords(businessType as BusinessType, district);
      const defaultTrends = keywords.map((keyword, index) => ({
        label: keyword,
        value: 80 - (index * 10)
      }));
      
      setSearchTrends(defaultTrends);
      
      // Set the growing categories based on business type and district
      const defaultCategories = getGrowingCategories(businessType as BusinessType, district);
      setGrowingCategories(defaultCategories);
      
      toast({
        title: "Errore nel caricamento dei trend",
        description: "Impossibile recuperare dati da Google Trends. Controlla la tua API key.",
        variant: "destructive",
      });
      
      // Try to get AI recommendations despite the error
      await getAiRecommendations(defaultTrends, defaultCategories, district, businessType);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, apiKeys.googleTrends, toast, getAiRecommendations, isUsingDemoKey]);

  return (
    <TrendsContext.Provider
      value={{
        searchTrends,
        growingCategories,
        aiRecommendations,
        isLoading,
        isAiLoading,
        isUsingDemoKey,
        fetchTrendsData
      }}
    >
      {children}
    </TrendsContext.Provider>
  );
};
