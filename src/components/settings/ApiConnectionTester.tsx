
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2 } from "lucide-react";
import { useApiKeys } from '@/hooks/useApiKeys';
import { ApiTestResult, ApiTestResultData } from './ApiTestResult';

export const ApiConnectionTester = () => {
  const { toast } = useToast();
  const { apiKeys } = useApiKeys();
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [testResults, setTestResults] = useState<ApiTestResultData[]>([]);

  const testApis = async () => {
    setIsTestingAll(true);
    setTestResults([]);
    
    // Show toast for test start
    toast({
      title: "Test connessione API",
      description: "Iniziando il test delle API...",
    });
    
    const results: ApiTestResultData[] = [];
    
    // Test each API in sequence
    const apis = [
      { name: 'Google Places API', key: apiKeys.googlePlaces },
      { name: 'Census.gov API', key: apiKeys.censusGov },
      { name: 'Yelp API', key: apiKeys.yelp },
      { name: 'Google Trends API', key: apiKeys.googleTrends },
      { name: 'OpenAI API', key: apiKeys.openAI }
    ];
    
    for (const api of apis) {
      // Add a small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate API test (in a real app, you'd make an actual API call)
      const isDemo = !api.key || api.key === 'demo-key';
      
      // Simulate some random failures for testing
      const success = isDemo ? false : Math.random() > 0.3;
      
      results.push({
        service: api.name,
        success: success,
        message: isDemo ? 
          "Utilizzando chiave demo" : 
          success ? 
            "Connessione riuscita" : 
            "Errore di connessione",
        timestamp: new Date()
      });
      
      setTestResults(prev => [...prev, results[results.length - 1]]);
    }
    
    // Show summary toast
    const successCount = results.filter(r => r.success).length;
    toast({
      title: "Test completato",
      description: `${successCount} di ${apis.length} API connesse con successo.`,
      variant: successCount === apis.length ? "default" : "destructive",
    });
    
    setIsTestingAll(false);
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Test di Connessione API</span>
          <Button
            onClick={testApis}
            disabled={isTestingAll}
            size="sm"
            className="flex items-center gap-1"
          >
            {isTestingAll ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                Testing...
              </>
            ) : (
              <>
                <Check className="h-3 w-3 mr-1" />
                Test Connessioni
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ApiTestResult results={testResults} />
      </CardContent>
    </Card>
  );
};
