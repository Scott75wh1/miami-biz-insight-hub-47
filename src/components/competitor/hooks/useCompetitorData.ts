
import { useState, useEffect, useRef } from 'react';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { Competitor } from '../types';
import { useFetchCompetitor } from './useFetchCompetitor';
import { useDistrictChangeEvent } from './useDistrictChangeEvent';
import { normalizeValue } from '../utils/normalizeUtils';

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
  
  // Reference to prevent simultaneous API calls
  const isFetchingRef = useRef(false);
  
  const { fetchCompetitorData } = useFetchCompetitor({
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
  });

  // Load data when relevant parameters change
  useEffect(() => {
    const normalizedCuisine = normalizeValue(cuisineType);
    const normalizedAddress = normalizeValue(businessAddress);
    const normalizedBusinessType = normalizeValue(businessType) || '';
    
    // Check if business type, district, cuisine type, or address has changed
    const hasChanged = isLoaded && (
      selectedDistrict !== lastLoadedDistrict || 
      normalizedBusinessType !== lastLoadedType || 
      normalizedCuisine !== lastCuisineType ||
      normalizedAddress !== lastBusinessAddress
    );
    
    if (hasChanged) {
      console.log(`[Competitor] Data changed, update required:`, {
        prevDistrict: lastLoadedDistrict,
        newDistrict: selectedDistrict,
        prevType: lastLoadedType,
        newType: normalizedBusinessType,
        prevCuisine: lastCuisineType,
        newCuisine: normalizedCuisine,
        prevAddress: lastBusinessAddress,
        newAddress: normalizedAddress
      });
      
      // Avoid clearing previous data to prevent flash
      fetchCompetitorData();
    }
  }, [
    businessType, cuisineType, selectedDistrict, businessAddress, 
    isLoaded, lastLoadedDistrict, lastLoadedType, 
    lastCuisineType, lastBusinessAddress, fetchCompetitorData
  ]);

  // Handle district change events
  useDistrictChangeEvent({
    isLoaded,
    lastLoadedDistrict,
    isFetchingRef,
    fetchCompetitorData
  });

  return {
    competitors,
    isLoading,
    refreshCompetitors: fetchCompetitorData
  };
};
