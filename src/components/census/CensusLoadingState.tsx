
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CensusLoadingState = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-40 w-full" />
      </div>
      
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
};

export default CensusLoadingState;
