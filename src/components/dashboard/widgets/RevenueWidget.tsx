
import React from 'react';
import { DashboardWidget } from '../DashboardWidget';
import { TrendChart } from '../charts/TrendChart';
import { useRevenueData } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';

export function RevenueWidget() {
  const { data, isLoading } = useRevenueData();

  return (
    <DashboardWidget title="Tendenze di Entrate Mensili">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-[200px] w-full" />
        </div>
      ) : (
        <div>
          <TrendChart data={data || []} />
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <div className="text-muted-foreground">Media</div>
              <div className="font-medium">
                €{data && data.length > 0 ? 
                  Math.round(data.reduce((acc, item) => acc + item.value, 0) / data.length) 
                  : 0}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Picco</div>
              <div className="font-medium">
                €{data && data.length > 0 ? 
                  Math.max(...data.map(item => item.value)) 
                  : 0}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Variazione</div>
              {data && data.length > 1 ? (
                <div className={`font-medium ${
                  data[data.length-1].value > data[0].value ? 'text-green-500' : 'text-red-500'
                }`}>
                  {data[data.length-1].value > data[0].value ? '+' : ''}
                  {Math.round((data[data.length-1].value - data[0].value) / data[0].value * 100)}%
                </div>
              ) : (
                <div className="font-medium">N/A</div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardWidget>
  );
}
