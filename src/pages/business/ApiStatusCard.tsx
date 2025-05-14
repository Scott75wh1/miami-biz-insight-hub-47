
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const ApiStatusCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="text-sm sm:text-base">Stato APIs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2">
          {["openAI", "googlePlaces", "censusGov", "yelp", "googleTrends"].map(api => (
            <div key={api} className="flex justify-between items-center">
              <span className="text-xs sm:text-sm">{api}</span>
              <span className={`text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full ${
                api === "openAI" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
              }`}>
                {api === "openAI" ? "Attiva" : "Demo"}
              </span>
            </div>
          ))}
        </div>
        
        <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-100 py-2 sm:py-3">
          <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <AlertDescription className="text-xs">
            Configura tutte le API nelle impostazioni per risultati ottimali.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
