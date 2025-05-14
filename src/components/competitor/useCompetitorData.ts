
import { useState, useEffect, useCallback, useRef } from 'react';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from './types';
import { loadCompetitorData } from './services/competitorDataService';
import { getDefaultCompetitors } from './utils/defaultCompetitorsUtil';
import { useCompetitorToasts } from './hooks/useCompetitorToasts';
import { useToast } from '@/hooks/use-toast';
import { apiLogger } from '@/services/logService';

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
  
  // Aggiungiamo un ref per impedire chiamate API simultanee
  const isFetchingRef = useRef(false);
  // Aggiungiamo un ref per il controllo dei duplicati
  const fetchAttemptId = useRef<string | null>(null);
  
  const {
    showSuccessToast,
    showDefaultDataToast,
    showErrorToast
  } = useCompetitorToasts();
  
  // Funzione di utilità per normalizzare i valori
  const normalizeValue = (value: any): string | undefined => {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }
    // Gestione specifica per oggetti con "_type" e "value"
    if (typeof value === 'object' && value !== null && '_type' in value && 'value' in value) {
      if (value.value === 'undefined' || value._type === 'undefined') {
        return undefined;
      }
      return String(value.value);
    }
    return String(value);
  };
  
  // Load competitor data function with AI analysis
  const fetchCompetitorData = useCallback(async () => {
    // Verifiche di guardia per evitare chiamate inutili
    if (!isLoaded || !selectedDistrict) {
      return;
    }
    
    // Previene chiamate simultanee
    if (isFetchingRef.current) {
      console.log('[Competitor] Una richiesta è già in corso, ignorando questa chiamata');
      return;
    }
    
    // Genera un ID univoco per questa richiesta
    const currentFetchId = `${businessType}-${selectedDistrict}-${Date.now()}`;
    
    // Verifica se i parametri sono effettivamente cambiati (normalizzando i tipi)
    const normalizedCuisine = normalizeValue(cuisineType);
    const normalizedAddress = normalizeValue(businessAddress);
    const normalizedBusinessType = normalizeValue(businessType) || '';
    
    const paramsUnchanged = 
      selectedDistrict === lastLoadedDistrict && 
      normalizedBusinessType === lastLoadedType && 
      normalizedCuisine === lastCuisineType && 
      normalizedAddress === lastBusinessAddress;
    
    if (paramsUnchanged && competitors.length > 0) {
      console.log('[Competitor] Parametri invariati, usando i dati esistenti');
      return;
    }
    
    // Imposta il flag di caricamento
    setIsLoading(true);
    isFetchingRef.current = true;
    fetchAttemptId.current = currentFetchId;
    
    // Log API call attempt
    const logIndex = apiLogger.logAPICall(
      'CompetitorService',
      'loadCompetitorData',
      { 
        businessType: normalizedBusinessType, 
        district: selectedDistrict, 
        cuisineType: normalizedCuisine, 
        businessAddress: normalizedAddress 
      }
    );
    
    try {
      // Aggiorniamo subito i valori dell'ultimo caricamento per evitare richieste duplicate
      setLastLoadedDistrict(selectedDistrict);
      setLastLoadedType(normalizedBusinessType);
      setLastCuisineType(normalizedCuisine);
      setLastBusinessAddress(normalizedAddress);
      
      // Utilizziamo un singolo toast per notificare l'inizio del caricamento
      toast({
        title: "Aggiornamento dati",
        description: `Caricamento dati concorrenti per ${selectedDistrict}...`,
      });
      
      // Use the service to load and enhance competitor data
      const competitorData = await loadCompetitorData(
        businessType, 
        selectedDistrict, 
        apiKeys,
        normalizedCuisine,
        normalizedAddress
      );
      
      // Verifichiamo se questa è ancora la richiesta più recente
      if (fetchAttemptId.current !== currentFetchId) {
        console.log('[Competitor] Una nuova richiesta è stata avviata, ignorando questi risultati');
        return;
      }
      
      // Log successful API response
      apiLogger.logAPIResponse(logIndex, { 
        count: competitorData?.length || 0, 
        isDefault: competitorData?.length === getDefaultCompetitors(businessType, selectedDistrict, normalizedCuisine).length 
      });
      
      if (competitorData && competitorData.length) {
        // Using direct type assertion to satisfy TypeScript
        setCompetitors(competitorData as Competitor[]);
        
        // Non mostriamo troppi toast in sequenza
        const isDefaultData = competitorData.length === getDefaultCompetitors(businessType, selectedDistrict, normalizedCuisine).length;
        if (isDefaultData) {
          showDefaultDataToast();
        } else {
          showSuccessToast(businessType, selectedDistrict);
        }
      } else {
        // Fallback to default data
        const defaultData = getDefaultCompetitors(businessType, selectedDistrict, normalizedCuisine);
        setCompetitors(defaultData as Competitor[]);
        showDefaultDataToast();
      }
    } catch (error) {
      // Verificare se questa è ancora la richiesta più recente
      if (fetchAttemptId.current !== currentFetchId) {
        console.log('[Competitor] Una nuova richiesta è stata avviata mentre si verificava un errore, ignorando');
        return;
      }
      
      // Log error
      apiLogger.logAPIError(logIndex, error);
      
      console.error("Error fetching competitor data:", error);
      
      // Use default data if there's an error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict, normalizedCuisine);
      setCompetitors(defaultData as Competitor[]);
      showErrorToast();
    } finally {
      // Reimposta il flag solo se questa è ancora la richiesta corrente
      if (fetchAttemptId.current === currentFetchId) {
        setIsLoading(false);
        isFetchingRef.current = false;
        fetchAttemptId.current = null;
      }
    }
  }, [businessType, selectedDistrict, cuisineType, businessAddress, apiKeys, isLoaded, toast, showSuccessToast, showDefaultDataToast, showErrorToast, competitors.length]);

  // Carica i dati solo quando i parametri pertinenti cambiano veramente
  useEffect(() => {
    const normalizedCuisine = normalizeValue(cuisineType);
    const normalizedAddress = normalizeValue(businessAddress);
    const normalizedBusinessType = normalizeValue(businessType) || '';
    
    // Verifichiamo se è cambiato il tipo di business, il distretto, il tipo di cucina o l'indirizzo
    const hasChanged = isLoaded && (
      selectedDistrict !== lastLoadedDistrict || 
      normalizedBusinessType !== lastLoadedType || 
      normalizedCuisine !== lastCuisineType ||
      normalizedAddress !== lastBusinessAddress
    );
    
    if (hasChanged) {
      console.log(`[Competitor] Dati cambiati, aggiornamento necessario:`, {
        prevDistrict: lastLoadedDistrict,
        newDistrict: selectedDistrict,
        prevType: lastLoadedType,
        newType: normalizedBusinessType,
        prevCuisine: lastCuisineType,
        newCuisine: normalizedCuisine,
        prevAddress: lastBusinessAddress,
        newAddress: normalizedAddress
      });
      
      // Evita di pulire i dati precedenti per evitare flash
      fetchCompetitorData();
    }
  }, [businessType, cuisineType, selectedDistrict, businessAddress, isLoaded, lastLoadedDistrict, lastLoadedType, lastCuisineType, lastBusinessAddress, fetchCompetitorData]);

  // Separare l'effetto dell'evento di cambio distretto per semplificare la logica
  useEffect(() => {
    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      
      if (isLoaded && customEvent.detail.district && customEvent.detail.district !== lastLoadedDistrict) {
        console.log(`[Competitor] Distretto cambiato via evento: ${customEvent.detail.district}`);
        // Aggiungiamo un ritardo per evitare caricamenti simultanei
        setTimeout(() => {
          if (!isFetchingRef.current) {
            fetchCompetitorData();
          }
        }, 200);
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
