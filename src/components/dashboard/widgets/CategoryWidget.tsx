
import React from 'react';
import { DashboardWidget } from '../DashboardWidget';
import { PieChart } from '../charts/PieChart';
import { useCategoryData } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';

export function CategoryWidget() {
  const { data, isLoading } = useCategoryData();

  return (
    <DashboardWidget title="Distribuzione per Categoria">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-[200px] w-full" />
        </div>
      ) : (
        <PieChart data={data || []} />
      )}
    </DashboardWidget>
  );
}
