
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar } from 'lucide-react';
import { fetchGoogleTrendsData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';

interface TrendItem {
  label: string;
  value: number;
}

interface Category {
  name: string;
  growth: string;
  color: string;
}

const TrendsAnalysis = () => {
  const [searchTrends, setSearchTrends] = useState<TrendItem[]>([
    { label: 'Ristoranti Miami Beach', value: 78 },
    { label: 'Coffee shop Wynwood', value: 65 },
    { label: 'Juice bar Miami', value: 42 },
    { label: 'Co-working Brickell', value: 38 },
  ]);
  
  const [growingCategories, setGrowingCategories] = useState<Category[]>([
    { name: 'Healthy Food', growth: '+24%', color: 'bg-miami-teal text-white' },
    { name: 'Tech Startups', growth: '+18%', color: 'bg-miami-blue text-white' },
    { name: 'Fitness', growth: '+15%', color: 'bg-miami-coral text-white' },
    { name: 'Arte & Design', growth: '+12%', color: 'bg-miami-navy text-white' },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isLoaded, areKeysSet } = useApiKeys();
  const { toast } = useToast();
  const [dataAttempted, setDataAttempted] = useState(false);

  useEffect(() => {
    const loadTrendsData = async () => {
      if (!isLoaded || !areKeysSet() || dataAttempted) return;
      
      setIsLoading(true);
      
      try {
        const keywords = ['restaurants miami beach', 'coffee shop wynwood', 'juice bar miami', 'co-working brickell'];
        
        if (apiKeys.googleTrends && keywords && keywords.length > 0) {
          const data = await fetchGoogleTrendsData(apiKeys.googleTrends, keywords);
          
          if (data) {
            toast({
              title: "Trend data loaded",
              description: "Google Trends data has been successfully retrieved.",
            });
          }
        }
      } catch (error) {
        console.error('Error fetching trends data:', error);
        toast({
          title: "Error loading trends",
          description: "Could not retrieve Google Trends data. Check your API key.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setDataAttempted(true);
      }
    };

    loadTrendsData();
  }, [isLoaded, apiKeys.googleTrends, toast, areKeysSet, dataAttempted]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5" />
          Trend di Mercato
          {isLoading && <span className="ml-2 text-xs text-muted-foreground">(Caricamento...)</span>}
        </CardTitle>
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
