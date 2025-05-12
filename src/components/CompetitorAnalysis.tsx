import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Star, Loader2, MapPin } from 'lucide-react';
import { fetchPlacesData } from '@/services/apiService';
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
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Miami Beach");
  const { apiKeys, isLoaded } = useApiKeys();
  const { toast } = useToast();
  const miamiDistricts = ['Downtown', 'Brickell', 'Wynwood', 'Little Havana', 'Miami Beach'];

  // Get appropriate business term for Google Places API based on business type
  const getBusinessTypeQuery = (type: BusinessType) => {
    switch (type) {
      case 'restaurant':
        return 'restaurants';
      case 'coffee_shop':
        return 'coffee shops';
      case 'retail':
        return 'retail shops';
      case 'tech':
        return 'tech companies';
      case 'fitness':
        return 'fitness centers';
      default:
        return 'businesses';
    }
  };
  
  // Default sentiment distribution for businesses based on rating
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
  
  // Load competitor data when business type or district changes
  useEffect(() => {
    const loadCompetitorData = async () => {
      if (!isLoaded || !selectedDistrict) return;
      
      setIsLoading(true);
      setCompetitors([]);
      
      try {
        // Get competitors data based on the selected business type and district
        const searchQuery = `${getBusinessTypeQuery(businessType)} in ${selectedDistrict}, Miami`;
        const data = await fetchPlacesData(searchQuery, apiKeys.googlePlaces, `${selectedDistrict}, Miami`);
        
        if (data && data.results && data.results.length > 0) {
          // Map Google Places API data to our competitor format
          const mappedCompetitors = data.results.map((place: any) => {
            // Get a meaningful type from the place types array
            const typeFromData = place.types && place.types.length > 0
              ? place.types[0].replace(/_/g, ' ')
              : getBusinessTypeQuery(businessType).replace(/_/g, ' ');
              
            // Format the type to be more user-friendly
            const formattedType = typeFromData.charAt(0).toUpperCase() + typeFromData.slice(1);
            
            return {
              name: place.name,
              type: formattedType,
              location: place.vicinity || `${selectedDistrict}, Miami`,
              rating: place.rating || 0,
              reviews: place.user_ratings_total || 0,
              priceLevel: place.price_level ? '$'.repeat(place.price_level) : '$$$',
              sentiments: getDefaultSentiments(place.rating || 0)
            };
          });
          
          setCompetitors(mappedCompetitors);
          
          toast({
            title: "Dati competitor caricati",
            description: `I dati dei competitor per ${searchQuery} sono stati caricati con successo.`,
          });
        } else {
          // Use default data if API returns no results
          setCompetitors(getDefaultCompetitors(businessType, selectedDistrict));
          
          toast({
            title: "Utilizzando dati predefiniti",
            description: "Nessun dato disponibile dall'API, utilizzando dati di esempio.",
          });
        }
      } catch (error) {
        console.error('Error fetching competitor data:', error);
        
        // Use default data if there's an error
        setCompetitors(getDefaultCompetitors(businessType, selectedDistrict));
        
        toast({
          title: "Errore nel caricamento competitor",
          description: "Impossibile recuperare dati. Controlla la tua API key.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCompetitorData();
  }, [isLoaded, apiKeys.googlePlaces, toast, businessType, selectedDistrict]);
  
  // Default competitors data based on business type and district
  const getDefaultCompetitors = (type: BusinessType, district: string): Competitor[] => {
    switch (type) {
      case 'restaurant':
        return [
          { 
            name: `${district} Fine Dining`, 
            type: 'Ristorante', 
            location: district, 
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
            name: `${district} Trattoria`, 
            type: 'Ristorante Italiano', 
            location: district, 
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
            name: `${district} Taqueria`, 
            type: 'Ristorante Messicano', 
            location: district, 
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
            name: `Café ${district}`, 
            type: 'Caffetteria', 
            location: district, 
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
            name: `${district} Coffee Corner`, 
            type: 'Specialty Coffee', 
            location: district, 
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
            name: `${district} Morning Brew`, 
            type: 'Caffetteria & Bakery', 
            location: district, 
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
            name: `${district} Business A`, 
            type: 'Business', 
            location: district, 
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
            name: `${district} Business B`, 
            type: 'Business', 
            location: district, 
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
            name: `${district} Business C`, 
            type: 'Business', 
            location: district, 
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

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
  };

  // For debugging
  console.log('CompetitorAnalysis rendering with:', { businessType, selectedDistrict, competitors });

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
        <div className="flex flex-wrap gap-2 mb-4">
          {miamiDistricts.map((district) => (
            <button
              key={district}
              type="button"
              className={`text-xs py-1.5 px-2.5 rounded-full transition-colors ${
                selectedDistrict === district
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground hover:bg-accent/80'
              }`}
              onClick={() => handleDistrictChange(district)}
            >
              {district}
            </button>
          ))}
        </div>

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
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{competitor.type}</span>
                      <span className="mx-1">·</span>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{competitor.location}</span>
                      </div>
                      <span className="mx-1">·</span>
                      <span>{competitor.priceLevel}</span>
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
                Visualizza tutti i competitor in {selectedDistrict}
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
