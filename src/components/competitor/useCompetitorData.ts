
import { useState, useEffect } from 'react';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from './CompetitorCard';
import { loadCompetitorData } from './services/competitorDataService';
import { getDefaultCompetitors } from './utils/defaultCompetitorsUtil';
import { useCompetitorToasts } from './hooks/useCompetitorToasts';
import { useToast } from '@/hooks/use-toast';

export const useCompetitorData = (
  businessType: BusinessType, 
  selectedDistrict: string,
  apiKeys: any,
  isLoaded: boolean,
  cuisineType?: string
) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastLoadedDistrict, setLastLoadedDistrict] = useState<string>("");
  const [lastLoadedType, setLastLoadedType] = useState<string>("");
  const { toast } = useToast();
  
  const {
    showSuccessToast,
    showDefaultDataToast,
    showAIAnalysisToast,
    showErrorToast
  } = useCompetitorToasts();
  
  // Load competitor data function with AI analysis
  const fetchCompetitorData = async () => {
    if (!isLoaded || !selectedDistrict) return;
    
    setIsLoading(true);
    
    try {
      console.log(`Fetching competitor data for ${businessType} in ${selectedDistrict}`);
      toast({
        title: "Aggiornamento dati",
        description: `Caricamento dati concorrenti per ${selectedDistrict}...`,
      });
      
      // Use the service to load and enhance competitor data
      const competitorData = await loadCompetitorData(
        businessType, 
        selectedDistrict, 
        apiKeys,
        cuisineType
      );
      
      if (competitorData) {
        setCompetitors(competitorData);
        
        // Aggiorniamo l'ultimo distretto e tipo caricati
        setLastLoadedDistrict(selectedDistrict);
        setLastLoadedType(`${businessType}${cuisineType || ""}`);
        
        if (competitorData === getDefaultCompetitors(businessType, selectedDistrict, cuisineType)) {
          showDefaultDataToast();
        } else {
          showSuccessToast(businessType, selectedDistrict);
        }
        
        showAIAnalysisToast();
      } else {
        // Fallback to default data
        const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
        setCompetitors(defaultData);
        showDefaultDataToast();
      }
    } catch (error) {
      console.error('Error loading competitor data:', error);
      
      // Use default data if there's an error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
      setCompetitors(defaultData);
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when business type, district, or cuisine type changes
  useEffect(() => {
    const currentTypeKey = `${businessType}${cuisineType || ""}`;
    
    // Verifichiamo se è cambiato il tipo di business o il distretto
    if (isLoaded && (selectedDistrict !== lastLoadedDistrict || currentTypeKey !== lastLoadedType)) {
      console.log(`District (${selectedDistrict}) or business type (${businessType}) changed, reloading data...`);
      // Clear previous data
      setCompetitors([]);
      fetchCompetitorData();
    }
  }, [businessType, cuisineType, selectedDistrict, isLoaded, lastLoadedDistrict, lastLoadedType]);

  // Listener per l'evento di cambio distretto
  useEffect(() => {
    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`District change event detected: ${customEvent.detail.district}`);
      
      // Force reload when district changes via event
      if (isLoaded && customEvent.detail.district !== lastLoadedDistrict) {
        setCompetitors([]);
        fetchCompetitorData();
      }
    };
    
    window.addEventListener('districtChanged', handleDistrictChange);
    
    return () => {
      window.removeEventListener('districtChanged', handleDistrictChange);
    };
  }, [isLoaded, fetchCompetitorData, lastLoadedDistrict]);

  return {
    competitors,
    isLoading,
    refreshCompetitors: fetchCompetitorData
  };
};
