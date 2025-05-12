
import React from 'react';
import { Map as MapIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MapComponent = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Mappa di Miami</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full h-[400px] bg-miami-blue/10 rounded-md flex items-center justify-center">
          {/* Placeholder per la mappa interattiva (da integrare con una vera API di mappe) */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <MapIcon className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Seleziona un quartiere di Miami per visualizzare i dati demografici e commerciali
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-4">
          {['Downtown', 'Brickell', 'Wynwood', 'Little Havana', 'Miami Beach'].map((area) => (
            <button
              key={area}
              className="text-xs py-1.5 px-2.5 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
            >
              {area}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent;
