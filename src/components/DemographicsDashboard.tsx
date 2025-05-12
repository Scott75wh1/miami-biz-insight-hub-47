import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { fetchCensusData } from '@/services/apiService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/components/ui/use-toast';

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
  const { apiKeys, isLoaded, areKeysSet } = useApiKeys();
  const { toast } = useToast();

  useEffect(() => {
    const loadDemographicData = async () => {
      if (!isLoaded || !areKeysSet()) return;
      
      setIsLoading(true);
      
      try {
        const data = await fetchCensusData('Miami');
        
        if (data) {
          // Process the real data here
          // For now, we'll keep using the placeholder data
          // In a real implementation, you would transform the API response
          toast({
            title: "Demographic data loaded",
            description: "Census data has been successfully retrieved.",
          });
        }
      } catch (error) {
        console.error('Error fetching demographic data:', error);
        toast({
          title: "Error loading data",
          description: "Could not retrieve census data. Check your API key.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDemographicData();
  }, [isLoaded, apiKeys.censusGov, toast, areKeysSet]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Demografia
          {isLoading && <span className="ml-2 text-xs text-muted-foreground">(Caricamento...)</span>}
        </CardTitle>
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
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
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
