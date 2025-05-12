
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Star, Loader2, MapPin, MessageSquare } from 'lucide-react';
import { fetchCombinedCompetitorData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Progress } from '@/components/ui/progress';

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
  yelpMatch?: boolean;
  reviewHighlight?: string | null;
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
  
  // Reset data when business type changes
  useEffect(() => {
    console.log(`Business type changed to: ${businessType}`);
    if (isLoaded) {
      loadCompetitorData();
    }
  }, [businessType, isLoaded]);
  
  // Load data when district changes
  useEffect(() => {
    console.log(`District changed to: ${selectedDistrict}`);
    if (isLoaded) {
      loadCompetitorData();
    }
  }, [selectedDistrict, isLoaded]);
  
  // Load competitor data function
  const loadCompetitorData = async () => {
    if (!isLoaded || !selectedDistrict) return;
    
    setIsLoading(true);
    setCompetitors([]);
    
    try {
      console.log(`Loading competitor data for ${businessType} in ${selectedDistrict}`);
      
      // Use the combined data function
      const combinedData = await fetchCombinedCompetitorData(
        businessType, 
        selectedDistrict, 
        apiKeys
      );
      
      if (combinedData && combinedData.length > 0) {
        setCompetitors(combinedData);
        
        toast({
          title: "Dati competitor caricati",
          description: `I dati dei competitor per ${businessType} in ${selectedDistrict} sono stati caricati con successo.`,
        });
      } else {
        // Use default data if API returns no results
        setCompetitors(getDefaultCompetitors(businessType, selectedDistrict));
        
        toast({
          title: "Utilizzando dati predefiniti",
          description: "Nessun dato disponibile dalle API, utilizzando dati di esempio.",
        });
      }
    } catch (error) {
      console.error('Error fetching competitor data:', error);
      
      // Use default data if there's an error
      setCompetitors(getDefaultCompetitors(businessType, selectedDistrict));
      
      toast({
        title: "Errore nel caricamento competitor",
        description: "Impossibile recuperare dati. Controlla le tue API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
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
            },
            reviewHighlight: "Una delle migliori esperienze culinarie a Miami!"
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
            },
            reviewHighlight: "Pasta fatta in casa eccezionale, atmosfera autentica."
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
            },
            reviewHighlight: "I migliori tacos della zona, salse fatte in casa."
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
            },
            reviewHighlight: "Caffè di qualità e ottimi dolci fatti in casa."
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
            },
            reviewHighlight: "Miscele di caffè uniche, baristi competenti."
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
            },
            reviewHighlight: "Ottima colazione e ambiente perfetto per lavorare."
          },
        ];
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
            },
            reviewHighlight: "Servizio eccellente e prodotti di qualità."
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
            },
            reviewHighlight: "Ottimo rapporto qualità-prezzo."
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
            },
            reviewHighlight: "Staff competente e servizio impeccabile."
          },
        ];
    }
  };

  const handleDistrictChange = (district: string) => {
    if (district !== selectedDistrict) {
      setSelectedDistrict(district);
    }
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
                      {competitor.yelpMatch && (
                        <>
                          <span className="mx-1">·</span>
                          <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded">Yelp</span>
                        </>
                      )}
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
                  <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-gray-200">
                    {competitor.sentiments && (
                      <>
                        <div className="bg-green-500 h-full" style={{ width: `${competitor.sentiments.positive}%` }}></div>
                        <div className="bg-yellow-500 h-full" style={{ width: `${competitor.sentiments.neutral}%` }}></div>
                        <div className="bg-red-500 h-full" style={{ width: `${competitor.sentiments.negative}%` }}></div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>{competitor.sentiments?.positive || 0}% Positivo</span>
                    <span>{competitor.sentiments?.neutral || 0}% Neutro</span>
                    <span>{competitor.sentiments?.negative || 0}% Negativo</span>
                  </div>
                  
                  {competitor.reviewHighlight && (
                    <div className="mt-2 text-xs bg-muted/30 p-2 rounded-md">
                      <div className="flex items-start">
                        <MessageSquare className="h-3 w-3 mr-1 mt-0.5 text-muted-foreground" />
                        <span className="text-muted-foreground italic">"{competitor.reviewHighlight}"</span>
                      </div>
                    </div>
                  )}
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
