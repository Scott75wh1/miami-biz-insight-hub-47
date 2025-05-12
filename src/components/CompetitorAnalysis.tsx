
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { CompetitorList } from './competitor/CompetitorList';
import { DistrictSelector } from './competitor/DistrictSelector';
import { CompetitorHeader } from './competitor/CompetitorHeader';
import { useCompetitorData } from './competitor/useCompetitorData';
import { MIAMI_DISTRICTS } from './competitor/constants';

interface CompetitorAnalysisProps {
  businessType: BusinessType;
}

const CompetitorAnalysis = ({ businessType }: CompetitorAnalysisProps) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("Miami Beach");
  const { apiKeys, isLoaded } = useApiKeys();
  
  const { competitors, isLoading } = useCompetitorData(
    businessType, 
    selectedDistrict, 
    apiKeys, 
    isLoaded
  );

  const handleDistrictChange = (district: string) => {
    if (district !== selectedDistrict) {
      setSelectedDistrict(district);
    }
  };

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
          districts={MIAMI_DISTRICTS} 
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
