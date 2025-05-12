
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
}

const CompetitorAnalysis = ({ businessType }: CompetitorAnalysisProps) => {
  const { selectedDistrict, districts, handleDistrictChange } = useDistrictSelection();
  const { apiKeys, isLoaded } = useApiKeys();
  
  const { competitors, isLoading } = useCompetitorData(
    businessType, 
    selectedDistrict, 
    apiKeys, 
    isLoaded
  );

  // For debugging
  console.log('CompetitorAnalysis rendering with:', { businessType, selectedDistrict, competitors });

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>
          <CompetitorHeader 
            businessType={businessType} 
            isLoading={isLoading} 
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DistrictSelector 
          districts={districts} 
          selectedDistrict={selectedDistrict} 
          onDistrictChange={handleDistrictChange} 
        />
        
        <CompetitorList 
          competitors={competitors} 
          isLoading={isLoading} 
          selectedDistrict={selectedDistrict} 
        />
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
