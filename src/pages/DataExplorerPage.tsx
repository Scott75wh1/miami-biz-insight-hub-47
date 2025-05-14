
import React, { useState } from 'react';
import { Database, Download, BarChart, Layers, Filter, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useToast } from '@/hooks/use-toast';
import { useDataCollection } from '@/hooks/useDataCollection';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const DataExplorerPage = () => {
  const { selectedDistrict, districts, handleDistrictChange } = useDistrictSelection();
  const { toast } = useToast();
  const { dataState, refreshData, isLoading } = useDataCollection();
  const [selectedDataSource, setSelectedDataSource] = useState('census');
  
  const handleExportData = () => {
    toast({
      title: "Esportazione dati",
      description: `I dati per ${selectedDistrict} sono stati esportati con successo.`,
    });
  };
  
  const handleRefreshData = () => {
    refreshData(`${selectedDataSource}Loaded` as keyof typeof dataState);
  };
  
  const dataSources = [
    { id: 'census', label: 'Census.gov', icon: Database },
    { id: 'places', label: 'Google Places', icon: Layers },
    { id: 'trends', label: 'Trend', icon: BarChart },
  ];
  
  const getLastUpdatedText = (dataType: string) => {
    const lastUpdated = dataState[`${dataType}LastUpdated` as keyof typeof dataState] as Date | null;
    return lastUpdated 
      ? `Ultimo aggiornamento: ${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
      : 'Dati non ancora caricati';
  };
  
  const isCurrentDataLoaded = dataState[`${selectedDataSource}Loaded` as keyof typeof dataState];

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Database className="mr-2 h-6 w-6" />
          Esplora i Dati
        </h1>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="space-y-2 md:w-1/2">
            <p className="text-muted-foreground">
              Visualizza, analizza ed esporta dati per {selectedDistrict}.
            </p>
            <p className="text-sm text-muted-foreground">
              {getLastUpdatedText(selectedDataSource)}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={selectedDistrict}
              onValueChange={(value) => handleDistrictChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleziona distretto" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleRefreshData}
              disabled={isLoading}
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
              className="flex items-center gap-2"
              onClick={handleExportData}
            >
              <Download className="h-4 w-4" />
              Esporta
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={selectedDataSource} onValueChange={setSelectedDataSource}>
          <TabsList className="mb-6">
            {dataSources.map((source) => (
              <TabsTrigger key={source.id} value={source.id} className="flex items-center gap-2">
                <source.icon className="h-4 w-4" />
                {source.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {dataSources.map((source) => (
            <TabsContent key={source.id} value={source.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <source.icon className="h-5 w-5" />
                    Dati da {source.label}
                  </CardTitle>
                  <CardDescription>
                    {source.id === 'census' && 'Dati demografici e informazioni economiche da Census.gov'}
                    {source.id === 'places' && 'Informazioni sulle attività locali da Google Places'}
                    {source.id === 'trends' && 'Analisi delle tendenze di mercato'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Filter className="h-3.5 w-3.5" />
                      Filtra Dati
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-[300px] w-full rounded-md" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[400px]" />
                      </div>
                    </div>
                  ) : isCurrentDataLoaded ? (
                    <div className="min-h-[350px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <source.icon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p>Dati {source.label} per {selectedDistrict} caricati e pronti per l'analisi</p>
                        <p className="text-sm mt-2">Scegli visualizzazione e filtri per iniziare l'esplorazione</p>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[350px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <source.icon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p>Nessun dato caricato per {source.label}</p>
                        <Button 
                          variant="outline" 
                          onClick={handleRefreshData}
                          disabled={isLoading}
                          className="mt-4"
                        >
                          Carica Dati
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>Miami Business Insight Hub - Strumento per esplorazione e analisi dati</p>
        </footer>
      </div>
    </Layout>
  );
};

export default DataExplorerPage;
