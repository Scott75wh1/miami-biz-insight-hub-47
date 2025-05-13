
import React, { useState } from 'react';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';
import Layout from '@/components/Layout';
import { TrafficMap } from '@/components/traffic/TrafficMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const TrafficPage = () => {
  const { selectedDistrict } = useDistrictSelection();
  const [destination, setDestination] = useState<string>("");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Traffico in tempo reale - {selectedDistrict}</h1>
        
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Informazione sul traffico</AlertTitle>
          <AlertDescription>
            La mappa mostra il traffico in tempo reale a {selectedDistrict}. I colori sulla mappa indicano le condizioni del traffico:
            <ul className="mt-2 list-disc pl-5">
              <li><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span> Verde: Traffico scorrevole</li>
              <li><span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span> Giallo: Traffico moderato</li>
              <li><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span> Rosso: Traffico intenso</li>
              <li><span className="inline-block w-3 h-3 bg-red-900 rounded-full mr-2"></span> Rosso scuro: Traffico molto congestionato</li>
            </ul>
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>
                <span>Mappa del Traffico</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] w-full rounded-md overflow-hidden border">
                <TrafficMap 
                  district={selectedDistrict} 
                  destination={destination}
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
