import { useContext } from 'react';
import { TrendsContext } from './TrendsProvider';
import { TrendsContextType } from './types';

// Re-export our custom hooks
export { useTrendsFetcher } from './hooks/useTrendsFetcher';
export { useAiRecommendations } from './hooks/useAiRecommendations';

// Context hook remains the same
export const useTrendsData = (): TrendsContextType => {
  const context = useContext(TrendsContext);
  if (context === undefined) {
    throw new Error('useTrendsData must be used within a TrendsProvider');
  }
  return context;
};
