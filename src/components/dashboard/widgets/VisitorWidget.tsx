
import React from 'react';
import { DashboardWidget } from '../DashboardWidget';
import { BarChart } from '../charts/BarChart';
import { useVisitorData } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';

export function VisitorWidget() {
  const { data, isLoading } = useVisitorData();

  return (
    <DashboardWidget title="Visitatori per Quartiere">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-[200px] w-full" />
        </div>
      ) : (
        <BarChart data={data || []} />
      )}
    </DashboardWidget>
  );
}
