
import React, { useEffect, useState, useCallback } from 'react';
import { Building, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Layout from '@/components/Layout';
import BusinessAnalysisForm from '@/components/business/BusinessAnalysisForm';
import BusinessAnalysisResults from '@/components/business/BusinessAnalysisResults';
import { useBusinessAnalysis } from '@/hooks/useBusinessAnalysis';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const MyBusinessPage = () => {
  const { isAnalyzing, analysisComplete, analysisData, startAnalysis, refreshAnalysis } = useBusinessAnalysis();
  const { selectedDistrict } = useDistrictSelection();
  const { toast } = useToast();
  
  // State for tracking district updates
  const [districtUpdateTime, setDistrictUpdateTime] = useState<number>(Date.now());
  const [renderCount, setRenderCount] = useState(1);

  // Log lifecycle for debugging
  useEffect(() => {
    console.log(`[MyBusinessPage] Mounted/updated with district: ${selectedDistrict} (render #${renderCount})`);
    
    // Increment render count on each render
    setRenderCount(prev => prev + 1);
    
    return () => {
      console.log('[MyBusinessPage] Unmounted');
    };
  }, [selectedDistrict, renderCount]);

  // Log when analysis data changes
  useEffect(() => {
    if (analysisComplete && analysisData) {
      console.log('[MyBusinessPage] New analysis data received:', analysisData);
      console.log(`[MyBusinessPage] Analysis district: ${analysisData.businessInfo.district}`);
    }
  }, [analysisComplete, analysisData]);

  // Gestione dei cambiamenti di distretto
  useEffect(() => {
    console.log(`[MyBusinessPage] Selected district changed to: ${selectedDistrict}`);
    setDistrictUpdateTime(Date.now());

    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`[MyBusinessPage] District change event detected: ${customEvent.detail.district}`);
      
      setDistrictUpdateTime(Date.now());
      
      // Notify user of district change
      toast({
        title: "Zona cambiata",
        description: `Selezionato il distretto: ${customEvent.detail.district}`,
      });
    };

    window.addEventListener('districtChanged', handleDistrictChange);
    
    return () => {
      window.removeEventListener('districtChanged', handleDistrictChange);
    };
  }, [selectedDistrict, toast]);

  // Handler per il refresh manuale dell'analisi
  const handleManualRefresh = useCallback(() => {
    if (analysisComplete && !isAnalyzing) {
      console.log(`[MyBusinessPage] Manual refresh requested for district: ${selectedDistrict}`);
      refreshAnalysis(selectedDistrict);
    }
  }, [analysisComplete, isAnalyzing, refreshAnalysis, selectedDistrict]);

  // Log render with detailed state information
  console.log(`[MyBusinessPage] Rendering - District: ${selectedDistrict}, UpdateTime: ${districtUpdateTime}, Analysis: ${analysisComplete}`);

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
              key={`form-${selectedDistrict}-${districtUpdateTime}-${renderCount}`}
            />
          </CardContent>
        </Card>
        
        {analysisComplete && analysisData && (
          <>
            <div className="flex justify-end mb-4">
              <Button 
                onClick={handleManualRefresh}
                disabled={isAnalyzing}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                Aggiorna Analisi
              </Button>
            </div>
            
            <BusinessAnalysisResults 
              key={`analysis-${analysisData.businessInfo.name}-${analysisData.businessInfo.address}-${analysisData.businessInfo.district}-${districtUpdateTime}-${renderCount}`} 
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default MyBusinessPage;
