
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const CensusLoadingState: React.FC = () => {
  return (
    <div className="space-y-6 py-2">
      {/* Overview Tab Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-8 w-[120px]" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-[90px] rounded-lg" />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 space-y-4">
            <Skeleton className="h-6 w-[180px]" />
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[80px]" />
                  <Skeleton className="h-4 w-[50px]" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <Skeleton className="h-6 w-[150px] mb-4" />
            <Skeleton className="h-[200px] rounded-lg" />
          </Card>
        </div>
      </div>
      
      {/* Bottom section */}
      <Card className="p-4">
        <Skeleton className="h-6 w-[200px] mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Skeleton className="h-[100px] rounded-lg" />
          <Skeleton className="h-[100px] rounded-lg" />
          <Skeleton className="h-[100px] rounded-lg" />
        </div>
      </Card>
    </div>
  );
};

export default CensusLoadingState;
