
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import BusinessAnalysisForm from '@/components/business/BusinessAnalysisForm';
import BusinessAnalysisResults from '@/components/business/BusinessAnalysisResults';
import CompetitorAnalysisSection from '@/components/business/CompetitorAnalysisSection';

interface BusinessMainContentProps {
  selectedDistrict: string | undefined;
  districtUpdateTime: number;
  isAnalyzing: boolean;
  startAnalysis: (values: any) => void;
  analysisComplete: boolean;
  analysisData: any | null;
}

export const BusinessMainContent: React.FC<BusinessMainContentProps> = ({
  selectedDistrict,
  districtUpdateTime,
  isAnalyzing,
  startAnalysis,
  analysisComplete,
  analysisData
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-lg sm:text-xl">Analisi Personalizzata</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Inserisci i dati della tua attività per ottenere un'analisi completa basata sui dati raccolti.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessAnalysisForm 
            isAnalyzing={isAnalyzing} 
            onSubmit={startAnalysis}
            key={`form-${selectedDistrict}-${districtUpdateTime}`}
          />
        </CardContent>
      </Card>
      
      {analysisComplete && analysisData && (
        <>
          <BusinessAnalysisResults 
            key={`analysis-${analysisData.businessInfo.name}-${analysisData.businessInfo.address}-${analysisData.businessInfo.district}-${districtUpdateTime}`} 
            data={{
              businessInfo: {
                ...analysisData.businessInfo,
                type: analysisData.businessInfo.type || 'general'
              },
              analysis: analysisData.analysis,
              rawData: analysisData.rawData
            }} 
          />
          
          {/* Aggiungiamo l'analisi competitiva collegata ai dati dell'attività */}
          <CompetitorAnalysisSection 
            businessType={analysisData.businessInfo.type || 'general'}
            businessName={analysisData.businessInfo.name}
            district={analysisData.businessInfo.district}
            cuisineType={analysisData.analysis.businessSubtype}
          />
        </>
      )}
    </div>
  );
};
