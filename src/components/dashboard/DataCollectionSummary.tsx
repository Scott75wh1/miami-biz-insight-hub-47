
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

const DataCollectionSummary = () => {
  const { selectedDistrict } = useDistrictSelection();
  
  // This would be dynamic data in a real application
  const dataSources = [
    { name: 'Census.gov', completion: 95, records: 1247 },
    { name: 'Attività registrate', completion: 88, records: 483 },
    { name: 'Dati di mercato', completion: 72, records: 825 },
    { name: 'Dati demografici', completion: 98, records: 2156 }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Dati Disponibili per {selectedDistrict}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dataSources.map((source) => (
            <div key={source.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{source.name}</span>
                <span className="font-medium">{source.completion}% ({source.records} record)</span>
              </div>
              <Progress value={source.completion} className="h-2" />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="text-sm text-muted-foreground">Ultimo aggiornamento: 14 Maggio 2025</div>
          <div className="text-sm font-medium">4,711 record totali</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCollectionSummary;
