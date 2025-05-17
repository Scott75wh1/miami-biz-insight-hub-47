
import React from 'react';
import { Check, AlertCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ApiTestResultData {
  service: string;
  success: boolean;
  message: string;
  timestamp: Date;
}

interface ApiTestResultProps {
  results: ApiTestResultData[];
  isLoading?: boolean;
}

export const ApiTestResult = ({ results, isLoading = false }: ApiTestResultProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-6 text-muted-foreground animate-pulse">
        <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm">Verifica delle connessioni in corso...</p>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p className="text-sm">Clicca su 'Test Connessioni' per verificare lo stato delle tue API</p>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border-muted">
      <div className="space-y-1 divide-y divide-muted/30">
        {results.map((result, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center">
              {result.success ? (
                <Check className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
              )}
              <span className="text-sm font-medium">{result.service}</span>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              result.success ? 
                'bg-green-100 text-green-800' : 
                'bg-amber-100 text-amber-800'
            }`}>
              {result.message}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground p-3 bg-muted/30 border-t">
        Ultimo test: {results.length > 0 ? 
          new Date(results[results.length - 1].timestamp).toLocaleString() : 
          'N/A'}
      </div>
    </Card>
  );
};
