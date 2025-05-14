
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKeys } from '@/hooks/useApiKeys';
import { BusinessType } from '@/components/BusinessTypeSelector';
import { CompetitorList } from './competitor/CompetitorList';
import { CompetitorHeader } from './competitor/CompetitorHeader';
import { useCompetitorData } from './competitor/useCompetitorData';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface CompetitorAnalysisProps {
  businessType: BusinessType;
  district?: string;
  businessAddress?: string;
  cuisineType?: string;
  title?: string;
  showCard?: boolean;
}

const CompetitorAnalysis = ({ 
  businessType, 
  district, 
  businessAddress, 
  cuisineType, 
  title, 
  showCard = true 
}: CompetitorAnalysisProps) => {
  // Se viene passato un distretto specifico, lo usiamo, altrimenti prendiamo quello selezionato
  const { selectedDistrict } = useDistrictSelection();
  const effectiveDistrict = district || selectedDistrict;
  const { apiKeys, isLoaded } = useApiKeys();
  
  const { competitors, isLoading, refreshCompetitors } = useCompetitorData(
    businessType,
    effectiveDistrict,
    apiKeys, 
    isLoaded,
    cuisineType,
    businessAddress
  );
  
  // Log per debug
  useEffect(() => {
    console.log(`CompetitorAnalysis rendered for ${businessType} in ${effectiveDistrict}${businessAddress ? ` with address: ${businessAddress}` : ''}`);
    console.log(`Competitor count: ${competitors.length}`);
  }, [effectiveDistrict, businessType, competitors.length, businessAddress]);
  
  const content = (
    <>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>{title || "Competitor Analysis"}</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshCompetitors}
            disabled={isLoading}
            className="flex items-center"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Aggiorna
          </Button>
        </div>
        <CompetitorHeader 
          businessType={businessType} 
          district={effectiveDistrict} 
          isLoading={isLoading}
          businessAddress={businessAddress}
          cuisineType={cuisineType}
        />
      </CardHeader>
      <CardContent>
        <CompetitorList 
          competitors={competitors} 
          isLoading={isLoading} 
          selectedDistrict={effectiveDistrict} 
        />
      </CardContent>
    </>
  );
  
  if (!showCard) {
    return content;
  }
  
  return (
    <Card className="h-full">
      {content}
    </Card>
  );
};

export default CompetitorAnalysis;
