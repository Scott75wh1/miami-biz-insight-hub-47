
import React from 'react';
import { useTrendsData } from '@/components/trends/TrendsContext';
import SearchTrendsChart from '@/components/trends/SearchTrendsChart';
import GrowingCategories from '@/components/trends/GrowingCategories';
import TrendsRecommendations from '@/components/trends/TrendsRecommendations';

interface TrendsTabContentProps {
  activeTab: string;
  selectedDistrict: string;
}

const TrendsTabContent: React.FC<TrendsTabContentProps> = ({ activeTab, selectedDistrict }) => {
  const { searchTrends, growingCategories, aiRecommendations, isAiLoading } = useTrendsData();
  
  return (
    <div className="space-y-6">
      {activeTab === "district" && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Analisi di Mercato: {selectedDistrict}</h4>
          <p className="text-xs text-muted-foreground mb-4">
            Trends e categorie specifiche per la zona selezionata. I dati mostrano le tendenze degli ultimi 12 mesi.
          </p>
        </div>
      )}
      
      <SearchTrendsChart searchTrends={searchTrends} />
      <GrowingCategories categories={growingCategories} />
      <TrendsRecommendations 
        summary={aiRecommendations.summary}
        recommendations={aiRecommendations.recommendations}
        isLoading={isAiLoading}
      />
    </div>
  );
};

export default TrendsTabContent;
