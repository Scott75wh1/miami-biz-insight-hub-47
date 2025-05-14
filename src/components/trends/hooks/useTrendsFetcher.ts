
import { useState, useCallback, useRef } from 'react';
import { useApiKeys } from '@/hooks/useApiKeys';
import { fetchGoogleTrendsData } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';
import { getSearchKeywords, getGrowingCategories } from '@/components/trends/utils';
import { TrendItem, Category } from '../types';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { apiLogger } from '@/services/logService';

export interface UseTrendsFetcherResult {
  searchTrends: TrendItem[];
  growingCategories: Category[];
  isLoading: boolean;
  isUsingDemoKey: boolean;
  fetchTrendsData: (businessType: string | BusinessType, district: string) => Promise<void>;
  fetchAttempts: number;
}

export function useTrendsFetcher(
  getAiRecommendations: (trends: TrendItem[], categories: Category[], district: string, businessType: string) => Promise<void>
): UseTrendsFetcherResult {
  const [searchTrends, setSearchTrends] = useState<TrendItem[]>([]);
  const [growingCategories, setGrowingCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetchParams, setLastFetchParams] = useState<{businessType: string, district: string} | null>(null);
  const [fetchAttempts, setFetchAttempts] = useState(0);
  
  // Aggiungiamo un ref per il tracking dell'ultima richiesta
  const currentRequestId = useRef<string | null>(null);
  // Ref per tracciare se una fetch è in corso
  const isFetchingRef = useRef(false);
  
  const { toast } = useToast();
  const { apiKeys, isLoaded } = useApiKeys();
  const isUsingDemoKey = !apiKeys.googleTrends || apiKeys.googleTrends === 'demo-key';
  
  // Funzione di utilità per normalizzare i valori
  const normalizeBusinessType = (value: string | BusinessType): string => {
    if (!value) return 'general';
    
    if (typeof value === 'object' && value !== null) {
      return String(value) || 'general';
    }
    return String(value);
  };

  // Function to fetch trends data
  const fetchTrendsData = useCallback(async (businessType: string | BusinessType, district: string) => {
    if (!isLoaded) return;
    
    const normalizedBusinessType = normalizeBusinessType(businessType);
    
    // Prevent duplicate fetches with the same parameters
    if (lastFetchParams && 
        lastFetchParams.businessType === normalizedBusinessType && 
        lastFetchParams.district === district && 
        searchTrends.length > 0) {
      console.log(`[TrendsFetcher] Skipping duplicate fetch for: ${normalizedBusinessType}, ${district}`);
      return;
    }
    
    // Prevent concurrent fetches
    if (isFetchingRef.current) {
      console.log("[TrendsFetcher] A fetch operation is already in progress, skipping this call");
      return;
    }
    
    // ID univoco per questa richiesta
    const requestId = `${normalizedBusinessType}-${district}-${Date.now()}`;
    currentRequestId.current = requestId;
    
    // Set loading state and update last fetch params
    setIsLoading(true);
    setLastFetchParams({ businessType: normalizedBusinessType, district });
    setFetchAttempts(prev => prev + 1);
    isFetchingRef.current = true;
    
    const logIndex = apiLogger.logAPICall(
      'GoogleTrends',
      'fetchTrendsData',
      { businessType: normalizedBusinessType, district, isUsingDemoKey }
    );
    
    try {
      // Get keywords based on business type and selected district
      const keywords = getSearchKeywords(normalizedBusinessType as BusinessType, district);
      
      // Fetch trends data from Google Trends API
      const data = await fetchGoogleTrendsData(apiKeys.googleTrends, keywords, 'US-FL-528', district);
      
      // Controlla se questa è ancora la richiesta più recente
      if (currentRequestId.current !== requestId) {
        console.log("[TrendsFetcher] A newer request was made, discarding these results");
        return;
      }
      
      apiLogger.logAPIResponse(logIndex, { 
        success: true,
        trendsReceived: 'trends' in data ? data.trends.length : 0,
        isDefaultData: isUsingDemoKey
      });
      
      // Use type guard to check if data has the trends property
      if (data && 'trends' in data && Array.isArray(data.trends)) {
        // Map the API response to our TrendItem interface
        const mappedTrends = data.trends.map((trend: any) => ({
          label: trend.keyword,
          value: trend.value,
        }));
        
        setSearchTrends(mappedTrends);
        
        // Set the growing categories based on business type and district
        setGrowingCategories(getGrowingCategories(normalizedBusinessType as BusinessType, district));
        
        // Limitiamo i toast per evitare spam
        if (fetchAttempts <= 1 || !isUsingDemoKey) {
          const messageType = isUsingDemoKey ? "Dati dimostrativi di trend caricati" : "Dati reali dei trend caricati";
          toast({
            title: messageType,
            description: isUsingDemoKey 
              ? "Stai visualizzando dati dimostrativi. Inserisci una API key valida per dati reali."
              : `I dati dei trend per ${district} sono stati caricati con successo.`,
          });
        }
        
        // Controlla nuovamente se questa è la richiesta più recente
        if (currentRequestId.current === requestId) {
          // Now get AI recommendations based on the trends data and district
          await getAiRecommendations(mappedTrends, getGrowingCategories(normalizedBusinessType as BusinessType, district), district, normalizedBusinessType);
        }
      } else {
        // Controlla se questa è ancora la richiesta più recente
        if (currentRequestId.current !== requestId) {
          console.log("[TrendsFetcher] A newer request was made, discarding default data results");
          return;
        }
        
        // Use default data if API returns no results or if it's an error response
        const defaultTrends = keywords.map((keyword, index) => ({
          label: keyword,
          value: 80 - (index * 10)
        }));
        
        setSearchTrends(defaultTrends);
        
        // Set the growing categories based on business type and district
        const defaultCategories = getGrowingCategories(normalizedBusinessType as BusinessType, district);
        setGrowingCategories(defaultCategories);
        
        // Limitiamo i toast per evitare spam
        if (fetchAttempts <= 1) {
          toast({
            title: "Utilizzando dati predefiniti",
            description: "Nessun dato disponibile dall'API, utilizzando dati di esempio.",
          });
        }
        
        // Get AI recommendations based on default data
        await getAiRecommendations(defaultTrends, defaultCategories, district, normalizedBusinessType);
      }
    } catch (error) {
      // Controlla se questa è ancora la richiesta più recente
      if (currentRequestId.current !== requestId) {
        console.log("[TrendsFetcher] A newer request was made while an error occurred, ignoring");
        return;
      }
      
      apiLogger.logAPIError(logIndex, error);
      
      console.error('Error fetching trends data:', error);
      
      // Use default data if there's an error
      const keywords = getSearchKeywords(normalizedBusinessType as BusinessType, district);
      const defaultTrends = keywords.map((keyword, index) => ({
        label: keyword,
        value: 80 - (index * 10)
      }));
      
      setSearchTrends(defaultTrends);
      
      // Set the growing categories based on business type and district
      const defaultCategories = getGrowingCategories(normalizedBusinessType as BusinessType, district);
      setGrowingCategories(defaultCategories);
      
      // Mostra il toast di errore solo se non siamo al primo tentativo
      // Questo evita di mostrare errori durante il caricamento iniziale
      if (fetchAttempts > 1) {
        toast({
          title: "Errore nel caricamento dei trend",
          description: "Impossibile recuperare dati da Google Trends. Controlla la tua API key.",
          variant: "destructive",
        });
      } else {
        console.log("[TrendsFetcher] Primo tentativo fallito, usando dati predefiniti senza mostrare errore");
      }
      
      // Try to get AI recommendations despite the error
      await getAiRecommendations(defaultTrends, defaultCategories, district, normalizedBusinessType);
    } finally {
      // Reimposta gli stati solo se questa è ancora la richiesta corrente
      if (currentRequestId.current === requestId) {
        setIsLoading(false);
        isFetchingRef.current = false;
        currentRequestId.current = null;
      }
    }
  }, [isLoaded, apiKeys.googleTrends, toast, getAiRecommendations, isUsingDemoKey, fetchAttempts, searchTrends.length]);

  return {
    searchTrends,
    growingCategories,
    isLoading,
    isUsingDemoKey,
    fetchTrendsData,
    fetchAttempts
  };
}
