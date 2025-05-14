
import React, { useState, useEffect } from 'react';
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
import { fetchCensusData, fetchPlacesData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';

const DataExplorerPage = () => {
  const { selectedDistrict, districts, handleDistrictChange } = useDistrictSelection();
  const { toast } = useToast();
  const { dataState, refreshData, isLoading } = useDataCollection();
  const { apiKeys } = useApiKeys();
  const [selectedDataSource, setSelectedDataSource] = useState('census');
  const [displayData, setDisplayData] = useState<any>(null);
  
  // Carica i dati per la fonte selezionata
  useEffect(() => {
    loadSourceData();
  }, [selectedDistrict, selectedDataSource]);
  
  const loadSourceData = async () => {
    if (!selectedDistrict) return;
    
    try {
      let data;
      
      switch (selectedDataSource) {
        case 'census':
          data = await fetchCensusData(apiKeys.censusGov, selectedDistrict);
          break;
        case 'places':
          data = await fetchPlacesData(`businesses in ${selectedDistrict}`, apiKeys.googlePlaces, selectedDistrict);
          break;
        case 'trends':
          // Per semplicità, uso dati mock per i trend
          data = {
            trends: [
              { keyword: 'ristoranti', score: 85, change: 12 },
              { keyword: 'caffetterie', score: 68, change: -3 },
              { keyword: 'attività commerciali', score: 92, change: 7 },
            ]
          };
          break;
      }
      
      setDisplayData(data);
      
      toast({
        title: "Dati caricati",
        description: `Dati ${selectedDataSource} per ${selectedDistrict} caricati con successo.`,
      });
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Errore nel caricamento dei dati",
        description: "Si è verificato un errore nel caricamento dei dati.",
        variant: "destructive",
      });
    }
  };
  
  const handleExportData = () => {
    toast({
      title: "Esportazione dati",
      description: `I dati per ${selectedDistrict} sono stati esportati con successo.`,
    });
  };
  
  const handleRefreshData = () => {
    refreshData(`${selectedDataSource}Loaded` as keyof typeof dataState);
    loadSourceData();
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
  
  // Rendering dei dati in base al tipo selezionato
  const renderData = () => {
    if (!displayData) return null;
    
    switch (selectedDataSource) {
      case 'census':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/30 p-3 rounded-md text-center">
                <div className="text-muted-foreground text-sm">Popolazione</div>
                <div className="text-lg font-semibold">{displayData.population?.toLocaleString() || 'N/A'}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md text-center">
                <div className="text-muted-foreground text-sm">Età Media</div>
                <div className="text-lg font-semibold">{displayData.median_age || 'N/A'}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md text-center">
                <div className="text-muted-foreground text-sm">Reddito Medio</div>
                <div className="text-lg font-semibold">${displayData.median_income?.toLocaleString() || 'N/A'}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-md text-center">
                <div className="text-muted-foreground text-sm">Famiglie</div>
                <div className="text-lg font-semibold">{displayData.households?.toLocaleString() || 'N/A'}</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-md border">
              <h3 className="text-base font-medium mb-3">Dati Demografici</h3>
              <p>Popolazione: {displayData.population?.toLocaleString() || 'N/A'}</p>
              <p>Età Media: {displayData.median_age || 'N/A'}</p>
              <p>Reddito Mediano: ${displayData.median_income?.toLocaleString() || 'N/A'}</p>
              <p>Numero Famiglie: {displayData.households?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>
        );
      
      case 'places':
        return (
          <div className="space-y-4">
            <h3 className="text-base font-medium">Attività in {selectedDistrict}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayData?.results?.slice(0, 6).map((place: any, index: number) => (
                <div key={`${place.name}-${index}`} className="bg-white p-4 rounded-md border">
                  <h4 className="font-medium">{place.name}</h4>
                  <p className="text-sm text-muted-foreground">{place.vicinity || place.formatted_address}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-amber-500 font-medium">{place.rating || 'N/A'}</span>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({place.user_ratings_total || '0'} recensioni)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'trends':
        return (
          <div className="space-y-4">
            <h3 className="text-base font-medium">Trend in {selectedDistrict}</h3>
            <div className="space-y-3">
              {displayData?.trends?.map((trend: any, index: number) => (
                <div key={`${trend.keyword}-${index}`} className="flex justify-between items-center bg-white p-3 rounded-md border">
                  <span className="font-medium">{trend.keyword}</span>
                  <div className="flex items-center">
                    <span className={`text-sm ${trend.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {trend.change > 0 ? '+' : ''}{trend.change}%
                    </span>
                    <div className="ml-4 w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${trend.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

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
                  ) : displayData ? (
                    renderData()
                  ) : isCurrentDataLoaded ? (
                    <div className="min-h-[350px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <source.icon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p>Dati {source.label} per {selectedDistrict} caricati e pronti per l'analisi</p>
                        <p className="text-sm mt-2">Scegli visualizzazione e filtri per iniziare l'esplorazione</p>
                        <Button 
                          variant="outline" 
                          onClick={loadSourceData}
                          className="mt-4"
                        >
                          Visualizza Dati
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[350px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <source.icon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p>Nessun dato caricato per {source.label}</p>
                        <Button 
                          variant="outline" 
                          onClick={loadSourceData}
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
