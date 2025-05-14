
import React, { createContext, ReactNode } from 'react';
import { TrendsContextType } from './types';
import { useTrendsFetcher } from './hooks/useTrendsFetcher';
import { useAiRecommendations } from './hooks/useAiRecommendations';

export const TrendsContext = createContext<TrendsContextType | undefined>(undefined);

export const TrendsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
