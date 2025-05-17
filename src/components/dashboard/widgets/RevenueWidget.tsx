
import React from 'react';
import { DashboardWidget } from '../DashboardWidget';
import { TrendChart } from '../charts/TrendChart';
import { useRevenueData } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';

export function RevenueWidget() {
  const { data, isLoading } = useRevenueData();

  return (
    <DashboardWidget title="Revenue Trend">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-[200px] w-full" />
        </div>
      ) : (
        <TrendChart data={data || []} />
      )}
    </DashboardWidget>
  );
}
