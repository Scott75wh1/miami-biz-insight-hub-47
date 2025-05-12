import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Loader2, AlertCircle } from 'lucide-react';
import { fetchCensusData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const isUsingDemoKey = !apiKeys.censusGov || apiKeys.censusGov === 'demo-key';

  useEffect(() => {
    const loadDemographicData = async () => {
      if (!isLoaded) return;
      
      setIsLoading(true);
      
      try {
        const data = await fetchCensusData(apiKeys.censusGov, 'Miami');
        
        if (data) {
          // Process the API data 
          setDemographicData({
            population: data.population.toLocaleString(),
            medianAge: data.median_age.toString(),
            medianIncome: `$${data.median_income.toLocaleString()}`,
            households: data.households.toLocaleString(),
            ageDistribution: {
              under18: 15,
              age18to35: 32,
              age36to55: 28,
              over55: 25,
            }
          });
          
          const messageType = isUsingDemoKey ? "Dati demografici demo caricati" : "Dati demografici reali caricati";
          toast({
            title: messageType,
            description: isUsingDemoKey 
              ? "Stai utilizzando dati dimostrativi. Inserisci una API key reale nelle impostazioni per dati reali."
              : "I dati demografici sono stati caricati con successo.",
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

    loadDemographicData();
  }, [isLoaded, apiKeys.censusGov, toast, isUsingDemoKey]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Demografia
          {isLoading && (
            <div className="ml-2 flex items-center text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              <span>Caricamento...</span>
            </div>
          )}
        </CardTitle>
        {isUsingDemoKey && (
          <Alert variant="warning" className="mt-2 py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Stai visualizzando dati dimostrativi. Inserisci una API key valida nelle impostazioni per accedere ai dati reali.
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
            <div key={index} className="text-center p-2 rounded-md bg-muted/30">
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
