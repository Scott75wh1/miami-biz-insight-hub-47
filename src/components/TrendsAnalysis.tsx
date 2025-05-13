
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { useApiKeys } from '@/hooks/useApiKeys';
import { fetchGoogleTrendsData, analyzeTrendsData } from '@/services/apiService';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

// Import the components
import TrendsHeader from '@/components/trends/TrendsHeader';
import SearchTrendsChart from '@/components/trends/SearchTrendsChart';
import GrowingCategories from '@/components/trends/GrowingCategories';
import TrendsRecommendations from '@/components/trends/TrendsRecommendations';
import DistrictTrendsSelector from '@/components/trends/DistrictTrendsSelector';
import { getSearchKeywords, getGrowingCategories } from '@/components/trends/TrendsUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // Add district selection state
  const { districts, selectedDistrict, handleDistrictChange } = useDistrictSelection();
  const [selectedTab, setSelectedTab] = useState<string>("general");

  // Update data when business type or selected district changes
  useEffect(() => {
    const fetchTrendsData = async () => {
      if (!isLoaded) return;
      
      setIsLoading(true);
      
      try {
        // Get keywords based on business type and selected district
        const keywords = getSearchKeywords(businessType, selectedDistrict);
        
        // Fetch trends data from Google Trends API
        const data = await fetchGoogleTrendsData(apiKeys.googleTrends, keywords, 'US-FL-528', selectedDistrict);
        
        if (data && data.trends) {
          // Map the API response to our TrendItem interface
          const mappedTrends = data.trends.map((trend: any) => ({
            label: trend.keyword,
            value: trend.value,
          }));
          
          setSearchTrends(mappedTrends);
          
          // Set the growing categories based on business type and district
          setGrowingCategories(getGrowingCategories(businessType, selectedDistrict));
          
          const messageType = isUsingDemoKey ? "Dati dimostrativi di trend caricati" : "Dati reali dei trend caricati";
          toast({
            title: messageType,
            description: isUsingDemoKey 
              ? "Stai visualizzando dati dimostrativi. Inserisci una API key valida per dati reali."
              : `I dati dei trend per ${selectedDistrict} sono stati caricati con successo.`,
          });
          
          // Now get AI recommendations based on the trends data and district
          await getAiRecommendations(mappedTrends, getGrowingCategories(businessType, selectedDistrict), selectedDistrict);
          
        } else {
          // Use default data if API returns no results
          const defaultTrends = keywords.map((keyword, index) => ({
            label: keyword,
            value: 80 - (index * 10)
          }));
          
          setSearchTrends(defaultTrends);
          
          // Set the growing categories based on business type and district
          const defaultCategories = getGrowingCategories(businessType, selectedDistrict);
          setGrowingCategories(defaultCategories);
          
          toast({
            title: "Utilizzando dati predefiniti",
            description: "Nessun dato disponibile dall'API, utilizzando dati di esempio.",
          });
          
          // Get AI recommendations based on default data
          await getAiRecommendations(defaultTrends, defaultCategories, selectedDistrict);
        }
      } catch (error) {
        console.error('Error fetching trends data:', error);
        
        // Use default data if there's an error
        const keywords = getSearchKeywords(businessType, selectedDistrict);
        const defaultTrends = keywords.map((keyword, index) => ({
          label: keyword,
          value: 80 - (index * 10)
        }));
        
        setSearchTrends(defaultTrends);
        
        // Set the growing categories based on business type and district
        const defaultCategories = getGrowingCategories(businessType, selectedDistrict);
        setGrowingCategories(defaultCategories);
        
        toast({
          title: "Errore nel caricamento dei trend",
          description: "Impossibile recuperare dati da Google Trends. Controlla la tua API key.",
          variant: "destructive",
        });
        
        // Try to get AI recommendations despite the error
        await getAiRecommendations(defaultTrends, defaultCategories, selectedDistrict);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrendsData();
  }, [businessType, apiKeys.googleTrends, toast, isLoaded, isUsingDemoKey, selectedDistrict]);

  // Function to get AI recommendations
  const getAiRecommendations = async (trends: TrendItem[], categories: Category[], district: string) => {
    setIsAiLoading(true);
    
    try {
      const aiAnalysis = await analyzeTrendsData(
        apiKeys.openAI,
        businessType,
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
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>
          <div className="flex flex-col space-y-3">
            <TrendsHeader 
              businessType={businessType}
              isLoading={isLoading}
              isUsingDemoKey={isUsingDemoKey}
            />
            
            <div className="flex justify-between items-center mt-2">
              <Tabs 
                value={selectedTab} 
                onValueChange={setSelectedTab}
                className="w-[260px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="general">Generale</TabsTrigger>
                  <TabsTrigger value="district">Per Zona</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {selectedTab === "district" && (
                <DistrictTrendsSelector
                  selectedDistrict={selectedDistrict}
                  onChange={handleDistrictChange}
                />
              )}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} className="w-full">
          <TabsContent value="general" className="mt-0">
            <div className="space-y-6">
              <SearchTrendsChart searchTrends={searchTrends} />
              <GrowingCategories categories={growingCategories} />
              <TrendsRecommendations 
                summary={aiRecommendations.summary}
                recommendations={aiRecommendations.recommendations}
                isLoading={isAiLoading}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="district" className="mt-0">
            <div className="space-y-6">
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Analisi di Mercato: {selectedDistrict}</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Trends e categorie specifiche per la zona selezionata. I dati mostrano le tendenze degli ultimi 12 mesi.
                </p>
              </div>
              
              <SearchTrendsChart searchTrends={searchTrends} />
              <GrowingCategories categories={growingCategories} />
              <TrendsRecommendations 
                summary={aiRecommendations.summary}
                recommendations={aiRecommendations.recommendations}
                isLoading={isAiLoading}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrendsAnalysis;
