
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessType } from '@/components/BusinessTypeSelector';
import CompetitorAnalysis from '@/components/CompetitorAnalysis';

interface CompetitorAnalysisSectionProps {
  businessType: BusinessType;
  businessName: string;
  district: string;
  businessAddress?: string;
  cuisineType?: string;
}

const CompetitorAnalysisSection: React.FC<CompetitorAnalysisSectionProps> = ({
  businessType,
  businessName,
  district,
  businessAddress,
  cuisineType
}) => {
  // Log per debug quando cambiano i dati importanti
  useEffect(() => {
    console.log(`CompetitorAnalysisSection: rendering for ${businessName} at ${businessAddress || 'no address'} in ${district}`);
  }, [businessName, businessAddress, district, businessType, cuisineType]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Analisi Competitiva</h2>
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            Competitor per {businessName || 'la tua attività'} a {district}
            {businessAddress && <div className="text-sm font-normal text-muted-foreground mt-1">Indirizzo: {businessAddress}</div>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompetitorAnalysis
            businessType={businessType}
            businessAddress={businessAddress}
            district={district}
            cuisineType={businessType === 'restaurant' ? cuisineType : undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorAnalysisSection;
