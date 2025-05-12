
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Star } from 'lucide-react';
import { fetchYelpData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';

interface Competitor {
  name: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  priceLevel: string;
  sentiments?: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const CompetitorAnalysis = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { 
      name: 'Café Lirica', 
      type: 'Caffetteria', 
      location: 'Wynwood', 
      rating: 4.7, 
      reviews: 236, 
      priceLevel: '$$',
      sentiments: {
        positive: 75,
        neutral: 20,
        negative: 5
      }
    },
    { 
      name: 'Tech Hub Co-working', 
      type: 'Spazio Co-working', 
      location: 'Brickell', 
      rating: 4.5, 
      reviews: 187, 
      priceLevel: '$$$',
      sentiments: {
        positive: 70,
        neutral: 25,
        negative: 5
      }
    },
    { 
      name: 'Ocean View Restaurant', 
      type: 'Ristorante', 
      location: 'Miami Beach', 
      rating: 4.4, 
      reviews: 452, 
      priceLevel: '$$$',
      sentiments: {
        positive: 65,
        neutral: 30,
        negative: 5
      }
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isLoaded, areKeysSet } = useApiKeys();
  const { toast } = useToast();

  useEffect(() => {
    const loadCompetitorData = async () => {
      if (!isLoaded || !areKeysSet()) return;
      
      setIsLoading(true);
      
      try {
        // Get competitors data for a sample business type
        const data = await fetchYelpData('coffee shops', 'Miami, FL');
        
        if (data && data.businesses) {
          // In a real implementation, you would transform the Yelp API response
          // into the competitors array format
          toast({
            title: "Competitor data loaded",
            description: "Yelp data has been successfully retrieved.",
          });
        }
      } catch (error) {
        console.error('Error fetching competitor data:', error);
        toast({
          title: "Error loading competitors",
          description: "Could not retrieve Yelp data. Check your API key.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCompetitorData();
  }, [isLoaded, apiKeys.yelp, toast, areKeysSet]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Analisi Competitor
          {isLoading && <span className="ml-2 text-xs text-muted-foreground">(Caricamento...)</span>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {competitors.map((competitor, index) => (
            <div key={index} className="p-3 border rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{competitor.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {competitor.type} · {competitor.location} · {competitor.priceLevel}
                  </div>
                </div>
                <div className="flex items-center bg-muted/30 px-2 py-1 rounded-md text-sm">
                  <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="font-medium">{competitor.rating}</span>
                  <span className="text-muted-foreground text-xs ml-1">({competitor.reviews})</span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="text-xs font-medium mt-2 mb-1">Sentimento Recensioni</div>
                <div className="flex h-1.5 w-full rounded-full overflow-hidden">
                  {competitor.sentiments && (
                    <>
                      <div className="bg-green-500 h-full" style={{ width: `${competitor.sentiments.positive}%` }}></div>
                      <div className="bg-yellow-500 h-full" style={{ width: `${competitor.sentiments.neutral}%` }}></div>
                      <div className="bg-red-500 h-full" style={{ width: `${competitor.sentiments.negative}%` }}></div>
                    </>
                  )}
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Positivo</span>
                  <span>Neutro</span>
                  <span>Negativo</span>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center mt-4">
            <button className="text-primary text-sm hover:underline">
              Visualizza tutti i competitor in questa zona
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
