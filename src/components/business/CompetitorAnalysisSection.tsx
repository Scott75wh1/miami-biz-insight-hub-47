
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BusinessType } from '@/components/BusinessTypeSelector';
import CompetitorAnalysis from '@/components/CompetitorAnalysis';

interface CompetitorAnalysisSectionProps {
  businessType: BusinessType;
  businessName: string;
  district: string;
  cuisineType?: string;
}

const CompetitorAnalysisSection: React.FC<CompetitorAnalysisSectionProps> = ({
  businessType,
  businessName,
  district,
  cuisineType
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Analisi Competitiva</h2>
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            Competitor per {businessName || 'la tua attività'} a {district}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompetitorAnalysis
            businessType={businessType}
            cuisineType={businessType === 'restaurant' ? cuisineType : undefined}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorAnalysisSection;
