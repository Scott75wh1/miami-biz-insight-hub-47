
import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<number>(0);
  const { toast } = useToast();
  
  // Reference to track if the component is mounted
  const isMounted = useRef(true);
  
  const {
    showSuccessToast,
    showDefaultDataToast,
    showAIAnalysisToast,
    showErrorToast
  } = useCompetitorToasts();
  
  // Cleanup function for unmounting
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Add debug logging
  useEffect(() => {
    console.log(`[useCompetitorData] Hook initialized/updated`);
    console.log(`[useCompetitorData] Business type: ${businessType}, District: ${selectedDistrict}`);
    console.log(`[useCompetitorData] Last loaded - District: ${lastLoadedDistrict}, Type: ${lastLoadedType}`);
    console.log(`[useCompetitorData] Is API loaded: ${isLoaded}`);
  }, [businessType, selectedDistrict, lastLoadedDistrict, lastLoadedType, isLoaded]);
  
  // Load competitor data function with AI analysis
  const fetchCompetitorData = useCallback(async (force: boolean = false) => {
    if (!isLoaded || !selectedDistrict) {
      console.log(`[useCompetitorData] Cannot load competitor data: isLoaded:${isLoaded}, selectedDistrict:${selectedDistrict}`);
      return;
    }
    
    const currentTypeKey = `${businessType}${cuisineType || ""}`;
    const shouldLoad = force || (selectedDistrict !== lastLoadedDistrict || currentTypeKey !== lastLoadedType);
    
    if (!shouldLoad) {
      console.log(`[useCompetitorData] Skipping load - no change in parameters`);
      return;
    }
    
    console.log(`[useCompetitorData] Loading data with - Force:${force}, District change:${selectedDistrict !== lastLoadedDistrict}, Type change:${currentTypeKey !== lastLoadedType}`);
    
    setIsLoading(true);
    
    try {
      console.log(`[useCompetitorData] Fetching competitor data for ${businessType} in ${selectedDistrict}`);
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
      
      // Check if component is still mounted before updating state
      if (!isMounted.current) {
        console.log(`[useCompetitorData] Component unmounted, skipping state update`);
        return;
      }
      
      console.log(`[useCompetitorData] Competitor data loaded: ${competitorData.length} items`);
      
      if (competitorData && competitorData.length) {
        setCompetitors(competitorData);
        
        // Update timestamp and last loaded values
        setLastUpdateTimestamp(Date.now());
        setLastLoadedDistrict(selectedDistrict);
        setLastLoadedType(currentTypeKey);
        
        if (competitorData.length === getDefaultCompetitors(businessType, selectedDistrict, cuisineType).length) {
          console.log(`[useCompetitorData] Using default data for competitors`);
          showDefaultDataToast();
        } else {
          console.log(`[useCompetitorData] Using real competitor data`);
          showSuccessToast(businessType, selectedDistrict);
        }
        
        showAIAnalysisToast();
      } else {
        // Fallback to default data
        console.log(`[useCompetitorData] No competitor data received, using default data`);
        const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
        setCompetitors(defaultData);
        showDefaultDataToast();
      }
    } catch (error) {
      console.error('[useCompetitorData] Error loading competitor data:', error);
      
      // Use default data if there's an error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict, cuisineType);
      setCompetitors(defaultData);
      showErrorToast();
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [businessType, selectedDistrict, cuisineType, apiKeys, isLoaded, lastLoadedDistrict, lastLoadedType, toast, showSuccessToast, showDefaultDataToast, showAIAnalysisToast, showErrorToast]);

  // Load data when business type, district, or cuisine type changes
  useEffect(() => {
    const currentTypeKey = `${businessType}${cuisineType || ""}`;
    
    // Check if data needs to be refreshed
    if (isLoaded && (selectedDistrict !== lastLoadedDistrict || currentTypeKey !== lastLoadedType)) {
      console.log(`[useCompetitorData] District (${selectedDistrict}) or business type (${businessType}) changed, reloading data...`);
      console.log(`[useCompetitorData] Last loaded: District=${lastLoadedDistrict}, Type=${lastLoadedType}`);
      
      // Clear previous data
      setCompetitors([]);
      fetchCompetitorData(true); // Force update
    }
  }, [businessType, cuisineType, selectedDistrict, isLoaded, lastLoadedDistrict, lastLoadedType, fetchCompetitorData]);

  // Listener for district change events
  useEffect(() => {
    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`[useCompetitorData] District change event detected: ${customEvent.detail.district}`);
      
      // Force reload when district changes via event
      if (isLoaded && customEvent.detail.district !== lastLoadedDistrict) {
        console.log(`[useCompetitorData] Forcing reload due to district change event: ${customEvent.detail.district}`);
        setCompetitors([]);
        // Update immediately to avoid race conditions
        setLastLoadedDistrict(customEvent.detail.district);
        // Add delay to prevent simultaneous loads
        setTimeout(() => {
          if (isMounted.current) {
            fetchCompetitorData(true);
          }
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
    lastUpdateTimestamp,
    refreshCompetitors: () => fetchCompetitorData(true)
  };
};
