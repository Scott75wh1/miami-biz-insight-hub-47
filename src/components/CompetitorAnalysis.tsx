import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { CompetitorList } from './competitor/CompetitorList';
import { CompetitorHeader } from './competitor/CompetitorHeader';
import { useCompetitorData } from './competitor/useCompetitorData';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

interface CompetitorAnalysisProps {
  businessType: BusinessType;
  cuisineType?: string;
}

const CompetitorAnalysis = ({ businessType, cuisineType }: CompetitorAnalysisProps) => {
  const { selectedDistrict } = useDistrictSelection();
  const { apiKeys, isLoaded } = useApiKeys();
  
  const { competitors, isLoading } = useCompetitorData(
    businessType,
    selectedDistrict,
    apiKeys, 
    isLoaded,
    cuisineType
  );
  
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
