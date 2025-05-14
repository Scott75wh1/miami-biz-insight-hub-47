
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Database, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CensusDataResponse, fetchDistrictCensusData } from '@/services/api/censusService';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CensusTabsContainer from './CensusTabsContainer';
import CensusLoadingState from './CensusLoadingState';
import CensusEmptyState from './CensusEmptyState';

const DetailedCensusView = () => {
  const { selectedDistrict } = useDistrictSelection();
  const { apiKeys, isLoaded } = useApiKeys();
  const { toast } = useToast();
  const [censusData, setCensusData] = useState<CensusDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const isUsingDemoKey = !apiKeys.censusGov || apiKeys.censusGov === 'demo-key';

  const loadCensusData = async () => {
    if (!isLoaded || !selectedDistrict) return;
    
    setIsLoading(true);
    
    try {
      const data = await fetchDistrictCensusData(apiKeys.censusGov, selectedDistrict);
      
      if (data) {
        setCensusData(data);
        setLastRefreshed(new Date());
        
        toast({
          title: "Dati del distretto caricati",
          description: `I dati demografici per ${selectedDistrict} sono stati aggiornati.`,
        });
      } else {
        setCensusData(null);
      }
    } catch (error) {
      console.error('Error fetching district census data:', error);
      setCensusData(null);
      toast({
        title: "Errore nel caricamento dei dati",
        description: "Non è stato possibile recuperare i dati del censimento per questo distretto.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCensusData();
  }, [selectedDistrict, apiKeys.censusGov, isLoaded]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Dati del Censimento per {selectedDistrict}
            </CardTitle>
            <CardDescription>
              Dati demografici, economici e abitativi dettagliati
              {lastRefreshed && !isLoading && (
                <span className="block text-xs mt-1">
                  Ultimo aggiornamento: {lastRefreshed.toLocaleTimeString()}
                </span>
              )}
            </CardDescription>
          </div>
          {!isLoading && (
            <Button
              variant="outline"
              size="sm"
              onClick={loadCensusData}
              className="flex items-center gap-1"
            >
              <RefreshCcw className="h-3 w-3" />
              Aggiorna
            </Button>
          )}
        </div>
        {isUsingDemoKey && (
          <Alert className="text-amber-800 bg-amber-50 border-amber-300 mt-4">
            <AlertDescription>
              I dati mostrati sono simulati a scopo dimostrativo. Inserisci un'API key reale nelle impostazioni per dati reali.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <CensusLoadingState />
        ) : censusData ? (
          <CensusTabsContainer 
            censusData={censusData} 
            selectedDistrict={selectedDistrict} 
          />
        ) : (
          <CensusEmptyState onRefresh={loadCensusData} />
        )}
      </CardContent>
    </Card>
  );
};

export default DetailedCensusView;
