
import { useToast } from "@/hooks/use-toast";
import { apiLogger } from "@/services/logService";
import { useCompetitorToasts } from "../hooks/useCompetitorToasts";
import { BusinessType } from "@/components/BusinessTypeSelector";

interface ErrorHandlingParams {
  logIndex: number;
  error: any;
  businessType: BusinessType;
  selectedDistrict: string;
  normalizedCuisine: string | undefined;
  fetchAttemptId: React.MutableRefObject<string | null>;
  currentFetchId: string;
  setCompetitors: (competitors: any[]) => void;
  getDefaultCompetitors: (businessType: BusinessType, selectedDistrict: string, cuisineType?: string | undefined) => any[];
  showErrorToast: () => void;
}

export const handleCompetitorFetchError = ({
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
}: ErrorHandlingParams): void => {
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
  setCompetitors(defaultData as any[]);
  showErrorToast();
};
