
import React, { useEffect } from 'react';
import { Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Layout from '@/components/Layout';
import BusinessAnalysisForm from '@/components/business/BusinessAnalysisForm';
import BusinessAnalysisResults from '@/components/business/BusinessAnalysisResults';
import { useBusinessAnalysis } from '@/hooks/useBusinessAnalysis';

const MyBusinessPage = () => {
  const { isAnalyzing, analysisComplete, analysisData, startAnalysis } = useBusinessAnalysis();

  // Aggiungiamo un log per debugging
  useEffect(() => {
    if (analysisComplete && analysisData) {
      console.log('Nuovi dati di analisi ricevuti:', analysisData);
    }
  }, [analysisComplete, analysisData]);

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Building className="mr-2 h-6 w-6" />
          La mia Attività
        </h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analisi Personalizzata</CardTitle>
            <CardDescription>
              Inserisci i dati della tua attività per ottenere un'analisi completa basata sui dati raccolti.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessAnalysisForm 
              isAnalyzing={isAnalyzing} 
              onSubmit={startAnalysis}
            />
          </CardContent>
        </Card>
        
        {analysisComplete && analysisData && (
          <BusinessAnalysisResults 
            key={`analysis-${analysisData.businessInfo.name}-${analysisData.businessInfo.address}-${Date.now()}`} 
            data={{
              businessInfo: {
                ...analysisData.businessInfo,
                // Ensure type is always provided with a default if not available
                type: analysisData.businessInfo.type || 'general'
              },
              analysis: analysisData.analysis,
              rawData: analysisData.rawData
            }} 
          />
        )}
      </div>
    </Layout>
  );
};

export default MyBusinessPage;
