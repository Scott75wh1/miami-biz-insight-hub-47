
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar } from 'lucide-react';
import { fetchGoogleTrendsData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';

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
  const { apiKeys, isLoaded, areKeysSet } = useApiKeys();
  const { toast } = useToast();
  const [dataAttempted, setDataAttempted] = useState(false);

  // Reset data attempted when business type changes
  useEffect(() => {
    setDataAttempted(false);
    
    // Update default data based on business type
    updateDefaultData(businessType);
  }, [businessType]);

  const updateDefaultData = (type: BusinessType) => {
    // Set default search trends based on business type
    switch (type) {
      case 'restaurant':
        setSearchTrends([
          { label: 'Ristoranti Miami Beach', value: 78 },
          { label: 'Ristoranti italiani Miami', value: 65 },
          { label: 'Cibo Latino Downtown', value: 52 },
          { label: 'Food trucks Wynwood', value: 44 },
        ]);
        setGrowingCategories([
          { name: 'Cucina Fusion', growth: '+27%', color: 'bg-miami-teal text-white' },
          { name: 'Ristoranti Vegani', growth: '+22%', color: 'bg-miami-blue text-white' },
          { name: 'Cucina Mediterranea', growth: '+18%', color: 'bg-miami-coral text-white' },
          { name: 'Pizzerie Artigianali', growth: '+15%', color: 'bg-miami-navy text-white' },
        ]);
        break;
      case 'coffee_shop':
        setSearchTrends([
          { label: 'Coffee shop Wynwood', value: 65 },
          { label: 'Specialty coffee Miami', value: 58 },
          { label: 'Caffetterie Brickell', value: 47 },
          { label: 'Colazione Downtown Miami', value: 42 },
        ]);
        setGrowingCategories([
          { name: 'Cold Brew', growth: '+31%', color: 'bg-miami-teal text-white' },
          { name: 'Coffee Shops Specializzati', growth: '+24%', color: 'bg-miami-blue text-white' },
          { name: 'Caffè Biologico', growth: '+18%', color: 'bg-miami-coral text-white' },
          { name: 'Brunch Spot', growth: '+16%', color: 'bg-miami-navy text-white' },
        ]);
        break;
      case 'retail':
        setSearchTrends([
          { label: 'Shopping centers Miami', value: 72 },
          { label: 'Negozi vintage Wynwood', value: 58 },
          { label: 'Moda sostenibile Miami', value: 45 },
          { label: 'Boutique di lusso', value: 62 },
        ]);
        setGrowingCategories([
          { name: 'Moda Sostenibile', growth: '+29%', color: 'bg-miami-teal text-white' },
          { name: 'Artigianato Locale', growth: '+26%', color: 'bg-miami-blue text-white' },
          { name: 'Abbigliamento Etico', growth: '+20%', color: 'bg-miami-coral text-white' },
          { name: 'Design Pop-up', growth: '+18%', color: 'bg-miami-navy text-white' },
        ]);
        break;
      case 'tech':
        setSearchTrends([
          { label: 'Startup tech Miami', value: 82 },
          { label: 'Coworking Brickell', value: 68 },
          { label: 'Tech hub Florida', value: 64 },
          { label: 'Fintech Miami', value: 60 },
        ]);
        setGrowingCategories([
          { name: 'Crypto/Blockchain', growth: '+35%', color: 'bg-miami-teal text-white' },
          { name: 'Tech Startups', growth: '+30%', color: 'bg-miami-blue text-white' },
          { name: 'Fintech', growth: '+27%', color: 'bg-miami-coral text-white' },
          { name: 'AI/Machine Learning', growth: '+24%', color: 'bg-miami-navy text-white' },
        ]);
        break;
      case 'fitness':
        setSearchTrends([
          { label: 'Palestre Miami Beach', value: 74 },
          { label: 'Yoga studios Brickell', value: 63 },
          { label: 'Fitness outdoor Miami', value: 55 },
          { label: 'CrossFit Miami', value: 50 },
        ]);
        setGrowingCategories([
          { name: 'Fitness All'aperto', growth: '+33%', color: 'bg-miami-teal text-white' },
          { name: 'Yoga Specialty', growth: '+27%', color: 'bg-miami-blue text-white' },
          { name: 'Fitness Digitale', growth: '+22%', color: 'bg-miami-coral text-white' },
          { name: 'Wellness Integrato', growth: '+19%', color: 'bg-miami-navy text-white' },
        ]);
        break;
      default:
        // Default data
        setSearchTrends([
          { label: 'Business Miami', value: 70 },
          { label: 'Attività commerciali Florida', value: 60 },
          { label: 'Nuove imprese Miami', value: 50 },
          { label: 'Startup Florida', value: 45 },
        ]);
        setGrowingCategories([
          { name: 'E-commerce', growth: '+24%', color: 'bg-miami-teal text-white' },
          { name: 'Servizi Digitali', growth: '+18%', color: 'bg-miami-blue text-white' },
          { name: 'Attività Sostenibili', growth: '+15%', color: 'bg-miami-coral text-white' },
          { name: 'Franchising', growth: '+12%', color: 'bg-miami-navy text-white' },
        ]);
    }
  };

  // Generate trendable keywords based on business type
  const getTrendKeywords = (type: BusinessType): string[] => {
    switch (type) {
      case 'restaurant':
        return ['restaurants miami beach', 'italian restaurants miami', 'latin food downtown miami', 'food trucks wynwood'];
      case 'coffee_shop':
        return ['coffee shop wynwood', 'specialty coffee miami', 'cafes brickell', 'breakfast downtown miami'];
      case 'retail':
        return ['shopping centers miami', 'vintage shops wynwood', 'sustainable fashion miami', 'luxury boutiques miami'];
      case 'tech':
        return ['tech startups miami', 'co-working brickell', 'tech hub florida', 'fintech miami'];
      case 'fitness':
        return ['gym miami beach', 'yoga studios brickell', 'outdoor fitness miami', 'crossfit miami'];
      default:
        return ['business miami', 'commercial activities florida', 'new enterprises miami', 'startups florida'];
    }
  };

  useEffect(() => {
    const loadTrendsData = async () => {
      if (!isLoaded || !areKeysSet() || dataAttempted) return;
      
      setIsLoading(true);
      
      try {
        const keywords = getTrendKeywords(businessType);
        
        if (apiKeys.googleTrends && keywords && keywords.length > 0) {
          const data = await fetchGoogleTrendsData(apiKeys.googleTrends, keywords);
          
          if (data) {
            // In una implementazione reale, qui elaboreremmo i dati ricevuti dall'API
            toast({
              title: "Dati dei trend caricati",
              description: "I dati dei trend di Google sono stati caricati con successo.",
            });
          }
        }
      } catch (error) {
        console.error('Error fetching trends data:', error);
        toast({
          title: "Errore nel caricamento dei trend",
          description: "Impossibile recuperare i dati da Google Trends. Controlla la tua API key.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setDataAttempted(true);
      }
    };

    loadTrendsData();
  }, [isLoaded, apiKeys.googleTrends, toast, areKeysSet, dataAttempted, businessType]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5" />
          Trend di Mercato {businessType && `- ${businessType.replace('_', ' ').charAt(0).toUpperCase() + businessType.replace('_', ' ').slice(1)}`}
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
