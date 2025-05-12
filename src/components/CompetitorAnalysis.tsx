
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Loader2 } from 'lucide-react';
import { fetchCombinedCompetitorData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from './competitor/CompetitorCard';
import { DistrictSelector } from './competitor/DistrictSelector';
import { CompetitorList } from './competitor/CompetitorList';

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
      // Clear previous data
      setCompetitors([]);
      loadCompetitorData();
    }
  }, [businessType, isLoaded]);
  
  // Load data when district changes
  useEffect(() => {
    console.log(`District changed to: ${selectedDistrict}`);
    if (isLoaded) {
      // Clear previous data
      setCompetitors([]);
      loadCompetitorData();
    }
  }, [selectedDistrict, isLoaded]);
  
  // Load competitor data function
  const loadCompetitorData = async () => {
    if (!isLoaded || !selectedDistrict) return;
    
    setIsLoading(true);
    
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
        const defaultData = getDefaultCompetitors(businessType, selectedDistrict);
        setCompetitors(defaultData);
        
        toast({
          title: "Utilizzando dati predefiniti",
          description: "Nessun dato disponibile dalle API, utilizzando dati di esempio.",
        });
      }
    } catch (error) {
      console.error('Error fetching competitor data:', error);
      
      // Use default data if there's an error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict);
      setCompetitors(defaultData);
      
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
    const districtPrefix = district.replace(' ', '').toLowerCase();
    const timestamp = Date.now(); // Add timestamp to ensure different data each time
    
    switch (type) {
      case 'restaurant':
        return [
          { 
            name: `${district} Fine Dining ${districtPrefix}${timestamp % 100}`, 
            type: 'Ristorante', 
            location: district, 
            rating: 4.5 + (Math.random() * 0.5), 
            reviews: 400 + Math.floor(Math.random() * 200), 
            priceLevel: '$$$',
            sentiments: {
              positive: 70 + Math.floor(Math.random() * 10),
              neutral: 20 + Math.floor(Math.random() * 10),
              negative: 5 + Math.floor(Math.random() * 5)
            },
            reviewHighlight: "Una delle migliori esperienze culinarie a Miami!"
          },
          { 
            name: `${district} Trattoria ${districtPrefix}${(timestamp + 1) % 100}`, 
            type: 'Ristorante Italiano', 
            location: district, 
            rating: 4.2 + (Math.random() * 0.6), 
            reviews: 300 + Math.floor(Math.random() * 150), 
            priceLevel: '$$$',
            sentiments: {
              positive: 65 + Math.floor(Math.random() * 10),
              neutral: 25 + Math.floor(Math.random() * 10),
              negative: 5 + Math.floor(Math.random() * 5)
            },
            reviewHighlight: "Pasta fatta in casa eccezionale, atmosfera autentica."
          },
          { 
            name: `${district} Taqueria ${districtPrefix}${(timestamp + 2) % 100}`, 
            type: 'Ristorante Messicano', 
            location: district, 
            rating: 4.0 + (Math.random() * 0.5), 
            reviews: 250 + Math.floor(Math.random() * 100), 
            priceLevel: '$$',
            sentiments: {
              positive: 60 + Math.floor(Math.random() * 10),
              neutral: 30 + Math.floor(Math.random() * 5),
              negative: 5 + Math.floor(Math.random() * 10)
            },
            reviewHighlight: "I migliori tacos della zona, salse fatte in casa."
          },
        ];
      case 'coffee_shop':
        return [
          { 
            name: `Café ${district} ${districtPrefix}${timestamp % 100}`, 
            type: 'Caffetteria', 
            location: district, 
            rating: 4.5 + (Math.random() * 0.4), 
            reviews: 200 + Math.floor(Math.random() * 100), 
            priceLevel: '$$',
            sentiments: {
              positive: 70 + Math.floor(Math.random() * 10),
              neutral: 20 + Math.floor(Math.random() * 10),
              negative: 5 + Math.floor(Math.random() * 5)
            },
            reviewHighlight: "Caffè di qualità e ottimi dolci fatti in casa."
          },
          { 
            name: `${district} Coffee Corner ${districtPrefix}${(timestamp + 1) % 100}`, 
            type: 'Specialty Coffee', 
            location: district, 
            rating: 4.3 + (Math.random() * 0.5), 
            reviews: 180 + Math.floor(Math.random() * 80), 
            priceLevel: '$$',
            sentiments: {
              positive: 67 + Math.floor(Math.random() * 10),
              neutral: 23 + Math.floor(Math.random() * 10),
              negative: 5 + Math.floor(Math.random() * 5)
            },
            reviewHighlight: "Miscele di caffè uniche, baristi competenti."
          },
          { 
            name: `${district} Morning Brew ${districtPrefix}${(timestamp + 2) % 100}`, 
            type: 'Caffetteria & Bakery', 
            location: district, 
            rating: 4.2 + (Math.random() * 0.4), 
            reviews: 280 + Math.floor(Math.random() * 120), 
            priceLevel: '$$',
            sentiments: {
              positive: 63 + Math.floor(Math.random() * 10),
              neutral: 27 + Math.floor(Math.random() * 5),
              negative: 5 + Math.floor(Math.random() * 10)
            },
            reviewHighlight: "Ottima colazione e ambiente perfetto per lavorare."
          },
        ];
      default:
        return [
          { 
            name: `${district} Business A ${districtPrefix}${timestamp % 100}`, 
            type: type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1), 
            location: district, 
            rating: 4.3 + (Math.random() * 0.4), 
            reviews: 220 + Math.floor(Math.random() * 100), 
            priceLevel: '$$$',
            sentiments: {
              positive: 65 + Math.floor(Math.random() * 10),
              neutral: 25 + Math.floor(Math.random() * 10),
              negative: 5 + Math.floor(Math.random() * 5)
            },
            reviewHighlight: "Servizio eccellente e prodotti di qualità."
          },
          { 
            name: `${district} Business B ${districtPrefix}${(timestamp + 1) % 100}`, 
            type: type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1), 
            location: district, 
            rating: 4.1 + (Math.random() * 0.4), 
            reviews: 190 + Math.floor(Math.random() * 80), 
            priceLevel: '$$',
            sentiments: {
              positive: 60 + Math.floor(Math.random() * 10),
              neutral: 30 + Math.floor(Math.random() * 5),
              negative: 5 + Math.floor(Math.random() * 10)
            },
            reviewHighlight: "Ottimo rapporto qualità-prezzo."
          },
          { 
            name: `${district} Business C ${districtPrefix}${(timestamp + 2) % 100}`, 
            type: type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1), 
            location: district, 
            rating: 4.4 + (Math.random() * 0.4), 
            reviews: 160 + Math.floor(Math.random() * 60), 
            priceLevel: '$$$',
            sentiments: {
              positive: 67 + Math.floor(Math.random() * 10),
              neutral: 28 + Math.floor(Math.random() * 5),
              negative: 5 + Math.floor(Math.random() * 5)
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
        <DistrictSelector 
          districts={miamiDistricts} 
          selectedDistrict={selectedDistrict} 
          onDistrictChange={handleDistrictChange} 
        />
        
        <CompetitorList 
          competitors={competitors} 
          isLoading={isLoading} 
          selectedDistrict={selectedDistrict} 
        />
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
