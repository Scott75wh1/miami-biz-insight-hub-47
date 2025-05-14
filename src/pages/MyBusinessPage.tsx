
import React, { useEffect, useState, useCallback } from 'react';
import { Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Layout from '@/components/Layout';
import BusinessAnalysisForm from '@/components/business/BusinessAnalysisForm';
import BusinessAnalysisResults from '@/components/business/BusinessAnalysisResults';
import { useBusinessAnalysis } from '@/hooks/useBusinessAnalysis';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useToast } from '@/hooks/use-toast';

const MyBusinessPage = () => {
  const { isAnalyzing, analysisComplete, analysisData, startAnalysis } = useBusinessAnalysis();
  const { selectedDistrict } = useDistrictSelection();
  const { toast } = useToast();
  
  // State for forcing re-render when district changes
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
  }, [selectedDistrict]);

  // Log when analysis data changes
  useEffect(() => {
    if (analysisComplete && analysisData) {
      console.log('[MyBusinessPage] New analysis data received:', analysisData);
      console.log(`[MyBusinessPage] Analysis district: ${analysisData.businessInfo.district}`);
    }
  }, [analysisComplete, analysisData]);

  // Listen for district changes
  useEffect(() => {
    console.log(`[MyBusinessPage] Selected district changed to: ${selectedDistrict}`);
    setDistrictUpdateTime(Date.now());

    const handleDistrictChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`[MyBusinessPage] District change event detected: ${customEvent.detail.district}`);
      
      setDistrictUpdateTime(previous => {
        const newTime = Date.now();
        console.log(`[MyBusinessPage] District update timestamp: ${previous} -> ${newTime}`);
        return newTime;
      });
      
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
        )}
      </div>
    </Layout>
  );
};

export default MyBusinessPage;
