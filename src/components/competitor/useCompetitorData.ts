
import { useState, useEffect, useCallback } from 'react';
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
  const fetchCompetitorData = useCallback(async () => {
    if (!isLoaded || !selectedDistrict) {
      console.log("Non posso caricare i dati concorrenti: isLoaded:", isLoaded, "selectedDistrict:", selectedDistrict);
      return;
    }
    
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
      
      console.log(`Competitor data loaded for ${selectedDistrict}: ${competitorData.length} items`);
      
      if (competitorData && competitorData.length) {
        setCompetitors(competitorData);
        
        // Aggiorniamo l'ultimo distretto e tipo caricati
        setLastLoadedDistrict(selectedDistrict);
        setLastLoadedType(`${businessType}${cuisineType || ""}`);
        
        if (competitorData.length === getDefaultCompetitors(businessType, selectedDistrict, cuisineType).length) {
          console.log("Usando dati di default per i concorrenti");
          showDefaultDataToast();
        } else {
          console.log("Usando dati reali per i concorrenti");
          showSuccessToast(businessType, selectedDistrict);
        }
        
        showAIAnalysisToast();
      } else {
        // Fallback to default data
        console.log("Nessun dato concorrente ricevuto, usando dati di default");
        const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
        setCompetitors(defaultData);
        showDefaultDataToast();
      }
    } catch (error) {
      console.error('Errore caricamento dati concorrenti:', error);
      
      // Use default data if there's an error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
      setCompetitors(defaultData);
      showErrorToast();
    } finally {
      setIsLoading(false);
    }
  }, [businessType, selectedDistrict, cuisineType, apiKeys, isLoaded, toast, showSuccessToast, showDefaultDataToast, showAIAnalysisToast, showErrorToast]);

  // Load data when business type, district, or cuisine type changes
  useEffect(() => {
    const currentTypeKey = `${businessType}${cuisineType || ""}`;
    
    // Verifichiamo se è cambiato il tipo di business o il distretto
    if (isLoaded && (selectedDistrict !== lastLoadedDistrict || currentTypeKey !== lastLoadedType)) {
      console.log(`District (${selectedDistrict}) or business type (${businessType}) changed, reloading data...`);
      console.log(`Last loaded: District=${lastLoadedDistrict}, Type=${lastLoadedType}`);
      // Clear previous data
      setCompetitors([]);
      fetchCompetitorData();
    }
  }, [businessType, cuisineType, selectedDistrict, isLoaded, lastLoadedDistrict, lastLoadedType, fetchCompetitorData]);

  // Listener per l'evento di cambio distretto
  useEffect(() => {
    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`District change event detected: ${customEvent.detail.district}`);
      
      // Force reload when district changes via event
      if (isLoaded && customEvent.detail.district !== lastLoadedDistrict) {
        console.log(`Forcing reload of competitor data due to district change event: ${customEvent.detail.district}`);
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
