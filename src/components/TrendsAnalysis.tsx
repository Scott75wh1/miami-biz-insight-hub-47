
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { useApiKeys } from '@/hooks/useApiKeys';
import { fetchGoogleTrendsData } from '@/services/apiService';

// Import the new components
import TrendsHeader from '@/components/trends/TrendsHeader';
import SearchTrendsChart from '@/components/trends/SearchTrendsChart';
import GrowingCategories from '@/components/trends/GrowingCategories';
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
        } else {
          // Use default data if API returns no results
          setSearchTrends(keywords.map((keyword, index) => ({
            label: keyword,
            value: 80 - (index * 10)
          })));
          
          // Set the growing categories
          setGrowingCategories(getGrowingCategories(businessType));
          
          toast({
            title: "Utilizzando dati predefiniti",
            description: "Nessun dato disponibile dall'API, utilizzando dati di esempio.",
          });
        }
      } catch (error) {
        console.error('Error fetching trends data:', error);
        
        // Use default data if there's an error
        const keywords = getSearchKeywords(businessType);
        setSearchTrends(keywords.map((keyword, index) => ({
          label: keyword,
          value: 80 - (index * 10)
        })));
        
        // Set the growing categories
        setGrowingCategories(getGrowingCategories(businessType));
        
        toast({
          title: "Errore nel caricamento dei trend",
          description: "Impossibile recuperare dati da Google Trends. Controlla la tua API key.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrendsData();
  }, [businessType, apiKeys.googleTrends, toast, isLoaded, isUsingDemoKey]);

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
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsAnalysis;
