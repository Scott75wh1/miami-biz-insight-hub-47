
import { BusinessType } from "@/components/BusinessTypeSelector";
import { apiLogger } from "@/services/logService";
import { normalizeValue } from "./normalizeUtils";

export interface DataProcessingParams {
  competitorData: any[] | null;
  currentFetchId: string;
  fetchAttemptId: React.MutableRefObject<string | null>;
  logIndex: number;
  setCompetitors: (competitors: any[]) => void;
  businessType: BusinessType;
  selectedDistrict: string;
  normalizedCuisine: string | undefined;
  getDefaultCompetitors: (businessType: BusinessType, selectedDistrict: string, cuisineType?: string | undefined) => any[];
  showSuccessToast: (businessType: BusinessType, selectedDistrict: string) => void;
  showDefaultDataToast: () => void;
}

export const processCompetitorData = ({
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
}: DataProcessingParams): void => {
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
    setCompetitors(competitorData);
    
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
    setCompetitors(defaultData);
    showDefaultDataToast();
  }
};

export const prepareRequestParams = (
  businessType: BusinessType,
  selectedDistrict: string,
  cuisineType?: string,
  businessAddress?: string
) => {
  const normalizedCuisine = normalizeValue(cuisineType);
  const normalizedAddress = normalizeValue(businessAddress);
  const normalizedBusinessType = normalizeValue(businessType) || '';
  
  return {
    normalizedCuisine,
    normalizedAddress,
    normalizedBusinessType
  };
};

export const checkParamsUnchanged = (
  selectedDistrict: string,
  normalizedBusinessType: string,
  normalizedCuisine: string | undefined,
  normalizedAddress: string | undefined,
  lastLoadedDistrict: string,
  lastLoadedType: string,
  lastCuisineType: string | undefined,
  lastBusinessAddress: string | undefined
): boolean => {
  return selectedDistrict === lastLoadedDistrict && 
    normalizedBusinessType === lastLoadedType && 
    normalizedCuisine === lastCuisineType && 
    normalizedAddress === lastBusinessAddress;
};
