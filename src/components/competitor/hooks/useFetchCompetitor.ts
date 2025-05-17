
import { useState, useCallback, useRef } from 'react';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from '../types';
import { loadCompetitorData } from '../services/competitorDataService';
import { getDefaultCompetitors } from '../utils/defaultCompetitorsUtil';
import { useToast } from '@/hooks/use-toast';
import { apiLogger } from '@/services/logService';
import { useCompetitorToasts } from './useCompetitorToasts';
import { normalizeValue } from '../utils/normalizeUtils';

interface UseFetchCompetitorResult {
  fetchCompetitorData: () => Promise<void>;
  competitors: Competitor[];
  isLoading: boolean;
}

interface UseFetchCompetitorParams {
  businessType: BusinessType;
  selectedDistrict: string;
  apiKeys: any;
  isLoaded: boolean;
  cuisineType?: string;
  businessAddress?: string;
  lastLoadedDistrict: string;
  lastLoadedType: string;
  lastCuisineType: string | undefined;
  lastBusinessAddress: string | undefined;
  setLastLoadedDistrict: (district: string) => void;
  setLastLoadedType: (type: string) => void;
  setLastCuisineType: (type: string | undefined) => void;
  setLastBusinessAddress: (address: string | undefined) => void;
  setCompetitors: (competitors: Competitor[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useFetchCompetitor = ({
  businessType,
  selectedDistrict,
  apiKeys,
  isLoaded,
  cuisineType,
  businessAddress,
  lastLoadedDistrict,
  lastLoadedType,
  lastCuisineType,
  lastBusinessAddress,
  setLastLoadedDistrict,
  setLastLoadedType,
  setLastCuisineType,
  setLastBusinessAddress,
  setCompetitors,
  setIsLoading
}: UseFetchCompetitorParams): UseFetchCompetitorResult => {
  const { toast } = useToast();
  const isFetchingRef = useRef(false);
  const fetchAttemptId = useRef<string | null>(null);
  const {
    showSuccessToast,
    showDefaultDataToast,
    showErrorToast
  } = useCompetitorToasts();
  
  const fetchCompetitorData = useCallback(async () => {
    // Verify preconditions
    if (!isLoaded || !selectedDistrict) {
      return;
    }
    
    // Prevent simultaneous requests
    if (isFetchingRef.current) {
      console.log('[Competitor] A request is already in progress, ignoring this call');
      return;
    }
    
    // Generate a unique ID for this request
    const currentFetchId = `${businessType}-${selectedDistrict}-${Date.now()}`;
    
    // Check if parameters have changed (normalizing types)
    const normalizedCuisine = normalizeValue(cuisineType);
    const normalizedAddress = normalizeValue(businessAddress);
    const normalizedBusinessType = normalizeValue(businessType) || '';
    
    const paramsUnchanged = 
      selectedDistrict === lastLoadedDistrict && 
      normalizedBusinessType === lastLoadedType && 
      normalizedCuisine === lastCuisineType && 
      normalizedAddress === lastBusinessAddress;
    
    if (paramsUnchanged) {
      console.log('[Competitor] Parameters unchanged, using existing data');
      return;
    }
    
    // Set loading flags
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
      // Update last loaded values immediately to prevent duplicate requests
      setLastLoadedDistrict(selectedDistrict);
      setLastLoadedType(normalizedBusinessType);
      setLastCuisineType(normalizedCuisine);
      setLastBusinessAddress(normalizedAddress);
      
      // Show a toast to notify loading start
      toast({
        title: "Aggiornamento dati",
        description: `Caricamento dati concorrenti per ${selectedDistrict}...`,
      });
      
      // Use the service to load competitor data
      const competitorData = await loadCompetitorData(
        businessType, 
        selectedDistrict, 
        apiKeys,
        normalizedCuisine,
        normalizedAddress
      );
      
      // Check if this is still the most recent request
      if (fetchAttemptId.current !== currentFetchId) {
        console.log('[Competitor] A new request was started, ignoring these results');
        return;
      }
      
      // Log successful API response
      apiLogger.logAPIResponse(logIndex, { 
        count: competitorData?.length || 0, 
        isDefault: competitorData?.length === getDefaultCompetitors(businessType, selectedDistrict, normalizedCuisine).length 
      });
      
      if (competitorData && competitorData.length) {
        // Update state with competitor data
        setCompetitors(competitorData as Competitor[]);
        
        // Show appropriate toast based on data source
        const isDefaultData = competitorData.length === getDefaultCompetitors(businessType, selectedDistrict, normalizedCuisine).length;
        if (isDefaultData) {
          showDefaultDataToast();
        } else {
          showSuccessToast(businessType, selectedDistrict);
        }
      } else {
        // Use default data as fallback
        const defaultData = getDefaultCompetitors(businessType, selectedDistrict, normalizedCuisine);
        setCompetitors(defaultData as Competitor[]);
        showDefaultDataToast();
      }
    } catch (error) {
      // Check if this is still the most recent request
      if (fetchAttemptId.current !== currentFetchId) {
        console.log('[Competitor] A new request was started while an error occurred, ignoring');
        return;
      }
      
      // Log error
      apiLogger.logAPIError(logIndex, error);
      console.error("Error fetching competitor data:", error);
      
      // Use default data on error
      const defaultData = getDefaultCompetitors(businessType, selectedDistrict, normalizedCuisine);
      setCompetitors(defaultData as Competitor[]);
      showErrorToast();
    } finally {
      // Reset flags only if this is still the current request
      if (fetchAttemptId.current === currentFetchId) {
        setIsLoading(false);
        isFetchingRef.current = false;
        fetchAttemptId.current = null;
      }
    }
  }, [
    businessType, selectedDistrict, cuisineType, businessAddress, apiKeys, 
    isLoaded, toast, showSuccessToast, showDefaultDataToast, showErrorToast,
    lastLoadedDistrict, lastLoadedType, lastCuisineType, lastBusinessAddress,
    setLastLoadedDistrict, setLastLoadedType, setLastCuisineType, setLastBusinessAddress,
    setCompetitors, setIsLoading
  ]);

  return {
    fetchCompetitorData,
    competitors: [],
    isLoading: false
  };
};
