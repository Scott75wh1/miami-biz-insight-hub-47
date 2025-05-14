
import React, { useEffect, useState, useCallback } from 'react';
import { Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Layout from '@/components/Layout';
import BusinessAnalysisForm from '@/components/business/BusinessAnalysisForm';
import BusinessAnalysisResults from '@/components/business/BusinessAnalysisResults';
import { useBusinessAnalysis } from '@/hooks/useBusinessAnalysis';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

const MyBusinessPage = () => {
  const { isAnalyzing, analysisComplete, analysisData, startAnalysis } = useBusinessAnalysis();
  const { selectedDistrict } = useDistrictSelection();
  
  // Aggiungiamo uno state per forzare il re-render quando cambia il distretto
  const [districtUpdateTime, setDistrictUpdateTime] = useState<number>(Date.now());

  // Ascoltiamo il cambio di distretto più efficacemente
  useEffect(() => {
    setDistrictUpdateTime(Date.now());

    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setDistrictUpdateTime(Date.now());
    };

    window.addEventListener('districtChanged', handleDistrictChange);
    
    return () => {
      window.removeEventListener('districtChanged', handleDistrictChange);
    };
  }, [selectedDistrict]);

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Building className="mr-2 h-6 w-6" />
          La mia Attività {selectedDistrict && `- ${selectedDistrict}`}
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
              key={`form-${selectedDistrict}-${districtUpdateTime}`}
            />
          </CardContent>
        </Card>
        
        {analysisComplete && analysisData && (
          <BusinessAnalysisResults 
            key={`analysis-${analysisData.businessInfo.name}-${analysisData.businessInfo.address}-${analysisData.businessInfo.district}-${districtUpdateTime}`} 
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
