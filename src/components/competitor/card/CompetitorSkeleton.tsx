
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const CompetitorSkeleton: React.FC = () => {
  return (
    <div className="p-3 border rounded-md">
      <div className="flex justify-between items-start">
        <div className="w-full">
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="mt-3">
        <Skeleton className="h-4 w-full mb-2" />
        <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-gray-200 mb-2" />
        <div className="flex justify-between mt-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
};
