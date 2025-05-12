import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { useApiKeys } from '@/hooks/useApiKeys';
import { fetchGoogleTrendsData } from '@/services/apiService';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

  // Get search keywords based on business type
  const getSearchKeywords = (type: BusinessType): string[] => {
    switch (type) {
      case 'restaurant':
        return ['restaurants miami beach', 'italian restaurants miami', 'latin food downtown miami', 'food trucks wynwood'];
      case 'coffee_shop':
        return ['coffee shop wynwood', 'specialty coffee miami', 'cafe brickell', 'breakfast downtown miami'];
      case 'retail':
        return ['shopping centers miami', 'vintage shops wynwood', 'sustainable fashion miami', 'luxury boutiques'];
      case 'tech':
        return ['tech startups miami', 'coworking brickell', 'tech hub florida', 'fintech miami'];
      case 'fitness':
        return ['gyms miami beach', 'yoga studios brickell', 'outdoor fitness miami', 'crossfit miami'];
      default:
        return ['businesses miami', 'commercial activities florida', 'new businesses miami', 'startups florida'];
    }
  };

  // Get growing categories based on business type
  const getGrowingCategories = (type: BusinessType): Category[] => {
    switch (type) {
      case 'restaurant':
        return [
          { name: 'Cucina Fusion', growth: '+27%', color: 'bg-miami-teal text-white' },
          { name: 'Ristoranti Vegani', growth: '+22%', color: 'bg-miami-blue text-white' },
          { name: 'Cucina Mediterranea', growth: '+18%', color: 'bg-miami-coral text-white' },
          { name: 'Pizzerie Artigianali', growth: '+15%', color: 'bg-miami-navy text-white' },
        ];
      case 'coffee_shop':
        return [
          { name: 'Cold Brew', growth: '+31%', color: 'bg-miami-teal text-white' },
          { name: 'Coffee Shops Specializzati', growth: '+24%', color: 'bg-miami-blue text-white' },
          { name: 'Caffè Biologico', growth: '+18%', color: 'bg-miami-coral text-white' },
          { name: 'Brunch Spot', growth: '+16%', color: 'bg-miami-navy text-white' },
        ];
      // ... altre opzioni di business
      default:
        return [
          { name: 'E-commerce', growth: '+24%', color: 'bg-miami-teal text-white' },
          { name: 'Servizi Digitali', growth: '+18%', color: 'bg-miami-blue text-white' },
          { name: 'Attività Sostenibili', growth: '+15%', color: 'bg-miami-coral text-white' },
          { name: 'Franchising', growth: '+12%', color: 'bg-miami-navy text-white' },
        ];
    }
  };

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
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5" />
          Trend di Mercato {businessType && `- ${businessType.replace('_', ' ').charAt(0).toUpperCase() + businessType.replace('_', ' ').slice(1)}`}
          {isLoading && (
            <div className="ml-2 flex items-center text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              <span>Caricamento...</span>
            </div>
          )}
        </CardTitle>
        {isUsingDemoKey && (
          <Alert variant="warning" className="mt-2 py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Stai visualizzando trend dimostrativi. Inserisci una API key valida nelle impostazioni per accedere ai dati reali.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Crescita delle Ricerche su Google</h4>
            <div className="space-y-2">
              {searchTrends.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Categorie in Crescita</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {growingCategories.map((category, i) => (
                <div 
                  key={i} 
                  className={`px-2 py-1 rounded-md text-xs flex items-center ${category.color}`}
                >
                  <span>{category.name}</span>
                  <span className="ml-1 font-medium">{category.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsAnalysis;
