
import React, { createContext, ReactNode } from 'react';
import { TrendsContextType } from './types';
import { useTrendsFetcher } from './hooks/useTrendsFetcher';
import { useAiRecommendations } from './hooks/useAiRecommendations';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

export const TrendsContext = createContext<TrendsContextType | undefined>(undefined);

export const TrendsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Ensure we're in a context with DistrictSelection before using the hook
  let selectedDistrict = "Miami Beach"; // Default fallback
  
  try {
    // Safely attempt to get district info
    const districtContext = useDistrictSelection();
    if (districtContext) {
      selectedDistrict = districtContext.selectedDistrict;
    }
  } catch (error) {
    console.warn("District selection context not available in TrendsProvider, using default");
  }
  
  // Get AI recommendations functionality
  const { 
    aiRecommendations, 
    isAiLoading, 
    getAiRecommendations 
  } = useAiRecommendations();
  
  // Get trends fetch functionality that depends on AI recommendations
  const { 
    searchTrends, 
    growingCategories, 
    isLoading, 
    isUsingDemoKey, 
    fetchTrendsData 
  } = useTrendsFetcher(getAiRecommendations);

  return (
    <TrendsContext.Provider
      value={{
        searchTrends,
        growingCategories,
        aiRecommendations,
        isLoading,
        isAiLoading,
        isUsingDemoKey,
        fetchTrendsData
      }}
    >
      {children}
    </TrendsContext.Provider>
  );
};
