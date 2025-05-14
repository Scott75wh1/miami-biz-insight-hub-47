
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const ApiStatusCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Stato APIs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {["openAI", "googlePlaces", "censusGov", "yelp", "googleTrends"].map(api => (
            <div key={api} className="flex justify-between items-center">
              <span className="text-sm">{api}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                api === "openAI" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
              }`}>
                {api === "openAI" ? "Attiva" : "Demo"}
              </span>
            </div>
          ))}
        </div>
        
        <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-100">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Configura tutte le API nelle impostazioni per risultati ottimali.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
