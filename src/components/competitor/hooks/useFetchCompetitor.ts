
import { useState, useCallback, useRef } from 'react';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from '../types';
import { loadCompetitorData } from '../services/competitorDataService';
import { getDefaultCompetitors } from '../utils/defaultCompetitorsUtil';
import { useToast } from '@/hooks/use-toast';
import { useCompetitorToasts } from './useCompetitorToasts';
import { 
  processCompetitorData,
  prepareRequestParams,
  checkParamsUnchanged
} from '../utils/dataProcessingUtils';
import {
  prepareFetchStatus,
  resetFetchStatus,
  logFetchAttempt,
  showInitialToast
} from '../utils/fetchStatusUtils';
import { handleCompetitorFetchError } from '../utils/errorHandlingUtils';

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
    
    // Prepare normalized parameters
    const { normalizedCuisine, normalizedAddress, normalizedBusinessType } = 
      prepareRequestParams(businessType, selectedDistrict, cuisineType, businessAddress);
    
    // Check if parameters have changed
    const paramsUnchanged = checkParamsUnchanged(
      selectedDistrict,
      normalizedBusinessType,
      normalizedCuisine,
      normalizedAddress,
      lastLoadedDistrict,
      lastLoadedType,
      lastCuisineType,
      lastBusinessAddress
    );
    
    if (paramsUnchanged) {
      console.log('[Competitor] Parameters unchanged, using existing data');
      return;
    }
    
    // Set loading flags
    prepareFetchStatus({
      currentFetchId,
      setIsLoading,
      isFetchingRef,
      fetchAttemptId
    });
    
    // Log API call attempt
    const logIndex = logFetchAttempt(
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
      showInitialToast(toast, selectedDistrict);
      
      // Use the service to load competitor data
      const competitorData = await loadCompetitorData(
        businessType, 
        selectedDistrict, 
        apiKeys,
        normalizedCuisine,
        normalizedAddress
      );
      
      // Process the loaded data
      processCompetitorData({
        competitorData,
        currentFetchId,
        fetchAttemptId,
        logIndex,
        setCompetitors,
        businessType,
        selectedDistrict,
        normalizedCuisine,
        getDefaultCompetitors,
        showSuccessToast,
        showDefaultDataToast
      });
    } catch (error) {
      // Handle errors
      handleCompetitorFetchError({
        logIndex,
        error,
        businessType,
        selectedDistrict,
        normalizedCuisine,
        fetchAttemptId,
        currentFetchId,
        setCompetitors,
        getDefaultCompetitors,
        showErrorToast
      });
    } finally {
      // Reset status flags
      resetFetchStatus({
        currentFetchId,
        fetchAttemptId,
        setIsLoading,
        isFetchingRef
      });
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
