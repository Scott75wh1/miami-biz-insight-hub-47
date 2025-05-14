
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useBusinessAnalysis } from '@/hooks/useBusinessAnalysis';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useDataCollection } from '@/hooks/useDataCollection';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { BusinessPageHeader } from './BusinessPageHeader';
import { BusinessMainContent } from './BusinessMainContent';
import { BusinessSidebar } from './BusinessSidebar';

const MyBusinessPageContainer: React.FC = () => {
  const { isAnalyzing, analysisComplete, analysisData, startAnalysis } = useBusinessAnalysis();
  const { selectedDistrict } = useDistrictSelection();
  const { dataState, refreshData } = useDataCollection();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Aggiungiamo uno state per forzare il re-render quando cambia il distretto
  const [districtUpdateTime, setDistrictUpdateTime] = useState<number>(Date.now());
  
  // State for business history
  const [previousAnalyses] = useState<Array<{
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
      <div className="container py-4 sm:py-6 px-3 sm:px-6">
        <BusinessPageHeader 
          selectedDistrict={selectedDistrict}
          analysisComplete={analysisComplete}
          analysisData={analysisData}
          refreshBusinessData={refreshBusinessData}
          handleExportData={handleExportData}
        />
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {isMobile && (
            <BusinessSidebar 
              previousAnalyses={previousAnalyses}
              isAnalyzing={isAnalyzing}
              selectedDistrict={selectedDistrict}
            />
          )}
          
          <div className="lg:col-span-2">
            <BusinessMainContent 
              selectedDistrict={selectedDistrict}
              districtUpdateTime={districtUpdateTime}
              isAnalyzing={isAnalyzing}
              startAnalysis={startAnalysis}
              analysisComplete={analysisComplete}
              analysisData={analysisData}
            />
          </div>
          
          {!isMobile && (
            <BusinessSidebar 
              previousAnalyses={previousAnalyses}
              isAnalyzing={isAnalyzing}
              selectedDistrict={selectedDistrict}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyBusinessPageContainer;
