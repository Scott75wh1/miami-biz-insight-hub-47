
import React from 'react';
import { Check, AlertCircle } from "lucide-react";

export interface ApiTestResultData {
  service: string;
  success: boolean;
  message: string;
  timestamp: Date;
}

interface ApiTestResultProps {
  results: ApiTestResultData[];
}

export const ApiTestResult = ({ results }: ApiTestResultProps) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p className="text-sm">Clicca su 'Test Connessioni' per verificare lo stato delle tue API</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {results.map((result, idx) => (
        <div key={idx} className="flex justify-between items-center p-2 border rounded-md">
          <div className="flex items-center">
            {result.success ? (
              <Check className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
            )}
            <span className="text-sm">{result.service}</span>
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
      
      <div className="text-xs text-muted-foreground mt-2 text-right">
        Ultimo test: {results.length > 0 ? 
          results[results.length - 1].timestamp.toLocaleString() : 
          'N/A'}
      </div>
    </div>
  );
};
