
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CensusLoadingState = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
};

export default CensusLoadingState;
