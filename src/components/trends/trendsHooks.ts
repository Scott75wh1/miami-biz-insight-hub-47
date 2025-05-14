
import { useContext } from 'react';
import { TrendsContext } from './TrendsProvider';
import { TrendsContextType } from './types';

export const useTrendsData = (): TrendsContextType => {
  const context = useContext(TrendsContext);
  if (context === undefined) {
    throw new Error('useTrendsData must be used within a TrendsProvider');
  }
  return context;
};
