
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { useApiKeys } from '@/hooks/useApiKeys';
import { fetchGoogleTrendsData, analyzeTrendsData } from '@/services/apiService';

// Import the components
import TrendsHeader from '@/components/trends/TrendsHeader';
import SearchTrendsChart from '@/components/trends/SearchTrendsChart';
import GrowingCategories from '@/components/trends/GrowingCategories';
import TrendsRecommendations from '@/components/trends/TrendsRecommendations';
import { getSearchKeywords, getGrowingCategories } from '@/components/trends/TrendsUtils';

interface TrendItem {
  label: string;
  value: number;
}

interface Category {
  name: string;
  growth: string;
  color: string;
}

interface TrendsAnalysisProps {
  businessType: BusinessType;
}

const TrendsAnalysis = ({ businessType }: TrendsAnalysisProps) => {
  const [searchTrends, setSearchTrends] = useState<TrendItem[]>([]);
  const [growingCategories, setGrowingCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<{
    summary: string;
    recommendations: string[];
  }>({
    summary: "",
    recommendations: []
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const { toast } = useToast();
  const { apiKeys, isLoaded } = useApiKeys();
  const isUsingDemoKey = !apiKeys.googleTrends || apiKeys.googleTrends === 'demo-key';

  // Update data when business type changes
  useEffect(() => {
    const fetchTrendsData = async () => {
      if (!isLoaded) return;
      
      setIsLoading(true);
      
      try {
        const keywords = getSearchKeywords(businessType);
        
        // Fetch trends data from Google Trends API
        const data = await fetchGoogleTrendsData(apiKeys.googleTrends, keywords);
        
        if (data && data.trends) {
          // Map the API response to our TrendItem interface
          const mappedTrends = data.trends.map((trend: any) => ({
            label: trend.keyword,
            value: trend.value,
          }));
          
          setSearchTrends(mappedTrends);
          
          // Set the growing categories
          setGrowingCategories(getGrowingCategories(businessType));
          
          const messageType = isUsingDemoKey ? "Dati dimostrativi di trend caricati" : "Dati reali dei trend caricati";
          toast({
            title: messageType,
            description: isUsingDemoKey 
              ? "Stai visualizzando dati dimostrativi. Inserisci una API key valida per dati reali."
              : "I dati dei trend sono stati caricati con successo.",
          });
          
          // Now get AI recommendations based on the trends data
          await getAiRecommendations(mappedTrends, getGrowingCategories(businessType));
          
        } else {
          // Use default data if API returns no results
          const defaultTrends = keywords.map((keyword, index) => ({
            label: keyword,
            value: 80 - (index * 10)
          }));
          
          setSearchTrends(defaultTrends);
          
          // Set the growing categories
          const defaultCategories = getGrowingCategories(businessType);
          setGrowingCategories(defaultCategories);
          
          toast({
            title: "Utilizzando dati predefiniti",
            description: "Nessun dato disponibile dall'API, utilizzando dati di esempio.",
          });
          
          // Get AI recommendations based on default data
          await getAiRecommendations(defaultTrends, defaultCategories);
        }
      } catch (error) {
        console.error('Error fetching trends data:', error);
        
        // Use default data if there's an error
        const keywords = getSearchKeywords(businessType);
        const defaultTrends = keywords.map((keyword, index) => ({
          label: keyword,
          value: 80 - (index * 10)
        }));
        
        setSearchTrends(defaultTrends);
        
        // Set the growing categories
        const defaultCategories = getGrowingCategories(businessType);
        setGrowingCategories(defaultCategories);
        
        toast({
          title: "Errore nel caricamento dei trend",
          description: "Impossibile recuperare dati da Google Trends. Controlla la tua API key.",
          variant: "destructive",
        });
        
        // Try to get AI recommendations despite the error
        await getAiRecommendations(defaultTrends, defaultCategories);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrendsData();
  }, [businessType, apiKeys.googleTrends, toast, isLoaded, isUsingDemoKey]);

  // Function to get AI recommendations
  const getAiRecommendations = async (trends: TrendItem[], categories: Category[]) => {
    setIsAiLoading(true);
    
    try {
      const aiAnalysis = await analyzeTrendsData(
        apiKeys.openAI,
        businessType,
        trends,
        categories
      );
      
      if (aiAnalysis) {
        setAiRecommendations(aiAnalysis);
        
        // Show a toast notification if using real data (not demo key)
        if (apiKeys.openAI !== 'demo-key') {
          toast({
            title: "Analisi AI completata",
            description: "Consigli strategici basati sui trend di mercato generati con successo.",
          });
        }
      }
    } catch (error) {
      console.error('Error getting AI trend recommendations:', error);
      
      // Set default recommendations in case of error
      setAiRecommendations({
        summary: "Analisi non disponibile al momento",
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>
          <TrendsHeader 
            businessType={businessType}
            isLoading={isLoading}
            isUsingDemoKey={isUsingDemoKey}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <SearchTrendsChart searchTrends={searchTrends} />
          <GrowingCategories categories={growingCategories} />
          <TrendsRecommendations 
            summary={aiRecommendations.summary}
            recommendations={aiRecommendations.recommendations}
            isLoading={isAiLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsAnalysis;
