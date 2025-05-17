
import { useEffect } from 'react';

interface UseDistrictChangeEventParams {
  isLoaded: boolean;
  lastLoadedDistrict: string;
  isFetchingRef: React.MutableRefObject<boolean>;
  fetchCompetitorData: () => Promise<void>;
}

export const useDistrictChangeEvent = ({
  isLoaded,
  lastLoadedDistrict,
  isFetchingRef,
  fetchCompetitorData
}: UseDistrictChangeEventParams): void => {
  useEffect(() => {
    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      
      if (isLoaded && customEvent.detail.district && customEvent.detail.district !== lastLoadedDistrict) {
        console.log(`[Competitor] District changed via event: ${customEvent.detail.district}`);
        // Add a short delay to prevent simultaneous loads
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
  }, [isLoaded, fetchCompetitorData, lastLoadedDistrict, isFetchingRef]);
};
