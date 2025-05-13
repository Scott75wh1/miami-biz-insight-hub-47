
import React from 'react';
import { formatNumber } from '@/components/census/utils/CensusUtils';

interface CensusStatsProps {
  censusData?: any;
}

export const CensusStats: React.FC<CensusStatsProps> = ({ censusData }) => {
  if (!censusData) return null;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-muted/30 p-3 rounded-md text-center">
        <div className="text-muted-foreground text-sm">Popolazione</div>
        <div className="text-lg font-semibold">
          {formatNumber(censusData.population || 0)}
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-md text-center">
        <div className="text-muted-foreground text-sm">Età Media</div>
        <div className="text-lg font-semibold">
          {censusData.median_age || "N/A"}
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-md text-center">
        <div className="text-muted-foreground text-sm">Reddito Medio</div>
        <div className="text-lg font-semibold">
          ${formatNumber(censusData.median_income || 0)}
        </div>
      </div>
      <div className="bg-muted/30 p-3 rounded-md text-center">
        <div className="text-muted-foreground text-sm">Famiglie</div>
        <div className="text-lg font-semibold">
          {formatNumber(censusData.households || 0)}
        </div>
      </div>
    </div>
  );
};
