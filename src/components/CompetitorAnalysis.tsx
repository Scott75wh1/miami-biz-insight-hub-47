
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Star, Loader2 } from 'lucide-react';
import { fetchYelpData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';

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

interface CompetitorAnalysisProps {
  businessType: BusinessType;
}

const CompetitorAnalysis = ({ businessType }: CompetitorAnalysisProps) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isLoaded } = useApiKeys();
  const { toast } = useToast();

  // Get appropriate business term for Yelp API based on business type
  const getYelpSearchTerm = (type: BusinessType) => {
    switch (type) {
      case 'restaurant':
        return 'restaurants';
      case 'coffee_shop':
        return 'coffee shops';
      case 'retail':
        return 'retail shops';
      case 'tech':
        return 'coworking spaces';
      case 'fitness':
        return 'fitness centers';
      default:
        return 'businesses';
    }
  };
  
  // Default sentiment distribution for businesses
  const getDefaultSentiments = (rating: number) => {
    if (rating >= 4.5) {
      return { positive: 75, neutral: 20, negative: 5 };
    } else if (rating >= 4.0) {
      return { positive: 65, neutral: 25, negative: 10 };
    } else if (rating >= 3.5) {
      return { positive: 55, neutral: 30, negative: 15 };
    } else {
      return { positive: 40, neutral: 35, negative: 25 };
    }
  };
  
  // Get price level string based on number
  const getPriceLevel = (priceCount: number) => {
    return Array(priceCount).fill('$').join('');
  };

  // Load competitor data when business type changes
  useEffect(() => {
    const loadCompetitorData = async () => {
      if (!isLoaded) return;
      
      setIsLoading(true);
      setCompetitors([]);
      
      try {
        // Get competitors data based on the selected business type
        const searchTerm = getYelpSearchTerm(businessType);
        const data = await fetchYelpData(apiKeys.yelp, searchTerm, 'Miami, FL');
        
        if (data && data.businesses) {
          // Map Yelp API data to our competitor format
          const mappedCompetitors = data.businesses.map((business: any) => ({
            name: business.name,
            type: business.categories?.[0]?.title || getYelpSearchTerm(businessType),
            location: business.location?.address1 || 'Miami',
            rating: business.rating || 0,
            reviews: business.review_count || 0,
            priceLevel: business.price || '$$$',
            sentiments: getDefaultSentiments(business.rating || 0)
          }));
          
          setCompetitors(mappedCompetitors);
          
          toast({
            title: "Dati competitor caricati",
            description: `I dati dei competitor per ${searchTerm} sono stati caricati con successo.`,
          });
        } else {
          // Use default data if API returns no results
          setCompetitors(getDefaultCompetitors(businessType));
          
          toast({
            title: "Utilizzando dati predefiniti",
            description: "Nessun dato disponibile dall'API, utilizzando dati di esempio.",
          });
        }
      } catch (error) {
        console.error('Error fetching competitor data:', error);
        
        // Use default data if there's an error
        setCompetitors(getDefaultCompetitors(businessType));
        
        toast({
          title: "Errore nel caricamento competitor",
          description: "Impossibile recuperare dati da Yelp. Controlla la tua API key.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCompetitorData();
  }, [isLoaded, apiKeys.yelp, toast, businessType]);
  
  // Default competitors data based on business type
  const getDefaultCompetitors = (type: BusinessType): Competitor[] => {
    switch (type) {
      case 'restaurant':
        return [
          { 
            name: 'Ocean View Restaurant', 
            type: 'Ristorante', 
            location: 'Miami Beach', 
            rating: 4.7, 
            reviews: 452, 
            priceLevel: '$$$',
            sentiments: {
              positive: 75,
              neutral: 20,
              negative: 5
            }
          },
          { 
            name: 'La Trattoria', 
            type: 'Ristorante Italiano', 
            location: 'Brickell', 
            rating: 4.5, 
            reviews: 326, 
            priceLevel: '$$$',
            sentiments: {
              positive: 70,
              neutral: 25,
              negative: 5
            }
          },
          { 
            name: 'Taqueria Downtown', 
            type: 'Ristorante Messicano', 
            location: 'Downtown', 
            rating: 4.3, 
            reviews: 287, 
            priceLevel: '$$',
            sentiments: {
              positive: 65,
              neutral: 30,
              negative: 5
            }
          },
        ];
      case 'coffee_shop':
        return [
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
            name: 'Brew Corner', 
            type: 'Specialty Coffee', 
            location: 'Brickell', 
            rating: 4.6, 
            reviews: 198, 
            priceLevel: '$$',
            sentiments: {
              positive: 72,
              neutral: 23,
              negative: 5
            }
          },
          { 
            name: 'Morning Bliss', 
            type: 'Caffetteria & Bakery', 
            location: 'Miami Beach', 
            rating: 4.4, 
            reviews: 312, 
            priceLevel: '$$',
            sentiments: {
              positive: 68,
              neutral: 25,
              negative: 7
            }
          },
        ];
      // ... altre opzioni di business
      default:
        return [
          { 
            name: 'Generic Business A', 
            type: 'Business', 
            location: 'Miami Beach', 
            rating: 4.5, 
            reviews: 250, 
            priceLevel: '$$$',
            sentiments: {
              positive: 70,
              neutral: 25,
              negative: 5
            }
          },
          { 
            name: 'Generic Business B', 
            type: 'Business', 
            location: 'Brickell', 
            rating: 4.3, 
            reviews: 210, 
            priceLevel: '$$',
            sentiments: {
              positive: 65,
              neutral: 30,
              negative: 5
            }
          },
          { 
            name: 'Generic Business C', 
            type: 'Business', 
            location: 'Downtown', 
            rating: 4.6, 
            reviews: 180, 
            priceLevel: '$$$',
            sentiments: {
              positive: 72,
              neutral: 23,
              negative: 5
            }
          },
        ];
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Analisi Competitor {businessType && `- ${businessType.replace('_', ' ').charAt(0).toUpperCase() + businessType.replace('_', ' ').slice(1)}`}
          {isLoading && (
            <div className="ml-2 flex items-center text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              <span>Caricamento...</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {competitors.length === 0 && !isLoading ? (
            <div className="text-center p-8 text-muted-foreground">
              Nessun competitor trovato per questa categoria
            </div>
          ) : (
            competitors.map((competitor, index) => (
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
            ))
          )}

          {competitors.length > 0 && (
            <div className="text-center mt-4">
              <button type="button" className="text-primary text-sm hover:underline">
                Visualizza tutti i competitor in questa zona
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
