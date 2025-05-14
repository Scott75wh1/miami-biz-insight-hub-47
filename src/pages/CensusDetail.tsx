
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapIcon, Database, DownloadIcon, FilterIcon, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DetailedCensusView from '@/components/census/DetailedCensusView';
import { DistrictSelector } from '@/components/competitor/DistrictSelector';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useDataCollection } from '@/hooks/useDataCollection';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const CensusDetail = () => {
  const { districts, selectedDistrict, handleDistrictChange } = useDistrictSelection();
  const { dataState, refreshData, isLoading } = useDataCollection();
  const { toast } = useToast();
  
  const handleExportData = () => {
    toast({
      title: "Esportazione dati",
      description: `I dati del censimento per ${selectedDistrict} sono stati esportati con successo.`,
    });
  };
  
  const handleRefreshCensusData = () => {
    refreshData('censusLoaded');
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Database className="mr-2 h-6 w-6" />
              Dati del Censimento
            </h1>
            <p className="text-muted-foreground">
              Analisi dettagliata dei dati demografici, economici e abitativi per {selectedDistrict}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshCensusData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                  Aggiornamento...
                </>
              ) : (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Aggiorna
                </>
              )}
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
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <FilterIcon className="h-4 w-4" />
              Filtri
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base">
              <MapIcon className="mr-2 h-5 w-5" />
              Seleziona Zona per Analisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DistrictSelector
              districts={districts}
              selectedDistrict={selectedDistrict}
              onDistrictChange={handleDistrictChange}
            />
          </CardContent>
        </Card>
        
        <DetailedCensusView 
          key={`census-${selectedDistrict}`} 
          isDataLoaded={dataState.censusLoaded}
          onRefreshData={handleRefreshCensusData}
        />
        
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>Miami Business Insight Hub - Dati del censimento forniti dall'American Community Survey</p>
        </footer>
      </div>
    </Layout>
  );
};

export default CensusDetail;
