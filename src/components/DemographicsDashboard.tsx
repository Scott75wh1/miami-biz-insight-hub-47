
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchCensusData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { Button } from '@/components/ui/button';

interface DemographicData {
  population: string;
  medianAge: string;
  medianIncome: string;
  households: string;
  ageDistribution: {
    under18: number;
    age18to35: number;
    age36to55: number;
    over55: number;
  };
}

const DemographicsDashboard = () => {
  const [demographicData, setDemographicData] = useState<DemographicData>({
    population: '442,241',
    medianAge: '40.1',
    medianIncome: '$44,268',
    households: '186,860',
    ageDistribution: {
      under18: 15,
      age18to35: 32,
      age36to55: 28,
      over55: 25,
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isLoaded } = useApiKeys();
  const { toast } = useToast();
  const { selectedDistrict } = useDistrictSelection();
  const [lastLoadedDistrict, setLastLoadedDistrict] = useState<string>("");
  const isUsingDemoKey = !apiKeys.censusGov || apiKeys.censusGov === 'demo-key';

  // Funzione per caricare i dati demografici
  const loadDemographicData = async () => {
    if (!isLoaded) return;
    
    setIsLoading(true);
    console.log(`Caricamento dati demografici per ${selectedDistrict}`);
    
    try {
      // Passiamo il distretto selezionato all'API di Census
      const data = await fetchCensusData(apiKeys.censusGov, selectedDistrict);
      
      if (data) {
        // Processiamo i dati API
        setDemographicData({
          population: data.population.toLocaleString(),
          medianAge: data.median_age.toString(),
          medianIncome: `$${data.median_income.toLocaleString()}`,
          households: data.households.toLocaleString(),
          ageDistribution: {
            under18: data.demographics?.age_distribution?.under_18 || 15,
            age18to35: data.demographics?.age_distribution?.age_18_to_34 || 32,
            age36to55: data.demographics?.age_distribution?.age_35_to_64 || 28,
            over55: data.demographics?.age_distribution?.age_65_plus || 25,
          }
        });
        
        // Aggiorniamo l'ultimo distretto caricato
        setLastLoadedDistrict(selectedDistrict);
        
        const messageType = isUsingDemoKey ? "Dati demografici demo caricati" : "Dati demografici reali caricati";
        toast({
          title: messageType,
          description: isUsingDemoKey 
            ? "Stai utilizzando dati dimostrativi. Inserisci una API key reale nelle impostazioni per dati reali."
            : `I dati demografici per ${selectedDistrict} sono stati caricati con successo.`,
        });
      }
    } catch (error) {
      console.error('Error fetching demographic data:', error);
      toast({
        title: "Errore nel caricamento dei dati",
        description: "Controlla la tua API key di Census.gov.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Carichiamo i dati quando cambia il distretto o le API keys
  useEffect(() => {
    if (selectedDistrict && selectedDistrict !== lastLoadedDistrict) {
      loadDemographicData();
    }
  }, [selectedDistrict, apiKeys.censusGov, isLoaded, lastLoadedDistrict]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Demografia {selectedDistrict && `- ${selectedDistrict}`}
            {isLoading && (
              <div className="ml-2 flex items-center text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                <span>Caricamento...</span>
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={loadDemographicData}
            disabled={isLoading}
            className="flex items-center"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Aggiorna
          </Button>
        </CardTitle>
        {isUsingDemoKey && (
          <Alert className="text-amber-800 bg-amber-50 border-amber-300 mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              I dati demografici mostrati sono simulati. Inserisci API keys valide nelle impostazioni per visualizzare dati reali.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Popolazione', value: demographicData.population },
            { label: 'Età Media', value: demographicData.medianAge },
            { label: 'Reddito Medio', value: demographicData.medianIncome },
            { label: 'Famiglie', value: demographicData.households }
          ].map((stat, index) => (
            <div key={`${selectedDistrict}-${stat.label}-${index}`} className="text-center p-2 rounded-md bg-muted/30">
              <div className="text-lg font-semibold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Distribuzione per Età</h4>
          <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
            <div className="flex h-full">
              <div 
                className="h-full bg-miami-blue" 
                style={{ width: `${demographicData.ageDistribution.under18}%` }}
                title={`0-18: ${demographicData.ageDistribution.under18}%`}
              ></div>
              <div 
                className="h-full bg-miami-coral" 
                style={{ width: `${demographicData.ageDistribution.age18to35}%` }}
                title={`19-35: ${demographicData.ageDistribution.age18to35}%`}
              ></div>
              <div 
                className="h-full bg-miami-teal" 
                style={{ width: `${demographicData.ageDistribution.age36to55}%` }}
                title={`36-55: ${demographicData.ageDistribution.age36to55}%`}
              ></div>
              <div 
                className="h-full bg-miami-navy" 
                style={{ width: `${demographicData.ageDistribution.over55}%` }}
                title={`55+: ${demographicData.ageDistribution.over55}%`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>0-18</span>
            <span>19-35</span>
            <span>36-55</span>
            <span>55+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemographicsDashboard;
