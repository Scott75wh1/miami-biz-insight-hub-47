
import React, { useEffect, useState, useCallback } from 'react';
import { Building, RefreshCcw, Filter, DownloadIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Layout from '@/components/Layout';
import BusinessAnalysisForm from '@/components/business/BusinessAnalysisForm';
import BusinessAnalysisResults from '@/components/business/BusinessAnalysisResults';
import { useBusinessAnalysis } from '@/hooks/useBusinessAnalysis';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useDataCollection } from '@/hooks/useDataCollection';
import { useToast } from '@/hooks/use-toast';

const MyBusinessPage = () => {
  const { isAnalyzing, analysisComplete, analysisData, startAnalysis } = useBusinessAnalysis();
  const { selectedDistrict } = useDistrictSelection();
  const { dataState, refreshData } = useDataCollection();
  const { toast } = useToast();
  
  // Aggiungiamo uno state per forzare il re-render quando cambia il distretto
  const [districtUpdateTime, setDistrictUpdateTime] = useState<number>(Date.now());
  
  // State for business history
  const [previousAnalyses, setPreviousAnalyses] = useState<Array<{
    name: string;
    date: Date;
    district: string;
  }>>([
    { name: "Caffetteria Milano", date: new Date(2025, 4, 10), district: "Wynwood" },
    { name: "Ristorante Napoli", date: new Date(2025, 4, 5), district: "Miami Beach" },
    { name: "Tech Hub Miami", date: new Date(2025, 3, 28), district: "Brickell" }
  ]);
  
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
  
  const handleExportData = () => {
    toast({
      title: "Esportazione completata",
      description: "L'analisi è stata esportata in formato PDF.",
    });
  };
  
  const refreshBusinessData = () => {
    refreshData('businessAnalysisLoaded');
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Building className="mr-2 h-6 w-6" />
              La mia Attività {selectedDistrict && `- ${selectedDistrict}`}
            </h1>
            <p className="text-muted-foreground">
              Analisi personalizzata della tua attività basata sui dati di mercato
            </p>
          </div>
          
          {analysisComplete && analysisData && (
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshBusinessData} 
                className="flex items-center gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Aggiorna
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportData} 
                className="flex items-center gap-2"
              >
                <DownloadIcon className="h-4 w-4" />
                Esporta
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - Analysis form and results */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
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
                    type: analysisData.businessInfo.type || 'general'
                  },
                  analysis: analysisData.analysis,
                  rawData: analysisData.rawData
                }} 
              />
            )}
          </div>
          
          {/* Sidebar content */}
          <div className="space-y-6">
            {/* API status card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Stato APIs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {["openAI", "googlePlaces", "censusGov", "yelp", "googleTrends"].map(api => (
                    <div key={api} className="flex justify-between items-center">
                      <span className="text-sm">{api}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        api === "openAI" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {api === "openAI" ? "Attiva" : "Demo"}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-100">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Configura tutte le API nelle impostazioni per risultati ottimali.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
            
            {/* Previous analyses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Analisi Precedenti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previousAnalyses.length > 0 ? (
                  previousAnalyses.map((analysis, index) => (
                    <div 
                      key={index} 
                      className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="font-medium text-sm">{analysis.name}</div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{analysis.district}</span>
                        <span>{analysis.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p className="text-sm">Nessuna analisi precedente</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Market trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tendenze di Mercato</CardTitle>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p>• Crescita del settore ristorazione: <span className="text-green-600">+12%</span></p>
                    <p>• Nuove aperture in {selectedDistrict}: <span>28</span></p>
                    <p>• Chiusure nell'ultimo trimestre: <span className="text-red-600">14</span></p>
                    <p>• Clientela media giornaliera: <span>86</span></p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyBusinessPage;
