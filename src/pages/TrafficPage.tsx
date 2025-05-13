
import React, { useState } from 'react';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import { Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { TrafficMap } from '@/components/traffic/TrafficMap';
import { TrafficControls } from '@/components/traffic/TrafficControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useTrafficData } from '@/hooks/useTrafficData';

const TrafficPage = () => {
  const { selectedDistrict } = useDistrictSelection();
  const [destination, setDestination] = useState<string>("");
  const { trafficData, isLoading, fetchTrafficRoutes } = useTrafficData();

  const handleAnalyzeTraffic = (destination: string) => {
    if (!destination.trim()) {
      toast({
        title: "Destinazione richiesta",
        description: "Inserisci una destinazione per analizzare il traffico",
        variant: "destructive",
      });
      return;
    }

    setDestination(destination);
    fetchTrafficRoutes(selectedDistrict, destination);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Analisi del Traffico - {selectedDistrict}</h1>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Mappa del Traffico</span>
                {isLoading && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    <span>Analisi in corso...</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <TrafficControls 
                  onAnalyzeTraffic={handleAnalyzeTraffic} 
                  isLoading={isLoading}
                />
              </div>
              
              <div className="h-[600px] w-full rounded-md overflow-hidden border">
                <TrafficMap 
                  district={selectedDistrict} 
                  destination={destination}
                  trafficData={trafficData}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TrafficPage;
