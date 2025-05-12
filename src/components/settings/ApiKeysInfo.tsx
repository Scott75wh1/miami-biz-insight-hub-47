
import React from 'react';
import { Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApiKeysInfoProps {
  useDemoKeys: () => void;
}

export const ApiKeysInfo = ({ useDemoKeys }: ApiKeysInfoProps) => {
  return (
    <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md mb-4">
      <div className="flex items-center mb-2">
        <Info className="h-5 w-5 mr-2" />
        <p className="font-medium">Informazione sui dati</p>
      </div>
      <p className="text-sm">
        Per questa demo, puoi usare il valore "demo-key" per tutte le API key. 
        L'app mostrerà dati simulati, ma sarà possibile vedere come funziona l'interfaccia.
      </p>
      <Alert className="mt-3 bg-amber-100 border-amber-300">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs font-medium">
          Per visualizzare dati reali, devi ottenere API key valide dai seguenti servizi:
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
            <li><a href="https://developers.google.com/maps/documentation/places/web-service/overview" target="_blank" rel="noopener noreferrer" className="underline">Google Places API</a></li>
            <li><a href="https://www.census.gov/data/developers/about.html" target="_blank" rel="noopener noreferrer" className="underline">Census.gov API</a></li>
            <li><a href="https://www.yelp.com/developers" target="_blank" rel="noopener noreferrer" className="underline">Yelp Fusion API</a></li>
            <li><a href="https://developers.google.com/trends/api/quickstart" target="_blank" rel="noopener noreferrer" className="underline">Google Trends API</a></li>
            <li><a href="https://platform.openai.com/" target="_blank" rel="noopener noreferrer" className="underline">OpenAI API</a></li>
          </ul>
        </AlertDescription>
      </Alert>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-3"
        onClick={useDemoKeys}
      >
        Usa chiavi demo
      </Button>
    </div>
  );
};
