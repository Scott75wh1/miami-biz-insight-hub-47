
import React from 'react';
import { ApiStatusCard } from './ApiStatusCard';
import { PreviousAnalysesCard } from './PreviousAnalysesCard';
import { MarketTrendsCard } from './MarketTrendsCard';

interface BusinessSidebarProps {
  previousAnalyses: Array<{
    name: string;
    date: Date;
    district: string;
  }>;
  isAnalyzing: boolean;
  selectedDistrict: string | undefined;
}

export const BusinessSidebar: React.FC<BusinessSidebarProps> = ({
  previousAnalyses,
  isAnalyzing,
  selectedDistrict
}) => {
  return (
    <div className="space-y-6">
      <ApiStatusCard />
      <PreviousAnalysesCard previousAnalyses={previousAnalyses} />
      <MarketTrendsCard isAnalyzing={isAnalyzing} selectedDistrict={selectedDistrict} />
    </div>
  );
};
