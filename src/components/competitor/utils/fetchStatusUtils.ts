
import { useToast } from "@/hooks/use-toast";
import { apiLogger } from "@/services/logService";

export interface FetchStatusParams {
  currentFetchId: string;
  setIsLoading: (isLoading: boolean) => void;
  isFetchingRef: React.MutableRefObject<boolean>;
  fetchAttemptId: React.MutableRefObject<string | null>;
}

export const prepareFetchStatus = ({
  currentFetchId,
  setIsLoading,
  isFetchingRef,
  fetchAttemptId
}: FetchStatusParams): void => {
  setIsLoading(true);
  isFetchingRef.current = true;
  fetchAttemptId.current = currentFetchId;
};

export const resetFetchStatus = ({
  currentFetchId,
  fetchAttemptId,
  setIsLoading,
  isFetchingRef
}: FetchStatusParams): void => {
  // Reset flags only if this is still the current request
  if (fetchAttemptId.current === currentFetchId) {
    setIsLoading(false);
    isFetchingRef.current = false;
    fetchAttemptId.current = null;
  }
};

export const logFetchAttempt = (
  serviceName: string,
  operation: string,
  params: Record<string, any>
): number => {
  return apiLogger.logAPICall(serviceName, operation, params);
};

export const showInitialToast = (
  toast: any,
  district: string
): void => {
  toast({
    title: "Aggiornamento dati",
    description: `Caricamento dati concorrenti per ${district}...`,
  });
};
