
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { CompetitorList } from './competitor/CompetitorList';
import { DistrictSelector } from './competitor/DistrictSelector';
import { CompetitorHeader } from './competitor/CompetitorHeader';
import { useCompetitorData } from './competitor/useCompetitorData';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

interface CompetitorAnalysisProps {
  businessType: BusinessType;
  cuisineType?: string;
}

const CompetitorAnalysis = ({ businessType, cuisineType }: CompetitorAnalysisProps) => {
  const { selectedDistrict, districts, handleDistrictChange } = useDistrictSelection();
  const { apiKeys, isLoaded } = useApiKeys();
  
  const { competitors, isLoading } = useCompetitorData(
    businessType,
    selectedDistrict,
    apiKeys, 
    isLoaded,
    cuisineType
  );

  // For debugging
  console.log('CompetitorAnalysis rendering with:', { businessType, selectedDistrict, cuisineType, competitors });
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Competitor Analysis</CardTitle>
        <CompetitorHeader 
          businessType={businessType} 
          district={selectedDistrict} 
          isLoading={isLoading}
          cuisineType={cuisineType}
        />
      </CardHeader>
      <CardContent>
        <DistrictSelector 
          districts={districts} 
          selectedDistrict={selectedDistrict} 
          onDistrictChange={handleDistrictChange} 
        />
        
        <CompetitorList competitors={competitors} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
