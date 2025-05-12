import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { fetchCombinedCompetitorData, analyzeCompetitorReviews } from '@/services/apiService';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from './CompetitorCard';

export const useCompetitorData = (
  businessType: BusinessType, 
  selectedDistrict: string,
  apiKeys: any,
  isLoaded: boolean,
  cuisineType?: string
) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Get default competitors data based on business type, district and cuisine type
  const getDefaultCompetitors = (type: BusinessType, district: string, cuisine?: string): Competitor[] => {
    const districtPrefix = district.replace(' ', '').toLowerCase();
    const timestamp = Date.now(); // Add timestamp to ensure different data each time
    
    switch (type) {
      case 'restaurant':
        if (cuisine) {
          return [
            { 
              name: `${district} ${cuisine} ${districtPrefix}${timestamp % 100}`, 
              type: `Ristorante ${cuisine}`, 
              location: district, 
              rating: 4.5 + (Math.random() * 0.5), 
              reviews: 400 + Math.floor(Math.random() * 200), 
              priceLevel: '$$$',
              sentiments: {
                positive: 70 + Math.floor(Math.random() * 10),
                neutral: 20 + Math.floor(Math.random() * 10),
                negative: 5 + Math.floor(Math.random() * 5)
              },
              reviewHighlight: `Una delle migliori esperienze di cucina ${cuisine} a Miami!`
            },
            { 
              name: `${cuisine} ${district} ${districtPrefix}${(timestamp + 1) % 100}`, 
              type: `Ristorante ${cuisine}`, 
              location: district, 
              rating: 4.2 + (Math.random() * 0.6), 
              reviews: 300 + Math.floor(Math.random() * 150), 
              priceLevel: '$$$',
              sentiments: {
                positive: 65 + Math.floor(Math.random() * 10),
                neutral: 25 + Math.floor(Math.random() * 10),
                negative: 5 + Math.floor(Math.random() * 5)
              },
              reviewHighlight: `Cucina ${cuisine} autentica, ingredienti di prima qualità.`
            },
            { 
              name: `${district} ${cuisine} Express ${districtPrefix}${(timestamp + 2) % 100}`, 
              type: `Ristorante ${cuisine} Casual`, 
              location: district, 
              rating: 4.0 + (Math.random() * 0.5), 
              reviews: 250 + Math.floor(Math.random() * 100), 
              priceLevel: '$$',
              sentiments: {
                positive: 60 + Math.floor(Math.random() * 10),
                neutral: 30 + Math.floor(Math.random() * 5),
                negative: 5 + Math.floor(Math.random() * 10)
              },
              reviewHighlight: `Ottimo rapporto qualità-prezzo per cucina ${cuisine}.`
            },
          ];
        }
        
        // Default restaurant data without cuisine specification
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

  // Load competitor data function with AI analysis
  const loadCompetitorData = async () => {
    if (!isLoaded || !selectedDistrict) return;
    
    setIsLoading(true);
    
    try {
      console.log(`Loading competitor data for ${businessType} in ${selectedDistrict} ${cuisineType ? `(${cuisineType})` : ''}`);
      
      // Use the combined data function
      const combinedData = await fetchCombinedCompetitorData(
        businessType, 
        selectedDistrict, 
        apiKeys,
        cuisineType
      );
      
      // Variable to hold the competitor data
      let competitorData: Competitor[] = [];
      
      if (combinedData && combinedData.length > 0) {
        competitorData = combinedData;
        
        toast({
          title: "Dati competitor caricati",
          description: `I dati dei competitor per ${businessType} in ${selectedDistrict} sono stati caricati con successo.`,
        });
      } else {
        // Use default data if API returns no results
        competitorData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
        
        toast({
          title: "Utilizzando dati predefiniti",
          description: "Nessun dato disponibile dalle API, utilizzando dati di esempio.",
        });
      }
      
      // Get strengths analysis from OpenAI
      console.log("Analyzing competitor strengths with AI...");
      
      const strengthsAnalysis = await analyzeCompetitorReviews(
        apiKeys.openAI,
        competitorData,
        businessType,
        selectedDistrict,
        cuisineType
      );
      
      console.log("Strengths analysis:", strengthsAnalysis);
      
      // Merge strengths data with competitor data
      const enhancedCompetitors = competitorData.map(competitor => {
        const strengthsData = strengthsAnalysis.find(item => 
          item.name.toLowerCase().includes(competitor.name.toLowerCase().split(' ')[0]) || 
          competitor.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
        );
        
        return {
          ...competitor,
          strengths: strengthsData?.strengths || []
        };
      });
      
      setCompetitors(enhancedCompetitors);
      
      toast({
        title: "Analisi AI completata",
        description: "I punti di forza dei competitor sono stati analizzati con successo.",
      });
    } catch (error) {
      console.error('Error fetching competitor data:', error);
      
      // Use default data if there's an error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
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

  // Load data when business type, district, or cuisine type changes
  useEffect(() => {
    console.log(`Business type changed to: ${businessType}, Cuisine: ${cuisineType}`);
    if (isLoaded) {
      // Clear previous data
      setCompetitors([]);
      loadCompetitorData();
    }
  }, [businessType, cuisineType, isLoaded]);
  
  // Load data when district changes
  useEffect(() => {
    console.log(`District changed to: ${selectedDistrict}`);
    if (isLoaded) {
      // Clear previous data
      setCompetitors([]);
      loadCompetitorData();
    }
  }, [selectedDistrict, isLoaded]);

  return {
    competitors,
    isLoading
  };
};
