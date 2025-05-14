import { useState, useEffect, useCallback } from 'react';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from './types';
import { loadCompetitorData } from './services/competitorDataService';
import { getDefaultCompetitors } from './utils/defaultCompetitorsUtil';
import { useCompetitorToasts } from './hooks/useCompetitorToasts';
import { useToast } from '@/hooks/use-toast';

export const useCompetitorData = (
  businessType: BusinessType, 
  selectedDistrict: string,
  apiKeys: any,
  isLoaded: boolean,
  cuisineType?: string,
  businessAddress?: string
) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastLoadedDistrict, setLastLoadedDistrict] = useState<string>("");
  const [lastLoadedType, setLastLoadedType] = useState<string>("");
  const [lastCuisineType, setLastCuisineType] = useState<string | undefined>("");
  const [lastBusinessAddress, setLastBusinessAddress] = useState<string | undefined>("");
  const { toast } = useToast();
  
  const {
    showSuccessToast,
    showDefaultDataToast,
    showAIAnalysisToast,
    showErrorToast
  } = useCompetitorToasts();
  
  // Load competitor data function with AI analysis
  const fetchCompetitorData = useCallback(async () => {
    if (!isLoaded || !selectedDistrict) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Utilizziamo un singolo toast per notificare l'inizio del caricamento
      const loadingToastId = toast({
        title: "Aggiornamento dati",
        description: `Caricamento dati concorrenti per ${selectedDistrict}...`,
      }).id;
      
      // Use the service to load and enhance competitor data
      // Fixed here: Passing only 4 arguments instead of 5, according to the function signature
      const competitorData = await loadCompetitorData(
        businessType, 
        selectedDistrict, 
        apiKeys,
        cuisineType,
        businessAddress
      );
      
      if (competitorData && competitorData.length) {
        // Using direct type assertion to satisfy TypeScript
        setCompetitors(competitorData as Competitor[]);
        
        // Aggiorniamo l'ultimo distretto, tipo, tipo di cucina e indirizzo caricati
        setLastLoadedDistrict(selectedDistrict);
        setLastLoadedType(`${businessType}`);
        setLastCuisineType(cuisineType);
        setLastBusinessAddress(businessAddress);
        
        // Non mostriamo troppi toast in sequenza
        if (competitorData.length === getDefaultCompetitors(businessType, selectedDistrict, cuisineType).length) {
          // Usiamo dati predefiniti, nessun toast necessario
        } else {
          showSuccessToast(businessType, selectedDistrict);
        }
      } else {
        // Fallback to default data
        const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
        setCompetitors(defaultData as Competitor[]);
      }
    } catch (error) {
      // Use default data if there's an error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
      setCompetitors(defaultData as Competitor[]);
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  }, [businessType, selectedDistrict, cuisineType, businessAddress, apiKeys, isLoaded, toast, showSuccessToast, showDefaultDataToast, showAIAnalysisToast, showErrorToast]);

  // Load data when business type, district, cuisine type, or address changes
  useEffect(() => {
    // Verifichiamo se è cambiato il tipo di business, il distretto, il tipo di cucina o l'indirizzo
    if (isLoaded && (
      selectedDistrict !== lastLoadedDistrict || 
      businessType !== lastLoadedType || 
      cuisineType !== lastCuisineType ||
      businessAddress !== lastBusinessAddress
    )) {
      // Clear previous data
      setCompetitors([]);
      fetchCompetitorData();
    }
  }, [businessType, cuisineType, selectedDistrict, businessAddress, isLoaded, lastLoadedDistrict, lastLoadedType, lastCuisineType, lastBusinessAddress, fetchCompetitorData]);

  // Listener per l'evento di cambio distretto
  useEffect(() => {
    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      
      // Force reload when district changes via event
      if (isLoaded && customEvent.detail.district !== lastLoadedDistrict) {
        setCompetitors([]);
        // Aggiorniamo temporaneamente il district per evitare loop di caricamento
        setLastLoadedDistrict(customEvent.detail.district);
        // Aggiungiamo un ritardo per evitare caricamenti simultanei
        setTimeout(() => {
          fetchCompetitorData();
        }, 100);
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
